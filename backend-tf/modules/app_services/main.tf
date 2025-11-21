resource "azurerm_app_service_plan" "plan" {
  name                = "wizlo-dev-appservice-plan-centralus-backend-plan"
  location            = var.region
  resource_group_name = var.resource_group
  kind                = "Linux"
  reserved = "true"
  sku {
    tier = "Basic"
    size = "B1"
  }
}

resource "azurerm_app_service" "app" {
  name                = "wizlo-dev-appservice-centralus-backend"
  location            = var.region
  resource_group_name = var.resource_group
  app_service_plan_id = azurerm_app_service_plan.plan.id

  site_config {
    
    app_command_line = "cd ${var.subfolder_path} && npm install && npm run start"
  }
}
