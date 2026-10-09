# Walkthrough - Link to QR Code Generator

Aplikasi web **Link to QR Code Generator** telah berhasil dibangun dan diuji sesuai dengan seluruh spesifikasi yang tercantum pada [PRD_Link_to_QR_Code_Generator.pdf](file:///d:/AI%202/QR%20Code%20generator/PRD_Link_to_QR_Code_Generator.pdf).

---

## 🚀 Fitur & Implementasi PRD

| PRD Code | Fitur | Status | Deskripsi |
|---|---|:---:|---|
| **FR-01** | Input URL | ✅ Selesai | Input URL dengan placeholder `Masukkan URL, contoh: https://example.com` dan tombol pembersih cepat (*clear button*). |
| **FR-02** | Validasi URL | ✅ Selesai | Validasi otomatis: jika kosong menampilkan `"Silakan masukkan URL."`, jika format salah menampilkan `"URL tidak valid. Silakan masukkan link yang benar."`. |
| **FR-03** | Generate QR Code | ✅ Selesai | Pembuatan QR Code instan berbasis *client-side* (tanpa server) dengan koreksi kesalahan tinggi (*High Error Correction*). |
| **FR-04** | Preview QR Code | ✅ Selesai | Menampilkan QR Code yang dihasilkan, teks target URL, dan tombol cepat salin link (*Copy to clipboard*). |
| **FR-05** | Download QR Code | ✅ Selesai | Mengunduh berkas gambar PNG beresolusi tinggi (1024x1024) dengan nama default `qr-code.png`. |
| **FR-06** | Reset ("Create New") | ✅ Selesai | Mengembalikan aplikasi ke tampilan awal, membersihkan input, error, dan hasil QR. |
| **NFR** | Keamanan & Responsif | ✅ Selesai | 100% Client-side (tidak menyimpan data pengguna), tampilan adaptif di perangkat desktop, tablet, dan smartphone. |

---

## 📸 Dokumentasi Visual Pengujian

````carousel
![1. Tampilan Awal Aplikasi](/C:/Users/ASM/.gemini/antigravity-ide/brain/b68c3b4b-a14f-4035-bcd2-cc005e7f0c0a/task1_initial_state_1788796321064.png)
<!-- slide -->
![2. Validasi Input Kosong](/C:/Users/ASM/.gemini/antigravity-ide/brain/b68c3b4b-a14f-4035-bcd2-cc005e7f0c0a/task2_empty_input_error_1788796358021.png)
<!-- slide -->
![3. Validasi URL Tidak Valid](/C:/Users/ASM/.gemini/antigravity-ide/brain/b68c3b4b-a14f-4035-bcd2-cc005e7f0c0a/task3_invalid_url_error_1788796403321.png)
<!-- slide -->
![4. Preview QR Code & Link Berhasil Dibuat](/C:/Users/ASM/.gemini/antigravity-ide/brain/b68c3b4b-a14f-4035-bcd2-cc005e7f0c0a/task4_qr_code_generated_1788796486140.png)
<!-- slide -->
![5. Fitur Download QR Code](/C:/Users/ASM/.gemini/antigravity-ide/brain/b68c3b4b-a14f-4035-bcd2-cc005e7f0c0a/task6_download_qr_code_1788796612921.png)
````

---

## 📁 Struktur Berkas Proyek

Proyek mengikuti struktur berkas standar sesuai rekomendasi PRD:

```text
QR Code generator/
├── index.html              # Struktur semantic HTML & layout
├── css/
│   └── style.css           # Desain modern, glassmorphism, responsive, dan animasi
├── js/
│   ├── app.js              # Logika aplikasi (FR-01 s/d FR-06)
│   └── qrcode.min.js       # Library QR Code generator mandiri (Client-Side)
├── server.js               # Web server lokal ringan (opsional)
└── PRD_Link_to_QR_Code_Generator.pdf
```

---

## 🛠️ Cara Menjalankan Aplikasi

Aplikasi ini dapat dibuka secara langsung di browser tanpa instalasi backend:

1. **Buka Langsung Berkas HTML**:
   Cukup klik dua kali atau buka berkas [index.html](file:///d:/AI%202/QR%20Code%20generator/index.html) pada browser pilihan Anda (Chrome, Edge, Firefox, Safari).

2. **Menjalankan Melalui Local Server (Node.js)**:
   ```bash
   node server.js
   ```
   Lalu buka `http://localhost:4173/` pada browser.
