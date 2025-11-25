resource "random_id" "suffix" {
  byte_length = 4
}

resource "azurerm_app_service_plan" "plan" {
  name                = "${var.clinic_code}-asp"
  location            = var.location
  resource_group_name = var.resource_group_name

  sku {
    tier = "Standard"
    size = "S1"
  }

  kind     = "Linux"
  reserved = true
}

resource "azurerm_app_service" "app" {
  name                = "${var.clinic_code}-app-${random_id.suffix.hex}"
  location            = var.location
  resource_group_name = var.resource_group_name
  app_service_plan_id = azurerm_app_service_plan.plan.id

  site_config {
    linux_fx_version = "NODE|18-lts"
  }

  # --- App settings (environment variables) ---
  app_settings = {
    DOCKER_ENABLE_CI                        = "true"
    DOCKER_REGISTRY_SERVER_PASSWORD        = var.acr_password
    DOCKER_REGISTRY_SERVER_URL             = var.acr_login_server
    DOCKER_REGISTRY_SERVER_USERNAME        = var.acr_username

    MEDUSA_BACKEND_URL                      = var.backend_url
    NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY      = var.publishable_key
    NEXT_PUBLIC_STRAPI_URL                  = var.strapi_url
  }

  identity {
    type = "SystemAssigned"
  }
}
