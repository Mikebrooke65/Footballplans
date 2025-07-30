## 🚀 Azure CLI Deployment – GenerateLessonSummary

- 📅 Timestamp: 1:00:32 PM NZST
- 🔧 Function App: `FootballCoachFunctions`
- 📂 Resource Group: `FootballCoachFunctions_group`
- 📦 ZIP Path: `C:\DeployPackages\GenerateLessonSummary_Deploy.zip`
- 💻 CLI Command Used:
  az functionapp deployment source config-zip `
    --resource-group "FootballCoachFunctions_group" `
    --name "FootballCoachFunctions" `
    --src "C:\DeployPackages\GenerateLessonSummary_Deploy.zip"
- 🧑‍💻 Deployer: `az_cli_functions`
- 🟢 Provisioning State: `Succeeded`
- 🔗 Deployment Log URL: [View logs](https://footballcoachfunctions-adguc9bbfpdudngx.scm.australiaeast-01.azurewebsites.net/api/deployments/latest/log)
- 🔗 Deployment Summary URL: [Latest summary](https://footballcoachfunctions-adguc9bbfpdudngx.scm.australiaeast-01.azurewebsites.net/api/deployments/latest)


## 🧭 Azure Function DNS Recovery (invokeUrlTemplate verification)

When the expected DNS endpoint (e.g., `footballcoachfunctions.azurewebsites.net`) fails to resolve due to `NXDOMAIN` or routing mismatch, use Azure REST API to retrieve the true internal endpoint:

### Step 1: Get Subscription ID
```powershell
az account show --output json
# Copy the value of "id"


## ✅ Function Test – IndexLessonContent

🔗 **Endpoint Verified via Azure REST:**
`https://footballcoachfunctions-adguc9bbfpdudngx.australiaeast-01.azurewebsites.net/api/indexlessoncontent?code=8UzBCZt8JGb9lUVrjhFJyrjKj1AHUJYts7xdk5j5NyEpAzFulBeJMg==`

🧪 **PowerShell Test Block:**
```powershell
$uri = "https://footballcoachfunctions-adguc9bbfpdudngx.australiaeast-01.azurewebsites.net/api/indexlessoncontent?code=8UzBCZt8JGb9lUVrjhFJyrjKj1AHUJYts7xdk5j5NyEpAzFulBeJMg=="
$headers = @{ "Content-Type" = "application/json" }
$body = "{}"
$response = Invoke-RestMethod -Uri $uri -Method POST -Headers $headers -Body $body
$response

## ✅ Azure Function Deploy & Test – IndexLessonContent

🕒 **Timestamp:** [Insert current NZST time]  
🚀 **Function App:** `FootballCoachFunctions`  
📦 **Resource Group:** `FootballCoachFunctions_group`  
📁 **ZIP Path:** `C:\DeployPackages\IndexLessonContent_Deploy.zip`  
🔧 **CLI Command Used:**
```powershell
az functionapp deployment source config-zip `
  --resource-group "FootballCoachFunctions_group" `
  --name "FootballCoachFunctions" `
  --src "C:\DeployPackages\IndexLessonContent_Deploy.zip"

https://footballcoachfunctions-adguc9bbfpdudngx.australiaeast-01.azurewebsites.net/api/indexlessoncontent
az rest --method get `
  --uri "/subscriptions/062bde7a-0e91-48a2-8c01-b1e55418c1d4/resourceGroups/FootballCoachFunctions_group/providers/Microsoft.Web/sites/FootballCoachFunctions/functions?api-version=2022-03-01"
8UzBCZt8JGb9lUVrjhFJyrjKj1AHUJYts7xdk5j5NyEpAzFulBeJMg==
https://footballcoachfunctions-adguc9bbfpdudngx.australiaeast-01.azurewebsites.net/api/indexlessoncontent?code=8UzBCZt8JGb9lUVrjhFJyrjKj1AHUJYts7xdk5j5NyEpAzFulBeJMg==
