# Walkthrough - Rebranding, AI Coach Gemini RAG, & Gamification Enhancements

We have successfully rebranded the platform from **ASM Insurance Academy** to **"InsureMind Agent" - LMS & AI Coach**, implemented a client-side **Gemini RAG (Retrieval-Augmented Generation)** chatbot, and updated the **Gamification System** with new mathematical rewards and daily spam-protection caps.

---

## 1. Rebranding to InsureMind Agent
- Updated main page `<title>`, description metadata, and branding texts in `index.html` from `ASM Academy` to `InsureMind Agent`.
- Renamed demo login buttons to use `@insuremind.id` instead of `@asm.id`.
- Updated mock product names to:
  - **InsureMind Auto Protection**
  - **InsureMind Home Shield & Business**
  - **InsureMind Persona Safe**
- Updated data lists in `data.js` and calculation / sync functions in `app.js` to match the new brand.

---

## 2. Gemini RAG implementation (AI Coach)
We implemented a high-performance, frontend-friendly local RAG pipeline:
- **CORS Bypass Fix**: Compiled the JSON database into [materi_pdf_text.js](file:///d:/AI/Antigravity/materi_pdf_text.js) which defines `const MATERI_PDF_TEXT = [...]` loaded via script tags.
- **Search Scoring**: Implements keyword matching, term-frequency weighting, and exact-phrase match boosting to retrieve the top 4 most relevant page segments locally.
- **Gemini API**: Connects to Google's **Gemini 3.5 Flash** model. Employs a strict system prompt instructing the model to act as **Coach**, format responses cleanly with Markdown/bullets, sound natural, and act as a sales mentor (objection handling and closing).
- **Offline Fallback**: Displays matching local sections directly in the chat if the API is offline or key is missing.

---

## 3. Gamification Enhancements & Daily Caps (`app.js`)
We implemented the new official XP and Coins criteria with a dynamic daily cap tracker to prevent spamming:

1. **Daily Login (Daily Streak)**:
   - Evaluated during initialization and streak check (capped at **1x per day**): **+10 XP & +2 Coins**.
2. **AI Insurance Coach**:
   - Awarded upon sending a valid question (capped at **3x per day**): **+20 XP & +5 Coins** per query.
3. **Module Completion**:
   - Awarded when marking a chapter completed: **+50 XP & +15 Coins**.
4. **Simulator Work (Kalkulator Premi)**:
   - Awarded when calculating premiums (capped at **3x per day**): **+30 XP & +10 Coins** per simulation.
5. **Short Quizzes (Per Chapter)**:
   - Awarded when completing a chapter quiz: **+30 XP & +15 Coins**.
6. **Certification Tryouts**:
   - Awarded on completion of tryouts: **+100 XP & +30 Coins**.
   - **Jackpot Bonus**: If score is **>= 75**, awards an additional **+100 XP & +25 Coins**, and unlocks the virtual **"Agen Bersertifikat"** graduation badge immediately.

---

## 4. Virtual Reward Store & Cosmetic Enhancements
We completed the transaction logic and visual effects for the "Toko Reward Virtual":
- **Balance Validation**: Inside `renderShopCatalog()`, button text dynamically changes to **"Koin Tidak Cukup"** and is disabled if the user's current coins are less than the item price.
- **Deduction & Real-Time Sync**: Inside `confirmPurchaseRewardItem()`, coins are accurately deducted, state is saved, and `updateTopGamifyBar()` is called to reflect the change immediately in the top header.
- **Premium Toast Notifications**: Created a custom, responsive `showToast()` helper and styled it in `style.css` with a slide-in/fade-out animation, showing: `"Sukses menukarkan koin! Item [Nama Item] telah aktif."`
- **Cosmetic Profile Glow**: Added a pulsing golden glow keyframe animation and thick golden gradient border to both the desktop sidebar profile avatar ring (`.avatar-ring`) and the mobile top menu avatar (`.mobile-user-avatar`) when the *"Bingkai Emas Premium"* is active.

---

## Verification
- Checked that top bar counters (XP, Level, Coins, Streak) render instantly in real-time when actions occur.
- Verified that spamming calculations or chat messages beyond the 3 daily limits does not award extra points.
- Verified that shop catalog buttons turn to disabled **"Koin Tidak Cukup"** if coins are below the item price.
- Verified that purchase of items correctly deducts coins, updates the header in real-time, displays an aesthetic toast notification, and triggers the pulsing golden glow around the profile picture when "Bingkai Emas Premium" is bought.

## 5. Consolidated Catalog & Claim Processing System
We unified the catalog rendering and reward processing logic:
- **Database Catalog Synced**: Updated `data.js` and `app.js` to initialize and load shop items using the localStorage key `"daftar_katalog_reward"`. Default item prices are configured exactly as requested (Streak Freeze: 50, Unlimited AI: 100, Bingkai Emas: 15, Coffee Chat: 30).
- **Claim Transaction Recording**: When an agent clicks "Tukarkan" and confirms the purchase, the system creates a transaction record inside the `"riwayat_penukaran_reward"` array in localStorage. Each record contains the timestamp ID, agent name, item name, coin price, current date-time string, and status (`"Otomatis"` for kosmetik/instant logic, or `"Pending"` for physical rewards).
- **Trainer Management Tab**: Created a third tab **"Kelola Reward & Klaim"** in the Trainer Panel, featuring:
  - **Form Input Reward Baru**: Trainer can fill out Name, Coin Price, Description, and Icon, and click "Tambah ke Katalog" to push the new reward into `"daftar_katalog_reward"`, immediately updating the Toko catalog for agents.
  - **Daftar Klaim Hadiah Agen**: Displays all agent claims from `"riwayat_penukaran_reward"`. If a claim is `"Pending"`, a **"Proses Hadiah"** button is displayed. Clicking this button changes the status to `"Selesai"` in localStorage and refreshes the table in real-time.

---

## Verification
- Verified that top bar counters (XP, Level, Coins, Streak) render instantly in real-time when actions occur.
- Verified that spamming calculations or chat messages beyond the 3 daily limits does not award extra points.
- Verified that shop catalog buttons turn to disabled **"Koin Tidak Cukup"** if coins are below the item price.
- Verified that purchase of items correctly deducts coins, updates the header in real-time, displays an aesthetic toast notification, and triggers the pulsing golden glow around the profile picture when "Bingkai Emas Premium" is bought.
- Verified that dynamic catalog edits from the Trainer panel successfully push new items to localStorage, render them in the shop catalog, and checkouts record new `"Pending"` claims.
- Verified that claims are correctly listed in the Trainer table, and clicking **"Proses Hadiah"** transitions status to `"Selesai"` instantly.
- Verified that when a Trainer or Admin is logged in, the top gamification bar (Level, XP, and Coins) is hidden since it is only relevant for Agents.
- Verified that the claims table has a clean layout with spacious column headers (`<th>`) and rows (`<td>`) due to the new padding styles.
- Verified that when there are no claims, the table renders a stylized empty state showing a muted gift emoji (🎁) above the "Belum ada riwayat klaim hadiah" text.
