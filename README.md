# Kit-Naf (Kitabah-Nafiah) 📖✨
**Aplikasi Catatan & Pembaca Kajian Ilmu Bermanfaat (Versi PWA & GitHub Pages Ready)**

Kit-Naf adalah aplikasi pencatatan materi dan kajian ilmiah berdesain antarmuka *glassmorphism* modern bernuansa Islami. Aplikasi ini dilengkapi dengan editor teks kaya (Quill), dukungan teks Arab (RTL), catatan mengambang (*sticky notes*), penyesuaian latar belakang, sistem penyimpanan otomatis lokal (*LocalStorage*), serta kemampuan **PWA (Progressive Web App)** dan **Offline** penuh.

---

## 🌟 Fitur Utama

- 📱 **PWA (Progressive Web App)**: Dapat dipasang langsung di HP Android, iPhone/iPad, dan Laptop/PC tanpa perlu download lewat Play Store / App Store.
- ⚡ **Offline First**: Menggunakan Service Worker (`sw.js`) untuk menyimpan cache aplikasi dan pustaka CDN, sehingga tetap dapat digunakan walau tanpa koneksi internet.
- 📂 **Struktur Folder Hierarkis**: Navigasi materi bergaya *Windows Explorer* dengan dukungan sub-materi multi-level tak terbatas.
- 📝 **Rich Text & Teks Arab**: Dilengkapi format font, ukuran, warna, bullet list, dan arah teks kanan-ke-kiri (*RTL*) untuk teks Arab.
- 💬 **Catatan Melayang (*Sticky Floating Notes*)**: Tambahkan penjelasan atau anotasi tersembunyi pada kata/kalimat tertentu dalam teks kajian.
- 🎨 **Tampilan Kustom**: Pengaturan efek kaca (*blur*), transparansi (*opacity*), warna tema, serta latar belakang Islami berkualitas tinggi.
- 💾 **Backup & Restore**: Simpan seluruh catatan ke dalam file `.json` dan pulihkan kembali kapan saja dengan mudah.
- 📚 **Starter Data Kajian**: Otomatis memuat kajian kitab *"Ikhlas Jalan Keselamatan"* saat pertama kali dibuka.

---

## 🚀 Panduan 1: Cara Upload ke GitHub & Aktifkan GitHub Pages (Online)

