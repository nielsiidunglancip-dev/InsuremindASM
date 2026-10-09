# Rencana Implementasi - AI Underwriting Assistant

Dokumen ini merangkum usulan arsitektur, langkah-langkah implementasi, dan pilihan desain untuk membangun **AI Underwriting Assistant (Sistem Skoring Surety Bond & KBG)** berdasarkan dokumen Product Requirements Document (PRD) yang disediakan.

## Tinjauan Pengguna Diperlukan

> [!IMPORTANT]
> Untuk memastikan aplikasi mudah dijalankan dan diuji secara lokal di komputer Windows Anda, kami mengusulkan untuk mensimulasikan dependensi infrastruktur eksternal (seperti PostgreSQL, MinIO, dan server OCR berbasis GPU) dengan tetap mempertahankan logika frontend/backend serta antarmuka pengguna yang tepat sesuai spesifikasi. Silakan tinjau pilihan di bawah ini.

1. **Teknologi Stack**:
   - **Frontend**: Aplikasi Web modern yang dibangun menggunakan React.js (melalui Vite) dan dirancang dengan Vanilla CSS premium (desain gelap/glassmorphism yang premium).
   - **Backend**: Python FastAPI atau Node.js (Express). Kami merekomendasikan Python FastAPI karena integrasinya yang mulus dengan pemrosesan data dan potensi pustaka AI, namun kita juga dapat menggunakan Node.js jika Anda lebih menyukainya.
2. **Database & Penyimpanan**:
   - **Database**: SQLite (berbasis file lokal) alih-alih PostgreSQL/MySQL untuk membuat konfigurasi lokal menjadi instan (zero-config).
   - **Penyimpanan Objek (Object Storage)**: Direktori lokal (`./storage`) yang mensimulasikan MinIO/S3.
3. **Mesin AI & OCR (Offline)**:
   - Untuk demo lokal, kami mengusulkan simulasi hasil OCR dan pemeriksaan kualitas gambar (blur) dengan respons yang realistis (misalnya, mengekstrak tabel laporan keuangan saat PDF diunggah, mendeteksi gambar buram jika diuji khusus, dan menyediakan panel pengeditan side-by-side).

---

## Pertanyaan Terbuka

> [!WARNING]
> Harap berikan detail mengenai hal-hal berikut untuk membantu kami mengimplementasikan sistem secara presisi:

1. **7 Rasio Keuangan Kunci**:
   - PRD menyebutkan perhitungan 7 rasio keuangan kunci (termasuk DER / Debt-to-Equity Ratio, dan Arus Kas). Bisakah Anda merinci 7 rasio keuangan apa saja yang ingin dihitung dan dibandingkan dengan standar industri?
   - *Rekomendasi dari kami*:
     1. Debt-to-Equity Ratio (DER)
     2. Current Ratio (Rasio Lancar)
     3. Operating Cash Flow (Arus Kas Operasional)
     4. Net Profit Margin (NPM)
     5. Return on Equity (ROE)
     6. Debt Service Coverage Ratio (DSCR)
     7. Accounts Receivable Turnover / Periode Koleksi Piutang
2. **Kriteria Skoring 5 Dimensi**:
   - Bagaimana skor untuk masing-masing dari 5 dimensi berikut dihitung?
     * **Keuangan (35%)**: Dihitung dari 7 rasio keuangan di atas?
     * **Pengalaman (20%)**: Berdasarkan lama tahun beroperasi atau jumlah proyek yang sukses?
     * **Legalitas (15%)**: Berdasarkan checklist kelengkapan dokumen (NIB, Akta Pendirian, dll.)?
     * **Karakter (15%)**: Berdasarkan hasil pemeriksaan SLIK / Blacklist?
     * **Proyek (15%)**: Berdasarkan nilai kontrak atau jenis proyek?
   - Apakah skor ini diisi secara manual oleh Analis saat verifikasi, atau dihitung otomatis berdasarkan kuesioner/checklist?
