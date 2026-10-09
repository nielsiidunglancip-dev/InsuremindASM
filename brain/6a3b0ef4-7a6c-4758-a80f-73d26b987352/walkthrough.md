# Walkthrough - TRAINING AGENCY (Local Desktop MVP v1.0)

Aplikasi **TRAINING AGENCY** telah selesai dibangun dan diverifikasi secara menyeluruh sesuai dengan spesifikasi PRD. Aplikasi bekerja 100% offline dengan penyimpanan lokal SQLite (`training_agency.db`) dan antarmuka modern yang responsif.

---

## 🚀 Fitur yang Telah Diimplementasikan

### 1. Sistem Autentikasi & Public Dashboard (Bebas PII)
- **Admin Panel**: Login akun admin dengan username & password (default: `admin` / `admin123`).
- **Public Dashboard**: Dapat diakses tanpa login atau switch dari admin bar. Menyajikan ringkasan statistik dan leaderboard ranking yang telah disanitasi dari data sensitif (**tanpa Email, tanpa NIK, tanpa No. HP**).

### 2. Manajemen Kurikulum (Level & Subject)
- Jenjang berjenjang: **Basic**, **Intermediate**, **Advance** (CRUD Level, reorder urutan, status active/inactive).
- **Subject Management**: Setiap materi memiliki opsi **Required** (syarat kelulusan level) atau **Optional**, serta terhubung langsung ke Master Training.

### 3. Master Training & Pelaksanaan Batch
- Katalog materi dengan penanda `has_quiz` dan `passing_grade` (default: 75).
- Pengelolaan batch acara (tanggal, trainer, lokasi, status `Scheduled` / `Ongoing` / `Completed` / `Cancelled`).
- **Interactive Batch Grid**: Pengubahan kehadiran (`Hadir` / `Tidak Hadir` / `Belum`) & input nilai quiz langsung dengan badge `PASS` / `FAIL` serta indikator `Subject Completed` real-time.

### 4. Engine Kalkulasi Otomatis (Core Rule MVP)
- **Subject Completion**:
  - Training tanpa Quiz: Kehadiran `Hadir` $\rightarrow$ Subject Selesai.
  - Training dengan Quiz: Kehadiran `Hadir` DAN Hasil Quiz `PASS` (Nilai $\ge$ passing grade) $\rightarrow$ Subject Selesai.
  - Deduplikasi: Keikutsertaan berulang tidak menduplikasi jumlah subject selesai.
- **Level Progress & Kelulusan**:
  - `Progress % = (Completed Required Subjects / Total Required Subjects) * 100%`.
  - Status otomatis: `Belum Mulai` (0%), `In Progress` (1-99%), `Lulus` (100%).

### 5. Detail Profil & Progress Agen (Modal Visual)
- Menampilkan card progress tiap jenjang (Basic, Intermediate, Advance) dengan progress bar.
- Checklist subject detail (Status `Completed` vs `Belum`, nama training kualifikasi, skor quiz).
- Riwayat pelaksanaan training lengkap dalam bentuk tabel log tanggal dan batch.

### 6. Copy-Paste Import Data (dengan Preview & Validasi)
- **Import Peserta**: Paste dari Excel/CSV $\rightarrow$ validasi format email, cek duplikasi DB, nama wajib $\rightarrow$ tabel preview status `VALID` / `INVALID` $\rightarrow$ commit import.
- **Import Nilai Quiz**: Paste `Email [tab] Nilai` $\rightarrow$ validasi email terdaftar di batch, rentang nilai 0-100 $\rightarrow$ hitung otomatis `PASS`/`FAIL` $\rightarrow$ commit import.
- **Batch Add Peserta**: Paste daftar email langsung ke suatu sesi training.

### 7. Ranking Leaderboard & Export CSV
- Leaderboard peringkat berdasarkan rata-rata skor quiz (`Average Score = Total Score / Total Quiz`).
- Podium Top 3 (🥇 Gold, 🥈 Silver, 🥉 Bronze).
- Filter dinamis berdasarkan Master Training, Level, dan Cabang.
- **Export Data CSV**: Export Peserta, Export Ranking, dan Export Riwayat Training ke file `.csv`.

### 8. Backup & Restore Database SQLite
- 1-Klik tombol **"Buat Backup Sekarang"** ke direktori `backups/backup_training_agency_YYYY-MM-DD_HH-mm-ss.db`.
- Tabel riwayat file backup dengan ukuran file dan tanggal pembuatan.
- Fitur **Restore Database** dengan dialog konfirmasi aman dan auto-backup otomatis.
- File peluncur Windows: `start-app.bat`.

---

## 🧪 Hasil Pengujian & Verifikasi

### 1. Automated Logic & Calculation Tests
File test: [`test/verify_calculations.js`](file:///d:/AI%202/aplikasi%20training%20agt/test/verify_calculations.js)

```bash
> node test/verify_calculations.js
--- STARTING AUTOMATED PRD VERIFICATION TESTS ---
✓ Test 1: Budi Level Progress: [ 'Basic: 2/4 (50%) - In Progress', 'Intermediate: 0/3 (0%) - Belum Mulai', 'Advance: 0/3 (0%) - Belum Mulai' ]
✓ Test 2: Quiz Failure correctly leaves subject as Incomplete (Attendance=Hadir, Result=FAIL)
✓ Test 3: Training with NO Quiz completes subject upon Hadir
✓ Test 4: Import Peserta Validation -> Valid: 2, Invalid: 2
✓ Test 5: Import Quiz Validation -> Valid: 1, Invalid: 2
✓ Test 6: Database backup created successfully -> backup_training_agency_2026-09-06_16-37-22.db (64.0 KB)
=============================================
ALL PRD ACCEPTANCE CRITERIA AUTOMATED TESTS PASSED SUCCESSFULLY!
=============================================
```

### 2. Rekaman Verifikasi Browser E2E
Sesi pengetesan interaktif di browser telah direkam:
![Rekaman Verifikasi Aplikasi Training Agency](file:///C:/Users/ASM/.gemini/antigravity-ide/brain/6a3b0ef4-7a6c-4758-a80f-73d26b987352/training_agency_walkthrough_1788712677328.webp)

---

## 💻 Cara Menjalankan Aplikasi

Aplikasi dapat dijalankan secara lokal dengan langkah berikut:

### Opsi 1: Klik Ganda (Windows 1-Click)
Cukup klik ganda pada file [`start-app.bat`](file:///d:/AI%202/aplikasi%20training%20agt/start-app.bat).

### Opsi 2: Terminal / Command Prompt
```bash
# Menjalankan server aplikasi
npm start

# Atau untuk development mode:
# Terminal 1:
npm run dev:server
# Terminal 2:
npm run dev:client
```
Buka browser pada alamat: **`http://localhost:5000`**
Akun Admin Default: **`admin`** / **`admin123`**
