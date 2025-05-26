@echo off
cd backend
echo Instalando dependencias del backend...
call npm install
echo Iniciando backend...
call npm run start
pause