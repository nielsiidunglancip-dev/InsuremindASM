# Walkthrough: Pembaruan Persiapan Uji Kompetensi LSP

Fitur **Persiapan Sertifikasi Uji Kompetensi LSP** telah berhasil diperbarui dan ditingkatkan interaktivitasnya sesuai dengan rencana.

> [!NOTE]
> Semua fungsi ini telah dihubungkan langsung ke *local storage* untuk sesi saat ini agar Anda bisa langsung menguji (test) interaksinya dari sisi Agen dan Trainer tanpa memerlukan backend database sungguhan.

## Perubahan yang Telah Dilakukan

### 1. Modul Silabus & Materi Pembelajaran Dinamis
- **Silabus Berubah Sesuai Pilihan Skema:** Saat Anda mengganti dropdown "Pilih Jenjang Kualifikasi Sertifikasi" antara **Level 3**, **Level 4 - Bonding**, dan **Level 4 - PAYDI**, daftar *Unit Kompetensi SKKNI Wajib* di bawahnya akan seketika berubah.
- **Video Pembelajaran Menyesuaikan Skema:** Iframe video YouTube juga akan menampilkan video yang berbeda untuk setiap Level kualifikasi yang dipilih.
- **Materi Belajar Tambahan:** Menambahkan kotak **Materi Pembelajaran Persiapan Uji Kompetensi** lengkap dengan tombol `📖 Baca Materi` dan `⬇️ Unduh PDF` (menggunakan fungsi Javascript sementara).

### 2. Tombol Pendaftaran Uji Kompetensi & Logika Cerdas
- Menambahkan tombol **"Daftar Ikut Uji Kompetensi"** (berwarna oranye terang) di sebelah kanan.
- Sistem akan otomatis **menonaktifkan (disable)** tombol pendaftaran tersebut jika:
  - Agen tersebut **sudah pernah klik daftar** (tercatat di penyimpanan).
  - Profil Agen tersebut status sertifikasinya sudah **AKTIF**.

### 3. Integrasi Peran (Role) ke Trainer Dashboard
- Saya telah menyematkan tabel khusus **"Pendaftaran Uji Kompetensi LSP"** di dalam halaman **Jadwal & Training Management (Trainer)**.
- Ketika ada agen yang mengklik tombol pendaftaran tadi, data mereka beserta Skema yang mereka pilih akan langsung tercatat dan masuk ke tabel ini untuk dapat ditinjau oleh Trainer.

## Cara Melakukan Verifikasi Manual (Testing)
1. Coba klik dropdown jenjang sertifikasi dan lihat apakah silabus dan video berubah secara otomatis.
2. Coba klik tombol "Daftar Ikut Uji Kompetensi". Notifikasi berhasil akan muncul.
3. Setelah diklik, tombol pendaftaran tersebut tidak akan bisa diklik lagi karena Anda sudah tercatat dalam antrean ujian.
4. (Opsional) Jika Anda masuk sebagai akun *Trainer* (`hendra.wijaya@asm-academy.id`), buka menu Jadwal Training, dan Anda akan melihat data pendaftaran agen di bagian paling bawah.

Silakan muat ulang (refresh) halaman `index.html` pada browser Anda untuk melihat semua perubahan ini!
