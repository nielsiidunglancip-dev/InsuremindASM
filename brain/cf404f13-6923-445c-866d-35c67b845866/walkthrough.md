# Walkthrough: Manajemen Logo & Artikel Beranda (CMS Admin)

Fitur manajemen logo dan artikel/berita beranda beserta fotonya telah berhasil dibangun dan diintegrasikan secara penuh ke dalam sistem APMA.

---

## 🚀 Ringkasan Pembaruan

### 1. Sistem Pengaturan Logo & Branding Website
- **Pengaturan Dinamis di Admin Dashboard (`admin_dashboard.html`)**:
  - Panel **"Pengaturan Logo & Identitas Website"**.
  - **Live Preview Logo**: Dapat dilihat dengan latar belakang terang (*light*) atau gelap (*dark*).
  - **Unggah Logo Baru**: Mendukung format file gambar (PNG, SVG, JPG, WebP) dengan pratinjau instan sebelum disimpan.
  - **Pengaturan Teks Banner Depan**: Judul situs, tagline, judul banner utama (*Hero heading*), dan sub-judul dapat diubah langsung oleh Admin.
- **Tampilan Otomatis di Landing Page (`index.html`)**:
  - Logo yang diunggah otomatis menggantikan logo default pada navigasi header dan footer.

### 2. CMS Manajemen Berita & Artikel Beranda (CRUD Lengkap)
- **Tabel Interaktif di Admin Dashboard**:
  - Menampilkan nomor urut, **thumbnail foto sampul**, judul artikel, slug, kategori, penulis, tanggal, dan status (*Published / Draft*).
  - Filter cepat berdasarkan status (*Published*, *Draft*) atau kategori (*Berita Asosiasi*, *Artikel*, *Pengumuman Resmi*), serta kotak pencarian teks *real-time*.
- **Modal Tambah Berita Baru**:
  - Input judul, kategori, status publikasi, nama redaksi/penulis, dan konten artikel lengkap.
  - **Unggah Foto Sampul (*Featured Image*)**: File upload langsung disimpan ke folder `/uploads/` dengan pratinjau gambar, atau menggunakan URL gambar kustom.
- **Modal Edit Berita & Foto**:
  - Menampilkan foto dan data saat ini.
  - Admin dapat mengganti foto sampul, memperbarui teks berita, mengubah status tayang, dan menyimpan perubahan secara instan.
- **Hapus Berita**:
  - Dilengkapi dialog konfirmasi untuk mencegah penghapusan yang tidak disengaja.

### 3. Tampilan Halaman Depan (`index.html`)
- **Kartu Artikel & Berita**:
  - Desain kartu yang modern, estetik, dan responsif.
  - Dilengkapi foto sampul berkualitas tinggi (*cover photo* dengan animasi *hover zoom*), badge kategori, tanggal tayang, ringkasan teks, dan tombol interaktif **"Baca Selengkapnya &rarr;"**.
- **Article Reader Modal (Popup Baca Lengkap)**:
  - Ketika pengunjung mengklik artikel, jendela popup (*modal reader*) terbuka menampilkan foto banner besar, kategori, tanggal rilis, nama penulis, dan seluruh isi artikel.

---

## 🛠️ Ringkasan Endpoint API Backend (`app.js`)

| Metode | URL Endpoint | Deskripsi |
| :--- | :--- | :--- |
| `GET` | `/api/settings` | Mengambil data konfigurasi logo & branding situs |
| `POST` | `/api/settings` | Mengunggah logo baru & memperbarui teks identitas website |
| `GET` | `/api/news` | Mengambil seluruh berita berstatus *Published* untuk halaman depan |
| `GET` | `/api/admin/news` | Mengambil seluruh berita (*Published* & *Draft*) untuk Admin |
| `GET` | `/api/news/:id` | Mengambil detail 1 artikel berdasarkan ID |
| `POST` | `/api/news` | Menambahkan artikel baru lengkap dengan unggahan foto sampul |
| `PUT` | `/api/news/:id` | Memperbarui artikel & mengganti foto sampul |
| `DELETE` | `/api/news/:id` | Menghapus artikel berita |

---

## 🧪 Panduan Pengujian & Simulasi

1. **Buka Admin Dashboard**:
   - Kunjungi [http://localhost:3000/admin_dashboard.html](http://localhost:3000/admin_dashboard.html).
   - Pada panel **"Pengaturan Logo & Identitas Website"**, coba pilih file logo baru dari komputer Anda dan klik **"Simpan Logo & Identitas Website"**.
   - Pada panel **"Manajemen Berita & Artikel Beranda (CMS)"**, klik tombol **"+ Tambah Artikel & Foto Baru"**, isi judul, pilih foto sampul, lalu klik **"Publikasikan Artikel"**.
   - Coba juga tombol **"Edit"** untuk mengganti foto atau judul berita, serta tombol **"Hapus"**.

2. **Buka Landing Page / Beranda**:
   - Kunjungi [http://localhost:3000/index.html](http://localhost:3000/index.html).
   - Perhatikan bahwa logo di header navbar telah terbarui sesuai yang diatur.
   - Gulir ke bagian **"Berita & Artikel"** untuk melihat kartu berita beserta foto sampul yang baru ditambahkan/diedit.
   - Klik **"Baca Selengkapnya &rarr;"** pada salah satu artikel untuk membaca artikel lengkap di jendela popup reader.
