# DesignPrinciples.md

A reference guide to key architectural and data integrity principles underpinning the West Coast Rangers Junior Coaching App.

---

## 1. Snapshot Accuracy
- Preserve historical fidelity in all delivery records.
- `CoachName` and `TeamName` stored as static text at the time of delivery.
- Avoids retroactive changes from dynamic lookups or renames in related tables.

---

## 2. Flexible Coach Assignments
- Coaches can operate across multiple teams:
  - `DefaultTeamID`: UI pre-population only (optional).
  - `AccessibleTeamIDs`: list of teams coach can interact with.
- No hard mapping between coach and team; assignment is session-based.

---

## 3. Versioned Lesson Delivery
- `LessonVersionNumber` stored at time of delivery.
- Prevents confusion when lesson content evolves.
- Senior Coaches can view version history and changelog per lesson.

---

## 4. Audit & Permissions
- Coaches:
  - View/edit only their own delivery records.
- Senior Coaches:
  - View all delivery records.
  - Access audit trail with action type (add/edit/delete), user ID, timestamp.
- All records include `createdBy` and `createdAt` for full traceability.

---

## 5. Media & Lesson Content Structure
- LessonHTML stored as path in Azure Table; cached locally on mobile.
- Images/videos loaded dynamically from Azure Blob Storage.
- Folder structure aligns with SkillCategory or LessonID.

---

## 6. Session-Centric Delivery Design
- Delivery records link Coach, Team, Lesson, Date, and Version.
- Coaches select team for each session dynamically.
- Encourages flexible coaching support across squads.

---

## 7. Senior Coach Empowerment
- Create/edit/delete lessons with immediate app availability (no approval queue).
- Can reset passwords, assign roles, generate reports.
- Lesson Builder increments version on save and captures changelog note.

---

## 8. Contributor-Friendly Documentation & Structure
- All tables designed for clarity and minimal complexity.
- Relationships enforce logical filtering, not rigid joins.
- Future extensibility preserved through optional fields and descriptive metadata.
- Text blocks allow basic Markdown styling (bold, lists, line breaks) for readable prompts and coaching notes


## 9. Human-Readable Text Formatting
- CoachTextBlocks support Markdown for lightweight styling (bold, lists, spacing).
- Enables personalized, legible prompts without HTML overhead.
- Respects contributor intent while ensuring safe, predictable rendering.

