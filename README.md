# Kit-Naf (Kitabah-Nafiah) 📖✨
**Aplikasi Catatan & Pembaca Kajian Ilmu Bermanfaat (Firebase Ready & PWA)**

Kit-Naf adalah aplikasi pencatatan materi dan kajian ilmiah berdesain antarmuka *glassmorphism* modern bernuansa Islami. Aplikasi ini dilengkapi dengan editor teks kaya (Quill), dukungan teks Arab (RTL), catatan mengambang (*sticky notes*), penyesuaian latar belakang, sistem penyimpanan otomatis lokal (*LocalStorage*), sinkronisasi awan real-time (**Firebase Realtime Database** & **Google Spreadsheet**), serta kemampuan **PWA (Progressive Web App)** dan **Offline** penuh.

---

## 🌟 Fitur Utama

- 🔥 **Firebase Realtime Database**: Sinkronisasi data super cepat (< 100ms) secara real-time antar perangkat (Laptop, HP, Tablet) via WebSocket tanpa perlu reload.
- 🚀 **Firebase Hosting Ready**: Dukungan penuh hosting cepat di infrastruktur Google CDN dengan SSL gratis dan domain `*.web.app` / `*.firebaseapp.com`.
- 📱 **PWA (Progressive Web App)**: Dapat dipasang langsung di HP Android, iPhone/iPad, dan Laptop/PC tanpa perlu Play Store / App Store.
- ⚡ **Offline First**: Menggunakan Service Worker (`sw.js`) untuk menyimpan cache aplikasi dan pustaka CDN, sehingga tetap dapat digunakan walau tanpa koneksi internet.
- 📂 **Struktur Folder Hierarkis**: Navigasi materi bergaya *Windows Explorer* dengan dukungan sub-materi multi-level tak terbatas.
- 📝 **Rich Text & Teks Arab**: Dilengkapi format font, ukuran, warna, bullet list, dan arah teks kanan-ke-kiri (*RTL*) untuk teks Arab.
- 💬 **Catatan Melayang (*Sticky Floating Notes*)**: Tambahkan penjelasan atau anotasi tersembunyi pada kata/kalimat tertentu dalam teks kajian.
- 🎨 **Tampilan Kustom**: Pengaturan efek kaca (*blur*), transparansi (*opacity*), warna tema, serta latar belakang Islami berkualitas tinggi.
- 💾 **Multi-Cloud Backup**: Dukungan Firebase Realtime Database, Google Spreadsheet, serta backup/restore file `.json` lokal.

---

## 🔥 PANDUAN MIGRASI KE FIREBASE (HOSTING & DATABASE)

Ikuti 5 langkah mudah berikut untuk memindahkan hosting dan database Kit-Naf ke Firebase:

