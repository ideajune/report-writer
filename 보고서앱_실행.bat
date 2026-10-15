@echo off
title 전시회 참관 보고서 작성기 (Report Writer)
cd /d %~dp0
chcp 65001 > nul
echo ========================================================
echo   전시회 참관 결과 보고서 작성 시스템 (Version 06)
echo ========================================================
echo.
if not exist "node_modules\" (
    echo [1/2] 최초 실행: 필요한 라이브러리를 설치합니다... (약 30초 소요)
    call npm install
    echo 라이브러리 설치 완료!
    echo.
)
echo [2/2] 보고서 앱을 실행하고 웹 브라우저를 엽니다...
start http://localhost:3000
npm run dev