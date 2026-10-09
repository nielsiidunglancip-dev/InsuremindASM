# Rencana Implementasi: 3 Modul Baru InsureMind Agent

## Deskripsi

Menyuntikkan 3 modul fitur baru secara presisi ke dalam SPA InsureMind Agent yang telah ada (Vanilla HTML/CSS/JS). Sistem tetap berjalan sebagai SPA murni untuk front-end, dengan penambahan backend Express.js khusus untuk fitur PPT Builder (Modul 3.3).

## Arsitektur Implementasi

```
Frontend (SPA Pure): index.html + app.js + style.css
  ├── Modul 6:  Header Profile Widget + Halaman Profil Agen
  └── Modul 4.3: Arena Game Edukasi (Swipe Match + Word Duel)

Backend (Express.js): server.js (NEW FILE)
  └── Modul 3.3: PPT Builder API → pakai pptxgenjs
```

---

## Rencana Perubahan

### ─────────────────────────────────────────────────────────
### MODUL 6 — Header Profile Widget & Halaman Profil Agen

#### [MODIFY] [index.html](file:///d:/AI/Antigravity/index.html)

1. **Top Gamify Bar** — Tambahkan Profile Widget di sisi kanan `.top-gamify-bar`:
   - Lingkaran avatar dengan inisial + nama pendek + pangkat
   - Live XP Progress Bar mini (animasi fill)
   - Dropdown menu: [Lihat Profil Penuh | Pengaturan Akun | Ganti Password | Keluar]

2. **Halaman Profil Agen (`page-profil`)** — Section baru setelah page-dashboard:
   - **Card Identitas Digital**: Foto (avatar inisial besar), Nama, Kode Agen, Kantor Cabang, Tanggal Bergabung, Badge "Sertifikasi: AKTIF (s/d Juni 2028)"
   - **Galeri Medali (Badges Showcase)**: Grid 4-6 ikon lencana, greyscale jika terkunci
   - **Dompet Koin Karir**: Widget saldo koin + shortcut tombol ke Toko Reward

3. **Sidebar Nav** — Tambahkan tombol `nav-profil` untuk navigasi ke profil

#### [MODIFY] [style.css](file:///d:/AI/Antigravity/style.css)
- CSS: `.header-profile-widget`, `.header-xp-bar`, `.profile-dropdown`
- CSS: `.page-profil` layout, `.identity-card`, `.medals-gallery`, `.coin-wallet`
- CSS: Dropdown animation (slide-down), hover glow effect

#### [MODIFY] [app.js](file:///d:/AI/Antigravity/app.js)
- `renderHeaderProfileWidget()` — inisialisasi widget profil header
- `toggleProfileDropdown()` — buka/tutup dropdown dengan klik luar untuk menutup
- `renderProfilePage()` — render halaman profil lengkap dengan data dari localStorage
- Panggil `renderHeaderProfileWidget()` di dalam `initUserSession()`
- Update `navigateTo()` dengan case 'profil'

---

### ─────────────────────────────────────────────────────────
### MODUL 4.3 — Arena Game Edukasi

#### [MODIFY] [index.html](file:///d:/AI/Antigravity/index.html)

1. **Sidebar** — Tambahkan tombol nav `nav-arena-game` (🎮 Arena Game Edukasi)

2. **Section `page-arena-game`** — Layout baru dengan:
   - Header pilihan game: Card tombol "Underwriting Swipe Match" & "Insurance Word Duel"
   - **Container Game Swipe** (`game-swipe-container`):
     - Kartu profil nasabah dengan animasi swipe
     - Tombol TOLAK (⬅️) dan TERIMA (➡️)
     - Timer countdown 5 detik per kartu
     - Skor streak counter
   - **Container Game Word Duel** (`game-word-container`):
     - Timer 60 detik
     - Display huruf acak yang disusun
     - Input text jawaban + tombol submit
     - Skor poin real-time

3. **Kuota Modal** — Dialog peringatan jika kuota 2x/hari habis + shortcut ke Toko Reward

#### [MODIFY] [style.css](file:///d:/AI/Antigravity/style.css)
- CSS: `.game-arena-hub`, `.game-card-swipe`, `.swipe-action-btns`
- CSS: `.word-duel-board`, `.scramble-display`, `.timer-ring` SVG animasi
- CSS: Animasi kartu swipe left/right (keyframes translateX + rotate)
- CSS: `.quota-badge`, badge merah jika habis

#### [MODIFY] [app.js](file:///d:/AI/Antigravity/app.js)
- Data: Array `UNDERWRITING_CASES` (15+ profil kasus acak)
- Data: Array `INSURANCE_WORDS` (20+ istilah asuransi + definisi)
- `startSwipeGame()` — inisialisasi game Swipe Match
- `handleSwipeAnswer(decision)` — proses TERIMA/TOLAK, validasi, timer
- `endSwipeGame()` — kalkulasi skor, reward XP+koin jika 10 benar berturut-turut
- `startWordDuelGame()` — inisialisasi game Word Duel, mulai timer 60 detik
- `submitWordDuelAnswer()` — validasi jawaban, tambah skor
- `endWordDuelGame()` — konversi skor → XP tambahan
- `checkGameQuota()` — periksa localStorage tanggal & hitungan main
- `consumeGameTicket()` — kurangi tiket jika membeli dari toko

