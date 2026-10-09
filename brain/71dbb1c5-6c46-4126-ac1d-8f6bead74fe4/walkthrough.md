# Walkthrough: Pembaruan Kokpit Pesawat "Agency Tour Contest 2026"

Pembaruan besar-besaran telah dilakukan pada modul gamifikasi "Kokpit Pencapaian Agen" untuk menyesuaikan dengan konsep kompetisi yang baru! Berikut adalah ringkasan perubahan dan cara kerjanya.

## Perubahan yang Telah Dilakukan

### 1. Navigasi Destinasi (Waypoints) Baru
Destinasi kontes penerbangan Anda telah diperbarui dari Bronze/Silver/Gold menjadi:
1. **Malang** (Gunung Bromo) - 33% Jarak Tempuh
2. **Jepang** (Japan Ski Adventure) - 66% Jarak Tempuh
3. **Santorini** (Yunani) - 100% Jarak Tempuh

> [!TIP]
> **Ikon Mata 👁️:** Di setiap titik destinasi, Anda dapat mengklik ikon mata untuk menampilkan _pop-up_ gambar eksklusif (hotel berbintang atau pemandangan destinasi) yang berfungsi untuk meningkatkan semangat pencapaian.

### 2. Logika Pergerakan Pesawat (Jarak Tempuh)
Posisi ketinggian/jarak terbang pesawat kini tidak lagi dihitung sembarangan. Sistem mengambil data **GPW** dan **NGPW** dari tabel detail pencapaian Anda, lalu menggunakan persentase yang **paling besar** (Logika OR) sebagai koordinat Y bergeraknya pesawat. Angka persentase ini secara *real-time* ditampilkan di dasbor kemudi kokpit.

### 3. Logika Tangki Bensin (Profit Fuel Gauge)
Bahan bakar (*fuel*) sekarang dikaitkan langsung dengan pencapaian target **Profit** Anda (Logika AND / Syarat Mutlak). Indikator warna diatur secara otomatis:
- 🟩 **Hijau (Aman):** Profit Anda sejalan atau melebihi jarak terbang pesawat. Mendarat sah!
- 🟨 **Kuning (Peringatan):** Pesawat sudah terbang jauh, namun Profit Anda mulai tertinggal.
- 🟥 **Merah (Kritis):** Jarak penerbangan tinggi, tapi Profit Anda terlalu rendah. Hati-hati, pesawat tidak bisa mendarat di destinasi!

### 4. Dropdown Pemilihan Manifes Produk
Di atas tabel "Detail Pencapaian Kontes", kini terdapat menu **Dropdown Manifes**. Ketika Anda mengubah jenis produk (misal: "Semua Produk" ke "SSC"), seluruh angka Target, Tercapai, dan Kurang pada tabel akan otomatis berubah menyesuaikan data *backend* (menggunakan data simulasi untuk saat ini).

### 5. Integrasi Co-Pilot AI 🤖
Ketika Anda memilih produk melalui *dropdown*, sistem akan mengecek kondisi pesawat Anda. Jika pesawat berada di atas namun bahan bakar profit (bensin) Anda masuk ke status Kuning/Merah, Co-Pilot AI akan langsung memicu sebuah peringatan (*alert*) pop-up, misalnya: 
*"Kapten! Jarak tempuh premi kita sudah jauh, tapi tangki Profit tertinggal! Segera kejar target profit agar Anda bisa mendarat sah di destinasi."*

## Langkah Pengujian (Testing)

1. Muat ulang (Refresh) halaman web Anda.
2. Di dasbor Agen, pastikan **Kokpit Pencapaian Agen** sudah tampil di sebelah kiri.
3. Gulir ke bagian **Detail Pencapaian Kontes** di kanan layar.
4. Klik **Dropdown Manifes** dan ubah opsi ke "SSC" atau "Bonding".
5. Perhatikan bagaimana tabel angka berubah, dan pesawat/bahan bakar otomatis terbang/turun menyesuaikan nilai baru!
6. Jangan lupa klik ikon **👁️** pada label Malang/Jepang/Santorini untuk mengintip destinasi impian Anda.
