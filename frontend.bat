@echo off
cd frontend
echo Instalando dependencias del frontend...
call npm install
echo Iniciando frontend...
call ng serve --open
pause