3. **10 Dokumen Wajib**:
   - Bisakah Anda merinci 10 dokumen wajib yang diperlukan untuk pengajuan?
   - *Rekomendasi dari kami*:
     1. Formulir Permohonan
     2. Kontrak / SPK Proyek
     3. Laporan Keuangan (Audit/Internal) 3 Tahun Terakhir
     4. Rekening Koran 3 Bulan Terakhir
     5. Dokumen SLIK OJK Pengurus
     6. Bukti Cek Blacklist (Daftar Hitam)
     7. Legalitas Perusahaan (Akta Pendirian & Perubahan)
     8. NIB (Nomor Induk Berusaha) & Izin Usaha
     9. NPWP Perusahaan & Pengurus
     10. Profil Perusahaan (Company Profile)
4. **Early Red Flags & Blacklist**:
   - Apa saja kriteria "Kolektabilitas Pengurus" yang memicu penolakan otomatis (*Auto-Rejected*)? PRD menyebutkan "Golongan 3, 4, 5 atau masuk blacklist". Apakah ada kriteria tambahan lainnya?
5. **Format Credit Memo**:
   - Apakah ada format atau desain khusus untuk dokumen PDF *Credit Memo* yang dihasilkan dari server, atau dapat kami desain template evaluasi kredit standar profesional lengkap dengan rincian skor dan blok tanda tangan?

---

## Rencana Perubahan Struktur Proyek

Berikut adalah usulan struktur direktori proyek:

```
d:/AI 2/DICKY/
├── backend/                  # Backend FastAPI
│   ├── app/
│   │   ├── api/              # Endpoint API (auth, prospek, skoring, konfigurasi)
│   │   ├── core/             # Logika bisnis (kalkulasi rasio, formula skoring, red flags)
│   │   ├── db/               # Model database SQLite & konfigurasi sesi
│   │   ├── services/         # Simulasi layanan AI/OCR, pembuatan PDF/Excel
│   │   └── main.py           # Entry point FastAPI
│   ├── requirements.txt      # Dependensi Python
│   └── run.bat               # Shortcut untuk menjalankan backend
├── frontend/                 # Frontend Vite + React
│   ├── src/
│   │   ├── components/       # Komponen UI bersama (Layout, Card, Chart)
│   │   ├── context/          # Auth / State Management (Logika RBAC)
│   │   ├── views/            # Dasbor, Input Marketing, Side-by-Side Analis, Keputusan Komite, Pengaturan Admin
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   └── run.bat               # Shortcut untuk menjalankan frontend
└── run_all.bat               # Shortcut untuk menjalankan backend & frontend bersamaan
```

---

## Rencana Verifikasi

### Pengujian Otomatis (Automated Tests)
- Membuat pengujian unit (unit tests) Python untuk:
  - Kalkulasi rasio keuangan.
  - Formula perhitungan skor 5 dimensi.
  - Pemeriksaan otorisasi berbasis peran (RBAC).
- Menguji pembuatan PDF *Credit Memo*.

### Verifikasi Manual
- **Alur Peran Marketing**: Masuk sebagai Marketing, membuat profil prospek, mengunggah dokumen, dan memverifikasi penolakan otomatis (*Auto-Rejected*) jika data SLIK melanggar aturan awal.
- **Alur Peran Analis**: Masuk sebagai Analis, melihat perbandingan hasil OCR secara *side-by-side*, melakukan koreksi data, memverifikasi penolakan otomatis akibat anomali rasio keuangan/arus kas, serta mengekspor data ke Excel.
- **Alur Peran Komite**: Masuk sebagai Komite, meninjau hasil skor, memberikan persetujuan, dan mengunduh berkas *Credit Memo* PDF.
- **Alur Peran Admin**: Masuk sebagai Admin, memodifikasi nilai batas dinamis (misalnya batas DER, bobot dimensi) dan memastikan hasil skor prospek diperbarui secara real-time.
