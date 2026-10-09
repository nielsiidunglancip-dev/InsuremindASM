# Rencana Implementasi: Penambahan Peran (Role) "Analis" pada Platform ESI

Rencana ini bertujuan untuk menambahkan peran **Analis** sebagai bagian dari tim internal yang bertanggung jawab menganalisis dokumen pengajuan, menentukan status persetujuan, menetapkan nilai premi, dan merumuskan kondisi kolateral. Perubahan ini akan dilakukan pada dokumen persyaratan sistem (PRD & System Flow) serta prototipe frontend aplikasi.

## User Review Required

> [!IMPORTANT]
> **Definisi Alur Kerja Baru:**
> 1. **Admin Backoffice** tetap bertugas melakukan verifikasi data awal, pengecekan database ASM, dan penentuan Cabang.
> 2. Status pengajuan setelah divalidasi oleh Admin akan berganti menjadi `Under Review` (Sedang Ditinjau) atau dikirim untuk dianalisis.
> 3. **Analis** akan mengakses pengajuan dalam status tersebut untuk memasukkan rincian finansial (premi & kolateral) sebelum memberikan keputusan final (`Approved` atau `Rejected`).
> 4. Nilai premi dan kondisi kolateral yang ditentukan oleh Analis akan ditampilkan secara transparan di dashboard **Prinsipal** dan **Marketing Cabang** pada pengajuan yang berstatus disetujui (`Approved`).

---

## Proposed Changes

### Dokumentasi Sistem

#### [MODIFY] [PRD.md](file:///d:/AI%202/ESI/PRD.md)
* Menambahkan peran **Analis** ke tabel profil pengguna di Bagian 2.
* Menambahkan sub-bagian baru **3.5. Dashboard Analis (Analyst Dashboard)** yang mendefinisikan fungsionalitas:
  * Antrean pengajuan yang siap dianalisis.
  * Formulir input nilai premi (persentase/nominal) dan kondisi kolateral.
  * Fitur keputusan persetujuan (`Approve`/`Reject`).
* Menambahkan visibilitas data premi & kolateral pada deskripsi portal Prinsipal (Bagian 3.1) dan portal Marketing Cabang (Bagian 3.3).

#### [MODIFY] [SYSTEM_FLOW.md](file:///d:/AI%202/ESI/SYSTEM_FLOW.md)
* Memperbarui diagram urutan (Sequence Diagram) Mermaid untuk menyertakan aktor **Analis** dan interaksinya dengan sistem:
  * Menampilkan langkah ketika Analis menganalisis dokumen, menginput premi & kolateral, serta menyetujui pengajuan.
* Memperbarui diagram transisi status (State Machine) untuk memasukkan status `Under Analysis` jika diperlukan, atau memperjelas langkah sebelum menjadi `Approved`.
* Memperjelas deskripsi status terkait hasil keputusan Analis.

---

### Aplikasi Frontend

#### [MODIFY] [App.jsx](file:///d:/AI%202/ESI/frontend/src/App.jsx)
* **Mock Data:**
  * Menambahkan properti `premium` dan `collateral` pada data mock pengajuan (`mockSubmissions`), terutama yang sudah berstatus `Approved`.
* **Navigasi & Seleksi Role:**
  * Menambahkan tombol **Analis (Internal)** pada bagian navigasi role demo di bagian atas aplikasi.
* **Dashboard Analis (Tampilan Baru):**
  * Membuat tampilan khusus untuk peran `analyst` yang menampilkan antrean pengajuan yang membutuhkan analisis (status `Submitted` atau `Need Analysis`).
  * Menyediakan panel detail untuk melihat informasi proyek dan dokumen.
  * Menambahkan form input untuk:
    * **Nilai Premi** (e.g. Persentase per tahun, seperti `2.5%` atau `Rp 25.000.000`).
    * **Kondisi Kolateral** (e.g. `Personal Guarantee`, `Corporate Guarantee`, `Pledge of Equipment`).
  * Menyediakan tombol aksi **Setujui Pengajuan** (yang menyimpan premi/kolateral dan mengubah status menjadi `Approved`) serta **Tolak Pengajuan** (yang mengubah status menjadi `Rejected`).
* **Pembaruan View Peran Lain:**
  * **Portal Prinsipal:** Pada daftar pengajuan atau detail pengajuan yang berstatus `Approved`, tampilkan informasi premi dan kolateral yang telah disetujui.
  * **Marketing Cabang:** Tampilkan informasi premi dan kolateral pada detail pengajuan cabang yang telah berstatus `Approved` agar dapat dikoordinasikan dengan Prinsipal.

---

## Verification Plan

### Manual Verification
* Menjalankan server frontend (`npm run dev`) dan membuka browser.
* Menguji navigasi ke peran **Analis**.
* Memilih salah satu pengajuan (misal: *PT Solusi Energi Prima*).
* Mengisi nilai premi dan kondisi kolateral pada form, lalu klik **Setujui (Approve)**.
* Memverifikasi status pengajuan berubah menjadi `Approved`.
* Beralih ke peran **Portal Prinsipal** dan **Marketing Cabang** untuk memastikan nilai premi dan kondisi kolateral tersebut tertera pada pengajuan yang bersangkutan.