---

### ─────────────────────────────────────────────────────────
### MODUL 3.3 — PPT Builder (Auto Proposal System)

#### [MODIFY] [index.html](file:///d:/AI/Antigravity/index.html)

Pada section `page-penawaran`, tambahkan tab ke-4 `prop-pptx`:
- Form dengan 4 field yang auto-populate dari `calculatedPremiumData`
- Nama nasabah (input bebas), jenis asuransi (auto), premi tahunan (auto), nilai pertanggungan (auto)
- Tombol "🚀 Download File PPTX Penawaran" dengan loading state

#### [MODIFY] [style.css](file:///d:/AI/Antigravity/style.css)
- CSS: `.pptx-builder-form`, `.pptx-download-btn` dengan gradient + animasi shimmer
- CSS: `.download-loading-state` spinner

#### [MODIFY] [app.js](file:///d:/AI/Antigravity/app.js)
- `openPptxBuilderTab()` — auto-populate field dari `calculatedPremiumData`
- `downloadProposalPptx()` — kirim HTTP POST ke backend, handle binary response, trigger download
- Integrasi `switchProposalTab()` dengan tab baru `prop-pptx`

#### [NEW] [server.js](file:///d:/AI/Antigravity/server.js) — **Express.js Backend**
- Dependencies: `express`, `pptxgenjs`, `cors`
- Route `POST /api/generate-pptx`:
  - Terima JSON payload: `{ namaNasabah, namaAgen, jenisAsuransi, totalPremi, nilaiPertanggungan }`
  - Buat PPTX 2 slide via pptxgenjs:
    - **Slide 1 Cover**: bg Navy `#0F172A`, judul biru muda `#38BDF8`, nama nasabah & agen
    - **Slide 2 Tabel**: Layout tabel manfaat, ringkasan premi, footer compliance disclaimer
  - Set header `Content-Type: application/vnd.openxmlformats-officedocument.presentationml.presentation`
  - Set header `Content-Disposition: attachment; filename="Proposal_[NamaNasabah].pptx"`
  - Kirim file sebagai buffer stream

#### [NEW] [package.json](file:///d:/AI/Antigravity/package.json)
- Inisialisasi paket Node.js dengan dependensi: express, pptxgenjs, cors

---

## Toko Reward — Penambahan Item "Tiket Main Lagi"

#### [MODIFY] [data.js](file:///d:/AI/Antigravity/data.js)
- Tambahkan item baru ke array `daftar_katalog_reward`:
  ```json
  { "id": "game_ticket", "name": "Tiket Main Lagi", "desc": "Tambah 1x kuota bermain game edukasi hari ini", "icon": "gift", "price": 5 }
  ```

---

## Rencana Verifikasi

### Automated
- Cek `npm install` berhasil di direktori project
- Cek `node server.js` berjalan tanpa error
- Cek route POST `/api/generate-pptx` merespons 200 dengan binary stream

### Manual Verification
- [ ] Login sebagai Agen → widget profil header muncul di gamify bar
- [ ] Klik avatar → dropdown muncul
- [ ] Klik "Lihat Profil Penuh" → halaman profil tampil benar
- [ ] Navigasi ke "Arena Game Edukasi" → dua pilihan game tersedia
- [ ] Mainkan Swipe Match → kartu muncul, timer berjalan, reward saat 10 streak
- [ ] Mainkan Word Duel → scramble tampil, timer 60 detik, skor XP diberikan
- [ ] Coba main >2x → pesan quota habis muncul
- [ ] Beli Tiket dari Toko → kuota bertambah
- [ ] Kalkulator Premi → hitung → pindah ke tab PPT Builder → field auto-populated
- [ ] Klik Download PPTX → file terunduh sebagai `.pptx`

---

## Open Questions

> [!IMPORTANT]
> **Server Backend**: Apakah Anda ingin menjalankan server backend Express.js secara lokal di port tertentu (default: 3001)? Jika ya, saya akan menyediakan instruksi `npm start` yang lengkap.

> [!NOTE]
> **Foto Profil Agen**: Karena ini SPA lokal tanpa upload file, foto profil akan menggunakan avatar inisial dekoratif (gradient lingkaran). Saya bisa menambahkan opsi URL foto jika Anda menginginkan.

> [!NOTE]
> **Kantor Cabang & Tanggal Bergabung**: Data ini tidak ada di skema `pa_users` yang ada. Saya akan menambahkan field default pada halaman profil berdasarkan nilai tetap (bisa dikonfigurasi dari Admin Panel ke depannya).
