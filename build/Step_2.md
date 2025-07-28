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

> Each table must use `PartitionKey` and `RowKey`. For `Users`, both can be set to the user
