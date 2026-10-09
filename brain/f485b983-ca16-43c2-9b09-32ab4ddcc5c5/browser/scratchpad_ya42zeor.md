# Troubleshooting Flyer Lightbox

## Plan
1. Navigate to http://localhost:3001 (Done, already there)
2. Verify logged in as Agen (Done, Rian Aditya is logged in)
3. Ensure on "Live Training" page (Done)
4. Click on the first training flyer image.
   - Clicked at (350, 320).
   - Lightbox did not appear visually.
5. Check if `#flyer-lightbox` becomes visible.
   - Visually not visible.
   - DOM shows `<div class='modal-overlay active' id='flyer-lightbox' />` (already active?)
6. Capture console logs.
   - Captured logs, but they are truncated and show iframe warnings. No obvious click errors.
7. Inspect CSS (`asm-style.css`) to understand `#flyer-lightbox` styling.
8. Report findings.

