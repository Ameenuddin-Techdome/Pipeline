output "default_hostname" {
  description = "The default hostname of the App Service"
  value       = azurerm_app_service.app.default_site_hostname
}
