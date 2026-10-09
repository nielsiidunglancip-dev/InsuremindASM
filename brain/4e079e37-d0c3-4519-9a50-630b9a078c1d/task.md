# Task List - AI Underwriting Assistant

- [x] Inisialisasi Proyek & Database
  - [x] Buat struktur direktori untuk frontend dan backend
  - [x] Konfigurasi database SQLite (skema untuk Users, Prospects, Documents, FinancialData, ScoringConfig, AuditLogs)
  - [x] Buat data awal (seeding) untuk User (Marketing, Analis, Komite, Admin) dan ScoringConfig default

- [x] Implementasi Backend API (FastAPI)
  - [x] Autentikasi & RBAC (Login, JWT token, User Role validation)
  - [x] API Manajemen Prospek & Dokumen (Unggah dokumen, status pengajuan)
  - [x] Simulasi Layanan OCR & AI (Evaluasi resolusi, deteksi blur, ekstraksi tabel finansial)
  - [x] Logika Penghitungan 7 Rasio Keuangan & Skoring 5 Dimensi
  - [x] Logika Evaluasi Red Flags (Pemberian notifikasi/peringatan untuk Kolektabilitas OJK & DER > 3.0)
  - [x] Ekspor ke Excel (.xlsx) & Pembuatan Laporan PDF (Credit Memo) server-side
  - [x] Logger untuk Audit Trail (Mencatat pengguna, waktu, aktivitas secara permanen)

- [x] Implementasi Frontend Web (React + Vite + Vanilla CSS)
  - [x] Setup project Vite React dan styling dasar (CSS variables, layout, dark theme premium)
  - [x] Halaman Login & Deteksi Peran (RBAC)
  - [x] Dasbor Utama (statistik prospek, status pengajuan, notifikasi sistem)
  - [x] Tampilan Role Marketing: Form pembuatan prospek & upload 10 dokumen wajib (dinamis)
  - [x] Tampilan Role Analis: UI Side-by-Side (kiri PDF asli, kanan tabel data keuangan hasil OCR), simulasi & koreksi data, tombol "Bypass Manual"
  - [x] Tampilan Role Komite: Tinjauan skor keseluruhan, detail 5 dimensi, tombol Setuju/Tolak, dan unduh PDF Credit Memo
  - [x] Tampilan Role Admin: Manajemen parameter skor dinamis (bobot dimensi, batas angka DER, standar industri, dll.)

- [x] Integrasi & Pengujian
  - [x] Integrasi API Backend dengan Frontend
  - [x] Buat skrip startup otomatis (`run_all.bat`) untuk menjalankan frontend & backend sekaligus
  - [x] Pengujian manual end-to-end (Marketing -> Analis -> Komite -> Admin)
  - [x] Tinjau kecantikan visual UI dan animasi micro-interactions

