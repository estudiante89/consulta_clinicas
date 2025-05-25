@echo off
cd /d %~dp0
cd frontend
call npm install
call npx ng serve --open
pause
