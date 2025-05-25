@echo off
cd /d %~dp0
cd backend
call npm install
call npm run start:dev
pause
