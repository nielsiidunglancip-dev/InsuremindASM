# Manajemen Jadwal Training, Absensi Cerdas & Sertifikasi

Fitur ini akan menambahkan fungsionalitas manajemen event/training secara end-to-end mulai dari Trainer hingga Agen.

> [!WARNING]
> **Klarifikasi Arsitektur**: Pada prompt, Anda menyebutkan "arsitektur komponen React SPA". Namun, keseluruhan *codebase* aplikasi ini saat ini dibangun menggunakan **Vanilla JS** (DOM Manipulation murni via `app.js` dan `index.html`) dan bukan menggunakan React. 
> Untuk menjaga konsistensi dan mencegah kerusakan aplikasi, **seluruh implementasi akan dibangun menggunakan arsitektur Vanilla JS SPA yang sudah ada** (menggunakan render dinamis ke DOM dan tersinkronisasi di `localStorage`). Mohon konfirmasi apakah pendekatan ini disetujui.

## User Review Required

- Desain UI untuk Manajemen Training di Trainer Panel: Apakah akan digabung di dalam halaman Dashboard Trainer yang sudah ada, atau dibuatkan tab/menu khusus "Jadwal & Training"?
- Template Sertifikat: Secara bawaan, aplikasi sudah memiliki sistem sertifikat LSP. Sertifikat dari event training ini akan menjadi sertifikat terpisah berbasis PDF/Print layout. Apakah desainnya cukup mengikuti gaya sertifikat LSP yang sudah ada namun dengan kustomisasi judul dan Tanda Tangan Trainer?

## Open Questions

1. **Unduh Materi PDF**: Apakah file materi PDF yang dapat diunduh akan diunggah oleh Trainer (misal: simulasi file statis/base64), atau merujuk pada materi yang sudah ada di LMS?
2. **Kuis**: Jika agen gagal 2x, peringatan mengatakan "wajib mendaftar ulang kelas training". Apakah sistem perlu mengizinkan mereka mendaftar ulang di event training masa depan dengan judul yang sama, atau cukup hanya berupa teks peringatan *dead-end* di event tersebut?

## Proposed Changes

### 1. Struktur State Baru (`localStorage`)
Akan ada penambahan struktur data berikut pada `appState` dan `localStorage`:
- `pa_trainings`: Array objek berisi jadwal training (Judul, Waktu, Metode, Link, Kuota, Token 4-digit, Waktu Selesai/`endTime`, Struktur Kuis, Template Sertifikat).
- `pa_training_attendance`: Menyimpan status kehadiran agen (RSVP, Susulan/Hadir, Waktu Hadir) berdasarkan ID Training dan Email.
- `pa_training_quiz_attempts`: Melacak percobaan kuis per agen per training (skor, status lulus, jumlah percobaan).

---

### 2. Sisi Trainer / Admin Panel
#### [MODIFY] `index.html`
- **Menu Navigasi**: Tambahkan tombol "Jadwal Training" di sidebar khusus Trainer/Admin.
- **Halaman Manajemen Training**: Tambahkan seksi `<section id="page-trainer-training">` yang memuat:
  - Tombol **[+] Buat Jadwal Training Baru**
  - Daftar kartu event training beserta tombol:
    - **"Kelola Kuis"** (membuka modal input dinamis, validasi min 10 soal)
    - **"Template Sertifikat"** (membuka modal kustom teks & ttd)
    - **"Set Selesai Training"** (merekam stempel waktu ke localStorage).
- **Modal Modul**: Tambahkan markup HTML untuk ketiga modal di atas (Event Scheduler, Quiz Builder, Cert Builder).

#### [MODIFY] `app.js`
- Logika CRUD untuk jadwal training.
- Logika tombol "Set Selesai Training" yang mengisi `trainingEndTime = Date.now()`.
- Logika dinamis untuk Quiz Builder (menambah elemen row input `A, B, C, D, Jawaban` menggunakan fungsi array dan manipulasi DOM). Validasi minimal 10 soal saat *publish*.

---

### 3. Sisi Agen Panel
#### [MODIFY] `index.html`
- **Menu Navigasi**: Tambahkan tombol "Jadwal Training" pada *Menu Utama Agen*.
- **Halaman Event Agen**: Tambahkan `<section id="page-agen-training">` yang memuat kartu jadwal training.
- **Kartu Event**: Menampilkan tombol:
  - **"RSVP / Konfirmasi Hadir"**
  - **"Absen dengan Token"** (memunculkan pop-up input 4 digit)
  - **"Unduh Materi"** (terkunci jika belum hadir)
  - **"Ikuti Kuis"** (terkunci jika materi belum *unlocked*)
  - **"Unduh Sertifikat"** (terkunci jika belum lulus kuis)

#### [MODIFY] `app.js`
- **Validasi Kehadiran Token (Grace Period)**: Jika `Date.now()` < `trainingEndTime + 1 Jam`, token masih bisa diterima. Lebih dari itu, tombol token *disabled* dengan peringatan kadaluarsa.
- **Instant Unlock Material**: Saat RSVP sukses atau Token Valid, aktifkan DOM tombol "Unduh Materi".
- **Logika Gatekeeper Kuis**:
  - Modal interaktif kuis yang merender 10+ soal dari Trainer menggunakan *Radio Buttons*.
  - Hitung persentase kelulusan otomatis. 
  - Jika >= 70%: Update state, *unlock* tombol "Unduh Sertifikat".
  - Jika < 70% dan attempt == 1: Muncul peringatan kesempatan terakhir.
  - Jika < 70% dan attempt == 2: Kunci mati secara permanen.
- **Sertifikat Dinamis**: Buka modal sertifikat (memodifikasi modal yang ada atau baru) dan inject data Nama Agen, Tanggal, dan Tanda Tangan Trainer untuk dicetak/disimpan sebagai PDF.

## Verification Plan

### Manual Verification
1. Login sebagai Trainer. Buat event training (atur token "1234"). Set 10 soal kuis.
2. Login sebagai Agen 1. RSVP training tersebut. Verifikasi tombol Materi terbuka instan.
3. Login sebagai Trainer. Klik "Set Selesai Training".
4. Login sebagai Agen 2. Gunakan token "1234" untuk hadir. Verifikasi token valid.
5. Agen ikuti kuis. Coba gagal 1 kali, coba berhasil 1 kali. Verifikasi sertifikat terbuka dan ter-generate dengan benar.
6. Simulasikan "Set Selesai Training" ke waktu > 1 jam di localStorage, lalu coba input token sebagai Agen 3. Verifikasi input terkunci mati.
