# Panduan Penyiapan dan Uji Coba Chatbot Asuransi Gemini AI (Multi-PDF)

Langkah-langkah berikut menjelaskan cara memasang dependensi, mengatur konfigurasi, menggunakan folder PDF, dan menjalankan aplikasi chatbot di komputer lokal Anda.

## 1. Instalasi Dependensi Node.js

Buka terminal Anda di direktori proyek `D:\AI\CHATBOT AI\` dan jalankan perintah berikut untuk menginstal pustaka yang diperlukan:

```bash
# Inisialisasi npm (jika belum ada package.json)
npm init -y

# Instal SDK Gemini, modul PDF parser, dan Dotenv
npm install @google/generative-ai pdf-parse dotenv
```

---

## 2. Pengaturan API Key Gemini

1. Buka situs [Google AI Studio](https://aistudio.google.com/) dan buat API Key baru secara gratis.
2. Buka file **[.env](file:///D:/AI/CHATBOT%20AI/.env)** yang ada di folder proyek Anda.
3. Ganti teks `MASUKKAN_API_KEY_GEMINI_ANDA_DI_SINI` dengan kunci API asli Anda:
   ```env
   GEMINI_API_KEY=AIzaSyA123_ContohApiKeyGeminiAsli
   ```

---

## 3. Penempatan File PDF (Multi-PDF)

* **Folder `materi_pdf`**: Saat aplikasi pertama kali dijalankan, folder **`materi_pdf`** akan otomatis dibuat di direktori proyek Anda jika belum ada.
* **Memasukkan Banyak PDF**: Anda dapat menyalin satu atau beberapa file PDF berisi materi asuransi (misalnya `modul_aaui.pdf`, `modul_aaji.pdf`, `surety_bond_info.pdf`) ke dalam folder `materi_pdf` tersebut.
* **Cara Kerja Ingesti**: Chatbot akan memindai folder ini secara otomatis, mengekstrak seluruh teks dari semua berkas PDF yang ada, menggabungkannya dengan label pembatas nama dokumen, lalu menjadikannya basis pengetahuan dinamis untuk model Gemini AI.
* **Tanpa PDF (Fallback)**: Jika folder `materi_pdf` kosong, bot akan otomatis menggunakan basis pengetahuan bawaan dari **[data.js](file:///D:/AI/CHATBOT%20AI/data.js)**.

---

## 4. Menjalankan Chatbot

Jalankan perintah berikut di terminal Anda:
```bash
node app.js
```

### Simulasi Percakapan Contoh:

* **Tanya tentang Level 3**:
  > **Agen:** Apa saja materi di Level 3?
  > **Bot:** *[Membaca data dan menerangkan materi Level 3]*

* **Tanya tentang Level 3 Bonding (Klarifikasi)**:
  > **Agen:** Tolong jelaskan materi Level 3 Bonding.
  > **Bot:** *Catatan: Sertifikasi Level 3 tidak membahas tentang penjaminan (Bonding). Materi Bonding dibahas secara mendalam pada sertifikasi Level 4 Bonding...*

* **Tanya tentang materi dari dokumen PDF tertentu**:
  > **Agen:** Tolong jelaskan materi jaminan penawaran berdasarkan berkas pdf.
  > **Bot:** *[Mencari ke seluruh teks PDF gabungan, menyebutkan isi dari dokumen terkait secara presisi]*
