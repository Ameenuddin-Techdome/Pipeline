resource "azurerm_resource_group" "rg" {
  name     = "wizlo-dev-rg-centralus-backend"
  location = var.location
}

output "name" {
  value = azurerm_resource_group.rg.name
}
