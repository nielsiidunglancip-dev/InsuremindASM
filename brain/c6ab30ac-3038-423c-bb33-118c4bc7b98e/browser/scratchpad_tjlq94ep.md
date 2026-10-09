# Scratchpad - Coordinator Dispatch & Usher Escort Flow Testing

## Checklist
- [x] 1. Navigate to http://localhost:3000/?reset=1 to ensure fresh state.
- [x] 2. Click on "KOORDINATOR", click numpad keys 1, 2, 3, 4 to enter PIN 1234. Verify Coordinator Dashboard loads.
- [x] 3. In the "Cari Meja (1–102)..." input, type "69" and click "DISPATCH" button.
- [x] 4. Verify the Dispatch modal pops up with "MEJA 69", "Zona C", "Kiri Bawah".
- [x] 5. In the list of ushers, click on Usher C2, then click "TUGASKAN MEJA 69 KE USHER C2".
- [x] 6. Verify success confirmation appears and modal closes.
- [x] 7. Observe Usher C2 card in the dashboard showing "MENUNGGU TERIMA TUGAS" or "MEJA 69".
- [x] 8. Open Usher C2 view at http://localhost:3000/?usher=C2 (in second tab or replacing page).
- [x] 9. Verify the prominent "TUGAS BARU!" / "MEJA 69" prompt appears with "TERIMA TUGAS & ESCORT" button.
- [ ] 10. Click "TERIMA TUGAS & ESCORT". Verify status changes to "ESCORTING" and "MEJA 69" is displayed large.
- [ ] 11. Click "TAMU SUDAH DUDUK (SELESAI)". Verify status changes back to "AVAILABLE".
- [ ] 12. Return to Coordinator view, verify Usher C2 is now AVAILABLE and "TOTAL SELESAI" escort count is 1.
- [ ] 13. Report final confirmation and findings.
