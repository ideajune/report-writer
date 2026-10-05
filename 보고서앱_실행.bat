@echo off
title 보고서 작성기 (Report Writer)
cd /d %~dp0
start http://localhost:3000
npm run dev
