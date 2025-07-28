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
| DefaultTeamID      | string  | Nullable; used for UI pre-fill         |
| AccessibleTeamIDs  | string  | Comma-separated list or JSON array     |

**Sample JSON Record**
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
| DefaultTeamID      | string  | Nullable; used for UI pre-fill         |
| AccessibleTeamIDs  | string  | Comma-separated list or JSON array     |

**Sample JSON Record**
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
## ✅ TEAMS Table

**Table Name:** `Teams`

| Field Name     | Type    | Notes                                          |
|----------------|---------|------------------------------------------------|
| TeamID         | string  | PartitionKey, unique per team                  |
| Name           | string  | Human-friendly display name                    |
| AgeGroup       | string  | Examples: U10, U12, Senior                     |
| CoachUserIDs   | string  | Comma-separated list or JSON array             |
| ManagerUserIDs | string  | Optional; comma-separated or JSON array        |
| Season         | string  | Current season reference, e.g. 2025-Winter     |
| Region         | string  | Optional; used for admin filters               |

**Sample JSON Record**
```json
{
  "PartitionKey": "TEAM-003",
  "Name": "Kumeu Eagles U12",
  "AgeGroup": "U12",
  "CoachUserIDs": "USER-001,USER-007",
  "ManagerUserIDs": "USER-008",
  "Season": "2025-Winter",
  "Region": "West Auckland"
}
## ✅ TEAMS Table

**Table Name:** `Teams`

| Field Name     | Type    | Notes                                          |
|----------------|---------|------------------------------------------------|
| TeamID         | string  | PartitionKey, unique per team                  |
| Name           | string  | Human-friendly display name                    |
| AgeGroup       | string  | Examples: U10, U12, Senior                     |
| CoachUserIDs   | string  | Comma-separated list or JSON array             |
| ManagerUserIDs | string  | Optional; comma-separated or JSON array        |
| Season         | string  | Current season reference, e.g. 2025-Winter     |
| Region         | string  | Optional; used for admin filters               |

**Sample JSON Record**
```json
{
  "PartitionKey": "TEAM-003",
  "Name": "Kumeu Eagles U12",
  "AgeGroup": "U12",
  "CoachUserIDs": "USER-001,USER-007",
  "ManagerUserIDs": "USER-008",
  "Season": "2025-Winter",
  "Region": "West Auckland"
}
## ✅ TEAMS Table

**Table Name:** `Teams`

| Field Name     | Type    | Notes                                          |
|----------------|---------|------------------------------------------------|
| TeamID         | string  | PartitionKey, unique per team                  |
| Name           | string  | Human-friendly display name                    |
| AgeGroup       | string  | Examples: U10, U12, Senior                     |
| CoachUserIDs   | string  | Comma-separated list or JSON array             |
| ManagerUserIDs | string  | Optional; comma-separated or JSON array        |
| Season         | string  | Current season reference, e.g. 2025-Winter     |
| Region         | string  | Optional; used for admin filters               |

**Sample JSON Record**
```json
{
  "PartitionKey": "TEAM-003",
  "Name": "Kumeu Eagles U12",
  "AgeGroup": "U12",
  "CoachUserIDs": "USER-001,USER-007",
  "ManagerUserIDs": "USER-008",
  "Season": "2025-Winter",
  "Region": "West Auckland"
}
## ✅ LESSONS Table

**Table Name:** `Lessons`

| Field Name        | Type    | Notes                                                      |
|-------------------|---------|-------------------------------------------------------------|
| LessonID          | string  | PartitionKey, unique per lesson                             |
| TeamID            | string  | Foreign key; filters lesson relevance                       |
| CreatedByUserID   | string  | Authoring coach or admin                                    |
| Title             | string  | Display name; e.g. “Midfield Passing Drill”                |
| Summary           | string  | Brief description (1–2 sentences max)                       |
| MarkdownContent   | string  | Rich content block, supports formatting                     |
| MediaFolderPath   | string  | Path in Blob Storage, e.g. `/lessons/LessonID/media/`      |
| DateCreated       | string  | ISO 8601 format recommended                                 |
| Tags              | string  | Comma-separated keywords, e.g. “passing, midfield”          |

**Sample JSON Record**
```json
{
  "PartitionKey": "LESSON-024",
  "TeamID": "TEAM-003",
  "CreatedByUserID": "USER-001",
  "Title": "Midfield Passing Drill",
  "Summary": "A structured lesson focusing on pass timing and positioning in midfield.",
  "MarkdownContent": "### Setup\nThree zones with 2v2 pressure...",
  "MediaFolderPath": "/lessons/LESSON-024/media/",
  "DateCreated": "2025-07-28T09:00:00Z",
  "Tags": "passing, midfield, timing"
}

## ✅ COACH TEXT BLOCKS Table

**Table Name:** `CoachTextBlocks`

| Field Name      | Type    | Notes                                                      |
|-----------------|---------|-------------------------------------------------------------|
| TextBlockID     | string  | PartitionKey, unique per content block                      |
| LessonID        | string  | Foreign key; parent lesson reference                         |
| CreatedByUserID | string  | Contributor or coach ID                                     |
| MarkdownContent | string  | Rich instructional text with markdown formatting            |
| SequenceIndex   | number  | Determines block order within the lesson                    |
| Timestamp       | string  | ISO 8601; used for audit and rollback                       |
| Tags            | string  | Optional; keywords to guide reuse or searchability          |

