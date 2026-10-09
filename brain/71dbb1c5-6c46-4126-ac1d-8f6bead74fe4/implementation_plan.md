# Implementasi Gamifikasi Kokpit Pesawat (Agency Tour Contest 2026)

Tujuan implementasi ini adalah untuk mengubah tampilan dan logika gamifikasi kokpit sesuai dengan dokumen konsep terbaru, mengintegrasikan logika GPW vs NGPW, serta memastikan komponen bahan bakar (Profit) dapat divisualisasikan dengan tepat.

## Proposed Changes

### `index.html`
1. **Dropdown Manifes:** Menambahkan `<select id="manifest-dropdown">` (dengan opsi seperti Semua Produk, Non SSC, SSC, Bonding) di atas widget pencapaian agar agen bisa memilih jenis produk fokus.
2. **Detail Pencapaian Kontes:** Menambahkan atribut `id` pada cell tabel GPW, NGPW, dan Profit agar nilai target dan aktualnya dapat diubah dan dibaca secara dinamis oleh JavaScript.
3. **Modals/Pop-up (Opsional/Dasar):** Menambahkan struktur HTML modal sederhana untuk menampilkan gambar destinasi (hotel bintang 5 / pemandangan) ketika agen mengklik ikon mata 👁️ pada destinasi.

### `app.js`
1. **Data Struktur:** Membuat dummy data `manifestData` yang menyimpan target & realisasi (GPW, NGPW, Profit) untuk masing-masing opsi manifest.
2. **Logika `manifest-dropdown`:** Menambahkan *event listener* pada dropdown untuk memperbarui nilai di tabel "Detail Pencapaian Kontes" saat pilihan diubah.
3. **Pembaruan `renderGamification()`:**
   - Memodifikasi *waypoint* menjadi: Start (Bandara), Level 1 (Malang + Bromo), Level 2 (Japan Ski Adventure), Level 3 (Santorini - Yunani).
   - Menambahkan status header "Kapten [Nama] — Status: Penerbangan menuju [Destinasi] (X% Jarak Tempuh)".
   - Menambahkan tombol *checkpoint* 👁️ di samping setiap destinasi.
4. **Pembaruan `updateAircraftPosition()`:**
   - Menghitung Progres GPW dan NGPW, kemudian mengambil nilai maksimal (`Math.max()`) sebagai koordinat pergerakan pesawat.
   - Menghitung Progres Profit sebagai isi tangki *Fuel Gauge*.
   - Mewarnai tangki profit: Jika progres profit < jarak tempuh pesawat, tangki akan berwarna kuning/merah (Peringatan), namun jika sudah sejajar atau melebihi, berwarna hijau (Aman).
5. **Notifikasi Co-Pilot AI:** Mensimulasikan satu buah notifikasi/alert dari "AI Co-Pilot" saat pesawat kekurangan bahan bakar profit ketika dropdown manifest diubah.

## User Review Required

> [!IMPORTANT]
> Saat ini, data GPW, NGPW, dan Profit masih berupa data simulasi *(dummy/mock)* di bagian *frontend* yang kami sematkan ke dalam variabel JavaScript. Nantinya, data ini perlu disambungkan dengan *database* sungguhan oleh tim *Backend*.

> [!TIP]
> Untuk notifikasi "Co-Pilot AI", kami akan memunculkannya dalam bentuk `alert()` atau notifikasi bawaan UI ketika agen memilih produk tertentu yang profitnya kurang dari syarat pendaratan. 

## Open Questions

1. Apakah Anda memiliki gambar spesifik (URL gambar) yang ingin ditampilkan saat agen menekan ikon 👁️ pada destinasi Malang, Jepang, dan Santorini? Jika tidak, saya akan menggunakan gambar representatif dari Unsplash untuk visualisasi awal.
2. Apakah *Dropdown Manifest* (Pilih Produk) ini diletakkan persis di atas tabel "Detail Pencapaian Kontes" atau di atas grafik batang?

Silakan beri persetujuan Anda jika rencana ini sudah sesuai dengan yang diinginkan!
