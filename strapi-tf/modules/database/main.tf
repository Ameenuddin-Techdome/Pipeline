resource "azurerm_postgresql_flexible_server" "this" {
  name = "${var.db_name}-pg"
  resource_group_name = var.resource_group_name
  location = var.location
  administrator_login = var.db_username
  administrator_password = var.db_password
  sku_name = "B_Standard_B1ms"
  storage_mb = 32768
  version = "13"
}

// azurerm_postgresql_flexible_server_database
// azurerm_postgresql_flexible_database
resource "azurerm_postgresql_flexible_server_database" "db" {
  name = var.db_name
  server_id = azurerm_postgresql_flexible_server.this.id
}

output "db_fqdn" {
  value = azurerm_postgresql_flexible_server.this.fqdn
}

output "connection_string" {
  value = "postgresql://${var.db_username}:${var.db_password}@${azurerm_postgresql_flexible_server.this.fqdn}:5432/${var.db_name}"
  sensitive = true
}
