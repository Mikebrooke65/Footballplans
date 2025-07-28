# STEP_2.md — Contributor Roles & Users Table Setup

This step defines system contributor roles, sets up Azure Table Storage entities, and finalizes the full field structure for `Users`, as specified in the Requirements document.

---

## 🔐 1. Contributor Roles

Establish system roles and access capabilities:

| Role         | Capabilities                                                                 |
|--------------|-------------------------------------------------------------------------------|
| Coach        | View and deliver sessions for assigned team                                  |
| SeniorCoach  | Assign teams, edit lessons, oversee contributor activity across multiple teams|
| Admin        | Full system access: data, audits, contributor management                     |

---

## 📋 2. Azure Table Creation

In Azure Storage (Storage Browser → Tables → + Add Table), create:

- `Users`
- `Teams`
- `Lessons`
- `CoachTextBlocks`
- `AuditLog`

> Each table must use `PartitionKey` and `RowKey`. For `Users`, both can be set to the user ID.

---

## 🧩 3. Users Table: Required Fields

Set up entities with the following fields:

| Field               | Required | Example                        | Notes                                                   |
|---------------------|----------|--------------------------------|---------------------------------------------------------|
| `PartitionKey`      | ✅        | `"users"`                      | Logical group for all user entities                     |
| `RowKey`            | ✅        | `"coach01"`                    | Unique user ID                                          |
| `Role`              | ✅        | `"Coach"` / `"SeniorCoach"` / `"Admin"` | Governs access levels                         |
| `Name`              | ✅        | `"Sam Garcia"`                 | Display name for UI and logging                         |
| `Email`             | ✅        | `"sam.garcia@demo.org"`        | Identity, audit, invites                                |
| `DefaultTeamID`     | ⚠️        | `"team03"` / `null` / omitted  | Required for Coach; `null` for SeniorCoach; omit for Admin |
| `AccessibleTeamIDs` | ✅        | `["team01", "team02"]`         | Defines which teams can be accessed                     |
| `Status`            | ⚠️        | `"Active"` / `"Invited"`       | Optional: contributor lifecycle state                   |
| `CreatedOn`         | ⚠️        | `"2025-07-29T08:00:00Z"`       | Optional: audit and contributor tracking                |

> If `DefaultTeamID` is missing or `null`, the system will show a team picker on login and bypass any auto-selection logic.

---

## 🔧 4. Example Entities

Use these as direct inserts in Azure Table Storage.

### 👨‍🏫 Coach

```json
{
  "PartitionKey": "users",
  "RowKey": "coach01",
  "Role": "Coach",
  "Name": "Sam Garcia",
  "Email": "sam.garcia@demo.org",
  "DefaultTeamID": "team03",
  "AccessibleTeamIDs": ["team03"],
  "Status": "Active",
  "CreatedOn": "2025-07-29T08:00:00Z"
}
