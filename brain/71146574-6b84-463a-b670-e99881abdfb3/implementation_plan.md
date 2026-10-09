# Penambahan Modul Gamifikasi Target Trip Agen (Dashboard Kokpit Pesawat)

Fitur ini akan menambahkan elemen gamifikasi berkonsep "Kokpit Pesawat" untuk memantau target pencapaian kontes agen. Fitur akan ditempatkan di bawah bagian "Target Kontes Wisata" pada Dashboard Agen.

## User Review Required

> [!IMPORTANT]
> Harap periksa apakah posisi modul ini di `index.html` (di dalam kolom kanan `dashboard-right-column` tepat di bawah tabel pencapaian kontes) sudah sesuai dengan preferensi Anda.

> [!NOTE]
> Desain akan menggunakan palet warna dan style premium (vibrant colors, glassmorphism, animasi dinamis) sesuai dengan instruksi estetika web application.

## Proposed Changes

---

### Frontend UI (HTML/CSS)

#### [MODIFY] [index.html](file:///d:/AI/Antigravity/index.html)
- Menambahkan section baru `<div class="card cockpit-card">` di dalam `dashboard-right-column` (sekitar baris 713).
- **Header Status**: Teks status penerbangan "Kapten Rian Aditya" dengan avatar.
- **Dropdown Manifes**: Pilihan produk (Non SSC / SSC / Bonding) dan panel instrumen yang merender progress dinamis.
- **Kompas Radar (Jalur Penerbangan)**: Layout vertikal (bottom-to-top) untuk destinasi (Start -> Malang -> Jepang -> Santorini) dengan `<div class="plane-avatar">` yang bergerak.
- **Profit Fuel Gauge**: Tabung vertikal dengan indikator warna dinamis (Merah/Kuning/Hijau) di samping kompas radar.
- **Tombol Checkpoint**: Ikon 👁️ di setiap titik yang memicu modal FOMO.
- **Mockup AI Co-Pilot**: Kotak chat AI di bagian bawah card kokpit.
- **Modal FOMO**: Menambahkan elemen `<div id="fomo-modal">` di akhir body untuk pop-up destinasi.

#### [MODIFY] [style.css](file:///d:/AI/Antigravity/style.css)
- Menambahkan kelas CSS untuk layout `.cockpit-card`, `.flight-map-container`, `.vertical-path`, `.waypoint`, `.plane-avatar`.
- Menambahkan animasi naik turun perlahan (hover/levitate) untuk avatar pesawat.
- Menambahkan desain tabung `.fuel-gauge` dengan transisi warna mulus.
- Menambahkan desain untuk panel instrumen dinamis dan chat box `.ai-copilot-msg` dengan efek glassmorphism/premium glow.
- Styling untuk Modal FOMO.

---

### Logic & Backend (JavaScript)

#### [MODIFY] [app.js](file:///d:/AI/Antigravity/app.js)
- **Data Target & Realisasi**: Menyiapkan variabel state simulasi untuk GPW, NGPW, dan Profit.
- **Logika Pergerakan (OR)**: Fungsi `calculatePlanePosition()` yang mengambil nilai maksimum dari `(Realisasi GPW / Target GPW)` atau `(Realisasi NGPW / Target NGPW)` untuk memposisikan `plane-avatar` secara vertikal.
- **Logika Tangki Bahan Bakar (AND)**: Fungsi `calculateFuel()` yang menghitung `(Realisasi Profit / Target Profit)`. Tabung berubah:
  - Merah (<50%)
  - Kuning (50%-99%)
  - Hijau (>= 100% Target)
- **Update Instrumen**: Fungsi `onManifestChange(type)` yang merespon dropdown untuk memperbarui panel instrumen (angka riil, persentase, sisa profit) secara interaktif.
- **Modal FOMO**: Fungsi `openFomoModal(destination)` untuk memunculkan gambar dan teks liburan mewah.
- **AI Automation**: Simulasi AI (Co-Pilot) yang mengevaluasi status: Jika posisi pesawat sudah melewati Jepang (misal > 60% jarak tempuh) tetapi bahan bakar belum hijau (< 100%), maka akan menampilkan pesan peringatan & rekomendasi target di kotak chat.

## Verification Plan

### Manual Verification
1. Reload aplikasi.
2. Pastikan card "Dashboard Kokpit Pesawat" muncul di kolom kanan.
3. Ubah opsi di Dropdown Manifes dan pastikan angka di Panel Instrumen berubah.
4. Cek visual indikator posisi pesawat (bergerak naik) berdasarkan logika maksimum dari persentase GPW/NGPW.
5. Cek warna Fuel Gauge sesuai dengan persentase Profit.
6. Klik ikon Mata (👁️) di setiap destinasi, pastikan Modal FOMO muncul.
7. Pastikan ada peringatan dari Co-Pilot AI jika Profit belum terpenuhi (skenario tangki bensin kurang).
