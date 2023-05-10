@echo off
powershell -Command "npm i"
powershell -Command "npm i react react-dom react-icons react-responsive-carousel react-scroll-to-top react-spinners"
powershell -Command "npm i @types/react @types/react-dom @vitejs/plugin-react aos vite --save-dev"
start https://github.com/drypzz/drypzz.dev/
pause
exit /b