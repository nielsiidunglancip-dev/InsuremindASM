# 📋 Fitur Tambahan untuk Blueprint InsureMind Agent
> Dokumen ini berisi seluruh fitur yang **sudah ada di dalam kode aplikasi** namun **belum tercantum** di blueprint revisi Anda. Silakan tambahkan ke dalam flow diagram.

---

## 🎮 A. SISTEM GAMIFIKASI (Belum Ada di Blueprint)

Fitur gamifikasi ini berjalan **khusus untuk role AGEN** dan terintegrasi penuh di seluruh modul.

### A.1 — Poin & Level Karir

| Item | Keterangan |
|---|---|
| **XP (Experience Points)** | Poin pengalaman yang diperoleh dari setiap aktivitas belajar |
| **Level Karir** | Sistem pangkat otomatis naik setiap 500 XP: Pratama → Madya → Utama → Direktur → Legenda |
| **Koin Karir** | Mata uang virtual untuk ditukar di Toko Reward |
| **Level Up Modal** | Pop-up animasi selebrasi saat agen naik level (Duolingo-style) |

**Tabel Perolehan XP & Koin per Aktivitas:**

| Aktivitas | XP | Koin |
|---|---|---|
| Login harian (Daily Streak) | +10 XP | +2 Koin |
| Tandai Selesai Baca Materi | +50 XP | +15 Koin |
| Selesai Kuis Bab | +30 XP | +15 Koin |
| Hitung Simulasi Premi (maks 3x/hari) | +30 XP | +10 Koin |
| Chat dengan AI Coach (maks 3x/hari) | +20 XP | +5 Koin |
| Buat Quotation Penawaran Baru | +40 XP | +10 Koin |
| Centang Checklist Coaching | +5 XP | +1 Koin |
| Selesai Tryout Simulasi Ujian | +100 XP | +30 Koin |
| Bonus Lulus Tryout ≥ 75% | +100 XP | +25 Koin |

### A.2 — Daily Streak (Konsistensi Belajar Harian)

- Sistem mencatat tanggal login terakhir agen
- Jika login hari berturut-turut → **Streak berlanjut** (+10 XP, +2 Koin)
- Jika absen 1 hari → **Streak patah**, kembali ke 1
- Perlindungan: Item **Streak Freeze** dari Toko Reward bisa mencegah streak putus

### A.3 — Misi Harian (Daily Missions)

Tersedia 3 misi yang direset setiap 24 jam:

| ID Misi | Target | Reward |
|---|---|---|
| Pelajari 1 Modul Asuransi | Baca + tandai selesai 1 modul | +50 XP, +15 Koin |
| Hitung Simulasi Premi | Gunakan kalkulator premi 1x | +30 XP, +10 Koin |
| Tanya AI Insurance Coach | Kirim 1 pertanyaan ke AI Coach | +20 XP, +5 Koin |

Agen harus menekan **tombol "Klaim Hadiah"** setelah misi selesai.

### A.4 — Badges / Lencana Pencapaian

Otomatis diberikan saat agen mencapai milestone tertentu:

| Lencana | Syarat |
|---|---|
| 🏅 Kader Pratama | Login pertama ke platform |
| 🏅 Pakar Produk | Menyelesaikan ≥ 5 modul materi |
| 🏅 Master Penjualan | Menerbitkan ≥ 3 dokumen quotation |
| 🏅 Agen Bersertifikat | Lulus simulasi tryout LSP dengan nilai ≥ 70 |

### A.5 — Toko Reward Virtual (`/rewards`)

Agen dapat menukar Koin Karir dengan item reward:

| Item Reward | Koin | Fungsi |
|---|---|---|
| 🛡️ Streak Freeze | Variabel | Melindungi streak dari putus jika absen 1 hari |
| 💬 Unlimited AI Coach | Variabel | Menghapus batasan 3x/hari chat AI Coach |
| 👑 Bingkai Emas Profil | Variabel | Tampilan frame emas di avatar & papan peringkat |
| ☕ Virtual Coffee Chat | Variabel | Reward non-digital (diproses manual Trainer) |
| 🎁 Hadiah Lainnya | Variabel | Item tambahan yang bisa dibuat oleh Trainer/Admin |