**Sample JSON Record**
```json
{
  "PartitionKey": "CTB-012",
  "LessonID": "LESSON-024",
  "CreatedByUserID": "USER-001",
  "MarkdownContent": "#### Phase 1: Setup\nCreate three zones with cones...",
  "SequenceIndex": 1,
  "Timestamp": "2025-07-28T09:05:00Z",
  "Tags": "setup, drill, midfield"
}

## ✅ DELIVERY RECORDS Table

**Table Name:** `DeliveryRecords`

| Field Name        | Type    | Notes                                                       |
|-------------------|---------|--------------------------------------------------------------|
| DeliveryID        | string  | PartitionKey, unique per delivery occurrence                 |
| LessonID          | string  | Foreign key; connects to core lesson                         |
| DeliveredByUserID | string  | Coach or contributor who ran the session                     |
| DateDelivered     | string  | ISO 8601 date-time; local time preferred                     |
| AttendingPlayerIDs| string  | Optional; comma-separated list of user or player IDs         |
| Notes             | string  | Optional; markdown field for outcome, variation, or context  |
| MediaFolderPath   | string  | Optional; blob path for session photos or video              |

**Sample JSON Record**
```json
{
  "PartitionKey": "DELIVERY-042",
  "LessonID": "LESSON-024",
  "DeliveredByUserID": "USER-001",
  "DateDelivered": "2025-07-29T17:30:00+12:00",
  "AttendingPlayerIDs": "PLAYER-020,PLAYER-021",
  "Notes": "### Outcomes\nPlayers adapted quickly to staggered pressure.",
  "MediaFolderPath": "/deliveries/DELIVERY-042/media/"
}

## ✅ GAME FEEDBACK Table

**Table Name:** `GameFeedback`

| Field Name        | Type    | Notes                                                       |
|-------------------|---------|--------------------------------------------------------------|
| FeedbackID        | string  | PartitionKey, unique per feedback entry                      |
| TeamID            | string  | Foreign key; ensures relevance to specific team              |
| MatchDate         | string  | ISO 8601; actual game date                                   |
| AuthorUserID      | string  | Coach or contributor who wrote the feedback                  |
| OpponentName      | string  | Optional; name of opposing team                              |
| MatchResult       | string  | Optional; e.g. “2–1 Win” or “Draw”                            |
| MarkdownContent   | string  | Core journal or analysis; supports formatting                |
| MediaFolderPath   | string  | Optional; link to match photos, clips, or stat sheets        |
| Tags              | string  | Optional; e.g. “defense, transition, U12”                    |

**Sample JSON Record**
```json
{
  "PartitionKey": "FEEDBACK-088",
  "TeamID": "TEAM-003",
  "MatchDate": "2025-07-27",
  "AuthorUserID": "USER-001",
  "OpponentName": "North Harbour Storm",
  "MatchResult": "2–1 Win",
  "MarkdownContent": "### Defensive Adjustments\nFullbacks showed good restraint on overlaps...",
  "MediaFolderPath": "/feedback/FEEDBACK-088/media/",
  "Tags": "defense, U12, match-review"
}
## ✅ MEDIA Table

**Table Name:** `Media`

| Field Name        | Type    | Notes                                                      |
|-------------------|---------|-------------------------------------------------------------|
| MediaID           | string  | PartitionKey, unique per asset                              |
| LinkedEntityType  | string  | Enum: Lesson / Delivery / Feedback                          |
| LinkedEntityID    | string  | Foreign key to parent (e.g., LESSON-024)                    |
| UploadedByUserID  | string  | Contributor who added the asset                             |
| FileName          | string  | Display name or actual filename                             |
| FileType          | string  | e.g., image/jpeg, video/mp4                                 |
| BlobPath          | string  | Full path in Blob Storage                                   |
| TimestampUploaded | string  | ISO 8601; for audit and version control                     |
| Tags              | string  | Optional; comma-separated keywords                          |

**Sample JSON Record**
```json
{
  "PartitionKey": "MEDIA-106",
  "LinkedEntityType": "Lesson",
  "LinkedEntityID": "LESSON-024",
  "UploadedByUserID": "USER-001",
  "FileName": "drill-setup-photo.jpg",
  "FileType": "image/jpeg",
  "BlobPath": "/lessons/LESSON-024/media/drill-setup-photo.jpg",
  "TimestampUploaded": "2025-07-28T09:08:00Z",
  "Tags": "setup, lesson-image, passing"
}
## ✅ AUDIT LOG Table

**Table Name:** `AuditLog`

| Field Name      | Type    | Notes                                                             |
|-----------------|---------|--------------------------------------------------------------------|
| AuditID         | string  | PartitionKey, unique per audit entry                              |
| EntityType      | string  | USERS / TEAMS / LESSONS / etc.                                    |
| EntityID        | string  | Corresponding item ID, e.g. USER-001                               |
| ActionType      | string  | Create / Update / Delete / Assign                                  |
| ChangedByUserID | string  | Contributor responsible                                            |
| ChangeSummary   | string  | Short description of what changed                                  |
| Timestamp       | string  | ISO 8601 format, required for sequencing and rollback tracing      |
| Tags            | string  | Optional; helpful for UI filters, e.g. “critical, role-change”     |

**Sample JSON Record**
```json
{
  "PartitionKey": "AUDIT-215",
  "EntityType": "USERS",
  "EntityID": "USER-001",
  "ActionType": "Update",
  "ChangedByUserID": "USER-009",
  "ChangeSummary": "Updated Role from Coach to SeniorCoach",
  "Timestamp": "2025-07-29T10:45:00Z",
  "Tags": "role-change, access"
}
