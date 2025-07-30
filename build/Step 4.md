# 🧱 Step 4 – Define and Parse Input Payload for `IndexLessonContent` Function

This step prepares your Azure Function to ingest **exact lesson fields** matching the `Lessons` table. It supports lesson indexing, blob path linking, and structured markdown content delivery.

---

## ✍️ 1. Input Model Definition (`LessonIndexRequest.cs`)

```csharp
public class LessonIndexRequest
{
    public string LessonID { get; set; }              // PartitionKey
    public string Name { get; set; }                  // Display name of the lesson
    public string Skill { get; set; }                 // e.g. Passing, Dribbling
    public List<string> Tags { get; set; }            // Optional keywords for discovery
    public string MarkdownContent { get; set; }       // Raw markdown (.md format)
    public string MediaFolderPath { get; set; }       // Path to related media assets in Blob Storage
    public string CreatedBy { get; set; }             // Identity of contributing Senior Coach
}
```

---

## 📥 2. Sample JSON Payload

```json
{
  "LessonID": "L001",
  "Name": "1 – Passing with Intent",
  "Skill": "Passing",
  "Tags": ["short pass", "decision making"],
  "MarkdownContent": "## Warm-up\n- 3v3 rondo\n\n## Main Activity\n- Pressure passing lanes",
  "MediaFolderPath": "https://blobstorage.wcrfc.net/media/L001/",
  "CreatedBy": "seniorcoach@example.com"
}
```

---

## 🧪 3. PowerShell Test Block (Function Validation)

```powershell
$payload = @{
    LessonID = "L001"
    Name = "1 – Passing with Intent"
    Skill = "Passing"
    Tags = @("short pass", "decision making")
    MarkdownContent = "## Warm-up`n- 3v3 rondo`n`n## Main Activity`n- Pressure passing lanes"
    MediaFolderPath = "https://blobstorage.wcrfc.net/media/L001/"
    CreatedBy = "seniorcoach@example.com"
} | ConvertTo-Json -Depth 3

Invoke-RestMethod -Method Post `
  -Uri "https://footballcoachfunctions.azurewebsites.net/api/IndexLessonContent?code=your_function_key" `
  -Body $payload `
  -ContentType "application/json"
```

---

## 📚 Table Alignment

| Azure Table       | Field Name         | Purpose                                |
|-------------------|--------------------|----------------------------------------|
| `Lessons`         | LessonID (PK)      | Uniquely identifies the lesson         |
|                   | Name               | Human-readable title                   |
|                   | Skill              | Coaching skill area                    |
|                   | Tags               | Discoverability & filtering            |
|                   | MarkdownContent    | Lesson body in markdown format         |
|                   | MediaFolderPath    | Location of lesson assets              |
|                   | CreatedBy          | Contributor identity for audit trail   |

---

## ✅ Project Requirements Compliance

| Area                                | Status | Notes |
|-------------------------------------|--------|-------|
| Mobile App Markdown Rendering       | ✅     | Markdown stored in `MarkdownContent` |
| Image & Video Support               | ✅     | Assets stored in structured blob folders |
| Table Compliance                    | ✅     | Every field matches actual schema |
| Contributor Auditability            | ✅     | `CreatedBy` tracked as metadata |
| Versioning Support                  | ⚠️     | Versioning managed in delivery records — not here |
| Offline Compatibility               | ✅     | Markdown cached by mobile app |

---

## 🧠 Contributor Notes

- **MarkdownContent** supports formatted text, lists, headers — no need to embed HTML.
- **MediaFolderPath** must match the folder used in Blob Storage (e.g. `media/L001/`)
- `CreatedBy` ensures lessons are traceable back to their contributor.
- This payload should be treated as an ingestion artifact — delivery tracking happens later in `DeliveryRecords`.

---
