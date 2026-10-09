# Walkthrough: Integrasi PPTX Proposal Generator & PPT Builder

Dokumen ini mendokumentasikan implementasi penggabungan modul frontend dengan Express API backend untuk pembuatan proposal PowerPoint secara dinamis.

## 🛠️ Perubahan yang Dilakukan

### 1. File Frontend: [app.js](file:///d:/AI/Antigravity/app.js)
Telah ditambahkan fungsi-fungsi logika proposal ke dalam objek global (`window`) di akhir berkas:
* `switchProposalTab(tabId)`: Menangani perpindahan tab di menu Penawaran/Proposal (Quotation Baru, Riwayat, Download Template, dan PPT Builder) dengan efek kelas aktif pada tombol navigasi serta visibilitas kontainer.
* `checkPptxBackend()`: Melakukan pemeriksaan status koneksi ke endpoint `/api/health` server backend secara real-time. Memperbarui titik status visual (`online`, `offline`, atau `checking`) di panel PPT Builder.
* `openPptxBuilderTab()`: Menarik data kalkulasi premi terakhir dari form quotation utama secara otomatis (nama nasabah, jenis asuransi, nilai pertanggungan, dan premi tahunan) dan mengisinya ke dalam formulir PPT Builder. Mengambil nama lengkap agen aktif dari sesi masuk (`sessionStorage`) dan merender preview slide secara instan.
* `updatePptxPreview()`: Memperbarui kartu pratinjau thumbnail slide PowerPoint (Slide 1 Cover & Slide 2 Ringkasan Tabel Premi) di peramban setiap kali pengguna mengubah data pada formulir input.
* `downloadProposalPptx()`: Melakukan pengiriman data formulir JSON ke backend `/api/generate-pptx` secara asinkronus (dengan penanganan status loading tombol) dan menginisiasi unduhan otomatis berkas `.pptx` hasil kompilasi server ke komputer pengguna.
* **Event Listeners**: Mendaftarkan event listener `input` pada kelima input form PPT Builder untuk memperbarui rendering preview secara langsung.

### 2. File Dokumentasi: [system_documentation.md](file:///C:/Users/ASM/.gemini/antigravity-ide/brain/66f6edf6-3087-42fb-982d-e2ccd0dbfe85/system_documentation.md)
* Memperbarui catatan kepatuhan di akhir dokumen dari status "Integrasi Frontend Masa Depan" menjadi "Integrasi Frontend Selesai" dan mendokumentasikan kesuksesan integrasi API server-side dan client-side.

---

## 🧪 Pengujian & Verifikasi

### 1. Menjalankan Server Backend
Express backend server telah dinyalakan secara background:
```bash
node server.js
```
* **Hasil**: Berhasil dimuat dan melacak 256 potongan materi PDF serta mendengarkan permintaan di port `3001` (`http://localhost:3001`).

### 2. Pengujian Endpoint via Request Mandiri
Dibuat skrip pengujian `/api/generate-pptx` di folder `scratch/` untuk mengirimkan payload simulasi dan menuliskan respon biner ke dalam berkas `test_output.pptx`.
* **Parameter Uji**:
  * Nama Nasabah: `"Budi Santoso"`
  * Jenis Asuransi: `"Asuransi Kendaraan All Risk"`
  * UP: `Rp 250.000.000`
  * Premi: `Rp 5.725.000`
* **Hasil**: Berhasil memperoleh data biner dengan ukuran file **100.13 KB** yang tersimpan valid di sistem.
