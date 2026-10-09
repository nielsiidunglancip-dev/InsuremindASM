# Implementation Plan - Aplikasi Usher Control Event (Realtime Web App)

Membangun aplikasi web realtime **Usher Control Event** sesuai spesifikasi PRD untuk memantau 18 usher (A1–F3) dan dispatch tamu ke 80 meja (Zona A–F) secara instan, responsif, dan mudah digunakan di HP/laptop tanpa instalasi.

## User Review Required
> [!IMPORTANT]
> - **Arsitektur Realtime**: Aplikasi akan dilengkapi dengan backend server Realtime (Node.js + Express + Socket.io) yang siap digunakan langsung di jaringan lokal (bisa diakses via HP dengan IP lokal) maupun di-deploy ke cloud (Vercel / Render / Railway / Glitch / VPS).
> - **PIN Koordinator**: Default PIN koordinator diatur ke `1234` (dapat diubah di antarmuka atau konfigurasi).
> - **Offline & Reconnection Graceful Handling**: Status bar indikator koneksi (Online/Offline/Reconnecting) untuk memenuhi kriteria PRD F-10 & Section 10.

---

## Fitur & Komponen Utama Sesuai PRD

1. **Struktur Master Data 80 Meja & 6 Zona (Section 6 & 13)**:
   - **Zona A (Kiri Atas)**: Usher A1, A2, A3 | Meja: 1, 3, 5, 7, 9, 11, 15, 17, 19, 21, 23, 25
   - **Zona B (Kiri Tengah)**: Usher B1, B2, B3 | Meja: 27, 29, 31, 33, 35, 37, 39, 41, 43, 45, 47, 49
   - **Zona C (Kiri Bawah)**: Usher C1, C2, C3 | Meja: 51, 53, 55, 57, 59, 61, 63, 65, 67, 69, 71, 73, 75, 77, 79, 81
   - **Zona D (Kanan Atas)**: Usher D1, D2, D3 | Meja: 2, 6, 8, 10, 12, 16, 18, 20, 22, 26, 28, 30
   - **Zona E (Kanan Tengah)**: Usher E1, E2, E3 | Meja: 32, 36, 38, 42, 46, 48, 50, 52, 56, 58, 60, 62
   - **Zona F (Kanan Bawah)**: Usher F1, F2, F3 | Meja: 66, 68, 70, 72, 76, 78, 80, 82, 86, 88, 90, 92, 96, 98, 100, 102

2. **Screen & UI Flow (Section 11 & 12 - Prinsip "LIHAT → TEKAN → SELESAI")**:
   - **S-01 Landing / Role Switcher**: Pilihan role Koordinator & Usher dengan visual mewah & responsif.
   - **S-02 Usher Select**: Grid kartu 18 Usher (A1-F3) yang menunjukkan status saat ini, langsung pilih untuk login.
   - **S-03 & S-04 Usher Screen (HP UX Optimized)**:
     - Tampilan status besar berwarna kontras:
       - 🟢 **AVAILABLE** (Siap terima tugas)
       - 🔵 **ESCORTING** (Sedang mengantar tamu, nomor meja tampil besar sekali)
       - 🟡 **RETURNING** (Selesai escort, sedang kembali ke pos)
       - 🔴 **ASSIST** (Butuh bantuan segera)
     - Modal/Card Tugas Baru: Notifikasi tugas masuk dengan audio alert/vibrasi (opsional), nomor meja & zona besar, tombol "TERIMA TUGAS".
     - Tombol cepat "TAMU SUDAH DUDUK" (langsung ubah ke AVAILABLE atau RETURNING).
     - Tombol cepat "BUTUH BANTUAN (ASSIST)" (langsung memicu alert di layar Koordinator).
     - Quick Zone Switcher (Pindah Zona A-F hanya 1 tap).
   - **S-05 Koordinator Dashboard**:
     - Ringkasan statistik (Total Usher, Available, Escorting, Returning, Assist).
     - Grid 18 Usher dengan live filter per zona / status.
     - Denah Ballroom Interaktif / Zone Status Map (Kiri: A, B, C; Kanan: D, E, F).
   - **S-06 Dispatch Panel (Super Fast Lookup)**:
     - Input nomor meja (search / quick keypad 1-102).
     - Otomatis deteksi Zona & Area (misal input `69` -> langsung muncul "Zona C - Kiri Bawah").
     - Menampilkan usher yang **AVAILABLE** di zona tersebut.
     - Opsi toggle "Backup dari zona lain" jika semua usher di zona tersebut sedang sibuk (Section 10).
     - Tombol 1-tap "TUGASKAN".
   - **S-07 Assistance & Alert Panel**:
     - Notifikasi badge merah dan list usher yang butuh bantuan.
     - Tombol "Tandai Selesai / Tangani" untuk Koordinator.
   - **Fitur F-11 & Pengaturan**:
     - Tombol "Reset All to AVAILABLE" (dengan konfirmasi).
     - Riwayat / Log Dispatch & Aktivitas terbaru.
     - QR Code generator untuk dibagikan ke Usher & Koordinator agar mudah scan dari HP.

