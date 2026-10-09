# Implementation Plan - Training Agency Live Quiz (MVP v1.0)

A modern, responsive, real-time training quiz web application based on the PRD for **Training Agency Live Quiz v1.0 (MVP)**. It allows trainers to create quizzes, launch live game sessions with 6-digit Game PINs & QR codes, host interactive live games for up to 50 participants, calculate speed-based scores, display animated live leaderboards and winner podiums, and export game history.

## User Review Required

> [!IMPORTANT]
> **Realtime Engine & Supabase Support**:
> 1. **Dual Realtime Mode**:
>    - **Zero-Config Realtime (Default)**: Uses multi-tab `BroadcastChannel` + `LocalStorage` sync, enabling instant multi-tab testing on any device and local network testing, along with a **Bot Simulation** feature (spawn 5–50 virtual participants to test load & scoring immediately).
>    - **Supabase Realtime (Cloud Mode)**: Built-in settings modal to enter Supabase URL & Anon Key for real multi-device cloud multiplayer on Cloudflare Pages / GitHub Pages. Complete SQL database migration scripts included.
> 2. **Preloaded Content**: Preloaded with a complete 10-question "Basic Insurance Principle" training quiz as described in the PRD example scenario.

## Proposed Architecture & File Structure

```
d:/AI 2/Game/
├── index.html                   # Single Page App Shell with seamless tab/view routing
├── css/
│   ├── style.css                # Premium modern UI design system (glassmorphism, vibrant palettes, dark mode)
│   ├── animations.css           # Smooth transitions, countdown pulse, podium confetti, leaderboard transitions
│   └── responsive.css           # Mobile-first participant view & projector-optimized trainer view
├── js/
│   ├── app.js                   # Application bootstrap, routing & view controller
│   ├── config.js                # State management, Supabase credentials, defaults
│   ├── data/
│   │   ├── initial-quizzes.js   # Preloaded sample quizzes ("Basic Insurance Principle" - 10 questions)
│   │   └── storage.js           # LocalStorage database & persistence layer
│   ├── engine/
│   │   ├── scoring.js           # Score engine: Score = Base Point * (Remaining Time / Total Time)
│   │   ├── game-manager.js      # Game state machine (WAITING -> LOBBY -> QUESTION -> RESULT -> LEADERBOARD -> FINISHED)
│   │   └── realtime.js          # Hybrid realtime driver (BroadcastChannel + Supabase Realtime client)
│   ├── views/
│   │   ├── admin-dashboard.js   # Trainer dashboard, metrics, recent games, quick start
│   │   ├── quiz-editor.js       # Quiz & Question builder (MCQ 4 options & True/False, timer, point, explanation)
│   │   ├── trainer-host.js      # Projector view: PIN/QR screen, live lobby, timer, live answer count, chart, podium
│   │   ├── participant-view.js  # Mobile view: Join PIN/Name, waiting lobby, instant color-coded answer pads, score feedback
│   │   ├── history-export.js    # Training history, participant records, CSV/Excel/JSON export
│   │   └── bot-simulator.js     # Virtual participant bot simulator (5-50 participants with realistic answer speed)
│   └── utils/
│       ├── qrcode.min.js        # Standalone QR Code generator for Game PIN
│       ├── confetti.min.js      # Celebration effects for top 3 winners
│       └── sound.js             # Web Audio API procedural sound synthesizer (countdown ticks, correct chime, fanfare)
├── database/
│   └── schema.sql               # Ready-to-run Supabase PostgreSQL schema with RLS & Realtime publication
└── README.md                    # Setup guide, deployment instructions (Cloudflare/GitHub Pages), and feature overview
```

## Core Features Breakdown

### 1. Trainer / Admin Experience
- **Admin Dashboard**: Statistics cards (Active Games, Total Participants, Total Questions, Average Score), recent game list, and training management.
- **Quiz Management**: Create/Edit quizzes with metadata (Training Name, Level: Basic/Intermediate/Advanced, Subject, Trainer Name, Date). Add questions with 4-choice or True/False formats, custom time limits (10, 15, 20, 30, 60s), points, and explanations.
- **Live Game Host (Projector View)**:
  - Generate 6-digit random Game PIN with dynamic QR code and copyable join URL.
  - Live Lobby showing real-time player list, participant counter, and "Start Game" trigger.
  - Question countdown timer with animated radial/progress bar, live answer counter (`12/50 answered`).
  - Question Result & Answer Distribution Bar Chart with correct answer highlight & explanation.
  - Dynamic Leaderboard between questions with score animations.
  - Final Podium (1st, 2nd, 3rd) with confetti celebration, detailed stats, and completion rate.

### 2. Participant (Peserta) Experience
- **Responsive Mobile First**:
  - Join with PIN + Nickname (or instant join via URL query `?pin=123456`).
  - Waiting lobby with animated avatars and status messages.
  - Synced Question Screen with big touch-friendly colored cards (Red, Blue, Yellow, Green for MCQ / Blue & Orange for T/F).
  - Instant locking on answer submission with feedback, streak counter, and live score breakdown after timer ends.
  - Final results summary card with rank badge and correct answers count.

### 3. Realtime Engine & Bot Simulator
- Seamless zero-configuration multi-tab synchronization using `BroadcastChannel` and `LocalStorage` events.
- Built-in **Simulate Participants** button for trainer to spawn 5 to 50 virtual participants who answer with randomized realistic reaction times and accuracy to test the full live experience solo.
- Optional Cloud Supabase integration with full SQL schema included.

### 4. History & Export
- Training session record keeping (Training name, level, subject, trainer, participants, rank, score, accuracy %, completion %).
- Export to CSV/Excel format for training records.

## Verification Plan

### Automated & Unit Checks
- Verify scoring formula: `Score = round(BasePoint * (remainingMs / totalMs))` for correct answers, `0` for incorrect.
- Verify question state machine transitions: `WAITING` -> `LOBBY` -> `QUESTION` -> `RESULT` -> `LEADERBOARD` -> `FINISHED`.
- Verify export CSV generation format.

### Browser End-to-End Simulation
- Open Trainer view in Browser Subagent and spawn live game session with PIN.
- Open Participant view in a second window or run 15 simulated bots to verify:
  1. Real-time participant joining in lobby.
  2. Question countdown and real-time answer distribution.
  3. Dynamic scoring and leaderboard ranking.
  4. Final podium rendering with winner display.
  5. CSV export generation.
