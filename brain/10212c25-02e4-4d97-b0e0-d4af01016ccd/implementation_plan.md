# Rencana Implementasi: Pembaruan Fitur Persiapan Uji Kompetensi LSP

Pembaruan ini bertujuan untuk melengkapi halaman "Persiapan Sertifikasi Uji Kompetensi LSP" agar interaktif dan sesuai dengan permintaan.

## Open Questions
- Apakah ada URL video pembelajaran spesifik (misalnya link YouTube) yang ingin disematkan untuk masing-masing skema (Level 3, Level 4 Bonding, Level 4 PAYDI)? Untuk sementara, saya akan menggunakan video placeholder/dummy.
- Untuk materi belajar (PDF/Teks), apakah Anda ingin materi tersebut bisa diunduh langsung atau dibaca di dalam aplikasi?

## Proposed Changes

### Komponen: UI & HTML (`index.html`)

Akan dilakukan beberapa modifikasi pada file `index.html`:
- Menambahkan tombol **"Daftar Ikut Uji Kompetensi"** di bagian aksi (`lsp-actions-panel`).
- Menambahkan **Materi Pembelajaran** (link dokumen/modul persiapan) di bawah daftar Unit Kompetensi.
- Menambahkan bagian "Pendaftaran Uji Kompetensi" di halaman Dashboard Trainer dan Admin agar mereka bisa melihat siapa saja yang mendaftar ujian.

#### [MODIFY] index.html
1. Menambahkan tombol pendaftaran pada card aksi sertifikasi.
2. Menambahkan wadah/link materi di dalam card silabus.
3. Menambahkan menu/tabel khusus pendaftaran uji kompetensi di `<section id="page-trainer-dashboard">` dan `<section id="page-admin-dashboard">`.

### Komponen: Logika JavaScript (`app.js`)

Akan ditambahkan fungsi-fungsi baru untuk menangani perubahan skema dan pendaftaran.

#### [MODIFY] app.js
1. **Fungsi `selectQualification(level)`**:
   - Memperbarui judul (`lsp-qualification-title`) dan deskripsi.
   - Merender daftar unit kompetensi spesifik (SKKNI) berdasarkan level yang dipilih (Level 3, Level 4 - Bonding, Level 4 - PAYDI).
   - Memperbarui tautan video YouTube di `iframe#lsp-video-frame`.
   - Memperbarui link materi PDF/belajar.
2. **Logika Pengecekan Sertifikasi**:
   - Saat halaman dirender, akan mengecek profil user (misal `currentUser.sertifikasiStatus === 'AKTIF'`).
   - Jika aktif, tombol "Daftar Ikut Uji Kompetensi" akan di-disable dan diberi label (Misal: "Sertifikasi Anda Masih Aktif").
3. **Fungsi `daftarUjiKompetensi()`**:
   - Menambahkan data user yang mendaftar ke list mock database (`data.js` atau state app).
   - Memunculkan notifikasi sukses.

### Komponen: Mock Data (`data.js`)

#### [MODIFY] data.js
1. Menambahkan struktur data dummy untuk menyimpan pendaftaran Uji Kompetensi (`ujiKompetensiRegistrations = []`).

## Verification Plan

### Manual Verification
- Masuk sebagai Agen (Level 1 atau belum tersertifikasi aktif) -> Buka menu Persiapan Uji Kompetensi.
- Pilih Level 3: Pastikan silabus Level 3, video, dan materi muncul.
- Pilih Level 4 PAYDI: Pastikan silabus berubah ke PAYDI.
- Klik "Daftar Ikut Uji Kompetensi" -> Notifikasi sukses pendaftaran.
- Ubah status agen menjadi `Sertifikasi: AKTIF` (dari profil atau data dummy) -> Buka lagi menu tersebut -> Pastikan tombol pendaftaran tidak bisa diklik.
- Masuk sebagai Trainer / Admin -> Pastikan ada daftar agen yang baru saja mendaftar Uji Kompetensi.
