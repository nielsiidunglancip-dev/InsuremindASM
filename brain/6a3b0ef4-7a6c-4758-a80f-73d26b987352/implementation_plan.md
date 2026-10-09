# Implementation Plan - TRAINING AGENCY (Local Desktop MVP v1.0)

Aplikasi desktop/lokal **TRAINING AGENCY** dirancang khusus untuk mengelola data peserta/agen, kurikulum berjenjang (Level & Subject), master training, batch pelaksanaan, kehadiran & quiz, penghitungan otomatis progress & kelulusan level, leaderboard ranking, import copy-paste dengan validasi, backup/restore database SQLite, dan public dashboard tanpa login.

---

## User Review Required

> [!IMPORTANT]
> **Arsitektur & Tech Stack**:
> - **Backend**: Node.js + Express + `better-sqlite3` (atau `sqlite3`) yang ringan, cepat, dan 100% offline.
> - **Frontend**: React (Vite) + Tailwind CSS + Lucide Icons + Recharts untuk UI dashboard modern, interaktif, dan responsif.
> - **Desktop Runner**: Electron integration / local standalone launcher dengan script `npm start` & `.bat` helper untuk pengalaman desktop Windows yang mulus.
> - **Database**: SQLite lokal (`training_agency.db`) dengan direktori `backups/` untuk fitur Backup & Restore instan.

---

## Proposed Changes

### 1. Project Initialization & Database Layer

#### [NEW] Database Schema & Migration (`server/db/schema.sql`, `server/db/index.js`)
- Inisialisasi SQLite database `training_agency.db`.
- Tabel:
  - `admins`: `id`, `username`, `password_hash`, `name`, `created_at` (default admin: `admin` / `admin123`)
  - `training_levels`: `id`, `name`, `order_index`, `status` (`active`/`inactive`), `created_at` (Default: Basic, Intermediate, Advance)
  - `subjects`: `id`, `level_id`, `name`, `is_required` (1/0), `status` (`active`/`inactive`), `created_at`
  - `trainings`: `id`, `code`, `name`, `subject_id`, `has_quiz` (1/0), `passing_grade` (default 75), `status`, `created_at`
  - `training_sessions`: `id`, `training_id`, `batch_name`, `date`, `trainer`, `location`, `status` (`Scheduled`, `Ongoing`, `Completed`, `Cancelled`), `notes`, `created_at`
  - `participants`: `id`, `name`, `email` (UNIQUE), `nik`, `phone`, `branch`, `status`, `created_at`
  - `session_participants`: `id`, `session_id`, `participant_id`, `attendance` (`Hadir`, `Tidak Hadir`, `Belum`), `status` (`Registered`, `Completed`), `completed_at`, `notes`
  - `quiz_scores`: `id`, `session_id`, `participant_id`, `score` (0-100), `result` (`PASS`/`FAIL`), `created_at`
- Helper auto-seed data (Level: Basic, Intermediate, Advance, sample subject, training, batch, dan peserta untuk demo langsung).

---

### 2. Core Business Logic Engine (Backend Services)

#### [NEW] `server/services/calculationService.js`
- **Subject Completion Rule**:
  - Jika Training `has_quiz = 0`: `Attendance = 'Hadir'` $\rightarrow$ Subject Completed.
  - Jika Training `has_quiz = 1`: `Attendance = 'Hadir'` DAN `Quiz Result = 'PASS'` (Score $\ge$ passing grade) $\rightarrow$ Subject Completed.
  - Multi-batch deduplication: Agen yang ikut training berulang kali tidak menduplikasi penyelesaian subject.
- **Level Progress & Graduation**:
  - `Progress % = (Completed Required Subjects / Total Required Subjects) * 100`
  - Status: `Belum Mulai` (0%), `In Progress` (1-99%), `Lulus` (100% required subjects terpenuhi).
- **Ranking Engine**:
  - Menghitung rata-rata quiz score per peserta (`AVG(score)`).
  - Filter ranking berdasarkan level, training master, dan cabang.

#### [NEW] `server/services/importService.js`
- **Copy-Paste Peserta Parser & Validator**: Parsing teks multi-line (TSV/CSV/Clipboard), validasi duplikasi email, format nama.
- **Copy-Paste Quiz Nilai Parser & Validator**: Parsing `email [tab/comma] score`, validasi keberadaan email di database peserta, validasi registrasi di session/batch, validasi rentang skor 0–100, preview valid/invalid baris beserta error reason.

#### [NEW] `server/services/backupService.js`
- Backup manual SQLite database ke folder `backups/training_agency_backup_YYYY-MM-DD_HHmmss.db`.
- Restore database dari file `.db` yang dipilih dengan konfirmasi aman.
- Export CSV data (Peserta, Ranking, Training History).

