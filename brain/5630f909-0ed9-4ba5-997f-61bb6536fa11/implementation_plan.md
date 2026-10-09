# Compact Enterprise UI Refactoring Plan

This document outlines the changes proposed to implement the "Compact Enterprise UI" design pattern requested, optimizing screen real estate and eliminating the need for browser zoom-out.

## User Review Required

> [!IMPORTANT]
> Please review the proposed changes to the UI layout. Specifically, the shrinking of padding, margins, and font sizes across the dashboard to ensure it aligns with your expectations of a "Compact" design.

## Proposed Changes

### 1. Viewport Locking & Scroll Management

We will ensure the application container precisely fits the user's screen height, moving the scrollbar from the whole browser window into the main content area itself.

#### [MODIFY] `style.css`
- Update `body`: Add `height: 100vh; overflow: hidden;`
- Update `.shell-container`: Set `height: 100vh; min-height: unset; overflow: hidden;`
- Update `.main-content`: Add `height: 100vh; overflow-y: auto;` to handle internal scrolling for long pages without breaking the outer shell.

### 2. Compact Component Scaling

We will reduce the whitespace (padding/margin) and font sizes by approximately 30-40% across key components.

#### [MODIFY] `style.css`
- **Paddings & Margins:**
  - `.main-content`: Reduce padding from `24px 32px` to `16px 20px`.
  - `.content-card`: Reduce padding from `20px` to `14px`.
  - `.dashboard-stat-card`: Reduce padding from `18px` to `12px`.
  - `.welcome-box`: Reduce padding to `16px 20px` and margin-bottom to `16px`.
  - `.dashboard-row` & `.stats-container`: Reduce gap to `12px` and margin-bottom to `16px`.
  - `.top-gamify-bar`: Reduce padding to `8px 14px` and margin-bottom to `16px`.
- **Typography:**
  - Scale down `.page-heading h2` from 22px to 20px.
  - Scale down `.welcome-txt` from 20px to 18px.
  - Scale down `.card-header h3` from 14px to 13px.
  - Scale down `.stat-number` from 18px to 16px.
  - Scale down general widget text/sub-text to 11px - 13px limits.

### 3. Revisi Form & Preview "Buat Penawaran"

We will convert the PPTX Builder interface into a side-by-side 2-column layout so both the input form and the slide preview are visible simultaneously without vertical scrolling.

#### [MODIFY] `index.html` & `style.css`
- **index.html**: Wrap the form inputs (`.pptx-form-grid`) and the preview (`.pptx-slide-preview`) inside a new parent container `div.pptx-builder-layout`.
- **style.css**: Create `.pptx-builder-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; align-items: start; }` to enforce the balanced split.

### 4. Revisi Grid Dashboard Utama

We will tighten the layout of the top dashboard widgets to ensure everything is visible "above the fold" upon login.

#### [MODIFY] `style.css`
- Optimize `.dashboard-row` and `.stats-container` to use tighter grid tracks.
- Ensure the Progress Karir and Misi Harian containers adapt cleanly to the new compact padding, making sure they don't push content below the fold on standard laptop displays.

## Verification Plan

### Manual Verification
- Once changes are applied, verify the dashboard UI via browser. The application should fit exactly into a `100vh` frame.
- Verify that the "Buat Penawaran" (PPTX Builder) tab displays perfectly side-by-side.
- Ensure text remains readable despite the reduced size.
