import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "전시회 참관 결과 보고서 작성기 | Exhibition Report Writer",
  description: "전시회 및 박람회 참관 결과 보고서를 표준 6대 섹션으로 작성하고 실시간 A4 미리보기 및 고화질 PDF로 출력하는 비즈니스 리포트 시스템",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
