terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.0"
    }
  }
  required_version = ">= 1.3.0"
}

provider "azurerm" {
  features {}
}

# Resource Group 
module "resource_group" {
  source      = "./modules/resource_group"
  name_prefix = var.azure_resource_group_prefix
  environment = var.clinic_environment
  location    = var.clinic_region
}

# Database
module "database" {
  source              = "./modules/database"
  resource_group_name = module.resource_group.name
  location            = var.clinic_region
  db_name             = var.db_name
  db_username         = var.db_username
  db_password         = var.db_password
}

# App Service
module "app_service" {
  source                = "./modules/app_service"
  resource_group_name   = module.resource_group.name
  location              = var.clinic_region
  plan_sku              = var.azure_app_service_plan_sku
  clinic_name           = var.clinic_name
  repo_url              = var.strapi_repo
  repo_branch           = var.strapi_branch
  repo_subdir           = var.strapi_repo_subdir
  admin_email           = var.strapi_admin_email
  admin_password        = var.strapi_admin_password
  db_connection_string  = module.database.connection_string
  linked_storefront_url = var.linked_storefront_url
  backend_url           = var.backend_url
  github_token = var.github_token

  # branding
  brand_primary_color   = var.brand_primary_color
  brand_secondary_color = var.brand_secondary_color
  brand_logo_url        = var.brand_logo_url
  brand_favicon_url     = var.brand_favicon_url
}
