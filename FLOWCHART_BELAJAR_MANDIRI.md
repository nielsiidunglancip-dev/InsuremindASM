# 📖 Panduan Pengguna & Flowchart Interaktif: Fitur Belajar Mandiri InsureMind ASM

> **Dokumen Resmi Standard Operating Procedure (SOP) Agen**  
> **Aplikasi**: InsureMind ASM — Portal Agen Asuransi Umum  
> **Modul**: Belajar Mandiri (E-Learning Asuransi Berjenjang)  
> **Versi**: 2.1 (November 2026)  
> **Target Pengguna**: Agen Asuransi ASM, Trainer Cabang, Tim Pengembangan Bisnis  

---

## 📌 Ringkasan Eksekutif

Fitur **Belajar Mandiri** di InsureMind ASM merupakan platform pembelajaran mandiri (*self-paced e-learning*) yang dirancang untuk membekali agen asuransi umum dengan kompetensi produk, penguasaan klausul polis standar AAUI/OJK, teknik identifikasi risiko, serta simulasi studi kasus klaim nyata di lapangan.

Alur belajar mandiri mengadopsi struktur pembelajaran 6 tahap sistematis yang diawali dengan **Pre-Test Diagnostik Awal**:
1. **Pemilihan Modul Berbasis Level & Rekomendasi Pintar**,
2. **Uji Pemahaman Awal (Pre-Test Modul)** untuk mengukur nilai tolak ukur (*baseline score*) sebelum materi dibuka,
3. **Eksplorasi Materi Interaktif (Artikel, Video, & PDF Resmi)**,
4. **Forum Konsultasi Teknis Polis (Community Q&A bersama Master Trainer)**,
5. **Validasi Pemahaman melalui Post-Test Evaluasi (Passing Grade KKM 70%)**, dan
6. **Klaim Reward Gamifikasi (+100 XP & +20 Koin) serta Pembukaan Jalur Materi Lanjutan**.

---

## 🧭 Diagram Flowchart Alur Pengguna (Mermaid)

```mermaid
flowchart TD
    %% Styling Nodes
    classDef startNode fill:#0284c7,stroke:#0369a1,stroke-width:2px,color:#ffffff,font-weight:bold;
    classDef stepNode fill:#f0f9ff,stroke:#0284c7,stroke-width:2px,color:#0f172a;
    classDef pretestNode fill:#eef2ff,stroke:#6366f1,stroke-width:2px,color:#0f172a,font-weight:bold;
    classDef qaNode fill:#fffbeb,stroke:#f59e0b,stroke-width:2px,color:#0f172a;
    classDef quizNode fill:#faf5ff,stroke:#a855f7,stroke-width:2px,color:#0f172a;
    classDef decisionNode fill:#0f172a,stroke:#38bdf8,stroke-width:2px,color:#ffffff,font-weight:bold;
    classDef failNode fill:#fef2f2,stroke:#ef4444,stroke-width:2px,color:#991b1b;
    classDef successNode fill:#f0fdf4,stroke:#10b981,stroke-width:2px,color:#065f46,font-weight:bold;

    Start([Mulai: Buka Menu Belajar Mandiri]):::startNode --> Step1[Langkah 1: Pilih Level & Buka Modul\nLevel Basic / Intermediate / Advanced\natau Kartu Rekomendasi Selanjutnya]:::stepNode
    Step1 --> Step2[Langkah 2: Ikuti Uji Pemahaman Awal Pre-Test\nKerjakan Soal Baseline Diagnostic\nTidak Menggugurkan Kelulusan Modul]:::pretestNode
    Step2 --> Step3[Langkah 3: Pelajari Materi Interaktif & Unduh PDF\nBaca Artikel, Tonton Video & Unduh Ringkasan Polis]:::stepNode

    %% Percabangan Konsultasi Q&A
    Step3 --> CheckQA{Ada Klausul / Istilah\nyang Belum Dipahami?}:::decisionNode

    CheckQA -- "Ya (Butuh Diskusi)" --> Step4[Langkah 4: Buka Tab Community Q&A\nPelajari FAQ & Ajukan Pertanyaan ke Trainer]:::qaNode
    Step4 -- "Setelah Memahami Materi" --> Step5[Langkah 5: Kerjakan Kuis Pemahaman Modul\nKlik 'Selesai Belajar & Ambil Post-Test']:::quizNode

    CheckQA -- "Tidak (Sudah Jelas)" --> Step5

    %% Percabangan Kelulusan Kuis
    Step5 --> CheckScore{Apakah Skor Post-Test\n>= 70% (KKM)?}:::decisionNode

    CheckScore -- "Tidak (< 70%)" --> Remedial[Remedial / Review Materi & Coba Lagi\nMaksimal 2x Kesempatan Remedial]:::failNode
    Remedial -. Pelajari Ulang Materi .- -> Step3

    CheckScore -- "Ya (>= 70%)" --> Success[Langkah 6: Klaim Reward +100 XP & +20 Koin\nStatus Modul SELESAI, Sertifikat Terbit,\n& Rekomendasi Level Berikutnya Terbuka!]:::successNode
```

