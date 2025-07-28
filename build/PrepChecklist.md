# PREP_CHECKLIST.md

Pre-build preparation checklist for the West Coast Rangers Junior Coaching App (MAUI version). Complements `BUILD_PLAN.md` and ensures repo, tooling, and sample content are aligned before implementation begins.

---

## ✅ 1. Repo Structure & Scaffolding

- [ ] Folder layout matches MAUI build phases:
  - `/Views/` for screens (e.g. LessonBuilder, SessionStart)
  - `/ViewModels/` if using MVVM pattern
  - `/Controls/` for reusable UI (e.g. MarkdownRenderer)
  - `/Admin/` or `/Views/Admin/` for audit pages
  - `/build/` for planning docs
  - `/sample_data/` for mock records
- [ ] `BUILD_PLAN.md` and `DesignPrinciples.md` in `/build/`
- [ ] Stub views created as `.xaml` and `.xaml.cs`:
  - `LessonBuilder.xaml`
  - `TextBlockEditor.xaml`
  - `SkillSelectPage.xaml`
  - `SessionStart.xaml`
  - `AuditTrailViewer.xaml`
- [ ] VS2022 solution updated with scoped projects or folders per target

---

## ✅ 2. Sample Records

- [ ] Add sample `CoachTextBlocks` (Markdown examples: bold, bullets, breaks)
- [ ] Add sample `Lessons` with realistic content
- [ ] Store samples in `/sample_data/`
- [ ] Use sample records in docs and test harnesses

---

## ✅ 3. Permissions & Identity Model

- [ ] Confirm strategy (e.g. Azure AD, user roles via storage)
- [ ] Create mock users for:
  - Senior Coach
  - Standard Coach
- [ ] Document page access levels:
  - Editable vs. read-only
  - TextBlockEditor for seniors only
  - Markdown formatting panel access

---

## ✅ 4. Test Harness & Validation

- [ ] Build Markdown renderer test flow:
  - Input string → UI render preview
- [ ] Create simple validators for contributor inputs
- [ ] Set up backend mocks for Azure Table reads:
  - Static data loaders
  - Edge case testers

---

## ✅ 5. Contributor Experience Map

- [ ] Sketch flow for Senior Coach:
  - Login → Edit block → Preview → Start session → View audit
- [ ] Verify onboarding guide covers this journey
- [ ] Align onboarding hints in UI and docs

---

## ✅ 6. Documentation Alignment

- [ ] Update `README.md` with current phase and planning links
- [ ] Add Markdown reference to `CONTRIBUTOR_GUIDE.md`:
  - Allowed syntax
  - Preview instructions
  - Formatting checklist
- [ ] Optional: add screenshots for formatting preview

---

## 🔄 Optional Prep Enhancements

- [ ] Evaluate Markdown sanitization library (e.g. Markdig + MAUI)
- [ ] Decide on plain-text toggle fallback
- [ ] Define unsupported Markdown tags and fallback behavior

