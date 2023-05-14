@echo off
if not "%1"=="am_admin" (
	powershell -Command "Start-Process -Verb RunAs -FilePath '%0' -ArgumentList 'am_admin'"
	exit /b
)
powershell -Command "npm i"
powershell -Command "npm i react react-dom react-icons react-responsive-carousel react-scroll-to-top react-spinners"
powershell -Command "npm i @types/react @types/react-dom @vitejs/plugin-react aos vite --save-dev"
pause