---

## 📋 Penjelasan Langkah demi Langkah (6 Tahapan Utama)

### Langkah 1: Pilih Level & Cari Modul Pembelajaran
1. **Navigasi Menu**: Agen membuka menu **Belajar Mandiri** pada kategori **Akademi & Training** di bilah navigasi sidebar kiri.
2. **Navigasi Berjenjang (Level Tabs)**:
   - **Level Basic**: Fondasi prinsip dasar asuransi umum (*Insurable Interest, Utmost Good Faith, Indemnity, Subrogation*), regulasi perlindungan konsumen OJK, dan pengantar polis kendaraan standar PSAKOB.
   - **Level Intermediate**: Asuransi komersial properti (*Property All Risks - PAR*), klausul perluasan *RSMDCC*, survei risiko kebakaran, dan perhitungan *Total Loss Only* (TLO) vs *Comprehensive*.
   - **Level Advanced**: Asuransi konstruksi (*Contractors' All Risks - CAR*), penjaminan proyek (*Suretyship & Bonding*), serta tata kelola reasuransi.
3. **Pencarian Cepat & Rekomendasi Pintar**:
   - Agen dapat mengetik kata kunci pada kotak pencarian (*Search Bar*) untuk memfilter materi secara instan.
   - Kartu **Rekomendasi Materi Selanjutnya** secara cerdas menganalisis modul yang belum selesai atau memberikan materi yang direkomendasikan untuk naik pangkat keagenan berikutnya.

---

### Langkah 2: Ikuti Uji Pemahaman Awal (Pre-Test Modul)
1. **Pemicu Otomatis Fase Pre-Test**:
   - Saat agen pertama kali membuka modul (status modul: `pre-test`), antarmuka Course Player akan menampilkan layar **Uji Pemahaman Awal (Pre-Test)**.
2. **Karakteristik & Ketentuan Pre-Test**:
   - **Tolak Ukur Baseline**: Pre-test bertujuan untuk mengukur tingkat pemahaman awal agen sebelum terpapar modul materi secara mendalam.
   - **Tidak Menggugurkan Kelulusan**: Nilai yang didapat pada Pre-Test **tidak memengaruhi syarat kelulusan akhir modul**. Berapapun skor yang diperoleh, materi lengkap akan langsung terbuka setelah formulir dikirim.
   - **Wajib Dikerjakan**: Agen wajib menjawab pertanyaan pre-test dan menekan tombol **"Kirim Jawaban Pre-Test"** agar status fase modul beralih ke `learning` ("Belajar").
3. **Modal Pengumuman Skor Baseline**:
   - Sistem menampilkan modal dialog pop-up skor Pre-Test (misal: *Skor Baseline: 60/100*), yang nantinya akan dikomparasikan dengan skor Post-Test akhir untuk memvalidasi peningkatan pemahaman agen (*knowledge gain*).

---

### Langkah 3: Pelajari Materi Interaktif & Unduh Dokumen PDF
1. **Akses Course Player Penuh**: Setelah Pre-Test diselesaikan, antarmuka **Course Player SPA** terbuka penuh untuk materi pembelajaran.
2. **Tab Pembelajaran Multifungsi**:
   - **Artikel**: Menjelaskan konteks bisnis, studi kasus klaim, dasar hukum, dan penjabaran klausul secara naratif.
   - **Video Pembelajaran**: Menayangkan video simulasi pemaparan dan tips selling di lapangan.
   - **Unduh Dokumen PDF**: Menyediakan tombol pengunduhan dokumen PDF materi resmi berformat profesional yang siap dibaca secara luring (*offline*) atau digunakan sebagai materi edukasi nasabah.
   - **Ringkasan Eksekutif**: Rangkuman poin-poin kunci materi dalam format *bullet points* padat.

---

### Langkah 4: Diskusi & Tanya Trainer (Community Q&A)
1. **Identifikasi Kendala Teknis**: Saat mempelajari ringkasan polis atau dokumen PDF, jika terdapat klausul jaminan, pengecualian (*exclusions*), atau *deductible/risiko sendiri* yang membingungkan:
2. **Buka Tab Community Q&A**:
   - Agen mengklik tab **"Tanya Trainer & Diskusi"** yang tersedia di dalam Course Player.
3. **Fitur Forum Interaktif**:
   - **Pencarian Diskusi**: Cari apakah kendala serupa sudah pernah ditanyakan oleh rekan agen lain.
   - **FAQ Penting**: Membaca penjelasan resmi bertanda `📌 FAQ PENTING` yang disematkan langsung oleh Trainer Cabang (*Coach Hendra Wijaya, AAIK*).
   - **Kirim Pertanyaan Baru**: Tuliskan pertanyaan spesifik pada formulir tanya jawab. Pertanyaan akan masuk ke antrean Trainer dan otomatis berstatus `🟡 Menunggu Jawaban Trainer`, kemudian diperbarui menjadi `🟢 Terjawab oleh Trainer` setelah diulas.
4. *Catatan Alur*: Jika agen merasa materi sudah dipahami secara menyeluruh tanpa pertanyaan, langkah ini bersifat fleksibel dan agen dapat langsung melanjutkan ke Langkah 5.

---

### Langkah 5: Selesaikan Kuis Pemahaman Modul (Post-Test)
1. **Mulai Evaluasi Akhir**: Agen mengklik tombol **"Selesai Belajar & Ambil Post-test"** di bagian footer player.
2. **Struktur Evaluasi**:
   - Soal kuis berupa pilihan ganda (A, B, C, D) yang menguji pemahaman konsep, penerapan klausul, dan perhitungan studi kasus premi.
   - Ambang batas kelulusan KKM ditetapkan sebesar **70%**.
3. **Submit Jawaban**: Agen memilih jawaban untuk seluruh pertanyaan lalu mengklik tombol hijau **"Kirim Jawaban Post-Test"**.

---

### Langkah 6: Evaluasi Kelulusan & Klaim Reward

| Parameter | Pre-Test (Langkah 2) | Post-Test (Langkah 5 & 6) |
| :--- | :--- | :--- |
| **Waktu Pengerjaan** | Sebelum materi artikel & video dibuka | Setelah materi selesai dipelajari |
| **Tujuan** | Diagnostik awal / tolak ukur pengetahuan baseline | Evaluasi pemahaman & validasi kelulusan produk |
| **Pengaruh Kelulusan** | **Tidak Memengaruhi** (100% aman) | **Menentukan Kelulusan** (Ambang batas KKM 70%) |
| **Konsekuensi Skor < 70%** | Tetap lanjut membuka modul pembelajaran | Remedial / review ulang materi (kuota 2x) |
| **Benefit Kelulusan** | Membuka kunci materi & Course Player | Reward **+100 XP**, **+20 Koin**, Modul Selesai & Sertifikat |

#### 🎁 Manfaat & Reward Kelulusan Modul:
1. **Reward Gamifikasi Profil**: Otomatis mendapatkan tambahan **+100 XP** dan **+20 Koin** yang menambah saldo reward di toko virtual agen.
2. **Pembaruan Kartu Progres**: Persentase progres belajar di Dashboard utama agen otomatis bertambah (*Progres Belajar & Materi Selesai*).
3. **Penerbitan Sertifikat Kelulusan Modul**: Sertifikat digital kelulusan modul resmi diterbitkan dan dicatat dalam rekam jejak sertifikasi agen.
4. **Pembukaan Modul Tingkat Lanjutan**: Modul pembelajaran pada tingkatan level berikutnya terbuka secara otomatis.

---

## 🧪 Panduan Simulasi Interaktif di Browser (Demo Agen Rian Aditya)

Bagi penguji, trainer, atau agen yang ingin memverifikasi interaktivitas alur Belajar Mandiri:

1. Buka aplikasi di peramban: **`http://localhost:3001`**.
2. Di bilah navigasi kiri, pilih menu **Belajar Mandiri**.
3. Perhatikan banner panduan di bagian atas:
   - Klik tombol **`📖 Lihat Alur & Panduan Belajar (Flowchart)`**.
   - Telusuri tab **🗺️ Visual Flowchart Diagram** untuk melihat visual diagram alur 6 langkah (termasuk Pre-Test), tab **📋 SOP Lengkap**, atau tab **💻 Kode Diagram Mermaid**.
4. Klik tombol **`⚡ Coba Simulasi Belajar Sekarang (Pilih Modul Rekomendasi)`**:
   - Modal akan menutup dan layar otomatis menyorot kartu *Rekomendasi Materi Selanjutnya* / Modul dengan efek *glow pulse*.
5. Klik kartu rekomendasi atau salah satu kartu modul (misal: *Asuransi Kendaraan Bermotor - PSAKOB*):
   - Jika modul berstatus baru, sistem akan menampilkan layar **Uji Pemahaman Awal (Pre-Test)** terlebih dahulu.
   - Agen dapat mengisi soal Pre-Test dan mengklik **Kirim Jawaban Pre-Test**.
   - Modal hasil nilai baseline Pre-Test akan muncul dan mengonfirmasi dibukanya akses materi.
6. Masuk ke **Course Player**:
   - Uji coba pergantian tab (*Artikel*, *Video*, *Unduh PDF*, *Ringkasan*, dan *Tanya Trainer & Diskusi*).
   - Di tab **Tanya Trainer & Diskusi**, coba ajukan pertanyaan simulasi untuk memverifikasi feed diskusi.
7. Klik **"Selesai Belajar & Ambil Post-test"**:
   - Jawab seluruh pertanyaan kuis dan klik **"Kirim Jawaban Post-Test"**.
   - Efek confetti muncul, skor dibandingkan dengan Pre-Test awal, reward **+100 XP & +20 Koin** masuk ke akun, dan modul tercatat **SELESAI**!

---

*InsureMind ASM &copy; 2026. Hak Cipta Dilindungi Undang-Undang.*
