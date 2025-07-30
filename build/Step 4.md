# 🧱 Step 4 – Define and Parse Input Payload for `IndexLessonContent` Function

This step prepares your Azure Function to ingest structured lesson metadata and media references. It aligns strictly with the **Lessons** table specification from the `PROJECT_REQUIREMENTS.md`.

---

## ✍️ 1. Input Model Definition (`LessonIndexRequest.cs`)

```csharp
public class LessonIndexRequest
{
    public string LessonId { get; set; }               // Unique lesson reference (PartitionKey)
    public string CreatedBy { get; set; }              // Contributor identity (email or ID)
    public string LessonName { get; set; }             // Human-readable title
    public string SkillCategory { get; set; }          // e.g. Passing, Dribbling
    public string LessonHTML { get; set; }             // Blob path to .html lesson content
    public List<string> MediaURLs { get; set; }        // Optional: paths to related media (images/videos)
}
```

---

## 📥 2. Sample JSON Payload

```json
{
  "LessonId": "L001",
  "CreatedBy": "seniorcoach@example.com",
  "LessonName": "1 – Passing with Intent",
  "SkillCategory": "Passing",
  "LessonHTML": "https://blobstorage.wcrfc.net/lessonplans/L001.html",
  "MediaURLs": [
    "https://blobstorage.wcrfc.net/media/images/L001/image1.jpg",
    "https://blobstorage.wcrfc.net/media/videos/L001/video1.mp4"
  ]
}
```

This sample matches the mobile app structure and ensures all media paths follow blob conventions.

---

## 🧪 3. PowerShell Test Block (Function Validation)

```powershell
$payload = @{
    LessonId = "L001"
    CreatedBy = "seniorcoach@example.com"
    LessonName = "1 – Passing with Intent"
    SkillCategory = "Passing"
    LessonHTML = "https://blobstorage.wcrfc.net/lessonplans/L001.html"
    MediaURLs = @(
        "https://blobstorage.wcrfc.net/media/images/L001/image1.jpg",
        "https://blobstorage.wcrfc.net/media/videos/L001/video1.mp4"
    )
} | ConvertTo-Json -Depth 3

Invoke-RestMethod -Method Post `
  -Uri "https://footballcoachfunctions.azurewebsites.net/api/IndexLessonContent?code=your_function_key" `
  -Body $payload `
  -ContentType "application/json"
```

📌 **Note:** Replace `your_function_key` with the actual Azure Function key from the portal.

---

## 📚 Related Tables Impacted

| Table Name       | Impact                                |
|------------------|----------------------------------------|
| `Lessons`        | Adds new indexed lessons with content  |
| `DeliveryRecords`| May later link `LessonId` + versioning |
| `CoachTextBlocks`| Not directly impacted in this step     |

---

## ✅ Requirements Compliance Snapshot

| Requirement Area                   | Status  | Notes |
|-----------------------------------|---------|-------|
| Mobile App Ingestion              | ✅      | HTML + media links renderable via .NET MAUI. |
| Senior Coach Site Delivery        | ✅      | Content structured for lesson builder. |
| Azure Table Storage Compliance    | ✅      | Matches `Lessons` schema exactly. |
| Versioning Fidelity               | ✅      | `LessonHTML` path can encode versioning. |
| Contributor Identity              | ✅      | `CreatedBy` supports traceability. |
| Media Support                     | ✅      | `MediaURLs` allows flexible blob linking. |
| Cross-Table Linkage Ready         | ✅      | `LessonId` enables joins with delivery history. |
| Offline Capability Preparation    | ✅      | HTML field cached in app, media fallback supported. |

---

## 🧠 Contributor Notes

- This model defines **lesson metadata only** — actual lesson content lives in HTML blobs.  
- No instructional steps or markdown instructions are stored here.  
- MediaURLs are flexible and can reference structured folders (`LessonID` or `SkillCategory`).  
- Fully testable via CLI or Postman — and safe for contributor uploads via Senior Coach site.  
- This step respects all separation-of-concerns and indexing logic laid out in your schema.  

---
