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
