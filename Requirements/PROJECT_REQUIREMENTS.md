# West Coast Rangers Football Club Junior Coaching App

## Overview
This app is for the football club **West Coast Rangers**, designed to assist our ~200 junior coaches and managers.

## Purpose
- Provide easy access to football lesson plans for junior coaches.
- Support coaches and managers in running effective training sessions.
- Enable record-keeping of delivered lessons for teams and coaches.

## Target Users
- Junior coaches (~200)
- Managers
- Senior coaches (for lesson plan creation)

## Solution
- An app designed for both ios and android moblles to be used by Coaches.
- A website used by Senior Coaches to deliver content to the app and manage it.

## Tech Stack & Delivery
- **Mobile App:** Built with .NET MAUI, deployable to iOS and Android.
- **Senior Coach Site:** Delivered via Azure Static Web App (web-based interface).
- **Cloud Database:** Azure Table Storage for all app data.
- **Authentication:** For prototype, login for up to 20 users.

## Azure Data Storage

- Azure Table Storage for structured data and Azure Blob Storage for media

- **Users Table:** Stores user details, roles, and optional team associations.
  - Fields: UserID (PartitionKey), Role (Coach/Manager/SeniorCoach), FirstName, LastName, Email, PasswordHash, Cellphone (optional), DefaultTeamID (optional, for UI pre-population only, not a hard assignment), AccessibleTeamIDs (array or comma-separated list)
  - `DefaultTeamID` reflects a coach’s main assignment (may be null)
  - `AccessibleTeamIDs` lists other teams the user is allowed to support or view
  - Enables dynamic team selection in the app (e.g. assisting another squad)
  - Supports cases where a coach has no assigned team but still participates

- **Teams Table:** Stores team identity and scheduling details.
  - Fields: TeamID (PartitionKey), AgeGroup (e.g. U9), TeamName (e.g. Sapphires), TrainingGround (e.g. Huapai No5), TrainingTime (e.g. 4:30 pm)
  - Associated with multiple users (via Users.AccessibleTeamIDs) and lesson delivery records (TeamID)
  - Enables filtering and scheduling logic for personalized app experiences

- **Lessons Table:** Stores structured lesson details and media references.
  - Fields: LessonID (PartitionKey), SkillCategory (e.g. Passing), LessonName (e.g. 1 – Passing with Intent), LessonHTML (blob path to .html lesson plan), MediaURLs (references to images or videos used in lesson)
  - Used to dynamically populate lesson selection and display in the app
  - Supports versioning and media-rich lesson delivery across teams

- **DeliveryRecords Table:** Stores lesson delivery records with snapshot fidelity and relational integrity.
  - Fields: DeliveryID (PartitionKey), CoachID, CoachName, TeamID, TeamName, LessonID, LessonVersionNumber, DateDelivered, Notes (optional), createdBy, createdAt
  - `CoachName` and `TeamName` are captured as text snapshots at the time of delivery (not dynamically fetched later)
  -TeamID is chosen per delivery rather than permanently assigned.
  - Ensures historical accuracy even if names or team assignments are updated in other tables
  - `CoachID`, `TeamID`, and `LessonID` allow joins for filtering and permissions
  - `LessonVersionNumber` preserves the exact version delivered, even if content changes
  - `Notes` are optional reflections from the coach, timestamped with delivery
  - Editable and deletable by the coach who recorded it
  - Queryable by coach, team, or senior coach with audit trail support