---

## Proposed Technical Changes

### Backend & Realtime Engine
#### [NEW] `server.js`
- Server Node.js + Express + Socket.IO.
- State management in-memory dengan auto-sync & fallback persistence.
- REST API endpoints + Socket.io realtime broadcast events:
  - `usher:update_status`
  - `usher:update_zone`
  - `dispatch:assign`
  - `dispatch:accept`
  - `dispatch:complete`
  - `usher:request_assist`
  - `usher:resolve_assist`
  - `event:reset`

### Frontend Application (Vite + React + Modern CSS/UI)
#### [NEW] `package.json`
- Konfigurasi dependencies (Express, Socket.io, React, Lucide Icons, Vite, Tailwind CSS / Vanilla CSS).
#### [NEW] `src/data/eventData.js`
- Master data 80 meja, 6 zona, 18 usher default sesuai PRD.
#### [NEW] `src/context/AppContext.jsx` / `src/services/socket.js`
- Realtime socket listener & state store dengan auto-reconnect.
#### [NEW] `src/components/Navbar.jsx`
- Header dengan indikator status koneksi, jam realtime, toggle peran, dan tombol reset.
#### [NEW] `src/components/UsherView.jsx`
- Halaman mobile usher: status besar, prompt tugas masuk, tombol aksi besar 1-tap.
#### [NEW] `src/components/CoordinatorDashboard.jsx`
- Dashboard monitor 18 usher, zone grid, quick dispatch panel, bantuan panel, dan log aktivitas.
#### [NEW] `src/components/DispatchModal.jsx`
- Modal/Panel pencarian nomor meja cepat & penugasan usher available.
#### [NEW] `src/components/BallroomMap.jsx`
- Visual denah ballroom interaktif 6 zona dengan live counter usher.
#### [NEW] `src/components/QrShareModal.jsx`
- Tampilan QR code link lokal/IP agar usher bisa scan langsung pakai kamera HP di hari H.

---

## Verification Plan

### Automated & Unit Checks
1. Memeriksa validitas pemetaan seluruh 80 meja ke 6 zona sesuai tabel PRD Section 6.
2. Memverifikasi logika proteksi status (Section 10): Usher ESCORTING tidak boleh menerima tugas kedua, dispatch hanya untuk usher available.

### Manual Verification Skenario Testing Hari H (PRD Section 18):
- **T-01**: C2 AVAILABLE → Koordinator assign M69 → C2 menerima → ESCORTING → selesai → AVAILABLE.
- **T-02**: Semua C1–C3 ESCORTING → Koordinator cari M71 → sistem blokir penugasan tanpa usher available (kecuali backup).
- **T-03**: C1 pindah posisi dari C ke B → Koordinator melihat posisi B terupdate live.
- **T-04**: C2 tekan ASSIST → Koordinator melihat C2 berwarna merah di panel ASSIST.
- **T-05**: Koordinator assign M28 → sistem otomatis mendeteksi Zona D dan menampilkan D1–D3.
- **T-06**: D1 sedang ESCORTING → D1 tidak dapat ditugaskan tugas baru.
- **T-07**: Refresh browser di HP → status terakhir tetap tersimpan dan tersinkron.
- **T-08**: Buka 2 tab browser (1 Koordinator, 1 Usher C2) → ubah status di satu tab, pastikan tab lain langsung berubah seketika tanpa refresh.
