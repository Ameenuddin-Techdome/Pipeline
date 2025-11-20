output "app_default_hostname" {
  value = azurerm_app_service.app.default_site_hostname
}
output "backend_url" {
  value = var.backend_url
}
output "clinic_code" {
  value = var.clinic_code
}
