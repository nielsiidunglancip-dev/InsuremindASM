# Rencana Implementasi Sistem AI Product Finder (RAG)

Fitur RAG (*Retrieval-Augmented Generation*) untuk mencari produk asuransi saat ini sudah memiliki pondasi *backend* (menggunakan `materi_pdf_text.json` sebagai sumber pengetahuan) namun masih menggunakan antarmuka pencarian berupa formulir kaku (Jenis Nasabah, Objek, dsb). 

Agar Agen dapat "langsung bertanya kepada AI" seperti yang Anda harapkan (contoh: *"Produk asuransi apa yang cocok untuk orang tua yang baru pensiun?"*), kita perlu merombak antarmuka dan logika *prompt* AI-nya menjadi lebih natural (*conversational*).

## User Review Required

> [!IMPORTANT]  
> Saat ini *backend* (`server.js`) membaca teks PDF dari berkas `materi_pdf_text.json` yang telah disiapkan sebelumnya. Apakah Anda setuju jika untuk tahap ini kita gunakan data JSON tersebut sebagai sumber pengetahuan AI, tanpa perlu membuat pengunggah PDF baru di sisi Admin?

## Proposed Changes

### 1. Antarmuka Pengguna (Agent Dashboard)
Mengubah UI "AI Product Finder" di halaman Katalog Produk Agen dari yang awalnya menggunakan formulir (Radio Button & Dropdown) menjadi satu kotak input teks bebas (*Free-text Prompt/Chat*) layaknya ChatGPT.

#### [MODIFY] `index.html`
- Menghapus input `Jenis Nasabah` dan `Objek Asuransi`.
- Mengubah textarea `Kebutuhan Spesifik` menjadi kotak pencarian utama (misal: "Ketik pertanyaan Anda tentang rekomendasi asuransi...").
- Menambahkan animasi *loading* yang lebih interaktif saat AI sedang "berpikir" dan menyusun jawaban dari dokumen PDF.

### 2. Logika Frontend (Penghubung API)
Mengubah cara aplikasi web mengirimkan data ke *backend* AI, dari sebelumnya mengirimkan format objek yang kaku, menjadi format teks kueri bebas.

#### [MODIFY] `app.js`
- Memodifikasi fungsi `window.findAIProduct()` untuk mengambil teks dari input pencarian yang baru.
- Memperbarui *payload* yang dikirimkan ke `http://localhost:3001/api/ai-product-finder` menjadi `{ query: "pertanyaan agen..." }`.
- Memperbarui respons *mockup* (jika *backend* tidak jalan atau API Key belum diisi) agar menyertakan kata kunci dari pertanyaan agen agar lebih relevan.

### 3. Logika Backend (Pemroses RAG)
Merombak instruksi sistem (*System Prompt*) yang dikirimkan ke model AI (Gemini) agar siap menerima pertanyaan bebas dari Agen dan mencocokkannya dengan *knowledge base* (PDF).

#### [MODIFY] `server.js`
- Mengubah parameter `req.body` dari `{ type, obj, needs }` menjadi `{ query }`.
- Menulis ulang *prompt* ke Gemini menjadi: "Anda adalah konsultan Asuransi Sinar Mas... Berikut adalah pertanyaan dari agen: [query]... Gunakan referensi materi PDF berikut untuk menjawab..."
- Mempertahankan format keluaran berupa HTML agar dapat dirender langsung dengan rapi oleh aplikasi (*bullet points*, dsb).

## Verification Plan

### Manual Verification
1. Masuk sebagai Agen, buka menu "Katalog Produk".
2. Pada bagian AI Product Finder, ketikkan: *"Produk asuransi apa yang cocok untuk orang tua yang baru pensiun?"*
3. Klik tombol cari, dan pastikan:
   - Teks *loading* muncul (⏳ AI sedang menganalisis...)
   - Hasil rekomendasi muncul berisi nama produk dan alasan.
   - Jika *backend* Node.js jalan, respons akan diambil asli dari Gemini yang membaca data `materi_pdf_text.json`. Jika tidak, akan memunculkan respons simulasi dengan penanda kuning.
