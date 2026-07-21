# MVP Testing Strategy & Critical Path Mapping

## What is this Document?

This document outlines a lean, actionable testing strategy for taking an app from development to a Minimum Viable Product (MVP) launch. It explains how to ruthlessly prioritize testing by focusing on the **"Critical Path"**—the exact sequence of steps a user must take to experience the app's core value—ensuring the app delivers its primary function without crashing, rather than aiming for a bug-free, feature-heavy release.

---

## The Core MVP Testing Strategy

1. **Prioritize the Critical Path:** Ignore side features, edge cases, and nice-to-haves. Focus entirely on the core user journey that delivers value.
2. **Lean Testing Pillars:**
   - _Functional Testing:_ Does the core tech work? (Manual clicking + dev unit tests).
   - _Usability Testing:_ Can users figure it out? (Watch 3-5 external people use it).
   - _Compatibility Testing:_ Does it work on target devices? (Top 2 iOS/Android/Browsers only).
   - _Smoke Testing:_ Quick 10-minute checklist executed after every new build.
3. **Simple Defect Triage:**
   - 🔴 **Blocker:** Breaks critical path or crashes the app (Must fix).
   - 🟡 **Major:** Bad UX but functional (Fix if time permits).
   - 🟢 **Minor:** Visual tweaks or typos (Move to post-launch backlog).
4. **Dogfooding & Beta:** Test internally with your team first, then roll out to a closed beta of 20-50 friendly users via tools like TestFlight.
5. **Exit Criteria:** Launch when there are 0 Blocker bugs, a stable core flow, and a <1% crash rate.

---

## How to Map the Critical Path

The goal is to map the absolute shortest sequence of steps a brand-new user must take to reach the "Aha!" moment. Cut out all secondary loops (e.g., settings, forgot password, profile picture uploads).

### 1. The Tools

- **Visual (Recommended):** FigJam, Miro, or a whiteboard.
- **Text-based (Faster):** Google Sheets or Notion.

### 2. The Format

Use a simple left-to-right flow mapping user actions to system responses.
`[User Action] ➔ <System Response>`

_Example Map:_
`[Open App] ➔ <Home Screen> ➔ [Type "Shoes" in search] ➔ <Search Results> ➔ [Click "Buy"] ➔ <Checkout Loaded>`

### 3. Converting to Lean Test Cases

Translate every step on your visual map into a single row in a spreadsheet. This becomes your P0 (Priority 0) Test Suite.

| Test ID   | Feature | User Action                   | Expected Result               | Pass/Fail |
| :-------- | :------ | :---------------------------- | :---------------------------- | :-------- |
| **CP-01** | Launch  | Open app from cold start      | Home Screen displays properly |           |
| **CP-02** | Search  | Type keyword and tap enter    | Relevant results appear       |           |
| **CP-03** | Action  | Tap the primary action button | Checkout/Success screen loads |           |

### 4. Execution

Right before deployment, assign team members to run through this exact checklist. Instruct them to follow the steps precisely. If the critical path passes, the MVP is ready for launch, even if minor bugs exist elsewhere.
