# Tasks
- [x] Open http://localhost:3001
- [x] Login as rian.aditya@asm-academy.id
- [x] Navigate to 'Toko Reward'
- [x] Find 'Tiket Main Lagi 🎮'
- [x] Click 'Beli' button for the ticket
- [x] Verify '#shop-confirm-modal' is shown
- [x] Try to click confirmation button in modal
- [x] Verify results (modal closed, coins deducted, success/failure)

## Findings
1. Login as demo agent (Rian) works.
2. Navigating to Toko Reward works.
3. Clicking 'Beli' on 'Tiket Main Lagi 🎮' opens the confirmation modal.
4. Clicking 'Beli (5 Koin)' in the modal works:
   - The modal closes.
   - Coins in the shop page are deducted (from 5 to 0).
5. **Bug 1**: The header widget coins display is not synced with the shop coins. Header still shows "40 Koin" while shop shows "0 Koin" (after deduction).
6. **Bug 2**: The purchased ticket does not seem to grant an extra play. After playing 2 sessions, the user is still blocked and prompted to buy a ticket, even though one was already purchased.
7. The redirect buttons in the game quota modal and game hub page to 'Beli Tiket' both work and redirect to the rewards shop.
8. The confirmation button in the modal is clickable and does not seem to be blocked by overlays.

