# Rencana Implementasi: Manajemen Logo & Artikel Beranda (CMS Admin)

Pengguna ingin dapat mengganti logo situs serta mengelola artikel/berita beranda beserta fotonya langsung dari halaman Admin Dashboard.

## Ringkasan Fitur yang Akan Dibangun
1. **Sistem Pengaturan Branding & Logo Situs**:
   - Kemampuan bagi admin untuk mengunggah logo baru (format PNG/JPG/SVG/WebP) atau mengganti nama situs.
   - Logo otomatis tampil di navigasi/header dan footer di `index.html` dan seluruh halaman terkait.
2. **CMS Manajemen Berita & Artikel Beranda**:
   - Admin dapat menambah artikel baru lengkap dengan judul, kategori, konten, dan unggah foto sampul (*featured image*).
   - Admin dapat mengedit artikel yang sudah ada (mengubah judul, isi, kategori, status publikasi, dan mengganti foto).
   - Admin dapat menghapus artikel.
   - Tabel/daftar artikel interaktif di Admin Dashboard dengan status dan thumbnail foto.
3. **Penyempurnaan Halaman Depan (`index.html`)**:
   - Menampilkan logo kustom dari pengaturan branding.
   - Menampilkan kartu berita dinamis lengkap dengan foto sampul berkualitas tinggi, kategori badge, tanggal, dan popup baca artikel lengkap (*modal reader*).
4. **Backend API & Database**:
   - Endpoint Pengaturan: `GET /api/settings`, `POST /api/settings` (dengan upload file logo).
   - Endpoint Berita: `GET /api/news`, `GET /api/admin/news`, `POST /api/news` (dengan upload `featured_image`), `PUT /api/news/:id` (dengan upload foto baru), `DELETE /api/news/:id`.
   - Penyimpanan database MySQL (tabel `site_settings` & `cms_news`) + in-memory fallback agar tetap berjalan mulus.

---

## Proposed Changes

### Database Schema
#### [MODIFY] [schema.sql](file:///d:/AI/APMA_WEB/schema.sql)
- Tambahkan definisi tabel `site_settings` jika belum ada.
- Pastikan tabel `cms_news` memiliki kolom `featured_image`, `category`, `author_name`, `status`, dan timestamps.

---

### Backend API
#### [MODIFY] [app.js](file:///d:/AI/APMA_WEB/app.js)
- Tambahkan route API untuk Manajemen Pengaturan / Logo:
  - `GET /api/settings`
  - `POST /api/settings` (Upload logo & perbarui metadata situs)
- Perbarui & lengkapi route API Berita & Artikel:
  - `GET /api/news` (daftar artikel dipublikasikan untuk halaman depan)
  - `GET /api/admin/news` (semua artikel untuk admin)
  - `POST /api/news` (upload artikel baru dengan gambar via Multer)
  - `PUT /api/news/:id` (update artikel & ganti gambar via Multer)
  - `DELETE /api/news/:id` (hapus artikel)
- Siapkan auto-create tabel `site_settings` saat inisialisasi dan in-memory fallback yang sinkron.

---

### Admin Dashboard UI
#### [MODIFY] [admin_dashboard.html](file:///d:/AI/APMA_WEB/admin_dashboard.html)
- Tambahkan Panel **"Manajemen Logo & Identitas Website"**:
  - Tampilan pratinjau (*live preview*) logo saat ini.
  - Input file upload logo baru dengan preview instan dan tombol simpan.
- Tambahkan Panel & Tabel **"Manajemen Berita & Artikel Beranda"**:
  - Daftar semua artikel dengan thumbnail foto, judul, kategori, tanggal, status.
  - Modal Tambah Berita Baru (dengan upload foto sampul).
  - Modal Edit Berita (dengan opsi ganti foto, ubah teks & status).
  - Tombol Hapus Berita dengan dialog konfirmasi.

---

### Website Utama / Landing Page
#### [MODIFY] [index.html](file:///d:/AI/APMA_WEB/index.html)
- Muat logo dinamis dari `/api/settings` ke elemen navbar `.nav-logo` & footer.
- Perbarui render kartu berita pada `#news-container`:
  - Tampilkan thumbnail foto artikel `featured_image`.
  - Desain kartu berita yang modern, responsif, dan rapi.
  - Modal baca artikel lengkap ketika pengunjung mengklik "Baca Selengkapnya".

---

## Verification Plan

### Automated / API Verification
1. Cek endpoint `GET /api/settings` menghasilkan data logo default / terkonfigurasi.
2. Cek endpoint `POST /api/news` dengan upload gambar multipart berhasil menyimpan file ke `/uploads` dan mengembalikan respons sukses.
3. Cek endpoint `PUT /api/news/:id` berhasil mengubah konten dan gambar.
4. Cek endpoint `DELETE /api/news/:id` berhasil menghapus data.

### Manual Verification
1. Buka Admin Dashboard di browser (`http://localhost:3000/admin_dashboard.html`).
2. Uji upload logo baru -> periksa apakah logo berubah seketika di Admin dan Beranda.
3. Uji tambah artikel baru dengan foto -> periksa apakah muncul di tabel admin dan di beranda `index.html`.
4. Uji edit artikel dan ubah fotonya -> periksa hasil pembaruan.
5. Buka Landing Page (`http://localhost:3000/index.html`) untuk memverifikasi tampilan logo baru, kartu artikel dengan foto, dan popup baca artikel.
