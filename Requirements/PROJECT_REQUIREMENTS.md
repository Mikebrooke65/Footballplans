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

## Tech Stack & Delivery
- **Mobile App:** Built with .NET MAUI, deployable to iOS and Android.
- **Senior Coach Lesson Builder:** Delivered via Azure Static Web App (web-based interface).
- **Cloud Database:** Azure Table Storage for all app data.
- **Authentication:** For prototype, login for up to 20 users.

## Data Storage (Azure Table Storage)
- **Coaches Table:** Stores coach details, login info, associated team.
- **Teams Table:** Stores team info, age group, etc.
- **Lessons Table:** Stores lesson details, skill category, HTML URL, image URLs.
- **DeliveryRecords Table:** Stores lesson delivery records:
  - CoachID, TeamID, LessonID, LessonName, DateDelivered, Notes
  - Editable and deletable by coaches
  - Queryable by coach or team for history

## App Structure

### HomePage
- Displays Club Logo.
- Login Button (prototype: up to 20 users).

### SkillSelectPage
- Team picker at top (pre-populated to coach's team, changeable).
- Skill picker (dropdown/list) loaded from repo.
- Dynamically loaded text box from repo.
- **Past Lessons Section:**  
  - Coach can select to view either:
    - Past lessons they have delivered
    - Past lessons delivered to the team
  - Displayed in a scrollable table/list.
  - Selecting a lesson opens that lesson in detail view.
  - From detail view, user can navigate back to SkillSelectPage.

### LessonSelectionPage
- Dynamically loads lessons under selected skill from repo.
- Coaches select a lesson to view details.

### LessonPage
- Displays selected lesson’s `.html` content.
- References up to three images, which can be opened full-screen.
- **Header Feature:**  
  - Displays: “Record this lesson being delivered?”
  - Button to record today’s date or enter custom delivery date.
  - On submission, saves delivery record to Azure Table Storage.
- Coaches can view, edit, or delete their own lesson delivery records.
- Delivery history is queryable by coach and by team.

### Lesson Plan Creation
- Senior coaches access a web-based lesson builder via Azure Static Web App.
- Generates `.html` lesson plans organized by skill, stored in the GitHub repo.

## Version 1 - Core Features
- Coaches/managers browse/select lesson plans after logging in.
- Senior coaches create plans via the lesson builder web interface.
- Skills/lessons dynamically loaded from GitHub repo.
- SkillSelectPage: team picker, skill picker, text box, past lessons section.
- LessonPage: HTML lesson display, image viewer, lesson delivery recording.
- Lesson delivery records: create, edit, delete; history by coach/team.
- All app data stored in Azure Table Storage.

## Future Features (To Be Added in Later Versions)
- [To be continued…]

## Notes
- The app will be updated over time, with new features added in future versions.
- Existing lesson plan creation workflow is retained and integrated.

##Reporting & Admin (Senior Coaches)
-	Reporting:
  -	Senior coaches access reporting tools via the Azure Static Web App.
  -	Can generate reports showing:
    -	What lessons have been delivered
    -Which teams received them
    -	Who delivered them (coach)
  -Filter by date range, team, or coach
  -	Reports viewable in browser, with option to export (CSV/PDF).
  -	Data pulled from Azure Table Storage.
-	Admin Maintenance:
  -	Senior coaches can update (add/edit/remove) teams and coaches via the web app.
  -	Changes are synced to Azure Table Storage and reflected in the mobile app for all users.
-	Access:
  -	Only senior coaches have access to these web-based reporting and admin tools.
  -	These features are optimized for desktop use.

##Privacy & Audit
-	Coach Privacy:
-	Coaches can only see:
-	Lessons they personally delivered
-	Lessons delivered to their selected team (not revealing which coach delivered unless it was them)
-	Coaches cannot access or view other coaches’ delivery details.
-	Senior Coach Audit Trail:
-	Senior coaches, via the static web app, can view:
  -	All lesson delivery records, across all coaches and teams
  -	An audit log showing when records were added, edited, or deleted, and by which user
-	Audit data includes:
  -	Record ID, action type (add/edit/delete), user, timestamp, before/after values
-	Data Model:
  -	DeliveryRecords table contains: createdBy, createdAt,

##Offline Access
-	Lesson content (HTML/text) is cached locally and accessible offline in the mobile app.
-	Lesson images are loaded from online sources and require internet connectivity.
-	If offline, images are shown as placeholders or with an “unavailable” message.
-	On login or lesson browsing, the app updates local cache with the latest lesson content.
-	Coaches can deliver any lesson without internet, but images will only display when online.

##Authentication & User Management
-	Account Provisioning:
-	All accounts (coach, manager, senior coach) are created and managed by senior coaches via the Azure Static Web App.
-	Required fields: first name, last name, cellphone, email address, password.
-	Only senior coaches have access to the user management interface.
-	Login Flow:
-	Users log in with email and password.
-	After first successful login, password is securely cached on the device; repeated entry is not required unless the user logs out or resets their device.
⦁	Secure storage is used for credentials (e.g., Keychain/iOS, Keystore/Android).
⦁	Roles:
⦁	Each user is assigned a role (coach, manager, senior coach) at account creation.
⦁	Roles control access to features and data.
⦁	Password Reset:
⦁	Senior coaches can reset user passwords via the admin site.
⦁	(Optional) Self-service password reset may be added later.
Authentication & User Management
-	Account Provisioning:
-	All accounts (coach, manager, senior coach) are created and managed by senior coaches via the Azure Static Web App.
⦁	Required fields: first name, last name, cellphone, email address, password.
⦁	Only senior coaches have access to the user management interface.
⦁	Login Flow:
⦁	Users log in with email and password.
⦁	After first successful login, password is securely cached on the device; repeated entry is not required unless the user logs out or resets their device.
⦁	Secure storage is used for credentials (e.g., Keychain/iOS, Keystore/Android).
-	Roles:
-	Each user is assigned a role (coach, manager, senior coach) at account creation.
-	Roles control access to features and data.
-	Password Reset:
-	Senior coaches can reset user passwords via the admin site.
-	(Optional) Self-service password reset may be added later.
-	Two-Factor Authentication (2FA):
-	Two-factor authentication is not required for this application.

##Coach-Team Association
-	Coaches are not limited to a single team within the app.
-	For each lesson delivery, the coach selects the team they are coaching for that session.
-	Coaches can deliver lessons to multiple teams; each delivery record links coach, team, lesson, and date.
-	The app does not store a permanent mapping between coaches and teams—team selection is flexible and session-based

##Lesson Delivery History & Versioning
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
⦁	Notes are stored in the delivery record, tied to the delivery date.
⦁	Data Model:
⦁	DeliveryRecords table includes: Skill, LessonName, CoachID, CoachName, TeamID, TeamName, DateDelivered, LessonVersion, Notes.

##Lesson Versioning
-	Version Management:
⦁	Lesson version number is managed via the lesson builder (static web app).
⦁	Senior coaches can:
⦁	Create a new lesson (sets version to 1)
⦁	Edit an existing lesson (opens lesson for editing)
⦁	If any changes are made and saved, the version number increments by 1.
⦁	Version increment can be triggered automatically on save, or manually by the senior coach.
⦁	The lesson builder UI clearly displays the current version number and prompts on save if version will be incremented.
⦁	Delivery Record:
⦁	Each lesson delivery record stores the lesson version number as it was at the time of delivery.
⦁	Change History (Optional):
⦁	Senior coaches can view a history of changes/versions for each lesson in the lesson builder.

##Lesson Builder Access & Approval
⦁	Only senior coaches have access to the lesson builder via the static web app.
⦁	No additional approval process is needed for new or updated lessons.
⦁	Lessons created or edited by senior coaches become immediately available in the mobile app (after sync/update).


##Lesson Versioning & Changelog
⦁	Version Management:
⦁	Lesson version number increments when a senior coach edits a lesson and saves changes.
⦁	Upon version change, the lesson builder prompts for a changelog note describing the update.
⦁	The changelog note and timestamp are stored with the lesson record.
⦁	Previous lesson content is not retained—edits overwrite the existing lesson.
⦁	Delivery Record:
⦁	Each delivery record stores the lesson version number as delivered.
⦁	Change History:
⦁	Senior coaches can view a list of version numbers and changelog notes for each lesson.




Messaging (Future Version)
⦁	In a future release, senior coaches can send messages to coaches via the app.
⦁	Messaging is initiated from the senior coach web app and delivered to coaches’ mobile app (via push notifications or in-app inbox).
⦁	Messages may include announcements, updates, or reminders.
⦁	Senior coaches can target all coaches, selected teams, or individual coaches.
⦁	Coaches receive notifications and have access to a message history in the app.



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

---

### Lesson Builder Access & Approval

- Only senior coaches have access to the lesson builder via the static web app.
- No additional approval process is needed for new or updated lessons.
- Lessons created or edited by senior coaches become immediately available in the mobile app (after sync/update).

---

### Messaging Foundation (Preparation for Future Release)

- **Initial Build Preparation:**
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
);
```

---

### Additional Notes

- Future visual/UI design requirements ("the look") will be discussed and documented in a separate section.
- Lesson field requirements will be updated after reviewing the working GitHub script.

---



