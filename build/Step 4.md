# 🧱 Step 4 – Define and Parse Input Payload for `IndexLessonContent` Function

This step enables the system to receive lesson indexing payloads — capturing structured lesson content, contributor identity, and coaching tags for future session linking, delivery records, and blob storage.

---

## ✍️ 1. Input Model Definition (`LessonIndexRequest.cs`)

```csharp
public class LessonIndexRequest
{
    public string LessonId { get; set; }           // Unique lesson reference
    public string CreatedBy { get; set; }          // Contributor identity (email or ID)
    public string LessonName { get; set; }         // Human-readable title
    public string SkillCategory { get; set; }      // E.g. Passing, Dribbling
    public List<string> Tags { get; set; }         // Optional keywords for filtering
    public List<string> Steps { get; set; }        // Markdown-formatted instructions
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
  "Tags": ["short pass", "decision making"],
  "Steps": [
    "Warm-up: 3v3 rondo",
    "Activity 1: Passing under pressure",
    "Cool-down: Self-reflection pairs"
  ]
}
```

Use this structure for Postman tests, CLI calls, or frontend form binding.

---

## 🧪 3. PowerShell Test Block (Functional Validation)

```powershell
$payload = @{
    LessonId = "L001"
    CreatedBy = "seniorcoach@example.com"
    LessonName = "1 – Passing with Intent"
    SkillCategory = "Passing"
    Tags = @("short pass", "decision making")
    Steps = @(
        "Warm-up: 3v3 rondo",
        "Activity 1: Passing
