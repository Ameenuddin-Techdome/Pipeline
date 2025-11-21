variable "location" {
  description = "The Azure region where resources will be deployed"
  type        = string
  default     = "centralus"
}

variable "rg_name" {
  description = "The name of the Azure Resource Group"
  type        = string
}

resource "azurerm_virtual_network" "vnet" {
  name                = "vnet-${var.rg_name}"
  address_space       = ["10.0.0.0/16"]
  location            = var.location
  resource_group_name = var.rg_name
}

resource "azurerm_subnet" "subnet" {
  name                 = "subnet"
  resource_group_name  = var.rg_name
  virtual_network_name = azurerm_virtual_network.vnet.name
  address_prefixes     = ["10.0.1.0/24"]
}
