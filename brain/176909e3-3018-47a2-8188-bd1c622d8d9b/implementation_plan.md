# Rencana Implementasi - Sistem Gamifikasi ASM Insurance Academy

Rencana ini bertujuan untuk menambahkan sistem gamifikasi interaktif bergaya Duolingo namun tetap mempertahankan estetika profesional untuk Agen Asuransi Umum. Agen dapat mengumpulkan Poin Belajar (XP), menaikkan Level Agen, mempertahankan beruntun hari belajar (Daily Streak), bersaing di Papan Peringkat Nasional dan Cabang, serta menyelesaikan Misi Harian untuk ditukar dengan Reward Virtual.

---

## 1. Mekanisme Gamifikasi & Data (`localStorage`)

Mekanisme gamifikasi didukung dengan memperluas struktur data `pa_agent_progress` di `localStorage`:

- **XP (Experience Points)**: 
  - Membaca modul baru: `+50 XP`
  - Menyelesaikan kuis bab: `+30 XP` (Skor >= 70)
  - Mengikuti tryout sertifikasi: `+100 XP`
  - Melakukan simulasi perhitungan premi: `+20 XP` (maksimal 1x per hari)
  - Membuat quotation/penawaran penutupan: `+40 XP`
  - Konsultasi ke AI Insurance Coach: `+10 XP` (maksimal 3x per hari)
- **Level Agen**: 
  - Level dihitung berdasarkan rumus: `Level = Math.floor(XP / 500) + 1` (tiap 500 XP naik 1 tingkat).
  - Pangkat Agen: Level 1-2 (Pratama), Level 3-5 (Madya), Level 6-8 (Utama), Level 9-10 (Legenda/Director Club).
- **Daily Streak (Hari Beruntun)**:
  - Indikator api belajar (🔥) yang melacak berapa hari berturut-turut agen aktif belajar.
  - Sesi login harian akan memvalidasi tanggal aktivitas terakhir. Jika selisih tepat 1 hari, streak bertambah. Jika lewat, streak kembali ke 0 (bisa dipertahankan menggunakan virtual reward "Streak Shield").
- **Misi Harian (Daily Quests)**:
  - 3 misi acak yang diatur ulang setiap hari. Contoh:
    1. *Belajar 1 Modul Asuransi* (Reward: 30 XP, 10 Koin)
    2. *Lakukan Simulasi Premi* (Reward: 15 XP, 5 Koin)
    3. *Tanya AI Coach* (Reward: 10 XP, 5 Koin)
- **Reward Virtual & Koin**:
  - Diperoleh bersamaan dengan XP. Dapat ditukar di **Toko Lisensi / Karir**:
    - *Streak Freeze / Shield*: Mencegah streak hangus jika absen 1 hari (Harga: 50 Koin).
    - *Konsultasi AI Premium*: Kuota chat AI tak terbatas (Harga: 100 Koin).
    - *Bingkai Profil Emas*: Aksesoris estetika profil agen (Harga: 150 Koin).
    - *Coffee Chat dengan Regional Director*: Sesi mentorship virtual (Harga: 300 Koin).

---

## 2. Pembaruan Desain Antarmuka (Aesthetics Duolingo-SaaS)

### Header Menu Utama
- Menambahkan barisan indikator atas (top widget bar) yang terinspirasi dari Duolingo:
  - **Level Badge**: 👑 Level X (Pangkat)
  - **XP Indicator**: ⚡ X XP
  - **Streak Counter**: 🔥 X Hari Aktif
  - **Virtual Coin**: 🪙 X Koin

### Halaman Baru: Papan Peringkat (Leaderboard)
- Tab navigasi pemisah antara:
  - **Ranking Nasional**: Menampilkan 10 agen top se-Indonesia dari berbagai cabang dengan visual podium peringkat 1, 2, dan 3.
  - **Ranking Cabang**: Kompetisi lokal antar rekan agen di kantor cabang yang sama (misal: Cabang Jakarta Raya).
- Posisi agen saat ini akan di-highlight dengan warna cyan/biru muda terang agar mudah dilacak.

### Halaman Baru: Misi & Reward Store
- Menampilkan daftar progress misi harian dengan status checklist dinamis dan tombol "Klaim Hadiah".
- Menyediakan katalog barang virtual karir yang dapat dibeli oleh agen menggunakan Koin hasil belajar.

### Animasi Interaktif
- **Level Up Modal**: Efek modal popup khusus dengan latar belakang gradasi emas berkilau dan mikro-animasi konfeti saat level agen bertambah.

---

## 3. Rencana Kerja Perubahan Berkas

### 1. [MODIFY] [data.js](file:///d:/AI/Antigravity/data.js)
- Memperluas initializer `pa_agent_progress` dengan field: `xp`, `coins`, `level`, `streak`, `lastActiveDate`, `rewardsOwned`, `missionProgress`, dan data set leaderboard statis/dinamis.

### 2. [MODIFY] [index.html](file:///d:/AI/Antigravity/index.html)
- Menambahkan widget gamifikasi pada header.
- Membuat dua halaman SPA baru: `page-leaderboard` dan `page-rewards`.
- Membuat widget Misi Harian pada dasbor utama agen.
- Membuat modal level-up dan modal konfirmasi pembelian reward.

### 3. [MODIFY] [style.css](file:///d:/AI/Antigravity/style.css)
- Menambahkan visual token untuk widget indikator (api streak 🔥, koin 🪙, XP ⚡).
- Mendesain layout leaderboard yang bersaing dengan gaya list berangka premium dan efek podium.
- Menambahkan gaya visual kartun profesional/Duolingo modern untuk progress bar level dan modal level-up.

### 4. [MODIFY] [app.js](file:///d:/AI/Antigravity/app.js)
- Membuat modul parser penambahan XP & koin (`addXpAndCoins(amount, coinAmount)`).
- Menyusun fungsi pelacakan daily streak berdasarkan perbandingan tanggal (`checkDailyStreak()`).
- Menulis logika penyelesaian Misi Harian dan klaim hadiah.
- Menulis logika pembelian item di toko reward.
- Menghubungkan leaderboard agar skor agen naik secara dinamis ketika agen memperoleh XP baru.

---

## 4. Rencana Verifikasi

1. **Uji Penambahan XP & Level Up**:
   - Mengerjakan kuis atau melakukan kalkulasi premi, pastikan XP dan Koin bertambah di header secara real-time.
   - Tambahkan XP hingga melewati kelipatan 500 dan verifikasi bahwa modal Level Up muncul dengan animasi.
2. **Uji Toko & Pembelian**:
   - Tukarkan Koin untuk membeli item *Streak Freeze*, pastikan koin berkurang dan item terdaftar sebagai aset agen.
3. **Uji Papan Peringkat**:
   - Pastikan peningkatan skor XP pengguna mengubah posisinya secara dinamis pada daftar Ranking Cabang dan Nasional.
