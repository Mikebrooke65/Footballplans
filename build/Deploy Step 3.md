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
