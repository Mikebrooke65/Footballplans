# 🧩 STEP_2.md — Contributor Roles & Access Tiers

This step defines contributor roles and enforces role-aware access to backend logic. It protects data integrity and ensures contributors only interact with the content they’re authorized to view or modify.

---

## 1️⃣ Define Contributor Roles

Create a shared reference for contributor types and their permissions.

### 🔹 Roles & Capabilities

| Role          | Capabilities                                                                 |
|---------------|-------------------------------------------------------------------------------|
| `Coach`       | View lessons and deliver sessions for assigned teams                         |
| `SeniorCoach` | Edit lessons, assign teams, view audit history                               |
| `Admin`       | Full access to all records, schema, and audit logs                           |

### 🔹 Implementation Steps

1. **Create Role Definitions**
   - Add a `roles.json` file in `/sample_data/`:
     ```json
     {
       "Coach": ["ViewLessons", "DeliverSessions"],
       "SeniorCoach": ["EditLessons", "AssignTeams", "ViewAudit"],
       "Admin": ["FullAccess"]
     }
     ```

2. **Assign Roles to Contributors**
   - Extend contributor records with:
     ```json
     {
       "ContributorID": "abc123",
       "Role": "SeniorCoach",
       "AccessibleTeamIDs": ["team01", "team02"]
     }
     ```

3. **Document Role Matrix**
   - Update `CONTRIBUTOR_GUIDE.md` with:
     - Role descriptions
     - Editable vs. read-only actions
     - Markdown formatting expectations per role

---

## 2️⃣ Enforce Access Tiers

Ensure backend logic respects contributor roles and team scope.

### 🔹 Implementation Steps

1. **Validate Team Access**
   - In Azure Function or API:
     ```csharp
     if (!user.AccessibleTeamIDs.Contains(request.TeamID))
         return Unauthorized("Team access denied.");
     ```

2. **Restrict Edit Permissions**
   - Check role before allowing updates:
     ```csharp
     if (user.Role != "SeniorCoach" && user.Role != "Admin")
         return Forbid("Edit not permitted for this role.");
     ```

3. **Log Unauthorized Attempts**
   - Add audit entry:
     ```csharp
     LogUnauthorizedAccess(user.ContributorID, request.TeamID, DateTime.UtcNow);
     ```

4. **Scope Queries by Team**
   - Filter data fetches:
     ```csharp
     var lessons = tableClient.Query<LessonEntity>(e => user.AccessibleTeamIDs.Contains(e.TeamID));
     ```

5. **Test Role-Based Scenarios**
   - Simulate:
     - Coach viewing lessons
     - SeniorCoach editing content
     - Admin accessing audit logs

---

## ✅ Completion Criteria

- Contributor roles defined in `/sample_data/roles.json`
- Role-aware logic implemented in backend endpoints
- Unauthorized actions logged with timestamps
- Contributor documentation updated with role matrix

