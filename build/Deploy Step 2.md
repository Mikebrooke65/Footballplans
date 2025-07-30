# 🧠 Deploy Step 2 – FootballCoachFunctions Function App

## 🌐 Azure Deployment Target

- 🧭 Resource Group: `FootballCoachFunctions_group`
- 🚀 Function App Name: `FootballCoachFunctions`
- 📍 Location: Confirmed via `az functionapp list`
- 📦 Deployment Method: `az functionapp deployment source config-zip`

> These values must be used for all CLI-based deployments unless explicitly changed. Errors will occur if app name or group mismatch.

### 🔧 Validation Commands

```powershell
# Check Function Apps and their groups
az functionapp list --query "[].{Name:name, ResourceGroup:resourceGroup}" --output table

# Confirm resource groups
az group list --query "[].name" --output table



## 📁 Local Build & Publish
- **Project Folder**: `C:\Projects\FootballCoachApp\FootballCoachFunctions\`
- **Publish Method**: VS2022 → FolderProfile1 → output to `publish_output`
- **Build Contents Confirmed**:
  - `FootballCoachFunctions.dll`
  - `host.json`
  - `worker.config.json`
  - `functions.metadata`
  - Required DLLs: `Azure.Core`, `Grpc.*`, `Microsoft.Extensions.*`, etc.
  - Runtime folders: `.azurefunctions`, `runtimes`

## 📦 ZIP Artifact
- **ZIP File**: `FootballCoachFunctions_Deploy.zip`
- **ZIP Location**: One level above `publish_output`
- **Creation Command** (run from `publish_output`):
  ```powershell
  Compress-Archive -Path * -DestinationPath "..\FootballCoachFunctions_Deploy.zip" -Force

## ☁️ Azure CLI Deployment

- **Command Executed**:
  ```powershell
  az functionapp deployment source config-zip `
    --resource-group "FootballCoachFunctions_group" `
    --name "FootballCoachFunctions" `
    --src "C:\Projects\FootballCoachApp\FootballCoachFunctions\FootballCoachFunctions_Deploy.zip"
