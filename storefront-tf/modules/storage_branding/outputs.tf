output "branding_blob_url" {
  value = azurerm_storage_blob.branding_blob.url
}

output "branding_json" {
  value = var.branding_json
}
