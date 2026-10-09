# Walkthrough: Manajemen Jadwal Training & Sertifikasi Cerdas

Fitur manajemen *Training Event* dan *Automated Certification* telah berhasil diimplementasikan sepenuhnya dengan menggunakan arsitektur Vanilla JS SPA dan DOM Manipulation murni (berbasis `localStorage`), sesuai dengan instruksi Anda!

## 1. Halaman Trainer / Admin (Event & Kontrol)
Di sisi Trainer, kami telah menambahkan sidebar link **"Jadwal & Training"** yang akan membuka halaman khusus (`page-trainer-training`). Pada halaman ini Trainer dapat melakukan:
- **Buat Jadwal Training Baru**: Memasukkan Judul, Waktu, Metode, Link Materi PDF (untuk agen unduh), Kuota, dan Token 4 digit rahasia.
- **Kelola Kuis**: Menggunakan *dynamic form builder*, Trainer dapat menambahkan banyak baris soal (teks soal, opsi A-D, dan kunci jawaban). Tombol *Publish* dikunci ke **minimal 10 soal** sesuai request Anda.
- **Set Selesai**: Mengklik tombol ini memulai **1 Jam Masa Sanggah**.
- **Kustomisasi Sertifikat**: Menentukan Judul Sertifikat, Nama Trainer, dan Nama Perusahaan.

## 2. Halaman Agen (Absensi & Gatekeeper Kuis)
Di sisi Agen, tersedia sidebar link **"Jadwal Training"**. Saat agen membuka halaman ini, mereka dapat melihat *cards* berisi semua kelas training.
- **Absensi Cerdas**: Agen bisa klik "RSVP" atau "Absen via Token". Jika Trainer telah menekan "Set Selesai", absensi token akan dikunci 1 jam setelahnya.
- **Instant Unlock Material**: Segera setelah absen, tombol "Unduh Materi PDF" yang menuju ke link *dummy* (terbuka di tab baru) akan aktif.
- **Ujian Interaktif**: Menampilkan soal kuis menggunakan form Radio Button yang rapi. Terdapat indikator "Sisa Kesempatan: 2x".

## 3. Logika Kelulusan 70% & Auto-Generate Certificate
Setiap agen yang mengklik "Kirim Jawaban" akan langsung menerima perhitungan instan (`skor = (jawaban benar / total soal) * 100`).
- **Lulus (>= 70%)**: Tombol "Cetak Sertifikat" langsung aktif berwarna emas. Jika diklik, sistem akan me-render sertifikat estetik (menggunakan border emas dan typography sertifikat profesional) dengan nama agen dan nama trainer disuntikkan dinamis, siap di-print ke PDF (`window.print()`).
- **Gagal Percobaan ke-1**: Akan muncul notifikasi *alert* yang memberitahukan skor dan memperingatkan ini adalah kesempatan terakhir mereka. Teks tombol ujian berubah menjadi "Ulangi Kuis (Kesempatan Terakhir)".
- **Gagal Percobaan ke-2**: Tombol kuis dan sertifikat terkunci mati permanen. Notifikasi merah akan meminta mereka menunggu jadwal berikutnya.

> [!TIP]
> Anda dapat mencoba fitur ini dengan cara:
> 1. Login sebagai Trainer, buat event, atur kuis (minimal 10), dan simpan.
> 2. Login sebagai Agen, konfirmasi kehadiran, buka materi, dan selesaikan ujian kuisnya. Klik "Cetak Sertifikat" dan lihat hasilnya!
