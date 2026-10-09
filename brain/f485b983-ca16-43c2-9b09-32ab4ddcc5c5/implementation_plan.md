# Rencana Implementasi: Pembaruan UI Card Live Training & Fitur Flyer Lightbox

Dokumen ini berisi rencana teknis untuk menambahkan visual flyer interaktif pada kartu jadwal training di halaman Live Training serta mengimplementasikan pop-up modal Lightbox untuk memperbesar gambar flyer.

## Perubahan yang Diusulkan

### 1. File CSS: [asm-style.css](file:///d:/AI/Antigravity/asm-style.css)
* **Pembaruan Kelas Kartu**: Mengubah padding `.training-compact-card` menjadi `0 !important` dan menambahkan `overflow: hidden !important` agar gambar flyer dapat ditampilkan secara flush/penuh hingga batas sudut kartu.
* **Gaya Visual Flyer**: Menambahkan kelas `.training-flyer-wrapper` (height: 140px, width: 100%, relative position, hidden overflow) dan efek transisi hover zoom 1.05 pada gambar di dalamnya.
* **Badge Metode Mengambang**: Membuat kelas `.training-method-badge` dengan desain semi-transparan (*glassmorphism*) yang diletakkan secara melayang (*absolute*) di pojok kanan atas flyer.
* **Pop-up Lightbox**: Menambahkan gaya khusus untuk modal pop-up full-screen `.lightbox-content`, `.lightbox-close` (tombol silang melingkar transparan) dan `.lightbox-content img` dengan rasio aspek terjaga (*contain*).

### 2. File HTML: [index.html](file:///d:/AI/Antigravity/index.html)
* **Deklarasi Modal Lightbox**: Menambahkan elemen struktur pop-up modal Lightbox `<div id="flyer-lightbox" class="modal-overlay">` tepat sebelum script dimuat di akhir tag `<body>`.

### 3. File JS: [app.js](file:///d:/AI/Antigravity/app.js)
* **Fungsi Helper Gambar**: Membuat fungsi `getFlyerUrl(title)` yang mengembalikan URL gambar dari Unsplash berdasarkan kata kunci pada judul training (seperti Marine Cargo, Travel, Growing Trees, Heavy Equipment, PAYDI, dll.) dengan fallback ke gambar default training yang estetik.
* **Logika Render Kartu**: Mengubah template string HTML di dalam `window.renderJadwalTrainingUntukAgen` untuk memindahkan badge metode ke flyer wrapper baru di bagian atas dan membungkus sisa konten kartu dengan padding 16px.
* **Fungsi Interaksi Lightbox**: Mendefinisikan fungsi `window.openFlyerLightbox(imageSrc)` dan `window.closeFlyerLightbox()` agar modal pop-up dapat muncul dan ditutup dengan responsif.

---

## Rencana Verifikasi

### Verifikasi Manual
1. **Verifikasi UI Kartu**:
   * Masuk ke halaman **Live Training** sebagai Agen.
   * Pastikan setiap kartu memiliki gambar flyer yang relevan di bagian paling atas.
   * Pastikan badge metode (seperti *Zoom* atau *Tatap Muka*) muncul secara melayang (*floating*) di pojok kanan atas gambar flyer dengan efek glassmorphism.
   * Arahkan kursor (*hover*) pada kartu dan pastikan gambar flyer ber-zoom secara halus sebesar 5%.
   * Pastikan sisa elemen kartu (Judul, Tanggal, Kuota, dan Tombol aksi) memiliki padding dan spasi 16px yang rapi di bawah gambar.
2. **Uji Fitur Lightbox**:
   * Klik gambar flyer pada kartu mana saja.
   * Pastikan modal pop-up tampil di tengah layar menutupi seluruh halaman dengan gambar flyer ukuran penuh.
   * Pastikan tombol silang (X) di pojok modal dapat diklik untuk menutup kembali modal.
   * Pastikan klik pada area gelap di luar gambar juga menutup modal.
