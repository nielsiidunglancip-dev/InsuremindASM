# Fitur Manajemen Jadwal Training, Absensi Cerdas & Sertifikasi

- [x] **Sisi UI Trainer/Admin (`index.html`)**
  - [x] Tambah link sidebar "Jadwal Training" (Trainer).
  - [x] Buat `<section id="page-trainer-training">` dengan daftar training.
  - [x] Buat Modal Create Training (Form: Judul, Waktu, Metode, Link Materi, Kuota, Token).
  - [x] Buat Modal Quiz Builder (Dinamis `[+] Tambah Soal`).
  - [x] Buat Modal Certificate Builder.

- [x] **Sisi UI Agen (`index.html`)**
  - [x] Tambah link sidebar "Jadwal Training" (Agen).
  - [x] Buat `<section id="page-agen-training">` untuk kartu jadwal training.
  - [x] Buat Modal Input Token Kehadiran.
  - [x] Buat Modal Ujian Kuis (Soal dinamis radio button).
  - [x] Siapkan kontainer Sertifikat (bisa di modal khusus).

- [x] **Logika Backend / State SPA (`app.js`)**
  - [x] Inisialisasi struktur `localStorage` (`pa_trainings`, `pa_training_attendance`, `pa_training_quiz_attempts`).
  - [x] Fungsionalitas CRUD Event Training (Trainer).
  - [x] Fungsionalitas "Set Selesai Training" (mencatat `trainingEndTime`).
  - [x] Fungsionalitas Build & Publish Quiz (Trainer, min 10 soal).
  - [x] Fungsionalitas RSVP & Token Absensi Agen (Validasi 1 jam masa sanggah).
  - [x] Fungsionalitas "Unduh Materi" (Instant Unlock setelah absen).
  - [x] Fungsionalitas Ujian Kuis (Evaluasi >70%, maksimal 2 percobaan).
  - [x] Fungsi Auto-Generate Certificate & Print PDF.
