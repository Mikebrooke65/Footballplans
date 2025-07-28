# ⚙️ STEP_2.md – Define Contributor Roles and `Users` Table (Azure Storage)

## Purpose

This step creates the foundational `Users` table in Azure Table Storage to support secure login, role-aware feature access, and dynamic team switching within the coaching app. This document reflects the requirements specified in `PROJECT_REQUIREMENTS.md` as of July 2025.

---

## 📁 Azure Table: `Users`

Stores user authentication data, contributor roles, and team relationships.

### 📋 Table Schema

| Field Name           | Type               | Required | Notes                                                                 |
|----------------------|--------------------|----------|-----------------------------------------------------------------------|
| `UserID`             | `string`           | ✅        | Acts as `PartitionKey`. Unique user identifier.                      |
| `Role`               | `string`           | ✅        | One of: `Coach`, `Manager`, `SeniorCoach`. Controls feature access.  |
| `FirstName`          | `string`           | ✅        | Display name in app and reports.                                     |
| `LastName`           | `string`           | ✅        | Display name in app and reports.                                     |
| `Email`              | `string`           | ✅        | Login credential and messaging anchor.                               |
| `PasswordHash`       | `string`           | ✅        | Secure hash for login validation.                                    |
| `Cellphone`          | `string`           | ❌        | Optional. For admin contact or future messaging.                     |
| `DefaultTeamID`      | `string`           | ❌        | Optional. Used to pre-populate team picker on SkillSelectPage.       |
| `AccessibleTeamIDs`  | `string[]` or CSV  | ✅        | List of viewable/supportable teams. Enables cross-team operations.   |

---

## 🧠 Field Behaviors & UI Integration

- `DefaultTeamID`:  
  - Not enforced; only used for UI pre-selection on SkillSelectPage.  
  - Reflects user's usual coaching assignment.  
  - Can be null.

- `AccessibleTeamIDs`:  
  - Drives dynamic team switching and delivery permissions.  
  - Includes one or more team IDs or may be empty (for unassigned coaches).  
  - Enables support roles across multiple squads.

- `Role`:  
  - Enables feature gating:  
    - `Coach` — can view/select lessons, record deliveries, view history.  
    - `Manager` — same as Coach but may include team coordination (future).  
    - `SeniorCoach` — full access to lesson builder, reports, admin site, and markdown content delivery.

---

## 🧪 Sample JSON Record

```json
{
  "PartitionKey": "usr_0001",
  "Role": "Coach",
  "FirstName": "Jordan",
  "LastName": "Lee",
  "Email": "jordan.lee@example.com",
  "PasswordHash": "a1b2c3hashedvaluehere",
  "Cellphone": "+64-21-555-1234",
  "DefaultTeamID": "team_U11A",
  "AccessibleTeamIDs": ["team_U11A", "team_U10B"]
}
