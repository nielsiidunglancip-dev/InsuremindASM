# Walkthrough - ASM Insurance Academy LMS

Aplikasi **ASM Insurance Academy** telah selesai diimplementasikan sebagai Single Page Application (SPA) modern berbasis Vanilla HTML, CSS, dan JavaScript dengan arsitektur data dinamis berbasis `localStorage`.

---

## Ringkasan Perubahan Berkas

1. **[data.js](file:///d:/AI/Antigravity/data.js)**: 
   - Diperbarui menjadi database lokal terintegrasi yang memuat 10 kategori materi belajar (lengkap dengan artikel, ringkasan, kuis, mock video, dan referensi dokumen PDF).
   - Katalog produk asuransi (manfaat, jaminan, pengecualian, studi klaim, FAQ).
   - Materi bimbingan penjualan (Coaching Agen) dan silabus sertifikasi LSP.
   - Bank soal berisi 60 pertanyaan pilihan ganda & studi kasus asuransi umum Indonesia.
   - Inisialisasi awal kredensial akun pengguna dan state progress belajar.

2. **[index.html](file:///d:/AI/Antigravity/index.html)**:
   - Membuat shell layout modern dengan Sidebar dinamis di desktop dan responsif di mobile.
   - Menyediakan form Login yang dilengkapi tombol bantuan akun demo untuk pengujian cepat.
   - Menambahkan kontainer SPA untuk seluruh 12 halaman utama dan sub-dashboard masing-masing peran (Agen, Trainer, Admin).
   - Membuat templat cetak penawaran resmi dan sertifikat kelulusan.

3. **[style.css](file:///d:/AI/Antigravity/style.css)**:
   - Menerapkan desain visual SaaS premium dengan palet warna Navy Blue (`#0B192C`), Cyan (`#008DDA`), dan Putih Bersih.
   - Mengatur transisi halus, bayangan glassmorphic pada kartu, visualisasi progres lingkaran (radial progress), dan gelembung chat AI.
   - Menambahkan aturan media cetak (`@media print`) khusus agar dokumen Quotation dan Sertifikat tercetak bersih tanpa elemen navigasi.

4. **[app.js](file:///d:/AI/Antigravity/app.js)**:
   - Implementasi router SPA tanpa memuat ulang halaman.
   - Penanganan otentikasi peran (Agent, Trainer, Admin) beserta penyaringan menu navigasi.
   - Simulator perhitungan premi asuransi kendaraan (all-risk/TLO), properti (kelas konstruksi & banjir), dan PA (tingkat risiko kerja) sesuai standar tarif OJK.
   - Engine ujian LSP dinamis (pilihan 50/100 soal acak, timer mundur, penskoran otomatis, analisis kesalahan kategori, dan ulasan kunci jawaban).
   - AI Insurance Coach yang terintegrasi API OpenAI dengan fallback simulator respons lokal berbahasa Indonesia yang cerdas.
   - Sistem CRUD materi belajar di sisi Trainer dan audit pengguna di sisi Admin.

---

## Kredensial Akun Pengujian

Untuk mempermudah pengujian platform, kami menyediakan tombol sekali klik pada layar login untuk masuk sebagai salah satu peran berikut:

| Peran (Role) | Email | Sandi (Password) | Deskripsi |
| :--- | :--- | :--- | :--- |
| **Agen (Agent)** | `agen@asm.id` | `agen123` | Mengakses dashboard progres, kalkulator, materi belajar, ujian tryout, proposal, dan AI coach. |
| **Trainer / Coach** | `trainer@asm.id` | `trainer123` | Mengakses seluruh menu Agen ditambah panel CRUD materi belajar, edit kuis, dan review progres belajar agen. |
| **Administrator** | `admin@asm.id` | `admin123` | Mengakses seluruh fitur platform ditambah audit akun pengguna, laporan statistik total tryout, dan log aktivitas audit LMS. |

---

## Desain Antarmuka Dasbor Utama (Mockup)

Berikut adalah mockup visual dasbor utama agen yang telah dibuat untuk memberikan gambaran estetika premium platform:

![Dashboard Mockup](/AI/Antigravity/brain/176909e3-3018-47a2-8188-bd1c622d8d9b/asm_academy_dashboard_1780242329565.png)

---

## Sistem Gamifikasi Korporat (Duolingo-Inspired)

Untuk meningkatkan motivasi belajar agen, ASM Insurance Academy dilengkapi dengan engine gamifikasi yang disesuaikan secara profesional:
- **Poin Belajar (XP) & Koin Emas**: Diperoleh dari aktivitas belajar modul (+50 XP, +10 Koin), kuis (+30 XP, +8 Koin), simulasi premi (+20 XP, +4 Koin), pembuatan Quotation SPPA (+40 XP, +10 Koin), kelengkapan Coaching Checklist (+5 XP, +1 Koin), lulus tryout LSP (+100 XP, +30 Koin), dan berdiskusi dengan AI Coach (+10 XP, +2 Koin).
- **Level Karir & Pangkat Agen**: XP terakumulasi otomatis menaikkan level agen setiap kelipatan 500 XP. Kenaikan level memicu modal popup Level Up yang animatif disertai pembaruan pangkat (dari Agen Pratama, Madya, Utama, hingga Direktur & Legenda).
- **Streak Harian (🔥)**: Melacak konsistensi belajar harian. Jika absen, streak akan terputus ke hari ke-1, kecuali dilindungi oleh item *Streak Freeze* yang dibeli dari toko.
- **Toko Karir & Reward Virtual**: Memungkinkan agen menukar Koin emas untuk item penunjang karir virtual:
  - *Streak Freeze (🛡️)* seharga 50 Koin (melindungi streak belajar saat absen).
  - *Unlimited AI Coach (💬)* seharga 100 Koin (menghilangkan batasan harian).
  - *Bingkai Emas Premium (👑)* seharga 150 Koin (memasang bingkai profil berwarna emas pada avatar sidebar dan leaderboard).
  - *Virtual Coffee Chat (☕)* seharga 300 Koin (sesi mentoring 1-on-1 selama 30 menit bersama Senior Regional Director).
- **Papan Peringkat (Leaderboard) Nasional & Cabang**: Mengurutkan peringkat agen secara real-time berdasarkan total perolehan XP. Tiga peringkat teratas ditampilkan secara elegan dalam bentuk podium visual visualisasi juara.

Berikut adalah mockup visual dari Papan Peringkat (Leaderboard) Agen:

![Leaderboard Mockup](/AI/Antigravity/brain/176909e3-3018-47a2-8188-bd1c622d8d9b/leaderboard_mockup_1780242750145.png)

---

## Panduan Verifikasi Fungsionalitas

1. **Uji Alur Belajar & Kuis**:
   - Masuk sebagai Agen (`agen@asm.id`).
   - Pilih menu **Belajar Asuransi** -> buka modul **Dasar-Dasar Asuransi Umum**.
   - Buka tab **Kuis Kompetensi**, selesaikan kuis, dan klik **Selesaikan Kuis**. Skor kuis akan terekam.
   - Klik **Tandai Selesai Belajar**. Progres belajar di dashboard akan bertambah naik.

2. **Uji Simulator Premi & Quotation**:
   - Buka menu **Kalkulator Premi**.
   - Pilih tab simulator (contoh: **Kendaraan Bermotor**), ubah nilai pertanggungan, lalu klik **Hitung Simulasi Premi**.
   - Klik **Jadikan Penawaran Resmi**. Anda akan diarahkan ke form Quotation dengan data yang terisi otomatis.
   - Masukkan nama nasabah dan klik **Daftarkan Penawaran**. Quotation Anda akan masuk ke tabel **Riwayat Penawaran** dan dapat diklik **Lihat Cetak** untuk dicetak bersih ke printer/PDF.

3. **Uji Simulasi Ujian LSP**:
   - Buka menu **Sertifikasi LSP** -> pilih jenjang sertifikasi (contoh: **Level 4 - Bonding**). Silabus kompetensi dan tips ujian akan berubah.
   - Buka menu **Bank Soal & Tryout** -> klik **Mulai Ujian Sekarang**.
   - Selesaikan ujian menggunakan navigasi tombol atau lembar jawaban grid nomor di sisi kanan.
   - Klik **Akhiri Ujian**. Anda akan melihat lembar skor, status kelulusan, serta analisis materi yang disarankan dipelajari ulang. Buka **Lihat Pembahasan** untuk melihat alasan kunci jawaban yang benar.

4. **Uji AI Insurance Coach**:
   - Buka menu **AI Insurance Coach**.
   - Masukkan pertanyaan di kolom chat seperti: *"Bagaimana cara menjawab nasabah yang bilang premi kemahalan?"* atau *"Jelaskan tentang jaminan FLEXAS"*. Chatbot akan membalas dengan saran dan petunjuk taktis.

5. **Uji Pengelolaan Materi & Akun (Trainer/Admin)**:
   - Keluar sesi agen dan masuk kembali sebagai Trainer (`trainer@asm.id`) atau Admin (`admin@asm.id`).
   - Buka menu **Kelola Materi & Progress** -> klik **Tambah Modul Baru** -> isi form dan simpan. Modul baru tersebut akan langsung muncul di katalog belajar agen.
   - Di sisi Admin, buka menu **Kelola Pengguna** -> tambah akun agen baru, lalu coba login menggunakan akun baru tersebut.
