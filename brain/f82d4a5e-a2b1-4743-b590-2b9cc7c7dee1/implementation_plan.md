# Implementation Plan - Rombak Dashboard untuk Fokus LMS

Rencana ini merombak tata letak halaman **Dashboard** di `index.html` agar berfokus 100% pada fungsi **Learning Management System (LMS)**, menyembunyikan metrik penjualan (sales), dan menaikkan kartu statistik belajar ke atas.

---

## User Review Required

> [!IMPORTANT]
> - **Penyembunyian Elemen Sales**: Elemen-elemen seperti *Grafik Tren Produksi & Komisi*, *Target Kontes Wisata*, *Detail Pencapaian Kontes*, dan *Kokpit Pencapaian Agen* akan disembunyikan menggunakan komentar HTML (`<!-- -->`).
> - **Penataan Ulang Grid CSS**:
>   - Baris Atas: Banner selamat datang & *Progress Karir Agen*.
>   - Baris Kedua: Deretan 4 kartu statistik belajar (Progres Belajar, Materi Selesai, Skor Kuis, Sertifikasi LSP) dinaikkan dan disusun mendatar penuh 4 kolom (`repeat(4, 1fr)`).
>   - Baris Ketiga: Layout 2 kolom (70% : 30%) yang membagi *Hub & Informasi Terbaru (Feed)* di sebelah kiri (70%) dan *Misi Harian Anda* + *Fitur Pendamping Cepat* bertumpuk vertikal di sebelah kanan (30%).
> - **Keamanan JavaScript**: Kami akan menambahkan guard clause di `app.js` pada fungsi `updateManifestData` dan `updateAircraftPosition` agar tidak mengalami error null-reference saat elemen grafik/kontes asuransi disembunyikan.

---

## Proposed Changes

### 1. Struktur Layout Dashboard (HTML)

#### [MODIFY] [index.html](file:///d:/AI/Antigravity/index.html)
- Menyembunyikan card `Grafik Tren Produksi & Komisi`, `Target Kontes Wisata`, `Detail Pencapaian Kontes`, dan kontainer `gamification-cockpit-container` menggunakan komentar HTML.
- Menyusun ulang tata letak halaman `page-dashboard` menjadi struktur baris-demi-baris yang bersih dan responsif:
  - Baris 1: Hero (`welcome-box`) dan `level-up-progress-card`.
  - Baris 2: `.stats-container` (4 kartu belajar) dengan inline style `display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 24px;`.
  - Baris 3: Container grid 2 kolom (`grid-template-columns: 7fr 3fr; gap: 24px;`) berisi:
    - Kolom Kiri (70%): `hub-container` (Feed sosial).
    - Kolom Kanan (30%): `dash-missions-list` card & `Fitur Pendamping Cepat` card disusun vertikal (`display: flex; flex-direction: column; gap: 20px;`).

### 2. Penyesuaian Skrip (JavaScript)

#### [MODIFY] [app.js](file:///d:/AI/Antigravity/app.js)
- Menambahkan check guard di awal `window.updateManifestData` dan `window.updateAircraftPosition` untuk mencegah runtime crash saat elemen kontes penjualan tidak ditemukan di DOM.

---

## Verification Plan

### Manual Verification
1. Login sebagai **Agen (Rian)** di browser.
2. Tinjau halaman **Dashboard** utama:
   - Pastikan metrik grafik komisi, kontes wisata, detail manifes, dan animasi pesawat di radar tidak terlihat lagi.
   - Pastikan 4 kartu statistik belajar (Progres Belajar, Materi Selesai, Skor Kuis, Sertifikasi LSP) berada tepat di bawah progress karir agen dan melebar horizontal dalam 4 kolom sejajar.
   - Pastikan Feed sosial (`Hub & Informasi Terbaru`) memenuhi 70% lebar kiri layar dengan rapi.
   - Pastikan Misi Harian & Fitur Pendamping Cepat berada bertumpuk di sebelah kanan (30% lebar layar).
3. Buka F12 Console di browser dan pastikan **tidak ada error JavaScript** yang muncul pada halaman dashboard maupun saat berpindah halaman.
