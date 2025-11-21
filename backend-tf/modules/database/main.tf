
resource "random_password" "db_password" {
  length  = 16
  special = true
}

resource "random_string" "rand" {
  length  = 6
  upper   = false
  special = false
}

resource "azurerm_postgresql_flexible_server" "db" {
  name                   = "wizlo-dev-database-centralus-backend"
  resource_group_name    = var.resource_group_name
  location               = "centralus"
  zone     = "1" 
  
  sku_name               = "B_Standard_B1ms"
  administrator_login    = "pgadmin"
  administrator_password = random_password.db_password.result
  version                = "13"
}

output "connection_string" {
  value     = "postgres://${azurerm_postgresql_flexible_server.db.administrator_login}:${random_password.db_password.result}@${azurerm_postgresql_flexible_server.db.fqdn}/medusa"
  sensitive = true
}

output "db_password" {
  value     = random_password.db_password.result
  sensitive = true
}

output "db_fqdn" {
  value = azurerm_postgresql_flexible_server.db.fqdn
}
