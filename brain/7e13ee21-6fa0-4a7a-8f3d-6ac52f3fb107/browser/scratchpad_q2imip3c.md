# Checklist for verifying ATC destination card clicks

- [x] Open http://localhost:3001/ and verify load
- [x] Log in if necessary
- [x] Navigate to ATC menu
- [x] Verify 'Malang' destination card click:
    - [x] Active class only on Malang card
    - [x] Header: 'Penerbangan menuju Malang + Bromo'
    - [x] Targets: reqArp 2800, gpw 600, ngpw 500, profit 120
    - [x] Aircraft position and progress bar updated
- [x] Verify 'Japan Ski Adventure' destination card click:
    - [x] Active class only on Japan card
    - [x] Header: 'Penerbangan menuju Japan Ski Adventure'
    - [x] Targets: reqArp 6500, gpw 1000, ngpw 800, profit 200
    - [x] Aircraft position and progress bar updated
- [x] Verify 'Santorini - Yunani' destination card click:
    - [x] Active class only on Santorini card
    - [x] Header: 'Penerbangan menuju Santorini - Yunani'
    - [x] Targets: reqArp 14500, gpw 2100, ngpw 1700, profit 525
    - [x] Aircraft position and progress bar updated
