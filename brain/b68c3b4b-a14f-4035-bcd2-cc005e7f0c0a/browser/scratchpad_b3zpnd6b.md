# Test Checklist: Link to QR Code Generator

- [x] Task 1: Go to http://localhost:4173 and check page elements (Title "Link to QR Code", input placeholder "Masukkan URL, contoh: https://example.com", "Generate QR Code" button) - PASSED
- [x] Task 2: Click "Generate QR Code" with empty input -> Verify error message "Silakan masukkan URL." - PASSED
- [x] Task 3: Type invalid URL "not-a-valid-url" -> Click "Generate QR Code" -> Verify error message "URL tidak valid. Silakan masukkan link yang benar." - PASSED
- [x] Task 4: Type valid URL "https://google.com" -> Click "Generate QR Code" -> Verify QR Code preview, URL display, "Download QR Code", and "Create New" buttons - PASSED
- [x] Task 5: Click "Create New" -> Verify initial state (empty input, no preview) - PASSED
- [x] Task 6: Type "https://example.com" -> Click "Generate QR Code" -> Click "Download QR Code" -> Verify download action - PASSED
- [x] Task 7: Prepare final summary report - PASSED

