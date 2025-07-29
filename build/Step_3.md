# ⚙️ Step 3 – Extend Functional Logic and Build Contributor Test Harness

> 📍 This step continues in: `FootballCoachApp/FootballCoachFunctions/`

---

## 🧩 Goals

By the end of this step, you'll:
- Create a second Azure Function (`GenerateLessonSummary.cs`)
- Deploy it to your existing Function App
- Test it manually with CLI and Postman
- Document everything so a future contributor could follow without confusion

---

## 🔨 Step-by-Step Instructions

### 1️⃣ Create the New Function Source File

> ⏳ Time: ~10 mins  
> 📁 Where: `FootballCoachFunctions/`

1. Open Visual Studio 2022.
2. In your solution explorer, right-click the `FootballCoachFunctions` project.
3. Click `Add` → `New Item`.
4. Select `Class`, name it: `GenerateLessonSummary.cs`
5. Paste this starter code:

```csharp
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using System.Net;

namespace FootballCoachFunctions
{
    public static class GenerateLessonSummary
    {
        [Function("GenerateLessonSummary")]
        public static HttpResponseData Run(
            [HttpTrigger(AuthorizationLevel.Function, "post")] HttpRequestData req,
            FunctionContext context)
        {
            var logger = context.GetLogger("GenerateLessonSummary");
            logger.LogInformation("GenerateLessonSummary triggered");

            var response = req.CreateResponse(HttpStatusCode.OK);
            response.Headers.Add("Content-Type", "application/json");
            response.WriteString("{ \"summary\": \"Lesson summary generated successfully.\" }");
            return response;
        }
    }
}
