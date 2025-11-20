resource "azurerm_service_plan" "strapi" {
  name                = "${var.clinic_name}-plan"
  location            = var.location
  resource_group_name = var.resource_group_name
  os_type             = "Linux"
  sku_name            = var.plan_sku
}

# ===========================
# Azure Web App
# ===========================
resource "azurerm_linux_web_app" "strapi" {
  name                = "${var.clinic_name}-cms"
  resource_group_name = var.resource_group_name
  location            = var.location
  service_plan_id     = azurerm_service_plan.strapi.id

  site_config {
    application_stack {
      node_version = "18-lts"
    }
    app_command_line = "npm run start"
  }

  app_settings = {
    NODE_ENV              = "production"
    STRAPI_ADMIN_EMAIL    = var.admin_email
    STRAPI_ADMIN_PASSWORD = var.admin_password
    DATABASE_URL          = var.db_connection_string
    LINKED_STOREFRONT_URL = var.linked_storefront_url
    BACKEND_URL           = var.backend_url
    BRAND_PRIMARY_COLOR   = var.brand_primary_color
    BRAND_SECONDARY_COLOR = var.brand_secondary_color
    BRAND_LOGO_URL        = var.brand_logo_url
    BRAND_FAVICON_URL     = var.brand_favicon_url
  }
}

output "cms_url" {
  description = "The default hostname (URL) of the Strapi CMS web app"
  value       = azurerm_linux_web_app.strapi.default_hostname
}

output "app_service_name" {
  value = azurerm_linux_web_app.strapi.name
}
