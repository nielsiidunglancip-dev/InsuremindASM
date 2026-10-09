# Testing Plan - Usher Control Application E2E

- [ ] 1. View Landing screen (S-01), check stats and design.
- [ ] 2. Click "Scan untuk Akses HP" / QR button to verify QR modal appears, then close it.
- [ ] 3. Click "Saya adalah USHER" to open S-02 (Usher selection screen). Observe all 18 ushers grouped by Zone A to F.
- [ ] 4. Click Usher C2 to enter Usher C2 Dashboard (S-03). Verify status AVAILABLE & Zone Zona C.
- [ ] 5. Click "Posisi: Zona C" to toggle zone picker, change to Zona B, then change back to Zona C.
- [ ] 6. Click header switch button (log out) to return to landing.
- [ ] 7. Click "KOORDINATOR", enter PIN "1234", enter Coordinator Dashboard (S-05).
- [ ] 8. Verify 18 ushers grid, status summary counters, switch to "Denah Ballroom" tab to view 6 zones & 80 tables.
- [ ] 9. Search Meja "69", verify Zona C (Kiri Bawah).
- [ ] 10. Select Usher C2 and click "TUGASKAN MEJA 69 KE USHER C2".
- [ ] 11. Observe notification / activity log.
- [ ] 12. Return to Usher C2 view, verify pending dispatch for Meja 69. Click "TERIMA TUGAS & ESCORT" -> status ESCORTING.
- [ ] 13. Click "TAMU SUDAH DUDUK (SELESAI)" -> status AVAILABLE.
- [ ] 14. Click "BUTUH BANTUAN (ASSIST)", select reason "Meja tujuan sudah penuh / ditempati", send signal.
- [ ] 15. Switch to Coordinator view to see red ASSIST alert for C2, click "✓ SELESAI" to resolve.
- [ ] 16. Summarize all findings.
