# Walkthrough - AI Underwriting Assistant

Sistem Skoring Surety Bond & KBG (AI Underwriting Assistant) telah berhasil diimplementasikan sepenuhnya dengan arsitektur web modern yang premium.

## Rincian Fitur Utama yang Berhasil Dibuat

1. **Role-Based Access Control (RBAC) & Autentikasi**:
   - Sistem login terintegrasi menggunakan token JWT.
   - Deteksi otomatis peran pengguna (*Marketing*, *Analis*, *Komite*, *Admin*) untuk membatasi aksi dan modul yang terlihat di dasbor.
   - Panel **Akses Cepat** (Quick Login) disematkan di halaman Login untuk mempermudah perpindahan antar-peran saat simulasi.
2. **Dasbor & KPI Utama**:
   - Menampilkan total pengajuan, jumlah yang disetujui, jumlah yang ditolak, dan jumlah pengajuan yang memicu *Red Flag*.
   - Tabel responsif yang menyajikan daftar prospek beserta indikator status, skor kelayakan, dan detail peringatan.
3. **Formulir Pengajuan Prospek (Marketing)**:
   - Formulir pendaftaran nasabah baru dengan validasi data masukan seperti nilai kontrak, jenis proyek, kolektabilitas OJK awal, dan status blacklist.
   - Pembuatan otomatis 10 slot dokumen wajib yang harus diunggah.
4. **Verifikasi Human-in-the-Loop OCR (Analis)**:
   - Antarmuka **Side-by-Side** yang interaktif:
     - **Sisi Kiri**: Simulasi peninjauan fisik dokumen PDF asli yang menampilkan detail laporan posisi keuangan secara terstruktur.
     - **Sisi Kanan**: Tabel koreksi data hasil ekstraksi AI OCR yang dapat langsung diedit oleh Analis untuk memperbaiki pembacaan nominal angka yang salah.
   - Tombol **Bypass Manual** jika dokumen terdeteksi buram (*blur*) atau ditulis tangan.
5. **Mesin Kalkulasi & Red Flag otomatis (Backend)**:
   - Menghitung secara dinamis 7 rasio keuangan kunci: DER, Rasio Lancar, Arus Kas Operasional, Net Profit Margin (NPM), ROE, DSCR, dan Periode Koleksi Piutang (AR Days).
   - Menilai kelayakan akhir berdasarkan 5 dimensi: Keuangan (35%), Pengalaman (20%), Legalitas (15%), Karakter (15%), dan Proyek (15%).
   - Deteksi *Red Flags* otomatis (DER > 3.0, Arus Kas Negatif 3 Tahun Berturut-turut, Kolektabilitas OJK 3/4/5, Masuk Daftar Hitam, dan Dokumen Blur).
6. **Keputusan Komite & Ekspor Dokumen**:
   - Modul persetujuan bagi *Komite* untuk menuliskan catatan pertimbangan serta menentukan status akhir (Setuju / Tolak).
   - Pembuatan dokumen formal **PDF Credit Memo** secara server-side menggunakan ReportLab lengkap dengan detail perhitungan skor dan blok tanda tangan.
   - Ekspor simulasi data keuangan ke berkas **Excel (.xlsx)** lengkap dengan format visual (hijau/kuning/merah) berdasarkan batas toleransi rasio keuangan.
7. **Modul Admin & Audit Trail**:
   - Antarmuka khusus untuk mengubah bobot skoring dan batas parameter rasio keuangan (tanpa *hardcode*).
   - Log aktivitas permanent (**Audit Trail**) mencatat identitas pengguna, aksi (Login, koreksi OCR, keputusan komite, ekspor data), dan stempel waktu.

---

## Petunjuk Penggunaan & Cara Menjalankan Aplikasi

Kami telah menyediakan skrip sekali klik untuk menjalankan frontend dan backend secara otomatis:

