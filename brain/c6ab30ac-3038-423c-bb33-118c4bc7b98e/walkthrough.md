# Walkthrough - Aplikasi Usher Control (Event Realtime)

Aplikasi web realtime **Usher Control Event** telah berhasil dibangun dan diuji 100% sesuai spesifikasi Dokumen PRD.

---

## 📱 Akses Aplikasi

Server backend dan frontend aktif di:
- **Komputer / Laptop (Lokal)**: [http://localhost:3000](http://localhost:3000)
- **Smartphone (HP Usher & Koordinator di Jaringan Wi-Fi yang sama)**: `http://192.168.21.146:3000`
- **QR Code**: Klik tombol **QR Code** di pojok kanan atas aplikasi atau di halaman awal untuk langsung scan dari kamera HP.
- **PIN Default Koordinator**: `1234`

---

## 🌟 Fitur Utama Sesuai PRD

### 1. Struktur 80 Meja & 6 Zona (Section 6)
- **Zona A (Kiri Atas)**: Usher A1, A2, A3 • Meja 1, 3, 5, 7, 9, 11, 15, 17, 19, 21, 23, 25
- **Zona B (Kiri Tengah)**: Usher B1, B2, B3 • Meja 27, 29, 31, 33, 35, 37, 39, 41, 43, 45, 47, 49
- **Zona C (Kiri Bawah)**: Usher C1, C2, C3 • Meja 51, 53, 55, 57, 59, 61, 63, 65, 67, 69, 71, 73, 75, 77, 79, 81
- **Zona D (Kanan Atas)**: Usher D1, D2, D3 • Meja 2, 6, 8, 10, 12, 16, 18, 20, 22, 26, 28, 30
- **Zona E (Kanan Tengah)**: Usher E1, E2, E3 • Meja 32, 36, 38, 42, 46, 48, 50, 52, 56, 58, 60, 62
- **Zona F (Kanan Bawah)**: Usher F1, F2, F3 • Meja 66, 68, 70, 72, 76, 78, 80, 82, 86, 88, 90, 92, 96, 98, 100, 102

---

### 2. Antarmuka Usher (Prinsip: "LIHAT → TEKAN → SELESAI")
- **Pilih Identitas (S-02)**: Grid 18 usher (A1–F3), tersimpan di memori perangkat.
- **Tugas Masuk (S-04)**: Tampilan visual berkedip + audio notifikasi + vibrasi dengan nomor meja dan zona super besar + tombol **"TERIMA TUGAS & ESCORT"**.
- **Sedang Mengantar (S-03)**: Status **ESCORTING** berwarna biru, tombol besar **"✅ TAMU SUDAH DUDUK (SELESAI)"** untuk langsung kembali ke status **AVAILABLE** (atau pilihan sedang kembali ke pos).
- **Pindah Zona (F-04)**: Tombol pill posisi di atas untuk memperbarui lokasi saat berpindah area dalam 1 tap.
- **Butuh Bantuan (F-09)**: Tombol darurat merah **"BUTUH BANTUAN (ASSIST)"** dengan pilihan alasan siap-pakai (misal: meja penuh, butuh kursi roda, dll).

---

### 3. Dashboard Koordinator (S-05, S-06, S-07)
- **Ringkasan Status**: Counter live (Total 18, Available, Escorting, Returning, Assist, Total Tamu Duduk).
- **Quick Lookup & Dispatch Panel (S-06)**: Masukkan nomor meja (1–102) -> sistem otomatis menampilkan nama zona dan daftar usher yang tersedia di zona tersebut -> tombol 1-tap **"TUGASKAN"**.
- **Backup Lintas Zona (Section 10)**: Jika semua usher di suatu zona sedang escort, sistem menyediakan opsi cepat menggunakan usher backup dari zona lain yang sedang available.
- **Denah Ballroom Interaktif**: Peta 6 zona (Kiri ganjil, Kanan genap) dengan counter usher live dan shortcut klik meja.
- **Assistance Alert Panel (S-07)**: Menampilkan daftar usher yang butuh bantuan lengkap dengan lokasi dan tombol **"✓ SELESAI"**.
- **Reset Event (F-11)**: Tombol reset untuk mengembalikan semua usher ke status AVAILABLE sebelum acara dimulai.

---

## 🧪 Hasil Pengujian Skenario PRD (T-01 s/d T-08)

Semua skenario pengujian di Section 18 PRD telah diuji secara otomatis dan lulus 100%:

| Skenario | Deskripsi | Hasil |
|---|---|---|
| **T-01** | C2 AVAILABLE → Koordinator assign M69 → C2 terima → ESCORTING → Selesai → AVAILABLE | **PASSED ✅** |
| **T-02 & T-06** | D1 sedang ESCORTING → Koordinator tidak dapat menugaskan tugas ganda ke D1 | **PASSED ✅** |
| **T-03** | C1 pindah posisi dari Zona C ke B → Koordinator langsung melihat posisi Zona B | **PASSED ✅** |
| **T-04** | C2 tekan ASSIST → Koordinator menerima notifikasi merah + alasan kendala | **PASSED ✅** |
| **T-05** | Koordinator cari M28 → Sistem otomatis memilih Zona D (D1–D3) | **PASSED ✅** |
| **T-07** | Refresh browser → status terakhir tetap tersimpan di perangkat & server | **PASSED ✅** |
| **T-08** | Multi-device realtime synchronization via Socket.IO | **PASSED ✅** |

---

## 💻 Cara Menjalankan di Lain Waktu

```bash
# Menjalankan server aplikasi (Backend + Frontend Realtime)
npm start

# Atau jalankan mode development:
npm run server  # Terminal 1
npm run dev     # Terminal 2
```
