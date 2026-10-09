# Walkthrough Hasil Pengerjaan (walkthrough.md)
## Inisialisasi & Setup Project ESI Platform (Fase 1)

Saya telah menginisialisasi repositori monorepo dan meluncurkan server frontend interaktif untuk pengujian awal.

---

### Perubahan yang Dilakukan (Changes Made)

1. **Inisialisasi Monorepo (Task 1.1 `[x]`):**
   * Membuat folder `backend/` menggunakan Express.js, JWT, dan Prisma Client.
   * Membuat folder `frontend/` menggunakan React.js, Vite, Tailwind CSS v4, Zustand, dan React Query.
   * Mengonfigurasi Tailwind CSS v4 dengan plugin `@tailwindcss/vite` di [vite.config.js](file:///d:/AI 2/ESI/frontend/vite.config.js).
   * Membuat aplikasi demonstrasi interaktif di [src/App.jsx](file:///d:/AI 2/ESI/frontend/src/App.jsx) untuk merelasikan 3 peran utama (Prinsipal, Admin Backoffice, dan Marketing Cabang).

2. **Rancangan Database SQLite (Task 1.2 `[x]`):**
   * Membuat file [schema.prisma](file:///d:/AI 2/ESI/backend/prisma/schema.prisma) yang kompatibel dengan SQLite, mendukung kolom dinamis `dynamicFields` (JSON string), dan log verifikasi AI `aiAnalysisLog`.
   * Menjalankan perintah migrasi `npx prisma migrate dev` untuk menghasilkan database [dev.db](file:///d:/AI 2/ESI/backend/prisma/dev.db) secara otomatis.

3. **Seeding Script (Task 1.3 `[x]`):**
   * Membuat dan mengeksekusi file [seed.js](file:///d:/AI 2/ESI/backend/prisma/seed.js) untuk inisialisasi user Admin (`admin@asm.co.id` / `AdminPassword123`) dan Marketing Cabang Jakarta (`marketing.jakarta@asm.co.id` / `MarketingPassword123`, cabang `JKT`) di database SQLite.

---

### Hasil Pengujian (Validation Results)

* **Server Frontend Dev:** Berhasil dijalankan di port lokal.
* **Tautan URL Testing:** [http://localhost:5173/](http://localhost:5173/)
* **Fitur Demo yang Dapat Diuji:**
  * **Landing Page:** Tampilan overview fitur ESI platform.
  * **Portal Prinsipal:** Form isian proyek dinamis, checklist status 13 berkas dokumen wajib, dan simulasi pre-screening AI menggunakan Gemini API SDK.
  * **Dashboard Admin:** Antrean pengajuan masuk (Work Queue), tombol checklist pengecekan ASM Core, dan dropdown penetapan wilayah cabang asal (Jakarta, Surabaya, dll).
  * **Marketing Cabang:** Pemantauan pengajuan secara real-time yang tersortir otomatis per cabang berdasarkan cabang asal yang diinput oleh Admin.