> ⚠️ Trainer dapat **menambah item reward baru** melalui panel Trainer, dan memproses klaim reward yang statusnya "Pending".

### A.6 — Papan Peringkat / Leaderboard (`/leaderboard`)

- Agen bersaing berdasarkan total XP
- **2 tampilan**: Peringkat Nasional & Peringkat Cabang
- Tampilan **Podium visual** untuk Top 3 (Gold, Silver, Bronze)
- Agen dengan Bingkai Emas mendapat tampilan khusus di leaderboard

---

## 📊 B. FITUR AGEN TAMBAHAN (Belum Ada di Blueprint)

### B.1 — Simulator Kalkulator Premi OJK (`/kalkulator`)

> Flow Agen saat ini hanya menampilkan: Login → Dashboard → Belajar → AI Coach → Quiz → Training → Sertifikasi. **Kalkulator Premi belum masuk flow.**

Fitur ini memungkinkan agen menghitung premi secara akurat sesuai regulasi OJK:

| Tipe Simulasi | Detail |
|---|---|
| **Kendaraan Bermotor (Mobil/Motor)** | Berdasarkan matriks SE OJK No. 6/SEOJK.05/2017; 8 kategori kendaraan × 3 wilayah × Comprehensive/TLO + loading usia + add-on perluasan (Banjir, Gempa, SRCC, Teror) + upgrade TJH Pihak Ketiga |
| **Properti & Kebakaran** | Berdasarkan kelas konstruksi (I, II, III), okupasi bangunan, dan perluasan banjir |
| **Kecelakaan Diri (Personal Accident)** | Berdasarkan kelas pekerjaan (1–3) dan opsi reimbursement medis |

- Output: **Rincian breakdown premi lengkap** (Rate Dasar OJK, Premi Dasar, Loading, Add-On, Biaya Polis, Meterai, **Total Pembayaran**)
- Tombol **"Jadikan Penawaran Resmi"** → otomatis mengisi form Quotation

### B.2 — Pembuatan Penawaran / Quotation (`/penawaran`)

> **Belum ada di blueprint**. Ini adalah fitur operasional penting agen di lapangan.

| Sub-fitur | Keterangan |
|---|---|
| **Buat Quotation Baru** | Form pengisian nama nasabah, telepon, produk, nilai pertanggungan, rate, premi terhitung |
| **Riwayat Penawaran** | Tabel semua quotation yang pernah dibuat agen (disimpan lokal) |
| **Preview & Cetak** | Modal kertas surat penawaran resmi yang bisa di-print/simpan PDF |
| **Unduh Template SPPA** | Download template SPPA Kendaraan & SPPA Kebakaran (simulasi) |

Nomor referensi otomatis `QT-XXXXXX` digenerate saat quotation dibuat.

### B.3 — Coaching Agen / Teknik Penjualan (`/coaching`)

> Sudah ada di sidebar, tetapi **belum masuk ke flow utama blueprint Agen**.

- Modul teknik penjualan dari Trainer (real-time sinkron)
- Setiap modul berisi **Tips Coaching** + **Checklist Praktek Lapangan** yang bisa dicentang
- Centang checklist = +5 XP & +1 Koin (terintegrasi gamifikasi)

### B.4 — Progress Belajar & Sertifikat Internal (`/progress`)

| Item | Keterangan |
|---|---|
| Rata-rata nilai kuis | Kalkulasi otomatis dari semua kuis bab yang dikerjakan |
| Riwayat tryout ujian | Tabel semua hasil simulasi ujian (tanggal, jenjang, soal, nilai, status) |
| Koleksi lencana | Detail semua badges yang diperoleh |
| Cetak Sertifikat Internal | Tersedia jika: selesai ≥ 80% modul **DAN** nilai tryout ≥ 70 |

### B.5 — Bank Soal & Simulasi Ujian Tryout (`/tryout`)

