# Rencana Implementasi: Chat AI Multi-Fungsi (Tahap 1) - Isolasi Konteks

Rencana ini bertujuan untuk membagi sistem Chat AI menjadi dua peran mandiri dengan kepribadian dan aturan (guardrails) yang terisolasi sepenuhnya (Context Isolation), sesuai dengan dokumen arsitektur utama yang diberikan.

## User Review Required

> [!IMPORTANT]
> **Pembersihan Riwayat Chat saat Ganti Mode**: Untuk memastikan isolasi konteks yang sempurna (agar memori peran tidak tercampur), sistem secara otomatis akan mereset riwayat chat aktif ketika pengguna berpindah mode.
> 
> **Perekaman Suara (Voice to Text)**: Fitur voice to text akan menggunakan **Web Speech API** bawaan browser (misal Google Chrome). Fitur ini membutuhkan izin mikrofon dari pengguna saat digunakan.

## Open Questions

> [!NOTE]
> 1. Apakah ada dokumen PDF tambahan untuk materi kurikulum, ujian, atau peraturan (SKKNI) yang perlu ditaruh ke dalam folder `materi_pdf` sekarang?
> 2. Apakah voice-to-text sebaiknya hanya aktif di Mode Belajar & Ujian, atau juga diizinkan di Mode Asisten Jualan? (Default: Hanya aktif di Mode Belajar & Ujian untuk memfasilitasi simulasi menjawab ujian).

---

## Proposed Changes

### Backend (Server Side)

#### [MODIFY] [app.js](file:///d:/AI/CHATBOT%20AI/app.js)
- Membuat dua konstanta instruksi sistem terpisah:
  1. `SYSTEM_INSTRUCTION_BELAJAR`:
     - Berperan sebagai Guru Pendamping & Tutor Ujian.
     - Sifat: Pasif-responsif (hanya menjawab jika ditanya), edukatif.
     - Guardrails ketat: Mematikan fungsi proaktif jualan, dilarang melakukan cross-selling, dilarang menanyakan profil nasabah komersial.
     - Fokus pada materi kurikulum agen, hukum perasuransian, dan kuis simulasi.
  2. `SYSTEM_INSTRUCTION_JUALAN`:
     - Berperan sebagai Sales Coach Proaktif & Profiler.
     - Sifat: Sangat proaktif, interaktif, memandu dengan metode ping-pong (bertahap).
     - Fokus pada analisis profil risiko prospek, rekomendasi cross-selling produk komersial, pembuatan draft penawaran.
- Mengubah endpoint `/api/chat` untuk menerima parameter `mode` dari request body (`belajar` atau `jualan`).
- Menginisialisasi dua model instance Gemini secara dinamis:
  - `modelBelajar = genAI.getGenerativeModel({ model: "gemini-2.5-flash", systemInstruction: SYSTEM_INSTRUCTION_BELAJAR })`
  - `modelJualan = genAI.getGenerativeModel({ model: "gemini-2.5-flash", systemInstruction: SYSTEM_INSTRUCTION_JUALAN })`
- Memilih model yang sesuai berdasarkan parameter `mode` yang dikirim dari klien.

---

### Frontend (User Interface)

#### [MODIFY] [index.html](file:///d:/AI/CHATBOT%20AI/public/index.html)
- Menambahkan **Mode Selector Switch** di bagian atas sidebar atau area header utama. Pilihan berupa tab/kartu interaktif:
  - **Mode Belajar & Ujian** (Ikon: Buku/Sertifikat, deskripsi singkat: Fokus akademis & kuis).
  - **Mode Asisten Jualan** (Ikon: Koper/Grafik, deskripsi singkat: Proaktif & bedah prospek).
- Menambahkan tombol **Voice Input (Mikrofon)** di samping area input teks untuk mengaktifkan fitur Voice-to-Text.
- Menambahkan modal/indikator visual status keaktifan isolasi konteks agar agen tahu batas-batas setiap mode.

#### [MODIFY] [script.js](file:///d:/AI/CHATBOT%20AI/public/script.js)
- Menyimpan state `currentMode` (`belajar` atau `jualan`) secara lokal.
- Mengubah pengiriman payload POST ke `/api/chat` agar menyertakan parameter `mode` saat ini.
- Menambahkan logika reset riwayat chat (`chatHistory = []`) ketika mode berganti untuk menghindari kebocoran konteks antar-peran.
- Mengintegrasikan **Web Speech API** (`webkitSpeechRecognition`) untuk menangkap suara pengguna, mengubahnya menjadi teks, dan memasukkannya ke input chat otomatis.
- Memperbarui pesan selamat datang (welcome message) default berdasarkan mode yang sedang aktif.

#### [MODIFY] [style.css](file:///d:/AI/CHATBOT%20AI/public/style.css)
- Merancang gaya premium untuk kartu pemilih mode (kombinasi warna bernuansa edukasi/biru untuk Belajar dan bernuansa komersial/emas untuk Sales).
- Menambahkan animasi transisi visual halus saat berpindah mode.
- Membuat desain tombol mikrofon yang menyatu estetis dengan kolom input teks, termasuk efek "glowing" saat perekaman aktif.

---

## Verification Plan

### Automated Tests
- Menjalankan server menggunakan `npm start` atau `node app.js`.
- Memastikan server berhasil mengekstrak PDF dan menginisialisasi RAG tanpa kendala.

### Manual Verification
- **Verifikasi Isolasi Konteks**:
  1. Masuk ke **Mode Belajar & Ujian**, tanyakan tentang *Surety Bond*, lalu perhatikan apakah AI fokus pada konsep/edukasi tanpa menanyakan profil nasabah/proaktif jualan.
  2. Beralih ke **Mode Asisten Jualan**, sebutkan nama perusahaan (misal *PT Logistik Maju*), lalu verifikasi bahwa AI langsung merespons dengan proaktif memberikan rekomendasi cross-selling dan draf kalimat pembuka.
- **Verifikasi Voice-to-Text**:
  - Klik tombol mikrofon, izinkan akses mic di browser, ucapkan kalimat, lalu verifikasi teks terisi di input field dengan benar.
- **Verifikasi Reset Konteks**:
  - Ganti mode di tengah percakapan dan pastikan riwayat chat terhapus untuk mencegah tercampurnya memori model.
