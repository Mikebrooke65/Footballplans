# 🧩 STEP_2.md — Contributor Roles & Access Tiers (Azure Implementation)

This step defines contributor roles and enforces secure, role-scoped access to Azure Tables through your backend API or Azure Functions.

---

## 1️⃣ Define Contributor Roles

Create a reference for contributor roles and their permissions.

### 🔹 Roles & Capabilities

| Role          | Capabilities                                                                 |
|---------------|-------------------------------------------------------------------------------|
| `Coach`       | View lessons and deliver sessions for assigned teams                         |
| `SeniorCoach` | Edit lessons, assign teams, view audit history                               |
| `Admin`       | Full access to all records, schema, and audit logs                           |

### 🔹 Implementation Instructions

1. **Store Role Definitions**
   - Roles are embedded in the `Users` Azure Table.
   - Each user row includes:
     ```json
     {
       "UserID": "abc123",
       "Role": "SeniorCoach",
       "AccessibleTeamIDs": ["team01", "team02"],
       "DefaultTeamID": "team01"
     }
     ```

2. **Document Role Matrix**
   - In `CONTRIBUTOR_GUIDE.md`, clarify:
     - Each role’s access permissions
     - Editing vs read-only capabilities
     - Markdown formatting expectations (for Senior Coach text blocks)

---

## 2️⃣ Enforce Access Tiers (Backend Logic)

Your API or Azure Function endpoints must enforce user-specific access controls.

### 🔹 Azure Setup

| Azure Resource             | Purpose                                                                 |
|----------------------------|--------------------------------------------------------------------------|
| Azure Table Storage        | Hosts structured data (`Users`, `Teams`, `Lessons`, etc.)               |
| Azure Function App or API  | Executes access checks and serves scoped data to the MAUI app           |
| Azure AD App Registration* | Optional for production auth; use role strings in dev/prototype         |

> ℹ️ *For V1, use stored role strings from the `Users` table — no AD integration needed yet.*

### 🔹 Backend Access Logic

1. **Fetch User Record**
   ```csharp
   var user = await tableClient.GetEntityAsync<UserEntity>(userID, userID);