Blueprint sudah menyebut "Simulasi Ujian → Ujian LSP", namun detail fitur belum masuk:

| Sub-fitur | Keterangan |
|---|---|
| Pilih jumlah soal | 50 soal (60 menit) atau 100 soal (120 menit) |
| Soal diacak | Berdasarkan jenjang kualifikasi yang dipilih (Level 3 / Level 4-Bonding / Level 4-PAYDI) |
| Lembar jawaban navigasi | Grid nomor soal di sisi kanan, warna berbeda untuk sudah/belum dijawab |
| Timer real-time | Countdown timer dengan peringatan merah jika < 3 menit |
| Kumpulkan ujian lebih awal | Konfirmasi jika masih ada soal belum dijawab |
| Halaman Hasil Ujian | Skor, jawaban benar/salah, waktu tempuh, rekomendasi materi yang perlu direview |
| Pembahasan Soal | Review setiap soal beserta kunci jawaban dan penjelasan regulasi OJK/KUHD |
| Sertifikasi Virtual Otomatis | Jika nilai ≥ 75%, status sertifikasi berubah "Aktif" dengan masa berlaku 2 tahun |

---

## 🎓 C. FITUR TRAINER TAMBAHAN (Belum Lengkap di Blueprint)

Blueprint menyebut Trainer: Upload Materi, Buat Quiz, Kelola Training, Evaluasi Hasil, Feedback Agen. Detail implementasinya:

### C.1 — CRUD Materi Belajar
- **Tambah** modul baru (judul, kategori, artikel, URL video, nama PDF, + 1 soal kuis default)
- **Edit** modul yang ada
- **Hapus** modul (beserta kuis di dalamnya)
- Perubahan **langsung tersinkron** ke halaman Belajar Agen secara real-time

### C.2 — CRUD Taktik Coaching
- **Tambah** taktik coaching baru (judul, tips, checklist multi-baris)
- **Edit & Hapus** taktik yang ada
- Langsung tersinkron ke halaman Coaching Agen semua user

### C.3 — Laporan Progres Peserta
- Tabel semua **agen terdaftar** beserta:
  - Persentase progress belajar (% modul selesai)
  - Nilai tryout terbaik
  - Jenjang sertifikasi LSP yang dipilih

### C.4 — Kelola Reward & Klaim
- Form tambah item reward baru ke katalog toko
- Tabel riwayat penukaran reward agen (dengan status: Otomatis / Pending)
- Fitur **filter klaim Pending** untuk diproses manual
- Badge notifikasi jumlah klaim pending di header panel

---

## ⚙️ D. FITUR ADMIN TAMBAHAN (Belum Lengkap di Blueprint)

Blueprint menyebut Admin: Kelola User, Kelola Hak Akses, Kelola Konten Data Master, Kelola Kurikulum Nasional, Monitoring Seluruh Cabang. Detail implementasinya:

### D.1 — Manajemen Pengguna (CRUD)
- **Tambah** akun baru: nama, email, password, role (Agen/Trainer/Admin), kode pegawai
- **Edit** data akun yang ada
- **Hapus** akun pengguna
- Tabel daftar semua user di platform

### D.2 — Laporan Ringkasan LMS
- Statistik platform: Total user, jumlah modul materi, jumlah tryout terlaksana
- **Log Audit Aktivitas** real-time: mencatat semua aksi penting (login, selesai materi, tryout, penerbitan quotation, penukaran reward, dsb.)

---

## 🤖 E. DETAIL FITUR AI COACH (Lebih Lengkap dari Blueprint)

Blueprint sudah ada Flow AI Coach (pertanyaan produk, sertifikasi, script penjualan, keberatan nasabah, simulasi roleplay). Detail teknis yang belum masuk:

### E.1 — Dua Mode Operasi
| Mode | Kondisi | Keterangan |
|---|---|---|
| **Online (Gemini API)** | API Key diatur | Terhubung ke model Gemini 3.5 Flash secara real-time |
| **Offline (Local RAG)** | Tanpa API Key | Mencari jawaban dari database materi PDF lokal menggunakan keyword scoring |

