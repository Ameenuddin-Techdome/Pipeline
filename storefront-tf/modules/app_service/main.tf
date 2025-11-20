resource "azurerm_service_plan" "plan" {
  name                = "${var.clinic_code}-asp"
  location            = var.location
  resource_group_name = var.resource_group_name

  os_type  = "Linux"
  sku_name = "P1v2"
}

resource "azurerm_linux_web_app" "app" {
  name                = "${var.clinic_code}-app"
  location            = var.location
  resource_group_name = var.resource_group_name
  service_plan_id     = azurerm_service_plan.plan.id

  site_config {
    application_stack {
      node_version = "18-lts"  # Fallback to Node.js, we'll override with Docker via CLI
    }
    always_on = true
  }

  app_settings = {
    WEBSITES_PORT       = "3000"
    BACKEND_URL         = var.backend_url
    BRANDING_BLOB_URL   = var.branding_blob_url
    NEXT_PUBLIC_BACKEND = var.backend_url
    # Docker settings will be configured via Azure CLI in the pipeline
    DOCKER_REGISTRY_SERVER_URL      = "https://${var.acr_login_server}"
    DOCKER_REGISTRY_SERVER_USERNAME = "@Microsoft.KeyVault(SecretUri=https://${var.acr_login_server}.vault.azure.net/secrets/acr-username)"
    DOCKER_REGISTRY_SERVER_PASSWORD = "@Microsoft.KeyVault(SecretUri=https://${var.acr_login_server}.vault.azure.net/secrets/acr-password)"
  }

  identity {
    type = "SystemAssigned"
  }
}

# Output for the app service
output "default_hostname" {
  value = azurerm_linux_web_app.app.default_hostname
}

output "app_name" {
  value = azurerm_linux_web_app.app.name
}