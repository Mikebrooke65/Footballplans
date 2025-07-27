# 🧱 Footballplans Build Plan

This phased roadmap guides development of the Footballplans platform, based on the scoped features in `PROJECT_REQUIREMENTS.md`.

---

## Phase 1: Core App Scaffold & Contributor Flow

### 🎯 Goals
- Establish baseline lesson viewer and coach login
- Tidy lesson builder script for clean output
- Confirm build/deploy to mobile and Azure Static Web

### 🔧 Tasks
- [ ] Refactor repo structure:
  - `/App/` – mobile frontend
  - `/lesson-builder/` – lesson script and templates
  - `/Requirements/` – specs and contributor guides
- [ ] Implement passwordless login for coaches
- [ ] Mobile app renders lesson HTML or JSON
- [ ] Create feedback form linked to lesson view
- [ ] Store timestamped lesson versions with archive access

---

## Phase 2: Admin Portal & Lesson Creation

### 🎯 Goals
- Empower senior coaches with a web-based builder
- Support lesson creation, versioning, and assignment

### 🔧 Tasks
- [ ] Refactor `lesson-builder/script.js` using templating engine (e.g. Mustache.js or EJS)
- [ ] Add lesson manager: create/edit, assign, publish
- [ ] Store lessons in Azure Blob or repo
- [ ] Display lesson history in admin UI
- [ ] Pull and display coach feedback

---

## Phase 3: Messaging Foundation (Scaffold Only)

### 🎯 Goals
- Prep messaging interface for future rollout

### 🔧 Tasks
- [ ] Add messaging tab to coach app (placeholder UI)
- [ ] Define backend endpoints for message delivery
- [ ] Scaffold push notifications (no triggers yet)

---

## Contributor Enablement

- [ ] Create `README.md` for `Requirements/`
- [ ] Add contributing guide for lesson editing and content creation
- [ ] Publish changelog tracking lesson builder evolution

---

*This plan evolves with the repo — track updates and progress here as features roll out.*
