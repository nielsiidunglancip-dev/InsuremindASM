# Rencana Implementasi: Chatbot Asuransi Menggunakan Gemini API & PDF

Rencana ini memandu transisi chatbot asuransi sederhana di `app.js` menjadi chatbot pintar berbasis AI menggunakan **Gemini API** dan file PDF lokal sebagai basis pengetahuan (*knowledge base*).

## Yang Diperlukan dari Pengguna (User Review Required)

> [!IMPORTANT]
> **API Key Gemini**: Anda memerlukan API Key dari Google AI Studio untuk menjalankan bot ini. 
> Anda dapat memperolehnya secara gratis di [Google AI Studio](https://aistudio.google.com/).
> API Key ini nantinya akan disimpan dengan aman di file `.env`.

> [!NOTE]
> **File PDF**: Anda perlu menyiapkan sebuah file PDF berisi materi asuransi (misalnya bernama `modul_asuransi.pdf`) dan menaruhnya di dalam folder proyek `D:\AI\CHATBOT AI\`.

## Rencana Perubahan Kode

Untuk mewujudkan chatbot bertenaga AI ini, kita akan menambahkan beberapa modul baru dan memperbarui `app.js`.

### Dependensi Baru (Packages)
Kita akan menginstal tiga pustaka berikut:
1. `@google/generative-ai` - SDK resmi untuk berinteraksi dengan model Gemini AI.
2. `pdf-parse` - Untuk membaca dan mengekstrak teks dari file PDF lokal.
3. `dotenv` - Untuk memuat API Key dari file konfigurasi lingkungan `.env` dengan aman.

---

### [NEW] [.env](file:///D:/AI/CHATBOT%20AI/.env)
File konfigurasi tempat menyimpan API Key secara privat.
```env
GEMINI_API_KEY=YOUR_GEMINI_API_KEY_HERE
```

---

### [NEW] [pdfHelper.js](file:///D:/AI/CHATBOT%20AI/pdfHelper.js)
Modul utilitas untuk mengekstrak teks dari file PDF lokal.

---

### [MODIFY] [app.js](file:///D:/AI/CHATBOT%20AI/app.js)
Mengubah alur chatbot untuk:
1. Membaca file PDF lokal saat startup.
2. Mengirimkan teks PDF tersebut sebagai *context* (basis pengetahuan) ke Gemini API.
3. Menggunakan model `gemini-1.5-flash` untuk menjawab pertanyaan agen berdasarkan konteks PDF tersebut secara interaktif.

---

## Langkah Verifikasi

### Pengujian Mandiri
1. Menjalankan perintah `npm install @google/generative-ai pdf-parse dotenv` di terminal.
2. Membuat file `.env` dan mengisi `GEMINI_API_KEY`.
3. Menaruh file PDF contoh (misal: `modul_asuransi.pdf`) di root folder proyek.
4. Menjalankan aplikasi dengan `node app.js` dan memberikan pertanyaan seputar isi PDF tersebut.