### Langkah 1: Buat Repositori Baru di GitHub
1. Buka [github.com](https://github.com) dan login ke akun GitHub Anda.
2. Klik tombol **New** (atau ikon **+** di kanan atas -> **New repository**).
3. Beri nama repositori, misalnya: `kitnaf` atau `KIT-NAF`.
4. Pilih **Public**.
5. **JANGAN** centang *"Add a README file"* (karena kita sudah menyiapkannya).
6. Klik **Create repository**.
7. Salin link repositori Anda, contoh: `https://github.com/USERNAME/kitnaf.git`.

---

### Langkah 2: Upload Project ke GitHub

Anda dapat menggunakan salah satu dari 2 cara mudah berikut:

#### Opsi A: Menggunakan Skrip Otomatis (Paling Mudah)
1. Buka folder proyek ini di Windows Explorer.
2. Dobel klik file **`upload-ke-github.bat`**.
3. Masukkan link URL repositori GitHub yang sudah Anda salin tadi saat diminta.
4. Tekan Enter dan tunggu hingga proses push selesai!

#### Opsi B: Menggunakan Terminal / Command Prompt
Buka Terminal / PowerShell di folder ini lalu jalankan perintah berikut:
```bash
git init
git add .
git commit -m "Initial commit Kit-Naf PWA"
git branch -M main
git remote add origin https://github.com/USERNAME/kitnaf.git
git push -u origin main
```
*(Ganti `USERNAME/kitnaf` dengan username dan nama repositori Anda)*

---

### Langkah 3: Mengaktifkan GitHub Pages (Gratis)

Setelah kode ter-upload ke GitHub:
1. Masuk ke halaman repositori Anda di GitHub.
2. Klik tab **Settings** (di menu atas repositori).
3. Di panel sebelah kiri, klik menu **Pages** (di bawah bagian *Code and automation*).
4. Pada bagian **Build and deployment**:
   - **Source**: Pilih `Deploy from a branch`.
   - **Branch**: Pilih `main` dan folder `/(root)`.
   - Klik **Save**.
5. Tunggu sekitar 1–2 menit, refresh halaman. GitHub akan memberikan link website online Anda, misalnya:
   ```
   https://USERNAME.github.io/kitnaf/
   ```
6. Buka link tersebut di browser HP atau Komputer Anda! 🎉

---

## 📲 Panduan 2: Cara Memasang Aplikasi (Install PWA)

Setelah website Kit-Naf dibuka di browser:

### 📱 Pada HP Android (Google Chrome):
1. Buka link GitHub Pages Anda di Google Chrome.
2. Klik tombol **"Pasang Aplikasi"** yang muncul di bagian atas, ATAU:
3. Klik ikon **titik tiga (⋮)** di pojok kanan atas browser.
4. Pilih **"Tambahkan ke Layar Utama"** atau **"Pasang Aplikasi"** (*Install App*).
5. Ikon Kit-Naf akan muncul di menu aplikasi HP Anda seperti aplikasi bawaan.

### 🍎 Pada iPhone / iPad (Safari):
1. Buka link GitHub Pages Anda di browser **Safari**.
2. Klik tombol **Bagikan (Share)** (ikon kotak dengan panah ke atas di bagian bawah).
3. Gulir ke bawah lalu pilih **"Tambah ke Layar Utama"** (*Add to Home Screen*).
4. Klik **Tambah** (*Add*) di pojok kanan atas.

### 💻 Pada Komputer / Laptop (Google Chrome / Microsoft Edge):
1. Buka link website Anda di Chrome atau Edge.
2. Klik tombol **"Pasang Aplikasi"** pada bilah menu Kit-Naf, ATAU klik ikon pasang (gambar layar monitor kecil dengan panah) di ujung kanan kolom alamat URL browser.
3. Klik **Install**.

---

## 📂 Struktur Berkas Proyek

```
KIT-NAF/
├── index.html                    # File utama aplikasi web & PWA
├── Kit-Naf.html                  # File master original
├── KitNaf-Backup-2026-08-02.json # Data starter kajian kitab
├── manifest.json                 # Konfigurasi PWA Manifest
├── sw.js                         # Service Worker untuk caching & offline
├── icons/                        # Kumpulan ikon aplikasi berbagai resolusi
│   ├── icon-192.png
│   ├── icon-512.png
│   ├── icon-maskable-192.png
│   ├── icon-maskable-512.png
│   ├── apple-touch-icon.png
│   ├── favicon.svg
│   └── favicon.png
├── favicon.ico                   # Favicon browser standar
├── .nojekyll                     # Mencegah Jekyll bypass pada GitHub Pages
├── .gitignore                    # File yang diabaikan oleh Git
├── upload-ke-github.bat          # Skrip helper otomatis untuk upload ke GitHub
└── README.md                     # Dokumentasi panduan ini
```

---

## 💡 Tips Penggunaan

1. **Penyimpanan Lokal**: Seluruh catatan tersimpan otomatis secara instan di browser/perangkat Anda saat mengetik (*Auto Save*).
2. **Cadangkan Rutin**: Gunakan tombol **"Backup Data"** di menu Pengaturan (*ikon Slider*) untuk mengunduh file `.json` sebagai salinan cadangan.
3. **Pindah Perangkat**: Untuk memindahkan catatan ke perangkat lain, unduh backup dari perangkat lama dan gunakan tombol **"Restore Data"** di perangkat baru.

---

*Dibuat untuk memudahkan penulisan dan penyebaran ilmu yang bermanfaat.*
