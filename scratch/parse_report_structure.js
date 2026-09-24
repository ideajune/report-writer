const fs = require('fs');
const zlib = require('zlib');

const fd = fs.openSync('c:\\Users\\e상준\\Desktop\\Antigravity\\report-writer-sample\\전시회 관람보고서 (양식).pdf', 'r');
const stat = fs.fstatSync(fd);
const fileSize = stat.size;

// Read chunks to build object index
console.log('File size:', fileSize);

// Let's read first 25MB which contains all document structure and fonts
const buffer = Buffer.alloc(Math.min(fileSize, 25 * 1024 * 1024));
fs.readSync(fd, buffer, 0, buffer.length, 0);
fs.closeSync(fd);

// Parse objects
const objRegex = /(\d+)\s+0\s+obj\r?\n([\s\S]*?)endobj/g;
const objects = new Map();
let m;
while ((m = objRegex.exec(buffer.toString('latin1'))) !== null) {
  objects.set(parseInt(m[1]), {
    header: m[2],
    start: m.index,
    length: m[0].length
  });
}

console.log('Loaded objects count in first 25MB:', objects.size);

// Parse CMaps
const cmaps = new Map();

for (const [objNum, obj] of objects.entries()) {
  if (obj.header.includes('/ToUnicode')) {
    const toUniMatch = obj.header.match(/\/ToUnicode\s+(\d+)\s+0\s+R/);
    if (toUniMatch) {
      const cMapObjNum = parseInt(toUniMatch[1]);
      const cMapObj = objects.get(cMapObjNum);
      if (cMapObj) {
        // extract stream
        const streamIdx = cMapObj.header.indexOf('stream');
        if (streamIdx !== -1) {
          const rawHeader = cMapObj.header;
          const sStart = streamIdx + 6 + (rawHeader[streamIdx+6] === '\r' ? 2 : (rawHeader[streamIdx+6] === '\n' ? 1 : 0));
          const sEnd = rawHeader.indexOf('endstream');
          const streamBuf = Buffer.from(rawHeader.substring(sStart, sEnd), 'latin1');
          try {
            const decomp = zlib.inflateSync(streamBuf).toString('utf-8');
            // parse bfchar and bfrange
            const map = new Map();
            const bfcharRegex = /<([0-9A-Fa-f]+)>\s+<([0-9A-Fa-f]+)>/g;
            let cm;
            while ((cm = bfcharRegex.exec(decomp)) !== null) {
              const code = parseInt(cm[1], 16);
              const ucs = String.fromCharCode(parseInt(cm[2], 16));
              map.set(code, ucs);
            }
            cmaps.set(objNum, map);
          } catch (e) {}
        }
      }
    }
  }
}

console.log('Parsed CMaps for fonts:', cmaps.size);

// Function to decode text stream using font CMaps
function decodeStream(contentStream, pageFontMap) {
  // decompress if flate
  let text = '';
  try {
    const decomp = zlib.inflateSync(contentStream).toString('latin1');
    // Extract Tj and TJ with font selection
    let currentFont = null;
    const tokens = decomp.split(/\s+/);
    
    // Simpler regex extraction:
    // /F\d+ \d+(\.\d+)? Tf ... <hex> Tj or [(<hex>)...] TJ
    const tfRegex = /\/(F\d+)\s+[\d\.]+\s+Tf/g;
    const textRegex = /(?:\/([F\d]+)\s+[\d\.]+\s+Tf[\s\S]*?)?(?:<([0-9A-Fa-f]+)>\s*Tj|\[(.*?)\]\s*TJ)/g;
    
    // Line by line / operation by operation parse
    const ops = decomp.match(/\/(F\d+)\s+[\d\.]+\s+Tf|<([0-9A-Fa-f]+)>\s*Tj|\[(.*?)\]\s*TJ/g);
    if (!ops) return '';
    
    let curFontName = null;
    for (const op of ops) {
      if (op.includes('Tf')) {
        const fm = op.match(/\/(F\d+)/);
        if (fm) curFontName = fm[1];
      } else if (op.endsWith('Tj')) {
        const hex = op.match(/<([0-9A-Fa-f]+)>/)[1];
        const fontObjNum = pageFontMap.get(curFontName);
        const cmap = cmaps.get(fontObjNum);
        for (let i = 0; i < hex.length; i += 2) {
          const code = parseInt(hex.substr(i, 2), 16);
          text += (cmap && cmap.get(code)) || '?';
        }
        text += ' ';
      } else if (op.endsWith('TJ')) {
        const inner = op.slice(1, op.indexOf(']'));
        const hexParts = inner.match(/<([0-9A-Fa-f]+)>/g);
        if (hexParts) {
          const fontObjNum = pageFontMap.get(curFontName);
          const cmap = cmaps.get(fontObjNum);
          for (const hp of hexParts) {
            const hex = hp.slice(1, -1);
            for (let i = 0; i < hex.length; i += 2) {
              const code = parseInt(hex.substr(i, 2), 16);
              text += (cmap && cmap.get(code)) || '?';
            }
          }
        }
        text += ' ';
      }
    }
  } catch (e) {
    text = '[Decompress error: ' + e.message + ']';
  }
  return text;
}

// Let's decode pages 1 to 15!
// In PDF page tree (object 2): Kids [ 4 0 R 53 0 R 55 0 R ... ]
const kidsMatch = objects.get(2).header.match(/\/Kids\s*\[\s*([\s\S]*?)\s*\]/);
if (kidsMatch) {
  const pageRefs = kidsMatch[1].match(/(\d+)\s+0\s+R/g).map(s => parseInt(s));
  console.log('Total pages found in tree:', pageRefs.length);
  
  for (let i = 0; i < Math.min(15, pageRefs.length); i++) {
    const pageObjNum = pageRefs[i];
    const pageObj = objects.get(pageObjNum);
    if (!pageObj) continue;
    
    // find /Resources
    let resObjNum = null;
    const resMatch = pageObj.header.match(/\/Resources\s+(\d+)\s+0\s+R/);
    if (resMatch) resObjNum = parseInt(resMatch[1]);
    
    const fontMap = new Map();
    if (resObjNum && objects.get(resObjNum)) {
      const resHeader = objects.get(resObjNum).header;
      const fontDictMatch = resHeader.match(/\/Font\s+(\d+)\s+0\s+R/);
      if (fontDictMatch) {
        const fontDict = objects.get(parseInt(fontDictMatch[1]));
        if (fontDict) {
          const fEntries = fontDict.header.match(/\/(F\d+)\s+(\d+)\s+0\s+R/g);
          if (fEntries) {
            for (const fe of fEntries) {
              const parts = fe.match(/\/(F\d+)\s+(\d+)/);
              fontMap.set(parts[1], parseInt(parts[2]));
            }
          }
        }
      }
    }
    
    // find /Contents
    const contMatch = pageObj.header.match(/\/Contents\s+(\d+)\s+0\s+R/);
    if (contMatch) {
      const contObj = objects.get(parseInt(contMatch[1]));
      if (contObj) {
        const sIdx = contObj.header.indexOf('stream');
        const sStart = sIdx + 6 + (contObj.header[sIdx+6] === '\r' ? 2 : (contObj.header[sIdx+6] === '\n' ? 1 : 0));
        const sEnd = contObj.header.indexOf('endstream');
        const streamBuf = Buffer.from(contObj.header.substring(sStart, sEnd), 'latin1');
        const pageText = decodeStream(streamBuf, fontMap);
        console.log(`\n================ PAGE ${i + 1} (Obj ${pageObjNum}) ================`);
        console.log(pageText.trim());
      }
    }
  }
}
