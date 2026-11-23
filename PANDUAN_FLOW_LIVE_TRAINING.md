# 🗺️ Panduan Pengguna & Flowchart Interaktif: Fitur Live Training InsureMind ASM

> **Dokumen Resmi Standard Operating Procedure (SOP) Agen**  
> **Aplikasi**: InsureMind ASM — Portal Agen Asuransi Umum  
> **Versi**: 2.0 (November 2026)  
> **Target Pengguna**: Agen Asuransi ASM, Trainer Cabang, Admin Pelatihan  

---

## 📌 Ringkasan Eksekutif

Fitur **Live Training** di InsureMind ASM dirancang untuk memfasilitasi peningkatan kompetensi agen secara berkelanjutan, baik melalui sesi daring (*Online Zoom Webinar*) maupun tatap muka (*Offline Kelas Cabang*). Alur ini mengintegrasikan **Pre-Test**, **Validasi Kehadiran Token Berbasis Trainer**, **Post-Test Evaluasi Berstandar Kelulusan (Passing Grade 70%)**, **Gamifikasi Reward (+150 XP & +50 Koin)**, dan **Penerbitan e-Certificate Resmi LSP AAUI**.

---

## 🧭 Diagram Flowchart Alur Pengguna (Mermaid)

```mermaid
flowchart TD
    %% Styling Nodes
    classDef startNode fill:#0284c7,stroke:#0369a1,stroke-width:2px,color:#ffffff,font-weight:bold;
    classDef stepNode fill:#f0f9ff,stroke:#0284c7,stroke-width:2px,color:#0f172a;
    classDef rsvpNode fill:#f5f3ff,stroke:#6366f1,stroke-width:2px,color:#0f172a;
    classDef attendNode fill:#fffbeb,stroke:#f59e0b,stroke-width:2px,color:#0f172a;
    classDef quizNode fill:#faf5ff,stroke:#a855f7,stroke-width:2px,color:#0f172a;
    classDef decisionNode fill:#0f172a,stroke:#38bdf8,stroke-width:2px,color:#ffffff,font-weight:bold;
    classDef failNode fill:#fef2f2,stroke:#ef4444,stroke-width:2px,color:#991b1b;
    classDef successNode fill:#f0fdf4,stroke:#10b981,stroke-width:2px,color:#065f46,font-weight:bold;

    Start([Mulai: Buka Menu Live Training]):::startNode --> Select[Pilih Jadwal Training Aktif\nOnline Zoom / Offline]:::stepNode
    Select --> RSVP[Klik 'Daftar Sekarang' & Konfirmasi Kursi\nSelesaikan Pre-Test Pemahaman Awal]:::rsvpNode
    RSVP --> Attend[Ikuti Sesi Training Sesuai Jadwal\nLink Zoom Meeting / Hadir di Lokasi]:::attendNode
    Attend --> Token[Input Token Kehadiran dari Trainer\n4 Digit Kode Absensi Unik]:::attendNode
    Token --> PostTest[Kerjakan Post-Test Evaluasi\nKuis Peningkatan Kompetensi]:::quizNode
    PostTest --> CheckScore{Apakah Nilai >= 70?}:::decisionNode

    %% Branching Logic
    CheckScore -- "Tidak (< 70%)" --> Remedial[Ulangi Post-Test / Review Materi PDF\nMaksimal 2x Kesempatan]:::failNode
    Remedial -. Pelajari Ulang Materi .- -> PostTest

    CheckScore -- "Ya (>= 70%)" --> Success[Dapatkan +150 XP + 50 Koin\n& Terbit e-Certificate LSP Otomatis]:::successNode
```

---

## 📋 Penjelasan Langkah demi Langkah

### 1. Buka Menu Live Training
- Agen mengakses menu navigasi sebelah kiri pada portal agen: **Akademi & Training** &rarr; **Live Training**.
- Halaman akan memuat daftar jadwal pelatihan cabang yang tersedia, kurikulum silabus berjenjang (*Level 3, Level 4, Spesialisasi*), serta banner panduan alur interaktif.

### 2. Pilih Jadwal Training Aktif
- Agen meninjau kartu pelatihan yang tersedia:
  - **Sedang Berlangsung (Live Now)**: Ditandai dengan badge merah berkedip `🔴 SEDANG BERLANGSUNG`. Sesi ini dapat langsung didaftar dan diikuti saat itu juga.
  - **Mendatang**: Sesi yang terjadwal untuk hari/pekan berikutnya.
- Perhatikan metode pelaksanaan: *Online Zoom Webinar* (dengan tautan, ID rapat, dan passcode) atau *Offline Tatap Muka* (dengan lokasi ruangan kantor cabang).

