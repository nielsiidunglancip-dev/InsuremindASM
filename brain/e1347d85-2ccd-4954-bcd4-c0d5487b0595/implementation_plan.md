# Implementation Plan - Trainer Dashboard Stats Card & Interactive Filtering

We will implement a new stats card for the Trainer Dashboard that dynamically displays the pending claims count and acts as an interactive filter for the claims table.

## Proposed Changes

---

### [Component 1] Trainer Stats Card HTML (`index.html`)

We will add the stats card and the "Tampilkan Semua" button in the Trainer Dashboard section.

#### [MODIFY] [index.html](file:///d:/AI/Antigravity/index.html)
1. **Stats Card**: Insert the stats card wrapper `<div class="trainer-stats-bar">` below the trainer dashboard page-heading and above the trainer-tabs.
2. **Filter Reset Button**: Update the claims list card-header to use `.flex-header` and add the "Tampilkan Semua" button (`#btn-show-all-claims`).

---

### [Component 2] Dynamic Stats & Filtering Logic (`app.js`)

We will update the session initializer, claims rendering table, and implement filter actions.

#### [MODIFY] [app.js](file:///d:/AI/Antigravity/app.js)
1. **Filter State**: Declare a global state variable `let currentClaimsFilter = "All";` in the state section.
2. **Session Initialization**: In `initUserSession()`, show or hide the `.trainer-stats-bar` container depending on whether `currentUser.role` is `"Trainer"` or `"Admin"`.
3. **Claims Table Rendering**:
   - In `renderTrainerClaimsTable()`, calculate the total number of `"Pending"` claims in `"riwayat_penukaran_reward"`.
   - Update `#stats-pending-count` element text dynamically.
   - If `currentClaimsFilter` is `"Pending"`, filter the displayed claims list accordingly and make `#btn-show-all-claims` visible. Otherwise, hide the reset button.
4. **Filter Handler**: Implement `filterTrainerClaims(filterType)` to set the filter type, trigger a re-render of the table, and display a helpful toast notification message.

---

## Verification Plan

### Manual Verification
1. Login as the Trainer (Coach Hendra).
2. Verify that the **"Antrean Klaim"** stats card appears at the top of the page showing the count of pending claims (e.g. `"1 Pending Klaim"`).
3. Click the card and verify that:
   - The claims table is filtered to show only "Pending" claims.
   - A toast message displays `"Tabel disaring: Menampilkan klaim Pending saja."`
   - The **"Tampilkan Semua"** button appears next to the table header.
4. Click **"Tampilkan Semua"** and verify that:
   - The claims table resets and displays all records (both "Pending" and "Selesai").
   - The **"Tampilkan Semua"** button is hidden again.
   - A toast message displays `"Menampilkan seluruh riwayat klaim."`
5. Login as the Agent (Rian Aditya) and verify that the stats card is NOT visible at all on the Agent dashboard or profile screen.
