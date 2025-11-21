resource "random_id" "suffix" {
  byte_length = 4
}

resource "azurerm_resource_group" "this" {
  name     = lower("${var.name}-storefront-rg-${random_id.suffix.hex}")
  location = var.location
  tags = var.tags
}
