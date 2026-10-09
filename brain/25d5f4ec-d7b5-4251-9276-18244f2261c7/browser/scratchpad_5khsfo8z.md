# Scratchpad - APMA Authentication & Member Management E2E Verification

## Verification Checklist
- [x] 1. Open `http://localhost:3000/login.html`
- [x] 2. Verify Login Page UI (Member & Admin tabs, demo quick buttons)
- [x] 3. Login as Member using 'Akun Member Demo' button -> Verify redirect to `member_dashboard.html`
- [x] 4. Verify Budi Santoso profile is loaded -> Click 'Keluar' header button
- [x] 5. Verify redirect back to `login.html`
- [x] 6. Switch to Administrator tab / click 'Akun Admin Master' quick demo -> Submit login
- [x] 7. Verify redirect to `admin_dashboard.html`
- [x] 8. Scroll to 'Manajemen & Direktori Seluruh Anggota' section
- [x] 9. Click 'Menunggu Verifikasi' filter tab -> Check pending members (Kevin Sanjaya, Citra Lestari) display yellow status badge
- [x] 10. Click green 'Verifikasi' button on one of the pending members (e.g. Kevin Sanjaya), confirm alert -> Verify status updates to 'Aktif'
- [x] 11. Click '+ Tambah Anggota' button to open modal
- [x] 12. Fill member details in modal (Farhan Maulana, S.T., etc.)
- [x] 13. Click 'Simpan & Daftarkan Anggota' -> Verify success message and modal closes
- [x] 14. Search for 'Farhan' in member search bar -> Verify newly created member appears with generated APMA ID & Active badge
- [x] 15. Take final screenshot of verified member directory
