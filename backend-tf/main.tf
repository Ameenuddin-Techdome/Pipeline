# Use the config variable passed from orchestration instead of reading from file
locals {
  config = var.config

  tenant_id      = local.config.tenant_id
  environment    = local.config.environment
  region         = local.config.region
  admin_email    = local.config.admin_email
  admin_password = local.config.admin_password

  repository = local.config.repository
}

module "resource_group" {
  source   = "./modules/resource_group"
  name     = "rg-${local.tenant_id}-${local.environment}"
  location = local.region
}

module "database" {
  source              = "./modules/database"
  resource_group_name = module.resource_group.name
  tier                = local.config.database_sku
}

module "app_services" {
  source = "./modules/app_services"

  name           = "medusa-${local.tenant_id}"
  resource_group = module.resource_group.name
  region         = local.region
  repository     = local.repository.url
  subfolder_path = var.subfolder_path 
  admin_email    = local.admin_email
  admin_password = local.admin_password
  database_url   = module.database.connection_string
  extra_settings = {
    ADMIN_EMAIL    = local.admin_email
    ADMIN_PASSWORD = local.admin_password
    DATABASE_URL   = module.database.connection_string
    ENVIRONMENT    = local.environment
  }
}
