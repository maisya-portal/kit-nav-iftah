@echo off
chcp 65001 >nul
title Upload Kit-Naf ke GitHub

echo ========================================================
echo       🚀 PENGUNGGAH OTOMATIS KIT-NAF KE GITHUB
echo ========================================================
echo.

:: Cek apakah git terinstall
where git >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Git belum terpasang di komputer ini.
    echo Silakan unduh dan pasang Git dari: https://git-scm.com/
    echo.
    pause
    exit /b
)

:: Cek apakah repositori git sudah diinisialisasi
if not exist ".git" (
    echo [1/4] Menginisialisasi Git Repository...
    git init
    git branch -M main
) else (
    echo [1/4] Repositori Git sudah aktif.
)

echo [2/4] Menyimpan semua perubahan file...
git add .
git commit -m "Update Kit-Naf PWA & GitHub Pages (%date% %time%)"

:: Cek apakah remote origin sudah ada
git remote get-url origin >nul 2>nul
if %errorlevel% neq 0 (
    echo.
    echo --------------------------------------------------------
    echo Repositori GitHub belum terhubung!
    echo.
    echo 1. Buka https://github.com/new dan buat repositori baru.
    echo 2. Salin URL repositori Anda (contoh: https://github.com/username/kitnaf.git)
    echo --------------------------------------------------------
    set /p REPO_URL=">> Tempel/Ketik URL GitHub Anda di sini: "
    if not "%REPO_URL%"=="" (
        git remote add origin %REPO_URL%
        echo [OK] Remote GitHub berhasil ditambahkan.
    ) else (
        echo [BATAL] URL tidak dimasukkan.
        pause
        exit /b
    )
)

echo.
echo [3/4] Mengunggah (Push) ke GitHub...
git push -u origin main

if %errorlevel% equ 0 (
    echo.
    echo ========================================================
    echo  BERHASIL! Proyek Kit-Naf telah ter-upload ke GitHub.
    echo ========================================================
    echo.
    echo Langkah selanjutnya untuk mengaktifkan Website Online:
    echo 1. Buka Repositori Anda di GitHub.
    echo 2. Klik menu 'Settings' -> 'Pages'.
    echo 3. Pada 'Branch', pilih 'main' lalu klik 'Save'.
    echo 4. Tunggu 1 menit, website Anda sudah aktif secara online!
    echo.
) else (
    echo.
    echo [INFO] Terjadi kendala saat push. Pastikan Anda sudah login ke GitHub atau izin akses repositori sudah sesuai.
)

echo.
pause
