# Walkthrough: Modul Gamifikasi "Kokpit Pesawat" ✈️

Fitur baru Modul Gamifikasi Target Trip Agen dengan konsep Dashboard Kokpit Pesawat telah berhasil diimplementasikan sesuai rencana.

## Apa Saja yang Berubah?

### 1. Antarmuka Baru (Dashboard Kokpit)
Menambahkan section khusus di Dashboard Agen (di kolom sebelah kanan) dengan fitur-fitur berikut:
- **Header Manifes:** Menampilkan status kapten beserta persentase perjalanan secara real-time.
- **Dropdown Manifes & Panel Instrumen:** Agen dapat mengganti jenis perhitungan target (Non SSC, SSC, Bonding). Angka GPW, NGPW, dan kalkulasi kekurangan Profit akan otomatis berhitung mundur atau update.
- **Kompas Radar (Jalur Vertikal):** Menampilkan animasi pesawat yang mendaki posisi berdasarkan target (Takeoff -> Bromo -> Jepang -> Santorini).
- **Tombol Checkpoint 👁️:** Mengaktifkan Modal FOMO untuk setiap destinasi yang di-klik untuk membangkitkan rasa FOMO.

### 2. Logika Aturan Main (Backend Simulation)
- **Logika Posisi Pesawat (OR):** Posisi avatar pesawat di kompas radar dihitung dari nilai persentase tertinggi antara pencapaian `GPW vs Target GPW` **ATAU** `NGPW vs Target NGPW`.
- **Logika Tangki Bahan Bakar (AND):** Visual tangki bensin pesawat (Fuel Gauge) berdiri secara independen. Syarat mendarat sah bergantung pada pencapaian profit:
  - 🔴 **Merah:** Profit sangat kurang (< 50%)
  - 🟡 **Kuning:** Profit cukup lumayan (50% - 99%)
  - 🟢 **Hijau (Sah):** Profit tercapai penuh (100%+)

### 3. Otomasi AI Co-Pilot (Mockup)
Ketika terjadi perubahan manifes atau setiap load dashboard, Co-Pilot AI akan memvalidasi posisi pesawat dan sisa tangki profit. 
- Jika pesawat telah melewati Jepang (mis. 60% perjalanan) namun tangki profit belum 100%, Co-Pilot akan muncul memperingatkan: *"Kapten! Secara premi kita sudah di langit Jepang, tapi tangki Profit kita kurang Rp X Juta lagi..."*
- Pesan otomatis beradaptasi dengan status profit (kurang vs sudah mendarat sah).

## Cara Uji Coba

1. Buka kembali halaman Dashboard utama dan login sebagai **Agen (Rian)**.
2. Lihat kolom sebelah kanan, di bawah bagian target Radial, temukan panel **Dashboard Kokpit Pesawat**.
3. **Coba ubah Dropdown Manifes** dari "Non SSC" menjadi "SSC" atau "Bonding". Perhatikan Panel Instrumen, warna tangki bahan bakar, dan posisi pesawat yang bergeser secara interaktif.
4. Klik **ikon Mata (👁️)** di salah satu titik destinasi (misal Santorini) untuk memunculkan pesan FOMO.
5. Perhatikan notifikasi cerdas pada **Kotak Co-Pilot AI** di bawah radar!