### 3. Klik "Daftar Sekarang" & Konfirmasi Kursi (Pre-Test)
- Klik tombol **"Daftar (RSVP) Sekarang"** atau **"🔴 Daftar & Masuk Sesi (Live Now)"**.
- Modal **Pre-Test Asesmen Awal** akan terbuka secara otomatis berisi 3 butir pertanyaan dasar terkait topik pelatihan.
- Agen memilih jawaban dan mengklik **"🚀 Kirim Jawaban & Konfirmasi RSVP"**.
- Sistem menyimpan skor baseline awal agen dan mengonfirmasi reservasi kursi (status kehadiran berubah menjadi `RSVP`).

### 4. Ikuti Sesi Training Sesuai Jadwal
- Setelah RSVP berhasil:
  - Pada sesi Zoom: Tampil kotak hijau berisi **Link Zoom Langsung**, **ID Rapat**, dan **Passcode**. Klik **"Gabung Zoom"** untuk masuk ke ruang webinar.
  - Pada sesi Tatap Muka: Informasi lokasi auditorium/ruang pelatihan cabang ditampilkan jelas.
- Agen menyimak materi yang dipaparkan oleh Trainer/Instruktur hingga selesai.

### 5. Input Token Kehadiran dari Trainer
- Di akhir sesi pelatihan, Trainer Cabang mengumumkan **4 Digit Token Kehadiran Unik** (contoh: `1234`).
- Agen mengklik tombol **"🔑 Input Token Kehadiran"** pada kartu training.
- Masukkan 4 digit token ke dalam form dan klik **"Konfirmasi Hadir"**.
- Setelah token terverifikasi valid, status kehadiran agen berubah menjadi `Hadir`, dan tombol akses materi PDF serta Kuis Evaluasi otomatis terbuka.

### 6. Kerjakan Post-Test Evaluasi
- Agen dapat mengunduh salinan materi pelatihan melalui tombol **"📄 Unduh PDF"**.
- Klik tombol **"📝 Ikuti Kuis Post-Test"** untuk membuka player kuis interaktif.
- Jawab seluruh butir soal evaluasi pemahaman materi.
- Klik **"Kirim Jawaban"** untuk memproses penilaian otomatis seketika.

### 7. Evaluasi Hasil Kelulusan (*Passing Grade 70%*)

| Hasil Evaluasi | Kondisi | Konsekuensi & Langkah Selanjutnya |
| :--- | :--- | :--- |
| ❌ **Belum Lulus** | Nilai `< 70%` | Dialog menampilkan skor dan sisa kesempatan. Agen dipersilakan mengunduh materi PDF, mempelajari kembali, lalu mengklik **"📝 Ikuti Kuis Post-Test"** ulang. Batas kesempatan maksimal adalah **2x percobaan**. |
| ✅ **Lulus Resmi** | Nilai `>= 70%` | Dialog kelulusan menampilkan skor akhir dan perbandingan peningkatan (*growth delta*) terhadap nilai Pre-Test. Agen otomatis memperoleh reward dan sertifikat resmi. |

#### 🎁 Reward & Sertifikasi Kelulusan:
1. **Gamifikasi Agen**: Menambahkan **+150 XP** dan **+50 Koin Reward** ke saldo profil agen.
2. **e-Certificate Resmi LSP AAUI**: Diterbitkan seketika dengan nomor lisensi, nama agen (*Rian Aditya*), skor kelulusan, dan tanda tangan digital. Sertifikat dapat dilihat, dicetak, atau disimpan dalam format PDF melalui tombol **"🏆 Download Sertifikat Resmi"**.

---

## 🧪 Petunjuk Simulasi Cepat (Live Demo)

Bagi penguji, trainer, atau agen yang ingin mencoba alur simulasi secara langsung:

1. Buka aplikasi di peramban: `http://localhost:3001`.
2. Masuk ke menu **Live Training** di sidebar kiri.
3. Klik tombol banner **"🗺️ Lihat Alur & Panduan Live Training (Flowchart)"** untuk meninjau diagram interaktif, atau klik **"⚡ Coba Simulasi Sesi Aktif Sekarang"**.
4. Pada kartu training pertama berlabel **`SEDANG BERLANGSUNG`**:
   - **Langkah 1**: Klik **"🔴 Daftar & Ikuti Sesi (Live Now)"**.
   - **Langkah 2**: Jawab 3 soal Pre-Test, lalu klik **"🚀 Kirim Jawaban & Konfirmasi RSVP"**.
   - **Langkah 3**: Klik tombol hijau **"🔑 Input Token Kehadiran (Live)"**.
   - **Langkah 4**: Masukkan token demo **`1234`**, lalu klik **"Konfirmasi Hadir"**.
   - **Langkah 5**: Klik **"📝 Ikuti Kuis Post-Test"**, pilih opsi jawaban yang tepat (Insurable Interest, Utmost Good Faith, PSAKOB), lalu klik **"Kirim Jawaban"**.
   - **Langkah 6**: Dialog kelulusan akan muncul dengan skor 100%, +150 XP & +50 Koin. Klik **"🏆 Lihat Sertifikat & Cetak"** untuk melihat lembar sertifikat resmi kelulusan LSP AAUI!

---

*InsureMind ASM &copy; 2026. Hak Cipta Dilindungi Undang-Undang.*
