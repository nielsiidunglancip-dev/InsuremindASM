# CPD Points Submission & Approval Flow Test

## Steps Completed:
1. Navigated to `http://localhost:3000/member_dashboard.html`.
2. Switched to 'Pelacak Poin CPD' tab.
3. Observed initial total CPD points: `25 / 30 Poin CPD (83%)`, Pengajuan Mandiri: `15 Poin`.
4. Clicked 'Ajukan Poin CPD Mandiri'.
5. Filled modal form:
   - Nama Acara: `Growth Marketing & AI Summit 2026`
   - Penyelenggara: `Reforge Global`
   - Tanggal: `2026-03-05`
   - Skor: `95`
   - Poin Diajukan: `5`
6. Submitted form via 'Kirim Pengajuan'.
7. Verified submission in table with status `Menunggu Verifikasi` (Pending).
8. Navigated to `http://localhost:3000/admin_dashboard.html`.
9. Located 'Verifikasi & Persetujuan Pengajuan Poin CPD' section and submission `Growth Marketing & AI Summit 2026`.
10. Clicked green 'Setujui' button.
11. Confirmed approval with 5 points via 'Setujui & Tambah Poin'. Status updated to `Approved` (+5 Poin disetujui).
12. Navigated back to `http://localhost:3000/member_dashboard.html` -> 'Pelacak Poin CPD' tab.
13. Verified CPD submission is now `Approved` and total CPD points increased by +5 to `30 / 30 Poin CPD (100%)` (Pengajuan Mandiri (Approved): `20 Poin`).
14. Captured screenshot: `cpd_points_approved_1788706467629.png`.
