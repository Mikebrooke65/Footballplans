# ⚙️ STEP 2 — Azure Table & Blob Setup

This file defines all Azure Tables and Blob Storage folders required for the football coaching platform. Each table includes field definitions and sample records to support onboarding, contributor logic, historical fidelity, and media-rich lesson delivery.

---

## ✅ USERS Table

**Table Name:** `Users`

| Field Name         | Type    | Notes                                  |
|--------------------|---------|----------------------------------------|
| UserID             | string  | PartitionKey, unique per user          |
| Role               | string  | Coach / Manager / SeniorCoach          |
| FirstName          | string  |                                        |
| LastName           | string  |                                        |
| Email              | string  | Unique login identifier                |
| PasswordHash       | string  | Stored securely                        |
| Cellphone          | string  | Optional                               |
| DefaultTeamID      | string  | Nullable; UI pre-fill only             |
| AccessibleTeamIDs  | string  | Comma-separated list or JSON array     |

```json
{
  "PartitionKey": "USER-001",
  "Role": "Coach",
  "FirstName": "Michael",
  "LastName": "Brooke",
  "Email": "michael@club.org",
  "PasswordHash": "<secure>",
  "Cellphone": "",
  "DefaultTeamID": "TEAM-003",
  "AccessibleTeamIDs": "TEAM-003,TEAM-004"
}
