output "storefront_url" {
  value = "https://${module.app.app_default_hostname}"
}

output "backend_url" {
  value = module.app.backend_url
}

output "branding_blob_url" {
  value = module.branding_storage.branding_blob_url
}

output "clinic_code" {
  value = module.app.clinic_code
}
