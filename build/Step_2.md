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

---

## ☁️ Azure Setup — Step-by-Step

These steps configure your backend to support secure, role-aware access.

### 🔹 Step 1: Create a Storage Account

1. Go to [Azure Portal](https://portal.azure.com)
2. Click **Create a resource** → **Storage** → **Storage account**
3. Fill in:
   - **Name**: `footballplatformstorage`
   - **Region**: Choose closest to your contributors
   - **Performance**: Standard
   - **Redundancy**: Locally-redundant (LRS) for dev
4. Click **Review + Create** → **Create**

---

### 🔹 Step 2: Create Azure Tables

1. Open your new storage account
2. In the left menu, click **Storage Browser**
3. Under **Tables**, click **+ Add Table**
4. Create the following tables:
   - `Users`
   - `Teams`
   - `Lessons`
   - `CoachTextBlocks`
   - `AuditLog`

> 💡 Each table must use `PartitionKey` and `RowKey`. For `Users`, use `UserID` as both.

---

### 🔹 Step 3: Add Sample Entities

1. Open the `Users` table
2. Click **Add Entity**
3. Fill in:
   - `PartitionKey`: `abc123`
   - `RowKey`: `abc123`
   - `Role`: `SeniorCoach`
   - `AccessibleTeamIDs`: `["team01", "team02"]`
   - `DefaultTeamID`: `team01`

Repeat for other roles to simulate access tiers.

---

### 🔹 Step 4: Create an Azure Function App

1. In Azure Portal, click **Create a resource** → **Compute** → **Function App**
2. Fill in:
   - **Name**: `footballaccessapi`
   - **Runtime stack**: `.NET`
   - **Region**: Same as storage
   - **Storage account**: Select the one you just created
3. Click **Review + Create** → **Create**

---

### 🔹 Step 5: Add Backend Logic

In your Function App:

1. Create a function called `ValidateAccessTier`
2. Use the Azure.Data.Tables SDK to connect to `Users` and `Lessons`
3. Implement logic like:
   ```csharp
   var user = await tableClient.GetEntityAsync<UserEntity>(userID, userID);

   if (!user.AccessibleTeamIDs.Contains(request.TeamID))
       return Unauthorized("Team access denied.");

   if (request.Action == "EditLesson" && user.Role != "SeniorCoach" && user.Role != "Admin")
       return Forbid("Your role does not allow editing.");

   var lessons = tableClient.Query<LessonEntity>(e => user.AccessibleTeamIDs.Contains(e.TeamID));

   var audit = new AuditEntry {
       Action = "UnauthorizedAccess",
       ContributorID = user.UserID,
       TargetTeamID = request.TeamID,
       Timestamp = DateTime.UtcNow
   };
   await auditTableClient.AddEntityAsync(audit);
