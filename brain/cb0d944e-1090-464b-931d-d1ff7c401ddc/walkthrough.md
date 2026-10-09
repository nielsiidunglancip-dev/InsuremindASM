# Walkthrough - Training Agency Live Quiz (MVP v1.0)

Aplikasi web interaktif **Training Agency Live Quiz (MVP v1.0)** telah selesai dibangun dan diverifikasi secara menyeluruh sesuai dengan seluruh spesifikasi dokumen PRD.

---

## 🎯 Fitur yang Telah Diselesaikan

### 1. 👨‍🏫 Trainer / Admin Portal & Host Proyektor
- **Admin Dashboard**: Statistik total bank quiz, total pertanyaan, jumlah peserta, rata-rata skor, dan tabel sesi game terakhir.
- **Quiz & Question Editor**: Mendukung kuis baru & edit, tipe soal Pilihan Ganda (4 Opsi A-D) dan True/False, timer (10s–60s), kunci jawaban, bobot poin, dan pembahasan soal.
- **Preloaded Quiz**: Preloaded dengan **"Basic Insurance Principle" (10 Soal)** sesuai PRD Section 20.
- **Lobby Realtime**:
  - Tampilan Game PIN 6-digit & QR Code dinamis otomatis.
  - Counter peserta realtime (kapasitas hingga 50 peserta).
  - Avatar bubble peserta yang langsung muncul saat ada yang bergabung.
  - **Bot Simulator (`🤖 +5 Bot` / `+15 Bot`)**: Memungkinkan trainer melakukan simulasi live multiplayer dengan kecerdasan dan waktu reaksi realistis langsung dalam 1 klik.
- **Layar Soal Langsung**: Countdown timer bar progresif, indikator jumlah peserta yang sudah menjawab, dan tombol akhiri/lewati soal.
- **Layar Distribusi & Pembahasan**: Chart persentase jawaban peserta dan sorotan kunci jawaban benar.
- **Animated Leaderboard**: Peringkat per soal dengan animasi perolehan skor dan badge streak.
- **3D Winner Podium**: Podium Juara 1, 2, dan 3 dengan selebrasi partikel *confetti* dan efek suara kemenangan.

### 2. 📱 Mode Peserta (Mobile & Responsive)
- **Join Instan**: Masuk menggunakan Game PIN + Nama atau via scan QR Code / URL langsung tanpa login.
- **Waiting Lobby**: Status menunggu interaktif.
- **Layar Jawaban Sentuh**: Tombol warna-warni kontras tinggi (Merah, Biru, Kuning, Hijau & True/False).
- **Feedback Kecepatan**: Scoring otomatis berbasis kecepatan: $\text{Score} = \text{Base Point} \times \frac{\text{Sisa Waktu}}{\text{Total Waktu}}$.
- **Hasil & Peringkat Akhir**: Ringkasan rank, total poin, dan badge kelulusan.

### 3. 📊 Riwayat & Export
- Tab rekap sesi kuis training dan rekapitulasi data nilai seluruh peserta.
- **Export CSV / Excel**: Download spreadsheet instan untuk arsip Training Agency.
- **Backup JSON**: Cadangan data kuis dan riwayat.

### 4. ⚡ Realtime & Database Cloud Supabase
- **Zero-Config Realtime**: Sinkronisasi multi-tab instan via `BroadcastChannel` dan `LocalStorage`.
- **Supabase Cloud Ready**: Modal pengaturan Supabase + File skema database lengkap di `database/schema.sql` (PostgreSQL RLS & Realtime publication).

---

## 📸 Hasil Pengujian Browser

````carousel
![Dashboard Overview](file:///C:/Users/ASM/.gemini/antigravity-ide/brain/cb0d944e-1090-464b-931d-d1ff7c401ddc/dashboard_overview_1789480581298.png)
<!-- slide -->
![Bank Kuis & Recent Games](file:///C:/Users/ASM/.gemini/antigravity-ide/brain/cb0d944e-1090-464b-931d-d1ff7c401ddc/dashboard_quizzes_1789480592366.png)
<!-- slide -->
![Host Lobby dengan Game PIN dan QR Code](file:///C:/Users/ASM/.gemini/antigravity-ide/brain/cb0d944e-1090-464b-931d-d1ff7c401ddc/host_lobby_pin_qr_1789480640359.png)
<!-- slide -->
![Lobby dengan 5 Bot Simulasi Bergabung](file:///C:/Users/ASM/.gemini/antigravity-ide/brain/cb0d944e-1090-464b-931d-d1ff7c401ddc/lobby_bots_added_1789480694537.png)
<!-- slide -->
![Layar Soal Live dengan Countdown Timer](file:///C:/Users/ASM/.gemini/antigravity-ide/brain/cb0d944e-1090-464b-931d-d1ff7c401ddc/live_question_timer_1789480735714.png)
<!-- slide -->
![Distribusi Jawaban & Kunci Jawaban](file:///C:/Users/ASM/.gemini/antigravity-ide/brain/cb0d944e-1090-464b-931d-d1ff7c401ddc/result_answer_distribution_1789480751648.png)
<!-- slide -->
![Live Leaderboard Ranking](file:///C:/Users/ASM/.gemini/antigravity-ide/brain/cb0d944e-1090-464b-931d-d1ff7c401ddc/leaderboard_view_1789480785235.png)
<!-- slide -->
![Rekapitulasi & Export Data](file:///C:/Users/ASM/.gemini/antigravity-ide/brain/cb0d944e-1090-464b-931d-d1ff7c401ddc/riwayat_export_page_1789480860004.png)
````

---

## 💻 Cara Menjalankan

Aplikasi saat ini aktif berjalan pada:
👉 **`http://localhost:8080`**

Anda dapat membuka URL di atas pada browser untuk langsung mencoba sebagai Trainer, maupun membuka tab terpisah pada menu **"📱 Mode Peserta"** untuk bermain!
