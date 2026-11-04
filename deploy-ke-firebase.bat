@echo off
title Deploy Kit-Naf ke Firebase

echo ========================================================
echo       DEPLOY OTOMATIS KIT-NAF KE FIREBASE
echo       (Hosting dan Realtime Database Rules)
echo ========================================================
echo.

:: 1. Cek Node.js
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Node.js belum terdeteksi di PATH komputer ini.
    echo Silakan buka Command Prompt atau pasang Node.js dari: https://nodejs.org/
    echo.
    pause
    exit /b
)

echo [1/4] Node.js dan NPM terdeteksi siap digunakan.
echo.

:: 2. Menu Pilihan
echo Pilih aksi yang ingin dijalankan:
echo [1] Deploy Lengkap (Hosting dan Database Rules) ke Firebase
echo [2] Login ke Akun Firebase (Google Login)
echo [3] Hubungkan Project ID Firebase (firebase use --add)
echo [4] Uji Coba Hosting di Komputer Lokal (firebase serve)
echo [5] Keluar
echo.
set /p PILIHAN="Masukkan nomor pilihan (1-5, default 1): "

if "%PILIHAN%"=="2" goto do_login
if "%PILIHAN%"=="3" goto do_use
if "%PILIHAN%"=="4" goto do_serve
if "%PILIHAN%"=="5" exit /b
goto do_deploy

:do_login
echo.
echo Menghubungkan akun Google ke Firebase CLI...
call npx --yes firebase-tools login --reauth
echo.
pause
exit /b

:do_use
echo.
echo Mengatur Project ID Firebase...
call npx --yes firebase-tools use --add
echo.
pause
exit /b

:do_serve
echo.
echo Menjalankan local preview server di http://localhost:5000 ...
call npx --yes firebase-tools serve --only hosting
pause
exit /b

:do_deploy
echo.
echo [2/4] Memeriksa status akses ke project iftah-dev...
call npx --yes firebase-tools projects:list >nul 2>nul
if %errorlevel% neq 0 (
    echo [PERHATIAN] Anda belum login ke Firebase CLI.
    echo Jendela browser akan terbuka untuk login dengan akun Google Anda...
    echo.
    call npx --yes firebase-tools login
)

echo.
echo [3/4] Memulai proses deploy ke Firebase Hosting...
call npx --yes firebase-tools deploy --only hosting

if %errorlevel% equ 0 (
    echo.
    echo ========================================================
    echo   SELAMAT! KIT-NAF BERHASIL DIPUBLIKASIKAN KE FIREBASE!
    echo ========================================================
    echo.
    echo Aplikasi Anda sekarang aktif secara online di:
    echo https://iftah-dev.web.app
    echo.
) else (
    echo.
    echo [!] Terjadi kendala saat deploy.
    echo Jika muncul error izin project, silakan jalankan menu [2] Login ke Akun Firebase
    echo untuk memastikan Anda login dengan akun Google yang memiliki project iftah-dev.
    echo.
)

pause
