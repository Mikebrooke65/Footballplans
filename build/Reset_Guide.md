# VS22 Legacy Project Purge Instructions

Clean out all remnants of previous MAUI prototypes (`FootballPolansd`, `FootballPlansApp`, etc.) from your system and Visual Studio 2022 environment to prevent confusion and conflicts.

---

## 💾 1. Delete Old Project Folders

Navigate to your usual dev directories, such as:

- `Documents\Visual Studio 2022\Projects`
- `source\repos`
- Any custom location used previously

Delete:

- `FootballPolansd`
- `FootballPlansApp`
- Any nested `.vs`, `bin`, `obj`, or `.user` files

---

## 🗑 2. Remove from Recent Projects

Inside Visual Studio 2022:

- On the Start Window, locate legacy entries (`FootballPolansd`, etc.)
- Hover and click **X** to remove from **Recent Projects and Solutions**

---

## 🔍 3. Optional: Clear VS Cache and Temp

Navigate to:

- `%LocalAppData%\Microsoft\VisualStudio\`
- Optionally delete `_ComponentModelCache` and similar folders holding stale references

Restart Visual Studio to apply changes.

---

## 🧼 4. Optional: Clean Up Git Remotes

If linked to local Git repos:

- Remove associated folders from your dev repo directory
- Delete entries in GitHub Desktop or terminal repo list (e.g., `git remote remove`)

---

*Your workspace is now clean. Proceed with Reset_Guide.md and STEP_1_SETUP.md with full confidence.*
