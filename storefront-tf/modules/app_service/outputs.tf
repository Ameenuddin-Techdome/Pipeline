output "backend_url" {
  value = var.backend_url
}
output "clinic_code" {
  value = var.clinic_code
}

output "medusa_app_service_default_hostname" {
  description = "The default hostname of the Medusa App Service"
  value       = azurerm_app_service.app.default_site_hostname
}

output "app_service_name" {
  description = "The name of the Azure App Service"
  value       = azurerm_app_service.app.name
}

output "app_default_hostname" {
  description = "Default hostname of the App Service"
  value       = azurerm_app_service.app.default_site_hostname
}
