# Implementasi Gamifikasi Kokpit Pesawat

- [x] Memperbarui `index.html`
  - [x] Menambahkan *Dropdown Manifest* tepat di atas tabel "Detail Pencapaian Kontes".
  - [x] Menambahkan atribut `id` pada cell tabel GPW, NGPW, dan Profit.
  - [x] Menambahkan struktur modal HTML untuk pop-up destinasi dengan gambar.
- [x] Memperbarui `app.js`
  - [x] Membuat objek data simulasi `manifestData`.
  - [x] Menambahkan logika event listener pada dropdown untuk memperbarui tabel pencapaian.
  - [x] Mengubah `renderGamification()`: Memperbarui Waypoint (Malang, Jepang, Santorini), menambahkan status penerbangan di header, dan menambahkan ikon 👁️.
  - [x] Mengubah `updateAircraftPosition()`: Mengubah logika progres berdasarkan nilai maksimum persentase GPW dan NGPW, dan menyesuaikan persentase *Fuel Gauge* berdasarkan Profit.
  - [x] Menambahkan simulasi notifikasi (alert) Co-Pilot AI terkait bahan bakar Profit saat merubah dropdown.
- [x] Verifikasi dan Pengujian
