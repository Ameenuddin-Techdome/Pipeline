resource "azurerm_storage_account" "sa" {
  name                     = lower(substr("${var.clinic_code}store${random_id.suffix.hex}", 0, 24))
  resource_group_name      = var.resource_group_name
  location                 = var.location
  account_tier             = "Standard"
  account_replication_type = "LRS"

  tags = {
    environment = "prod"
  }
}

resource "random_id" "suffix" {
  byte_length = 4
}


resource "azurerm_storage_container" "branding" {
  name                  = "branding"
  storage_account_name  = azurerm_storage_account.sa.name
  container_access_type = "blob"
}

# ✅ Correct new syntax for blob resource
resource "azurerm_storage_blob" "branding_blob" {
  name                   = "${var.clinic_code}-branding.json"
  storage_account_name   = azurerm_storage_account.sa.name
  storage_container_name = azurerm_storage_container.branding.name
  type                   = "Block"
  source_content         = var.branding_json
}
