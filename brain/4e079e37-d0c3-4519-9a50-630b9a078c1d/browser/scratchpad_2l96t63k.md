# Task Checklist
- [x] Navigate to http://localhost:5173/
- [x] Verify title 'AI Underwriting' is visible
- [ ] Click quick-login button for 'Marketing' (Failed: returns "Username atau password salah")
- [ ] Wait for dashboard to load
- [ ] Verify header 'AI Underwriting Assistant' is displayed
- [ ] Click 'Keluar' to log out
- [ ] Confirm logged out successfully

## Findings
1. **Frontend Configuration**:
   - `vite.config.js` has no proxy configured.
   - However, `AuthContext.jsx` calls `http://127.0.0.1:8000/api/auth/login` directly, so it bypasses Vite proxy.
2. **Backend Behavior**:
   - Backend is running on `http://127.0.0.1:8000/` and returns the health check message successfully.
   - The login endpoint `http://127.0.0.1:8000/api/auth/login` is active (returns 405 Method Not Allowed for GET).
   - But posting credentials (via quick-login or manual input like `marketing`/`marketing123`) returns `401 Unauthorized` with detail `"Username atau password salah"`.
   - Backend Swagger docs at `/docs` fails to load because `/openapi.json` returns `500 Internal Server Error`.
3. **Hypotheses for Login Failure**:
   - **Database Seeding Issue**: The database might not have been seeded, or the seed script failed/didn't run.
   - **Password Mismatch**: The seed script might have saved raw passwords, but the auth module expects bcrypt-hashed passwords.
   - **Generic Exception Mapping**: The backend might have a database error (e.g. table not found) which is caught and genericly mapped to a 401 "Username atau password salah" error.