### E.2 — Sistem RAG (Retrieval-Augmented Generation)
- AI mencari konteks relevan dari **chunks** materi PDF yang sudah di-index
- Scoring berbasis exact phrase + keyword frequency
- Jawaban diberikan secara **natural** tanpa menyebut sumber dokumen
- AI hanya menjawab dalam ruang lingkup: asuransi umum + teknik penjualan

### E.3 — Konfigurasi API Key
- Agen/Admin bisa memasukkan Gemini API Key pribadi
- Key disimpan lokal di browser (localStorage)
- Badge status Online/Offline terlihat di header halaman AI Coach

---

## 📱 F. FITUR TEKNIS UMUM (Belum Ada di Blueprint Manapun)

| Fitur | Keterangan |
|---|---|
| **Single Page Application (SPA)** | Navigasi antar halaman tanpa reload, semua dalam 1 file HTML |
| **LocalStorage Database** | Semua data (user, materi, progress, reward) disimpan di browser lokal tanpa server |
| **Responsive Mobile** | Sidebar hamburger menu untuk tampilan HP/tablet |
| **Daily Cap System** | Pembatasan poin gamifikasi per hari (maks 3x untuk chat & kalkulator) untuk fairness |
| **Session Management** | Login session menggunakan sessionStorage; otomatis logout saat browser ditutup |
| **Lupa Password Modal** | Form reset password (simulasi) di halaman login |
| **Toast Notification** | Notifikasi pop-up ringan untuk konfirmasi aksi (success, error, info) |
| **Print Support** | Halaman quotation & sertifikat mendukung fungsi browser `window.print()` |
| **Konfirmasi Keluar Ujian** | Dialog konfirmasi jika agen mencoba keluar saat ujian sedang berjalan |
| **Auto-sync Trainer → Agen** | Materi & coaching yang ditambah Trainer langsung muncul di halaman Agen |

---

## 📌 Rekomendasi Penambahan ke Blueprint

Berikut section yang disarankan untuk ditambahkan ke diagram flow Anda:

### 1. Tambahkan ke "Flow Agen (User Journey)" — Langkah baru:

```
Login → Dashboard → Belajar Produk → AI Coach → Quiz → [KALKULATOR PREMI] → [BUAT PENAWARAN] → Training → Sertifikasi
```

### 2. Tambahkan Section Baru: "Flow Gamifikasi Agen"

```
Aktivitas Belajar → Dapat XP & Koin → Naik Level → Dapat Badge → 
Misi Harian Selesai → Klaim Reward → Tukar Koin di Toko Reward → 
Tampil di Leaderboard
```

### 3. Tambahkan ke "Modul yang Diakses Setiap Role":

| Modul | Agen | Trainer | Kepala Cabang | Admin |
|---|---|---|---|---|
| Kalkulator Premi | ✅ | ⊙ (lihat) | ⊙ (lihat) | ✅ |
| Buat Penawaran / Quotation | ✅ | ❌ | ⊙ (lihat) | ✅ |
| Coaching Agen | ✅ | ✅ (kelola) | ⊙ (lihat) | ✅ |
| Toko Reward | ✅ | ✅ (kelola) | ❌ | ✅ |
| Gamifikasi (XP, Level, Badge) | ✅ | ❌ | ❌ | ✅ |
| Progress & Sertifikat Internal | ✅ | ✅ (lihat semua) | ✅ (cabang) | ✅ |
| Bank Soal & Tryout | ✅ | ✅ (lihat) | ⊙ (statistik) | ✅ |

### 4. Tambahkan ke "Detail Fitur Trainer":
- CRUD Materi Belajar (Tambah/Edit/Hapus modul real-time)
- CRUD Taktik Coaching (langsung sinkron ke agen)
- Kelola Katalog Reward & Proses Klaim Manual

### 5. Tambahkan ke "Detail Fitur AI Coach":
- Mode Online (Gemini API) vs Offline (Local RAG)
- Konfigurasi API Key oleh agen
- Cakupan topik: Produk Asuransi + Teknik Penjualan + Simulasi Roleplay