1. **Jalankan Aplikasi**:
   - Buka folder proyek di File Explorer: [DICKY (d:/AI 2/DICKY/)](file:///d:/AI%202/DICKY/)
   - Klik dua kali file [run_all.bat](file:///d:/AI%202/DICKY/run_all.bat).
   - File ini akan membuka dua jendela konsol baru: satu untuk backend FastAPI (port `8000`) dan satu untuk frontend React Vite (port `5173`).
2. **Buka Browser**:
   - Akses dasbor melalui alamat: [http://localhost:5173](http://localhost:5173).
3. **Akun Pengguna untuk Pengujian (Quick Login)**:
   - **Marketing**: `marketing` / `marketing123`
   - **Analis**: `analis` / `analis123`
   - **Komite**: `komite` / `komite123`
   - **Admin**: `admin` / `admin123`
   - *Anda dapat mengklik tombol instan di bagian bawah halaman login untuk masuk secara cepat.*

---

## Skenario Pengujian Alur Kerja (End-to-End)

Untuk memvalidasi keandalan sistem, Anda dapat mencoba skenario pengujian berikut:

### Skenario 1: Alur Pengajuan Normal (Lolos Skoring)
1. Login sebagai **Marketing**, klik **Buat Pengajuan** di sidebar.
2. Masukkan data profil nasabah (misal: PT Maju Bersama, nilai kontrak Rp 5.000.000.000, Kolektabilitas OJK Golongan 1, Blacklist: Tidak). Klik **Daftarkan**.
3. Di daftar dokumen, klik **Unggah Berkas** pada dokumen *Laporan Keuangan 3 Tahun Terakhir* (pilih file PDF/gambar apa saja, pastikan nama file tidak mengandung kata "blur").
4. Login kembali sebagai **Analis** (gunakan menu keluar / quick login). Buka detail pengajuan PT Maju Bersama.
5. Anda akan melihat data hasil OCR telah terisi di tabel kanan. Anda dapat mengoreksi angka-angkanya dan klik **Simpan & Verifikasi Koreksi Data**.
6. Login sebagai **Komite**, buka detail pengajuan, lihat hasil analisis skoring 5 dimensi (Skor Akhir & Kategori Kelayakan, misal: Sangat Baik / Baik). Tulis catatan komite, pilih **Setuju**, dan klik **Kirim Keputusan**.
7. Klik tombol **Unduh Credit Memo (PDF)** untuk mengunduh laporan formal hasil underwriting.

### Skenario 2: Deteksi Red Flag & Penolakan Otomatis
1. Login sebagai **Marketing**, buat pengajuan dengan nama perusahaan mengandung kata **"Rugi"** atau **"Krisis"** (misal: PT Semesta Rugi) untuk menguji kondisi kas negatif, atau masukkan Kolektabilitas OJK Golongan 3.
2. Unggah berkas laporan keuangan.
3. Buka detail pengajuan, Anda akan melihat notifikasi **RED FLAGS DETECTED** berwarna merah cerah di bagian atas yang menjelaskan poin pelanggaran risiko. Skor kelayakan akan otomatis turun menjadi kategori **Ditolak / Kurang** karena bobot karakter/keuangan bernilai rendah.

---

## Demonstrasi Visual Aplikasi

Berikut adalah hasil rekaman proses jalannya aplikasi dan tangkapan layar dasbor yang berhasil diautentikasi secara lokal:

### Rekaman Demo Login & Dasbor
![Demo Jalannya Aplikasi](C:/Users/ASM/.gemini/antigravity-ide/brain/4e079e37-d0c3-4519-9a50-630b9a078c1d/verify_authenticated_app_1784165814085.webp)

### Tangkapan Layar Dasbor Marketing
![Dasbor Dicky Marketing](C:/Users/ASM/.gemini/antigravity-ide/brain/4e079e37-d0c3-4519-9a50-630b9a078c1d/marketing_dashboard_1784165880116.png)

