# Penyelarasan Blueprint Arsitektur Menu & Hak Akses (RBAC)

Berdasarkan audit komprehensif terhadap file `index.html` dan `app.js` saat ini, sistem Sidebar untuk **Trainer**, **Admin LMS**, dan **Pimpinan Cabang** telah 100% sesuai dengan desain struktur *Direct Vertical List* yang Anda sebutkan di dalam *blueprint*.

Namun, pada **Role Agen (Rian Aditya)**, masih terdapat beberapa menu *legacy* (seperti Arena Game Edukasi, Coaching Agen, Bank Soal & Tryout) yang belum diselaraskan, dan letak beberapa fitur belum sesuai dengan kategori *Collapsible Dropdown* yang baru (misalnya *Tanya AI Coach* yang saat ini berada di Operasional alih-alih di Akademi). Selain itu, terdapat fitur baru yang perlu ditambahkan *placeholder*-nya (E-Submission & Manajemen Status Polis).

## Proposed Changes

### `index.html`

Saya akan merombak total `<div id="agen-menu-group">` agar mengikuti hierarki presisi berikut:

1. **Dashboard** (Tetap di luar dropdown sebagai beranda)

2. **Dropdown A: AKADEMI & TRAINING**
   - Belajar Asuransi
   - Ujian Sertifikasi
   - Tanya AI Insurance Coach
   - *Jadwal Training (Lihat Open Questions)*

3. **Dropdown B: SALES KIT & PRODUK**
   - Kalkulator Premi & Proposal
   - [NEW] E-Submission (Penerbitan Mandiri)
   - [NEW] Manajemen Status Polis

4. **Dropdown C: OPERASIONAL & GAMIFIKASI**
   - Dasbor Produksi & Kontes
   - Papan Peringkat (Leaderboard)
   - Toko Reward Virtual

Menu yang akan **DISEMBUNYIKAN/DIHAPUS** dari Sidebar Agen untuk mematuhi *Compact UI Blueprint*:
- Bank Soal & Tryout (digabung konsepnya ke Ujian Sertifikasi)
- Persiapan Uji Kompetensi & Progress Belajar
- Produk Asuransi (Katalog) & Buat Penawaran (digabung ke Kalkulator Premi & Proposal)
- Coaching Agen
- Arena Game Edukasi
- Profil Agen

Saya juga akan menambahkan `<section class="page-section">` HTML landasan (*placeholder*) baru di `index.html` untuk:
- `page-e-submission`
- `page-manajemen-polis`
- `page-dasbor-produksi`

## Open Questions

> [!IMPORTANT]
> 1. **Jadwal Training:** Di dalam *blueprint*, menu **"Jadwal Training"** (tempat Agen melakukan RSVP dan memasukkan Token) tidak tercantum secara eksplisit di Dropdown A. Apakah Anda ingin saya **tetap menyisipkan** menu Jadwal Training ini ke dalam Dropdown A, ataukah digabung ke dalam halaman "Belajar Asuransi"?
> 2. **Dasbor Produksi & Kontes:** Blueprint menyebutkan ini di bawah *Dropdown C*. Apakah ini akan menjadi halaman yang terpisah dari "Dashboard Utama Agen" (yang muncul pertama kali saat login), ataukah halaman Dashboard utama yang akan diganti namanya menjadi "Dasbor Produksi & Kontes" lalu dipindahkan ke dalam Dropdown C?

## Verification Plan

### Manual Verification
- Login sebagai Agen dan memverifikasi bahwa *sidebar* memiliki tepat 3 Dropdown Categories dengan isi persis seperti *blueprint*.
- Memastikan navigasi ke halaman baru (E-Submission, Manajemen Status Polis) berjalan mulus menampilkan halaman landasan.
- Memastikan bahwa struktur Sidebar untuk 3 Role lainnya (Trainer, Admin, Pimpinan) tidak terganggu dan tetap berupa *Direct Vertical List*.
