# BUILD_PLAN.md

Phase-based implementation guide for the West Coast Rangers Junior Coaching App using .NET MAUI. Reflects finalized requirements, contributor-first principles, and Markdown-enabled content architecture.

---

## 1️⃣ Foundation Setup – Schema & Tables

**Objectives**
- Deploy Azure Tables: `CoachTextBlocks`, `Lessons`, `LessonDeliveries`, `Teams`, etc.
- Validate field types, optional/required rules, audit metadata
- Confirm naming conventions across all schema files
- Tag content for filtering and session prep

**Tooling**
- Azure Table Storage
- Bicep, Azure CLI, or Portal config
- Sample records in `/sample_data/`

**Contributor Impact**
- Predictable table layout supports easy onboarding and future content extension

---

## 2️⃣ Backend Logic & Permissions

**Objectives**
- Enforce access tiers via `AccessibleTeamIDs`, role flags
- Build Markdown rendering with sanitization
- Connect MAUI app to Azure Tables with permission logic
- Support coach vs. senior coach operations

**Tooling**
- Azure Functions / .NET API layer
- Markdown library (e.g. Markdig + MAUI wrapper)
- Role assignment logic for contributors

**Contributor Impact**
- Clear boundaries per contributor type prevent accidental edits

---

## 3️⃣ Contributor-Facing Features

**Objectives**
- Build `LessonBuilder` and `TextBlockEditor` views
- Support versioning, changelog notes, live Markdown preview
- Add formatting hints and tooltips for Markdown syntax

**MAUI Files**
- `LessonBuilder.xaml`
- `LessonBuilder.xaml.cs`
- `TextBlockEditor.xaml`
- `TextBlockEditor.xaml.cs`

**Contributor Impact**
- Real-time content preview and styling with zero HTML required

---

## 4️⃣ UI Integration & Dynamic Content

**Objectives**
- Dynamically inject `CoachTextBlocks` into key screens
- Handle missing text blocks with fallback logic
- Add support for line breaks, bullets, bold via Markdown renderer

**MAUI Files**
- `SkillSelectPage.xaml`
- `HomePage.xaml`
- Custom `MarkdownView.xaml.cs` control (if needed)

**Contributor Impact**
- Personalized, readable text displayed to coaches and players

---

## 5️⃣ Session & Delivery Flow

**Objectives**
- Build session kickoff flow: team select, coach metadata, lesson snapshot
- Record lesson version number and team association
- Enable flexible team switching with full audit trail

**MAUI Files**
- `SessionStart.xaml`
- `SessionStart.xaml.cs`
- `DeliveryFlow.xaml`
- `DeliveryFlow.xaml.cs`

**Contributor Impact**
- Coaches can deliver lessons across teams without losing historical fidelity

---

## 6️⃣ Reporting & Audit Trail

**Objectives**
- Senior Coaches view delivery history, changelog timeline
- Filter records by coach, date, lesson ID
- Align views with field structure from schema

**MAUI Files**
- `AuditTrailViewer.xaml`
- `AuditTrailViewer.xaml.cs`
- Optional: `LessonVersionHistory.xaml`

**Contributor Impact**
- Coaches and admins stay accountable and well-informed

---

## 7️⃣ Contributor Onboarding & Docs

**Objectives**
- Update contributor-facing documentation:
  - Markdown formatting guide
  - Editable vs. read-only page matrix
  - UX screenshots (optional)
- Add checklist for Markdown do’s/don’ts
- Create stub text blocks and lessons in `/sample_data/`

**Tooling**
- `CONTRIBUTOR_GUIDE.md`
- `README.md` with phase summary + links

**Contributor Impact**
- Minimizes confusion and formatting surprises

---

## 🔄 Optional Enhancements

- Markdown toggle (allow user to switch between Markdown/plain input)
- Tooltip-style validator for invalid Markdown strings
- Searchable preview block by tag or use case

---

## 📦 MAUI App Build Summary

| Phase | Views Developed | Files in VS2022 |
|-------|-----------------|-----------------|
| 3     | `LessonBuilder`, `TextBlockEditor` | `/Views/` folder |
| 4     | `SkillSelectPage`, `HomePage` | `/Views/`, custom controls in `/Controls/` |
| 5     | `SessionStart`, `DeliveryFlow` | `/Views/` |
| 6     | `AuditTrailViewer`, `LessonVersionHistory` | `/Views/Admin/` |

---

_This build plan aligns with `DesignPrinciples.md`, emphasizing contributor empowerment, Markdown clarity, and audit-ready flows throughout the platform._

