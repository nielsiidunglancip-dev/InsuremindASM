# Pengembangan InsureMind AI: Versi Web & RAG (Anti-Limit)

Rencana ini merangkum langkah-langkah untuk mengubah chatbot terminal (CLI) Anda menjadi Aplikasi Web profesional dengan antarmuka grafis (UI), serta memecahkan masalah kuota token menggunakan arsitektur RAG (Retrieval-Augmented Generation).

## ⚠️ User Review Required
> [!IMPORTANT]
> **Keputusan Arsitektur: RAG (Vector Database)**
> Untuk memungkinkan Anda memasukkan **22 file PDF** sekaligus tanpa terkena limit *429 Too Many Requests*, kita harus merombak cara bot membaca dokumen. Kita akan memecah teks PDF menjadi potongan-potongan kecil (chunks) dan menggunakan AI untuk mencari paragraf yang paling relevan saja saat menjawab pertanyaan. Proses awal membaca PDF ini mungkin memakan waktu beberapa detik saat server pertama kali dijalankan, namun akan sangat cepat saat *chatting*. Apakah Anda setuju dengan pendekatan ini?

## ❔ Open Questions
1. Apakah Anda ingin desain *Web App* ini bernuansa warna spesifik (misal: nuansa Biru/Hijau sesuai Sinar Mas, atau Dark Mode elegan)?
2. Apakah kita perlu menambahkan fitur riwayat percakapan (sehingga bot ingat apa yang baru saja Anda tanyakan sebelumnya)?

## Proposed Changes

### Backend & RAG System
Kita akan mengubah `app.js` dari aplikasi terminal menjadi server web menggunakan **Express.js**.

#### [MODIFY] [app.js](file:///d:/AI/CHATBOT%20AI/app.js)
- Menghapus antarmuka `readline` (terminal).
- Menambahkan **Express.js** untuk menangani HTTP request dari Web.
- Membuat endpoint `/api/chat` untuk menerima pesan dari pengguna dan membalasnya.

#### [NEW] [ragHelper.js](file:///d:/AI/CHATBOT%20AI/ragHelper.js)
- File baru untuk mengelola RAG (Retrieval-Augmented Generation).
- Berisi logika untuk memotong teks PDF panjang menjadi paragraf kecil.
- Menggunakan model `text-embedding-004` dari Gemini untuk mengubah teks menjadi *Vector*.
- Logika untuk mencari *Top 3* paragraf paling relevan dengan pertanyaan agen, sehingga kita terhindar dari limit token.

### Frontend (User Interface)
Kita akan membuat tampilan Web (UI) yang premium, dinamis, dan terlihat sangat profesional.

#### [NEW] [public/index.html](file:///d:/AI/CHATBOT%20AI/public/index.html)
- Struktur HTML utama untuk aplikasi chat.
- Menggunakan Font premium (misal: 'Inter' atau 'Outfit').
- Tata letak menyerupai ChatGPT / asisten modern.

#### [NEW] [public/style.css](file:///d:/AI/CHATBOT%20AI/public/style.css)
- Styling menggunakan *Vanilla CSS*.
- Mengimplementasikan desain estetika tinggi: efek *glassmorphism*, warna gradient yang halus, dan bayangan dinamis.
- Animasi mikro (*micro-animations*) untuk pesan yang masuk dan indikator *loading*.

#### [NEW] [public/script.js](file:///d:/AI/CHATBOT%20AI/public/script.js)
- Logika antarmuka web.
- Menangani input pengguna, mengirimnya ke backend via `fetch()`, dan menampilkan balasan dengan efek mengetik (*typing effect*).

## Verification Plan

### Manual Verification
1. Menjalankan `npm install express cors` dan menjalankan server web (`node app.js`).
2. Membuka `http://localhost:3000` di *browser*.
3. Memastikan UI web terlihat sangat estetis dan premium.
4. Mengembalikan 22 file PDF ke dalam folder `materi_pdf`.
5. Menguji dengan pertanyaan untuk memastikan bot tetap bisa menjawab dengan cerdas **tanpa** memunculkan error limit token.