---

### 3. REST API Layer (`server/routes/`)

- `auth.js`: Login admin, cek session, update profile/password.
- `dashboard.js`: Ringkasan metrik (total peserta, training, batch, quiz, avg score, distribusi kelulusan per level, top peserta).
- `curriculum.js`: CRUD Level & CRUD Subject (toggle required, active/inactive).
- `trainings.js`: CRUD Training Master & CRUD Pelaksanaan/Batch.
- `participants.js`: CRUD Peserta, Detail Progress Agen (semua level, subject status, timeline training), Export CSV peserta.
- `sessions.js`: Kelola peserta per batch, update attendance massal/individual, input nilai quiz, import copy-paste nilai & peserta.
- `ranking.js`: Leaderboard dengan filter (Training, Level, Cabang), Export CSV.
- `public.js`: Public leaderboard & statistik (sanitized: tanpa NIK, Email, No. HP).
- `system.js`: Backup database, restore database, list backups, download/upload database.

---

### 4. Frontend Application (React SPA + Tailwind CSS + Lucide)

#### [NEW] Struktur Halaman & Komponen (`client/src/`)
- **Layout & Navigation**:
  - Sidebar bernuansa modern dengan navigasi cepat:
    - 📊 **Dashboard** (KPI Cards, Level Completion Overview, Top Chart, Recent Activity)
    - 👥 **Peserta / Agen** (Daftar agen, filter cabang/status, modal detail progress lengkap & riwayat, CRUD, modal import copy-paste peserta)
    - 📚 **Kurikulum** (Level & Subject manager, set Required toggle, reorder)
    - 🎓 **Master Training** (Daftar materi training, passing grade, toggle has_quiz)
    - 📅 **Pelaksanaan / Batch** (Daftar batch, status badge, tab Peserta Batch, tab Kehadiran, tab Input/Import Nilai Quiz)
    - 🏆 **Ranking & Leaderboard** (Tabel ranking dinamis, filter cabang/level/training, badge medali)
    - ⚙️ **Settings & Backup** (Backup database 1-klik, Restore database, Export CSV, ganti password)
    - 🌐 **Public Mode View** (Tampilan leaderboard publik aman tanpa login untuk proyektor/layar bersama)
- **Komponen Spesifik**:
  - `AgentProgressModal.jsx`: Visual progress bar per level (Basic/Intermediate/Advance), checklist status subject (Lengkap/Belum), tabel history pelaksanaan.
  - `CopyPasteImportModal.jsx`: Area paste fleksibel, tabel preview interaktif dengan status hijau (VALID) & merah (INVALID), tombol Import record valid.
  - `AttendanceQuizManager.jsx`: Input grid cepat untuk kehadiran & nilai quiz dengan auto-calculate PASS/FAIL secara real-time.

---

### 5. Packaging & Local Desktop Execution

- Scripts `package.json` untuk menjalankan frontend & backend secara simultan (`npm run dev` / `npm start`).
- Electron wrapper / local browser launcher (`npm run desktop`) agar terasa seperti aplikasi native desktop Windows.

---

## Verification Plan

### Automated & Unit Tests
1. Uji logika kalkulasi subject completion (`has_quiz = 0` vs `has_quiz = 1`, pass vs fail).
2. Uji formula progress level dan status `Belum Mulai`, `In Progress`, `Lulus`.
3. Uji parser import copy-paste (validasi format TSV, CSV, spasi ganda, email tidak terdaftar, score di luar 0-100).

### Manual Verification
1. **Flow Kurikulum & Training**:
   - Buat Level (Basic) $\rightarrow$ Buat Subject (Basic Insurance Knowledge - Required) $\rightarrow$ Buat Training Master (has quiz, passing grade 80) $\rightarrow$ Buat Batch 01.
2. **Flow Peserta & Import**:
   - Import peserta via Copy-Paste.
   - Daftarkan peserta ke Batch 01.
3. **Flow Kehadiran & Quiz**:
   - Set kehadiran `Hadir`.
   - Import nilai quiz via copy-paste (`budi@email.com 85` $\rightarrow$ PASS, `andi@email.com 60` $\rightarrow$ FAIL).
   - Verifikasi bahwa Budi mendapat status Subject Complete & Level Basic 100% Lulus, sedangkan Andi belum lulus subject.
4. **Flow Public Dashboard**:
   - Akses Public Dashboard dan pastikan email/NIK/No HP **tidak muncul**.
5. **Flow Backup & Restore**:
   - Klik Backup $\rightarrow$ verifikasi file backup terbuat di folder `backups/`.
   - Ubah data $\rightarrow$ lakukan Restore dari backup $\rightarrow$ verifikasi data kembali ke kondisi semula.
