# Walkthrough: ProteksiAcademy (Aplikasi Persiapan Ujian AAUI)

Aplikasi **ProteksiAcademy** versi MVP (Modul A - Persiapan Ujian AAUI) telah selesai dibangun sepenuhnya di direktori kerja `d:\AI\Antigravity`.

---

## 1. File yang Telah Dibuat
Berikut adalah file yang membentuk aplikasi Single Page Application (SPA) ini:
1.  **[index.html](file:///d:/AI/Antigravity/index.html)**: Struktur halaman web utama yang membagi area kerja menjadi Dashboard, Layar Belajar, Layar Ujian Tryout, Hasil Nilai, dan Ulasan Pembahasan. Menggunakan ikon SVG bawaan untuk efisiensi muat halaman.
2.  **[style.css](file:///d:/AI/Antigravity/style.css)**: Gaya visual premium bertema **Merah Putih Premium** (Crimson Red `#A91D22` & Soft Cream `#F9F9FB`), ramah seluler (*mobile-first*), menggunakan tipografi *Plus Jakarta Sans*, transisi halus, dan kartu bergaya *glassmorphism* modern.
3.  **[data.js](file:///d:/AI/Antigravity/data.js)**: Bank data yang menampung materi pembelajaran (4 bab lengkap dengan analogi awam dan kuis kilat) serta 20 soal tryout standar AAUI beserta penjelasan jawabannya.
4.  **[app.js](file:///d:/AI/Antigravity/app.js)**: Mesin utama aplikasi yang menangani navigasi antar halaman tanpa *reload*, timer mundur tryout, pengacakan soal (*shuffling*), kalkulasi skor KKM (70%), dan penyimpanan progres belajar serta nilai terbaik menggunakan `LocalStorage` peramban.

---

## 2. Desain Antarmuka Aplikasi

Berikut adalah representasi desain visual antarmuka dashboard ProteksiAcademy:

![Dashboard Mockup](C:/Users/ASM/.gemini/antigravity-ide/brain/a3e2717d-86ec-4bfd-a16c-7fd9af8fa5d9/dashboard_mockup_1779702626457.png)

---

## 3. Cara Menjalankan & Menguji Aplikasi

Karena aplikasi ini dibangun menggunakan teknologi web murni tanpa ketergantungan server luar, Anda bisa langsung mencobanya di komputer Anda:

### Langkah A: Membuka Aplikasi
1. Buka folder kerja `d:\AI\Antigravity` di File Explorer komputer Anda.
2. Klik dua kali pada file **`index.html`** untuk membukanya langsung di peramban web Anda (direkomendasikan Google Chrome atau Microsoft Edge).

### Langkah B: Menguji Fitur Belajar (Bab & Kuis Kilat)
1. Di Dashboard Beranda, klik tombol **"Baca Materi"** pada salah satu bab (misalnya Bab 2: *6 Prinsip Dasar Asuransi*).
2. Baca ringkasan materi yang disajikan secara profesional namun sederhana.
3. Di bagian bawah bab, kerjakan **Kuis Kilat** (2 soal per bab). Pilih salah satu jawaban. Anda akan melihat secara instan apakah jawaban Anda benar (hijau) atau salah (merah) beserta **Pembahasan Detail**.
4. Selesaikan kuis untuk menandai bab tersebut sebagai **Selesai**. Anda akan melihat progress bar dan status di Beranda diperbarui secara otomatis.

### Langkah C: Menguji Simulasi Tryout Ujian
1. Klik menu **"Tryout"** di menu navigasi bawah atau klik tombol **"Mulai Simulasi Tryout"** di Beranda.
2. Klik **"Mulai Ujian Sekarang"**. Timer mundur 20 menit akan berjalan di pojok kiri atas.
3. Jawab 20 soal pilihan ganda yang ditampilkan satu per satu. Soal diacak setiap kali Anda memulai tryout baru agar tidak membosankan. Gunakan tombol **"Berikutnya"** dan **"Sebelumnya"** untuk berpindah soal.
4. Jika sudah selesai, klik **"Selesaikan Ujian & Lihat Skor"**.
5. Di Halaman Hasil, Anda akan melihat skor akhir (lulus jika $\ge$ 70) dan statistik waktu pengerjaan.
6. Klik **"Lihat Ulasan Pembahasan Soal"** untuk melihat lembar ulasan lengkap: mana soal yang Anda jawab dengan benar/salah beserta penjelasan detail berkonteks asuransi umum Indonesia.

### Langkah D: Menguji Penyimpanan Progres (LocalStorage)
1. Setelah Anda menyelesaikan tryout atau bab belajar, segarkan (*refresh* / tekan F5) halaman web tersebut.
2. Perhatikan bahwa nilai terbaik tryout dan jumlah modul selesai tetap tersimpan di dashboard berkat integrasi `LocalStorage`.