- **GameFeedback Table:** Stores coach-submitted game reflections and analysis from the SkillSelectPage.
  - Fields:
    - FeedbackID (PartitionKey): Unique identifier for each feedback entry
    - CoachID: Links to submitting coach
    - CoachName: Snapshot at time of entry (not dynamically fetched later)
    - TeamID: Links to relevant team
    - TeamName: Snapshot at time of entry
    - Date: Game date (coach-selected, defaults to today's date)
    - Notes: Free-text game analysis, guided by prompts (“What went well? What needs work?”)
    - createdBy: Identity of record creator
    - createdAt: Timestamp of creation
  - Editable and deletable only by the coach who submitted it
  - Queryable by coach, team, or senior coach dashboard
  - Future version may use text analysis to suggest lessons or detect performance trends

- **CoachTextBlocks Table:** Stores configurable text blocks created by Senior Coaches for display in the app (e.g. SkillSelectPage prompts, welcome text).
  - Fields:
    - BlockID (PartitionKey): Unique identifier for each text block
    - PageName: Where the block will appear (e.g. SkillSelectPage, HomePage)
    - BlockLabel: Optional descriptive tag (e.g. “Skill Introduction Prompt”)
    - TeamID: If team-specific, otherwise null for default content
    - TextContent: Formatted text entered via Senior Coach Site (Markdown allowed)
    - createdBy: Identity of contributing Senior Coach
    - createdAt: Timestamp of creation
    - lastEditedBy (optional)
    - lastEditedAt (optional)

  - Editable only via Senior Coach Web Site
  - Queryable by PageName and TeamID
  - Supports default and team-specific variants


- **Media:** Media assets are stored in Azure Blob Storage under structured folders:
  - Images: `media/images/{LessonID}/` or `media/images/{SkillCategory}/`
  - Videos: `media/videos/{LessonID}/` or `media/videos/{SkillCategory}/`
  - MediaURLs field contains full blob URIs or relative paths for each asset
  - Blob paths should match lesson versioning for caching and rollback support



## App Structure

### HomePage
- Displays Club Logo.
- Login Button (prototype: up to 20 users).
- Diaplays Welcome text, an area of text that is created and maintained via the Senior Coach Web Site

### SkillSelectPage
- Team picker at top (pre-populated to coach's team, changeable).
- An area of text that is created and maintained via the Senior Coach Web Site
- Skill picker (dropdown/list) loaded from Azure Table and cached in App.
- Dynamically loaded text box from Azure Table.
- **Past Lessons Section:**  
  - Coach can select to view either:
    - Past lessons they have delivered
    - Past lessons delivered to the team
  - Displayed in a scrollable table/list.
  - Selecting a lesson opens that lesson in detail view.
  - From detail view, user can navigate back to SkillSelectPage.

### LessonSelectPage
- Dynamically loads lessons under selected skill from Azure Table and cached in App
- Coaches select a lesson to view details.

### LessonPage

- Displays selected lesson’s `.html` content, stored in Azure table and cached to App
- References up to three images, which can be opened full-screen (not available off-line)
- References up to three videos, which can be viewed (not available off-line)

- **Header Feature:**
  - Displays: “Record this lesson being delivered?”
  - Button to record today’s date or enter custom delivery date
  - On submission, saves delivery record to Azure Table Storage

- **Delivery Notes Capture:**
  - After submitting delivery record, a pop-up prompt allows the coach to optionally enter a note
  - Notes can include reflections, feedback, or context about how the session went
  - If entered, the note is stored in the `Notes` field of the `DeliveryRecords` table
  - Coaches can later view or update their own notes via the Past Lessons section

## Senior Coach Site Structure
	- Only senior coaches have access to these web-based reporting and admin tools.
 	- These features are optimized for desktop use.
  - Site creates a Searchable list of all saved Lessons
  - A Lesson Builder process, to enter new lessons
  - A users administration function
  - A reporting function

### Senior Coach Site – Text Block Editor

- Senior Coaches can add or edit display text shown in various parts of the app (e.g. SkillSelectPage, HomePage)
- These blocks are stored in the `CoachTextBlocks` table and tagged by `PageName` and optional `TeamID`
- The editor supports basic **Markdown formatting**, allowing contributors to style content as needed:
  - `**bold text**` → **bold text**
  - `*italic text*` → *italic text*
  - `-` or `*` for bullet lists
  - Line breaks using double return
- A live preview displays how Markdown will render in the app
- This enables readable prompts, coaching guidance, or team-specific notes with simple formatting — no HTML required

### Lesson Builder Access & Approval
- No additional approval process is needed for new or updated lessons, a Senior Coach can create, edit or delete a lesson.
- Lessons created or edited by senior coaches become immediately available in the mobile app (after sync/update).
- Generates `.html` lesson plans organized by skill, stored in Azure table storage, with linked media in Blob storage

### Reporting & Admin
-	Can generate reports showing:
	-	What lessons have been delivered
   	-	Which teams received them
   	-	Who delivered them (coach)
  	-	Filter by date range, team, or coach
-	Reports viewable in browser, with option to export (CSV/PDF).
-	Data pulled from Azure Table Storage.
-	
### Admin Maintenance:
  	-	Senior Coaches can update (add/edit/remove) teams and coaches
  	-	Changes are synced to Azure Table Storage and reflected in the mobile app for all users.


## Versions

### Version 1- Prototyope
- Log in for 200 users
- Coaches/managers browse/select lesson plans after logging in.
- Senior coaches create plans via the lesson builder web interface.
- Skills/lessons dynamically loaded from tables.
- SkillSelectPage: team picker, skill picker, text box, past lessons section.
- LessonPage: HTML lesson display, image viewer, video viewer,  lesson delivery recording.
- Lesson delivery records: create, edit, delete; history by coach/team.
- All app data stored in Azure Table Storage.

### Version 2 (To Be Added once version 1 fully operational)
#### Game day feedback
From the from the SkillSecelctPage, a Coach gan also select Game analysis, which will allow them to enter a date (highlighting todays date to make it easier if they are doing it on the day) and then enter som free text analysis of hpow the game went, prompted with what went well, what needs Work?. This will be saved and could be used by .ai to tailor som elesson plans.

### Version 2: Game Day Feedback (To Be Added once Version 1 fully operational)

#### SkillSelectPage Extension
- Adds new option under team selection: “Add Game Analysis”
- Prompts coach to select a date (defaulting to today’s date)
- Text prompt guides coach: “What went well? What needs work?”
- Allows free-text entry for reflections and match context
- Saves to `GameFeedback` table with fields:
  - FeedbackID (PartitionKey), CoachID, TeamID, Date, Notes, createdBy, createdAt
- Feedback is queryable by team, coach, and date range
- Editable only by the submitting coach
- Future versions may surface relevant feedback to:
  - Auto-suggest relevant lessons
  - Highlight common themes in team performance
  - Display insights in Senior Coach dashboard

#### AI-Tailored Planning (Future Scope)
- Feedback text undergoes keyword extraction and sentiment tagging
- AI maps key themes (e.g., “midfield spacing,” “low intensity,” “strong transitions”) to lesson tags
- Tailored lesson suggestions appear on SkillSelectPage (e.g., “Recommended: Lesson on Pressing Triggers”)
- Senior Coach view optionally highlights recurring challenges across teams



#### Messaging Foundation (Preparation for Future Release)

- ** Initial Build Preparation:**
  - Add a `Messages` table to the database with fields for:
    - `MessageID`: unique identifier for each message.
    - `SenderID`: reference to the senior coach who sends the message.
    - `RecipientID`: reference to the user (coach/manager) who receives the message (nullable for team messages).
    - `TeamID`: reference to the team for team/broadcast messages (nullable for direct messages).
    - `Title`: short headline or subject for the message (optional).
    - `Body`: main message content.
    - `TimestampSent`: date and time the message was sent.
    - `ReadStatus`: whether the recipient has read the message.
    - `MessageType`: type of message (e.g., announcement, update, reminder).
  - Ensure all users (coaches, managers, senior coaches) have unique, persistent IDs for message targeting.
  - Integrate basic push notification infrastructure (device token registration) in the mobile app—optional, but recommended for future messaging.
  - Add a “Messages” tab/icon in the mobile app UI with a placeholder (“No messages yet” or “Feature coming soon”).
  - Include role-based permissions in the data model to support future messaging (who can send, who can receive).

- **Future Messaging Feature:**
  - Senior coaches can send messages to coaches and managers from the static web app.
  - Messages can be targeted to all coaches, selected teams, or individuals.
  - Mobile app receives messages via push notifications and/or displays an in-app inbox.
  - Coaches/managers can view message history in the app.
  - Messages may include announcements, lesson updates, reminders, or general communications.

#### Messaging Table Example (SQL)

```sql
CREATE TABLE Messages (
    MessageID         INT PRIMARY KEY AUTO_INCREMENT,
    SenderID          INT NOT NULL,              -- FK to Users.UserID (senior coach)
    RecipientID       INT DEFAULT NULL,          -- FK to Users.UserID (coach/manager) for direct messages
    TeamID            INT DEFAULT NULL,          -- FK to Teams.TeamID (for team messages)
    Title             VARCHAR(100) DEFAULT NULL, -- Short headline or subject
    Body              TEXT NOT NULL,             -- Message content
    TimestampSent     DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    ReadStatus        BOOLEAN DEFAULT FALSE,     -- If recipient has read the message
    MessageType       VARCHAR(20) DEFAULT 'announcement', -- Can be expanded (update, reminder, etc.)
    FOREIGN KEY (SenderID) REFERENCES Users(UserID),
    FOREIGN KEY (RecipientID) REFERENCES Users(UserID),
    FOREIGN KEY (TeamID) REFERENCES Teams(TeamID)
			)
```
## Privacy & Audit

- Coaches can only view:
  - Lessons they personally delivered
  - Lessons delivered to their selected team (only their own name appears unless they were the one who delivered it)
- Coaches cannot access or view other coaches’ delivery records or feedback
- Senior Coaches can view:
  - Which team a coach delivered to for any recorded lesson
  - All lesson delivery records across coaches and teams
  - Audit logs showing when delivery records were added, edited, or deleted, and by which user
- Audit fields:
  - Each record includes `createdBy` and `createdAt` fields from the DeliveryRecords table
  - Records include action type (add/edit/delete), user ID, timestamp, and before/after values
- Snapshot fidelity:
  - Coach and Team names are captured at the moment of delivery and not updated afterward
  - Preserves historical accuracy even if names or assignments change later


## Offline Access
-	Lesson content (HTML/text) is cached locally and accessible offline in the mobile app.
-	Lesson images are loaded from online sources and require internet connectivity.
-	If offline, images are shown as placeholders or with an “unavailable” message.
-	On login or lesson browsing, the app updates local cache with the latest lesson content.
-	Coaches can deliver any lesson without internet, but images will only display when online.


## Authentication & User Management
-	Account Provisioning:
	-	All accounts (coach, manager, senior coach) are created and managed by senior coaches via the Senior Coach Site (Azure Static Web App).
-	Required fields: first name, last name, cellphone, email address, password.
-	Login Flow:
	-	Users log in with email and password.
	-	After first successful login, password is securely cached on the device; repeated entry is not required unless the user logs out or resets their device.
	-	Secure storage is used for credentials (e.g., Keychain/iOS, Keystore/Android).
	-	Roles:
-	Each user is assigned a role (coach, manager, senior coach) at account creation.
-	Roles control access to features and data.
-	Password Reset:
	-	Senior coaches can reset user passwords via the admin site.
	-	(Optional) Self-service password reset may be added later.
-	Two-Factor Authentication (2FA):
	-	Two-factor authentication is not required for this application.

## Coach-Team Association
-	Coaches are not limited to a single team within the app.
-	They may be assigned to a usual team, which will be automatically poulated on tyhe SkillSelectPage
-	For each lesson delivery, the coach selects the team they are coaching for that session.
-	Coaches can deliver lessons to multiple teams; each delivery record links coach, team, lesson, and date.
-	The app does not store a permanent mapping between coaches and teams—team selection is flexible and session-based

## Lesson Delivery History & Versioning
-	History Table/List:
-	Displays the following columns:
-	Skill (category)
-	Lesson Name
-	Coach Name
-	Team Name
-	Date Delivered
-	Lesson Version Number
-	Notes (entered by coach after delivery, timestamped with delivery date)
-	Lesson Versioning:
-	Each lesson includes a version number.
-	Lessons updated in the repo have their version incremented.
-	Delivery records store the version number of the lesson as delivered, preserving historical context.
-	Notes:
-	Coaches can add notes after delivering a lesson.
-	Notes are stored in the delivery record, tied to the delivery date.
-	Data Model:
-	DeliveryRecords table includes: Skill, LessonName, CoachID, CoachName, TeamID, TeamName, DateDelivered, LessonVersion, Notes.

## Lesson Versioning
-	Version Management:
-	Lesson version number is managed via the lesson builder (static web app).
-	Senior coaches can:
-	Create a new lesson (sets version to 1)
-	Edit an existing lesson (opens lesson for editing)
-	If any changes are made and saved, the version number increments by 1.
-	Version increment can be triggered automatically on save, or manually by the senior coach.
-	The lesson builder UI clearly displays the current version number and prompts on save if version will be incremented.
-	Delivery Record:
-	Each lesson delivery record stores the lesson version number as it was at the time of delivery.
-	Change History (Optional):
	Senior coaches can view a history of changes/versions for each lesson in the lesson builder.


## Lesson Versioning & Changelog
-	Version Management:
-	Lesson version number increments when a senior coach edits a lesson and saves changes.
-	Upon version change, the lesson builder prompts for a changelog note describing the update.
-	The changelog note and timestamp are stored with the lesson record.
-	Previous lesson content is not retained—edits overwrite the existing lesson.
-	Delivery Record:
-	Each delivery record stores the lesson version number as delivered.
-	Change History:
-	Senior coaches can view a list of version numbers and changelog notes for each lesson.


### Lesson Versioning & Changelog

- **Version Management:**
  - Lesson version number increments when a senior coach edits a lesson and saves changes.
  - Upon version change, the lesson builder prompts for a changelog note describing the update.
  - The changelog note and timestamp are stored with the lesson record.
  - Previous lesson content is **not** retained—edits overwrite the existing lesson.

- **Delivery Record:**
  - Each delivery record stores the lesson version number as delivered.

- **Change History:**
  - Senior coaches can view a list of version numbers and changelog notes for each lesson.







