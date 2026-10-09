# PRD & Rencana Implementasi: ProteksiAcademy (Aplikasi Persiapan Ujian AAUI)

Dokumen ini berisi **Product Requirements Document (PRD)**, konsep aplikasi, dan rencana teknis untuk membangun **ProteksiAcademy**—sebuah platform pelatihan interaktif berbasis web untuk calon agen asuransi umum di Indonesia, dengan fokus pada persiapan ujian sertifikasi AAUI (Modul A).

---

## 1. Konsep & Kesesuaian Kebutuhan

Aplikasi ini ditujukan bagi masyarakat umum di Indonesia yang ingin menjadi agen asuransi umum berlisensi.
*   **Fokus MVP (Modul A)**: Membantu calon agen lulus ujian sertifikasi resmi LSP AAUI.
*   **Gaya Bahasa**: Profesional namun menggunakan analogi sehari-hari dan penjelasan sederhana yang mudah dipahami oleh orang awam yang tidak memiliki latar belakang asuransi.
*   **Palet Warna (Merah Putih Premium)**:
    *   `Primary Crimson Red`: `#A91D22` (merah bendera yang sedikit lebih dalam dan elegan, memberikan kesan formal dan tepercaya).
    *   `Soft Cream/White`: `#F9F9FB` (latar belakang bersih, tidak melelahkan mata).
    *   `Dark Charcoal`: `#1E1E24` (teks utama yang kontras namun lembut dibanding hitam pekat).
    *   `Accent Rose`: `#FFF0F2` (untuk area penyorotan atau alert).

---

## 2. Alur Pengguna & Fitur Utama (MVP - Modul A)

Aplikasi akan berupa Single Page Application (SPA) yang berjalan mulus di perangkat *mobile* (HP) maupun *desktop*.

1.  **Dashboard Utama (Beranda)**:
    *   Menampilkan ringkasan kemajuan belajar (persentase materi yang dibaca).
    *   Statistik Tryout (jumlah tes selesai, rata-rata nilai, skor tertinggi).
    *   Dua menu utama: **Mulai Belajar** (Materi) dan **Mulai Tryout** (Latihan Ujian).
2.  **Modul Belajar (Micro-Learning)**:
    *   Membagi materi ujian AAUI menjadi 4 bab ringkas:
        1.  *Pengenalan & Hukum Asuransi* (Apa itu asuransi, polis, premi, klaim).
        2.  *6 Prinsip Dasar Asuransi* (Utmost Good Faith, Insurable Interest, Indemnity, Subrogation, Contribution, Proximate Cause - dijelaskan dengan studi kasus sederhana).
        3.  *Jenis Asuransi Umum & Polis Standar* (Pengenalan PSAKBI/Kebakaran & PSAKOB/Kendaraan secara awam).
        4.  *Regulasi OJK & Kode Etik Agen* (Ketentuan komisi, larangan potongan premi, dll).
    *   Setiap bab memiliki kuis kilat di akhir untuk menguji pemahaman langsung.
3.  **Simulasi Tryout AAUI**:
    *   Ujian interaktif berisi 20-30 soal pilihan ganda yang merepresentasikan soal ujian AAUI asli.
    *   Fitur *Timer* (waktu berjalan) untuk membiasakan agen dengan tekanan ujian.
    *   Setelah selesai, agen dapat melihat skor akhir dan status Kelulusan (Kriteria Kelulusan Minimal / KKM: 70%).
4.  **Ulasan Hasil & Pembahasan**:
    *   Menampilkan kembali semua soal yang dijawab, mana yang benar/salah.
    *   Setiap soal dilengkapi dengan **Penjelasan Pembahasan** dengan gaya bahasa ramah orang awam agar agen paham *kenapa* jawabannya benar, bukan sekadar menghafal.

---

## 3. Rencana Komponen & File Kode

Kita akan membangun aplikasi ini di dalam direktori `d:\AI\Antigravity` menggunakan file-file berikut:

### [NEW] [index.html](file:///d:/AI/Antigravity/index.html)
Struktur HTML5 aplikasi. Berisi container untuk Dashboard, Halaman Materi, Halaman Tryout, dan Halaman Hasil Ulasan. Menggunakan ikon SVG modern bawaan.

### [NEW] [style.css](file:///d:/AI/Antigravity/style.css)
CSS kustom dengan gaya visual premium:
*   Variabel warna untuk Merah Putih Premium (`--primary-red`, `--bg-light`, `--text-dark`, dll).
*   Gaya kartu melayang (*glassmorphism* lembut) dengan transisi halus.
*   Tata letak grid dan flexbox yang sangat responsif (nyaman digunakan di layar HP).

### [NEW] [data.js](file:///d:/AI/Antigravity/data.js)
Menyimpan seluruh data konten pelatihan secara terorganisir:
*   Konten teks materi untuk 4 bab belajar lengkap dengan ilustrasi skenario kehidupan nyata.
*   Bank soal Tryout (20-30 soal pilihan ganda dengan opsi jawaban dan teks penjelasan/pembahasan mendalam).

### [NEW] [app.js](file:///d:/AI/Antigravity/app.js)
Logika JavaScript untuk:
*   Navigasi antar halaman (Dashboard $\leftrightarrow$ Belajar $\leftrightarrow$ Tryout $\leftrightarrow$ Hasil) tanpa *reload*.
*   Menangani status tryout (memilih opsi, menghitung waktu mundur, kalkulasi skor akhir).
*   Menyimpan progress belajar dan skor terbaik pengguna ke `LocalStorage` agar data tidak hilang ketika peramban dimuat ulang.

---

## 4. Rencana Verifikasi

### Pengujian Manual:
1.  **Navigasi**: Memastikan transisi antar modul berjalan lancar.
2.  **Tryout**: Mencoba menyelesaikan tryout, memastikan timer berjalan, dan skor akhir dikalkulasi dengan benar.
3.  **Pembahasan Soal**: Mengonfirmasi bahwa setelah menekan tombol "Lihat Pembahasan", pembahasan muncul dengan penjelasan yang mudah dipahami.
4.  **LocalStorage**: Memuat ulang halaman web setelah menyelesaikan tryout untuk memastikan riwayat nilai tertinggi tersimpan dan tampil di Dashboard.
5.  **Responsivitas**: Menguji layout menggunakan Developer Tools pada ukuran layar mobile (375px ke atas).
