@echo off
title Buka Pengaturan Suara Windows - Kit-Naf
echo ========================================================
echo   Kit-Naf: Membuka Pengaturan Perekaman Suara Windows...
echo ========================================================
echo.
echo Langkah mudah mengaktifkan Stereo Mix (Campuran Stereo):
echo 1. Di jendela yang muncul (Tab Recording / Perekaman),
echo    KLIK KANAN pada area kosong di daftar perangkat.
echo 2. Pastikan centang "Show Disabled Devices" (Tampilkan Perangkat Dinonaktifkan).
echo 3. KLIK KANAN pada "Stereo Mix" (Campuran Stereo) -^> pilih "Enable" (Aktifkan).
echo 4. Klik OK.
echo 5. Buka Kit-Naf, klik tombol "Pindai", dan pilih "Stereo Mix"!
echo.
echo Membuka dialog pengaturan suara...
start control.exe mmsys.cpl,,recording
exit