### Langkah 1: Buat Proyek di Firebase Console
1. Buka [console.firebase.google.com](https://console.firebase.google.com/) dan login dengan akun Google Anda.
2. Klik tombol **"Add project"** (Tambah proyek).
3. Beri nama proyek Anda, misalnya: `kitnaf-iftah` atau `kitnaf-app`.
4. Klik **Continue**, lalu matikan Google Analytics (atau biarkan aktif jika ingin), dan klik **Create project**.
5. Tunggu beberapa detik hingga proyek selesai dibuat, lalu klik **Continue**.

---

### Langkah 2: Aktifkan Firebase Realtime Database
1. Di panel menu sebelah kiri Firebase Console, klik **Build** > **Realtime Database**.
2. Klik tombol **"Create Database"**.
3. Pilih lokasi server database terdekat (misalnya: `Singapore (asia-southeast1)` atau default `United States`).
4. Pada jendela **Security rules**, pilih **"Start in test mode"** (read: true, write: true), lalu klik **Enable**.
5. Database Realtime Anda sekarang telah aktif! Salin URL database Anda, contoh:
   ```
   https://kitnaf-app-default-rtdb.asia-southeast1.firebasedatabase.app
   ```

> **Aturan Keamanan (Security Rules):**
> Anda juga dapat menempelkan aturan berikut di tab **Rules** pada Realtime Database Console:
> ```json
> {
>   "rules": {
>     ".read": true,
>     ".write": true
>   }
> }
> ```

---

### Langkah 3: Daftarkan Web App & Ambil Konfigurasi
1. Kembali ke **Project Overview** (klik ikon rumah di kiri atas).
2. Di bagian tengah, klik ikon **Web (`</>`)** untuk menambahkan aplikasi web.
3. Beri nama aplikasi, misalnya: `Kit-Naf Web`.
4. Centang kotak **"Also set up Firebase Hosting for this app"**.
5. Klik **Register app**.
6. Firebase akan menampilkan kode konfigurasi `firebaseConfig`:
   ```javascript
   const firebaseConfig = {
     apiKey: "AIzaSy...",
     authDomain: "kitnaf-app.firebaseapp.com",
     databaseURL: "https://kitnaf-app-default-rtdb.asia-southeast1.firebasedatabase.app",
     projectId: "kitnaf-app",
     storageBucket: "kitnaf-app.appspot.com",
     messagingSenderId: "1234567890",
     appId: "1:1234567890:web:abcdef..."
   };
   ```
7. Buka file **`firebase-config.js`** di folder proyek ini, lalu tempelkan nilai-nilai tersebut ke dalam objek `window.FIREBASE_CONFIG`.
   *(Atau Anda bisa langsung menempelkannya di menu **Pengaturan Kit-Naf > DATABASE FIREBASE** di dalam aplikasi web).*

---

### Langkah 4: Migrasi / Unggah Data Catatan ke Firebase
Anda memiliki 2 cara mudah untuk memasukkan data materi Anda ke Firebase:

#### Cara A: Langsung dari Aplikasi Web Kit-Naf (Paling Praktis)
1. Buka `index.html` di browser Anda.
2. Buka menu **Pengaturan** (ikon gerigi di bilah navigasi).
3. Pada bagian **DATABASE FIREBASE REALTIME**, klik tombol **"Tes"** untuk memastikan koneksi sukses.
4. Klik tombol **"Unggah ke Firebase"**. Seluruh data materi Anda langsung tersimpan rapi di cloud Firebase!

#### Cara B: Import File Backup di Firebase Console
1. Buka Firebase Console > **Realtime Database** > tab **Data**.
2. Klik ikon **titik tiga vertikal (⋮)** di kanan atas panel database.
3. Pilih **"Import JSON"**.
4. Pilih file **`KitNaf-Backup-Latest.json`** yang ada di folder proyek ini.
5. Klik **Import**. Selesai!

---

### Langkah 5: Deploy ke Firebase Hosting (Publikasikan Online)

Anda cukup menggunakan file batch otomatis yang telah kami siapkan:

1. Dobel klik file **`deploy-ke-firebase.bat`** di folder proyek ini.
2. Skrip akan otomatis:
   - Memeriksa instalasi Node.js dan npm.
   - Meminta login ke akun Google Firebase Anda (hanya saat pertama kali).
   - Menghubungkan Project ID Firebase Anda.
   - Mempublikasikan seluruh file aplikasi ke Firebase Hosting dan mengunggah aturan database.
3. Setelah proses selesai, Firebase akan memberikan URL website Anda yang aktif secara online, misalnya:
   ```
   https://kitnaf-app.web.app
   ```
4. Buka URL tersebut di HP, tablet, maupun laptop Anda. Semua perubahan yang Anda ketik di satu perangkat akan langsung tersinkron secara real-time ke semua perangkat lain! 🎉

---

## 💻 Manual CLI Deploy (Alternatif)
Jika Anda lebih suka menggunakan Terminal / PowerShell secara manual:
```bash
# 1. Login ke Firebase
npx firebase-tools login

# 2. Hubungkan ke Project Anda
npx firebase-tools use --add

# 3. Deploy Hosting & Database Rules
npx firebase-tools deploy
```

---

## 📲 Cara Memasang Aplikasi (Install PWA)

### 📱 Pada HP Android (Google Chrome):
1. Buka URL Firebase Hosting Anda (`https://nama-project.web.app`) di Google Chrome.
2. Klik tombol **"Pasang Aplikasi"** yang muncul di bagian atas, atau pilih ikon titik tiga (⋮) > **"Tambahkan ke Layar Utama"** / **"Pasang Aplikasi"**.

### 🍎 Pada iPhone / iPad (Safari):
1. Buka URL Firebase Hosting Anda di browser **Safari**.
2. Klik tombol **Bagikan (Share)** (ikon kotak panah ke atas) > pilih **"Tambah ke Layar Utama"** (*Add to Home Screen*).

### 💻 Pada Komputer / Laptop (Google Chrome / Microsoft Edge):
1. Buka URL di Chrome atau Edge.
2. Klik ikon pasang aplikasi di sebelah kanan bilah alamat (URL bar) > klik **Install**.

---

## 📂 Struktur Berkas Proyek

```
KIT-NAF/
├── index.html                    # File utama aplikasi web & PWA (Firebase Integrated)
├── Kit-Naf.html                  # File master original
├── firebase-config.js            # Konfigurasi kredensial Firebase Web SDK
├── firebase.json                 # Konfigurasi deployment Firebase Hosting & Database
├── database.rules.json           # Aturan keamanan Firebase Realtime Database
├── .firebaserc                   # Mapping Project ID Firebase
├── deploy-ke-firebase.bat        # Skrip otomatis 1-klik deploy ke Firebase
├── upload-ke-github.bat          # Skrip helper otomatis untuk upload ke GitHub
├── KitNaf-Backup-Latest.json     # Data materi kajian terbaru untuk restore / import
├── manifest.json                 # Konfigurasi PWA Manifest
├── sw.js                         # Service Worker untuk caching & offline PWA
├── icons/                        # Kumpulan ikon aplikasi berbagai resolusi
│   ├── icon-192.png
│   ├── icon-512.png
│   ├── icon-maskable-192.png
│   ├── icon-maskable-512.png
│   ├── apple-touch-icon.png
│   └── favicon.png
├── favicon.ico                   # Favicon browser standar
└── README.md                     # Dokumentasi panduan lengkap
```

---

*Dibuat untuk memudahkan penulisan, penyimpanan, dan penyebaran ilmu yang bermanfaat.*
