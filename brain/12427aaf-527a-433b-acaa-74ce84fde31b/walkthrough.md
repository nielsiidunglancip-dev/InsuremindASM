# Walkthrough: InsureMind AI (Web Version)

Selamat! Aplikasi Chatbot asuransi Anda kini telah bertransformasi menjadi **Aplikasi Web Premium** dengan teknologi RAG (*Retrieval-Augmented Generation*). 

## Apa yang Baru?

### 1. Desain Web Premium (Nuansa Sinar Mas)
- **Tampilan Antarmuka Modern**: Bot tidak lagi berjalan di layar terminal hitam. Kini Anda memiliki antarmuka obrolan yang elegan di browser, lengkap dengan tema warna biru khas Sinar Mas.
- **Micro-Animations**: Terdapat efek "bot sedang mengetik" (*typing indicator*) dan transisi pesan yang membuat aplikasi terasa hidup.
- **Font & Ikon**: Menggunakan font modern 'Outfit' dan ikon *Lucide* untuk kesan estetik yang maksimal.

### 2. Teknologi RAG (Anti-Limit PDF)
- **Pemrosesan Cerdas**: Anda kini bisa menaruh puluhan PDF di folder `materi_pdf`. Sistem akan memotong-motong PDF tersebut dan mengubahnya menjadi *Vector Embeddings* menggunakan model `text-embedding-004`.
- **Cepat & Hemat Kuota**: Saat Anda bertanya, sistem hanya akan mencari 3 paragraf paling relevan dari tumpukan PDF Anda untuk dikirim ke Gemini. Ini mencegah error *Too Many Requests* selamanya!
- **Auto-Cache**: Embeddings yang sudah dibuat akan disimpan secara lokal (`embeddings_cache.json`). Sehingga saat Anda merestart server besok, prosesnya akan instan tanpa perlu membaca ulang PDF dari awal.

### 3. Fitur Percakapan Cerdas
- **Ingatan Konteks**: Sesuai permintaan Anda, UI web kini melacak riwayat obrolan Anda. Anda bisa bertanya *"lalu bagaimana kelanjutannya?"* dan bot akan mengerti konteks sebelumnya.
- **Sales Coach Mode**: Bot tetap menjalankan perannya secara agresif sebagai *Sales Coach* Sinar Mas, membimbing Anda melakukan *cross-selling* berdasarkan data produk.

## Cara Menggunakan

1. **Jalankan Server**: Buka terminal Anda, lalu ketik `node app.js` (pastikan bot terminal yang lama sudah dimatikan).
2. Peringatan: *Jika ini adalah pertama kalinya (atau jika Anda baru menambah PDF), server akan butuh waktu beberapa detik untuk membuat Embeddings. Tunggu hingga tulisan "Server berjalan di http://localhost:3000" muncul.*
3. **Buka Browser**: Klik atau buka URL [http://localhost:3000](http://localhost:3000) di browser (Chrome/Edge/Safari) Anda.
4. **Mulai Chat**: Ketikkan skenario prospek nasabah Anda di kolom obrolan dan nikmati pengalaman *coaching* AI yang sesungguhnya!
