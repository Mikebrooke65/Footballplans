# BUILD_PLAN.md

A phase-based implementation guide for the West Coast Rangers Junior Coaching App. Reflects finalized requirements and updated design principles, with contributor-first architecture and Markdown support.

---

## 1️⃣ Foundation Setup – Schema & Tables

**Objectives**
- Deploy all Azure Tables (`CoachTextBlocks`, `Lessons`, `LessonDeliveries`, etc.)
- Validate optional vs. required fields
- Pre-fill critical metadata and team filters
- Uniform audit fields (`createdBy`, `createdAt`)

**Tooling**
- Azure Table Storage
- Bicep / Azure Portal config

**Contributor Impact**
- Improves onboarding clarity
- Future-proof field structure

---

## 2️⃣ Backend Logic & Permissions

**Objectives**
- Implement team assignment via `AccessibleTeamIDs`
- Enforce coach vs. senior coach permission tiers
- Build Markdown rendering engine for `CoachTextBlocks`

**Tooling**
- Azure Functions / Logic Apps
- Sanitized Markdown preview pipeline

**Contributor Impact**
- Role-based access aligned to coaching workflows

---

## 3️⃣ Contributor-Facing Features

**Objectives**
- Build Lesson Builder with versioning & changelogs
- Create Text Block Editor with Markdown preview
- Introduce formatting hints in editor UI

**VS2022 Pages**
- `LessonBuilder.razor` / `.cshtml`
- `TextBlockEditor.razor` / `.cshtml`

**Contributor Impact**
- Real-time feedback and formatting flexibility

---

## 4️⃣ UI Integration & Dynamic Content

**Objectives**
- Inject `CoachTextBlocks` into `SkillSelectPage`, `HomePage`, etc.
- Render Markdown cleanly in display components
- Handle fallback text and multiline render logic

**VS2022 Pages**
- `SkillSelectPage.razor`
- `HomePage.razor`

**Contributor Impact**
- Personalized coaching prompts directly in-app

---

## 5️⃣ Session & Delivery Flow

**Objectives**
- Enable dynamic session flow per team
- Record lesson version, coach snapshot, and team
- Allow flexible coaching across squads

**VS2022 Pages**
- `SessionStart.razor`
- `DeliveryFlow.razor`

**Contributor Impact**
- Preserves historical context without rigid bindings

---

## 6️⃣ Reporting & Audit Trail

**Objectives**
- View delivery records by date, user, action type
- Surface lesson changelogs for senior coaches

**VS2022 Pages**
- `AuditTrailViewer.razor`

**Contributor Impact**
- Full transparency and governance fidelity

---

## 7️⃣ Contributor Onboarding & Docs

**Objectives**
- Update all contributor-facing docs to reflect Markdown usage
- Provide example text blocks and formatting tips
- Add “preview before publish” reminders

**Tooling**
- `CONTRIBUTOR_GUIDE.md`
- Sample records in `/sample_data/`

**Contributor Impact**
- Minimizes formatting surprises and empowers clear contributions

---

## 🔄 Optional Enhancements

- Markdown toggle (on/off)
- Markdown-safe validator tooltips
- Preview block search/tagging

---

## 📦 Pages Bin Build Summary (VS2022)

| Phase | Key VS2022 Pages | Output Folder |
|-------|------------------|----------------|
| 3     | `LessonBuilder`, `TextBlockEditor` | `vs22/Pages/` or `vs22/src/components/` |
| 4     | `SkillSelectPage`, `HomePage` | `vs22/Pages/` |
| 5     | `SessionStart`, `DeliveryFlow` | `vs22/Pages/` |
| 6     | `AuditTrailViewer` | `vs22/Admin/` |

---

_Endorsed by DesignPrinciples.md — Markdown support now a core formatting principle._

