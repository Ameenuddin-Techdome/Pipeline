output "medusa_app_service_name" {
  description = "App Service name of Medusa storefront"
  value       = module.app.app_service_name
}

output "storefront_url" {
  description = "URL of the storefront"
  value       = "https://${module.app.app_default_hostname}"
}

output "branding_blob_url" {
  value = module.branding_storage.branding_blob_url
}
