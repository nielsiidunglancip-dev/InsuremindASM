# Testing Checklist

- [x] Open http://localhost:3000
- [x] Verify 'Asisten Jualan' mode is active by default
- [x] Send sales-related message: 'Saya baru ketemu dengan kontraktor PT Bahari Nusantara. Dia sedang mengerjakan proyek dermaga baru.'
- [x] Verify proactive sales reply (cross-selling, opening lines, single question prompt)
- [x] Take screenshot of sales mode response
- [x] Click 'Belajar & Ujian' card in sidebar
- [x] Verify chat resets and displays study welcome message
- [x] Send study-related message: 'Tolong buatkan kuis 3 soal tentang perbedaan akseptasi Surety Bond vs Bank Garansi untuk materi Level 4.'
- [x] Verify academic response (quiz, no cross-selling)
- [x] Take screenshot of study mode response
- [x] Check if mic button is present
- [x] Click mic button, verify recording starts (Failed - UI didn't update, threw InvalidStateError in console)
- [x] Click mic button again, verify recording stops (Failed)
- [x] Take screenshot of mic button interaction (Taken: mic_click_immediate)
