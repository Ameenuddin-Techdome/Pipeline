# main.tf
terraform {
  required_version = ">= 1.3.0"
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.100"
    }
    local = {
      source  = "hashicorp/local"
      version = "~> 2.0"
    }
    random = {
      source  = "hashicorp/random"
      version = "~> 3.0"
    }
  }

  backend "local" {
    path = "terraform.tfstate"
  }
}

provider "azurerm" {
  features {}
  subscription_id = var.subscription_id
  client_id       = var.client_id
  client_secret   = var.client_secret
  tenant_id       = var.tenant_id
}

# Local variables for consistent naming
locals {
  resource_prefix = "${var.prefix}-${var.environment}"
  common_tags = {
    Project     = "ecommerce"
    Environment = var.environment
    ManagedBy   = "terraform"
  }
}

# 1. BACKEND - First to deploy (independent)
module "backend" {
  source = "../backend-tf"

  # Azure credentials
  subscription_id = var.subscription_id
  client_id       = var.client_id
  client_secret   = var.client_secret
  tenant_id       = var.tenant_id

  # Backend configuration
  environment      = var.environment
  region           = var.region
  app_name         = "${local.resource_prefix}-backend"
  repository       = var.backend_repository
  admin_password   = var.backend_admin_password
  admin_email      = var.backend_admin_email
  database_sku     = var.backend_database_sku
  app_service_plan = var.backend_app_service_plan
  resource_group   = "${var.prefix}-${var.environment}-backend-rg"  # CHANGED: Use prefix variable
  subfolder_path   = var.backend_subfolder_path

  config = {
    tenant_id        = var.tenant_id
    environment      = var.environment
    region           = var.region
    app_service_plan = var.backend_app_service_plan
    database_sku     = var.backend_database_sku
    admin_email      = var.backend_admin_email
    admin_password   = var.backend_admin_password
    repository = {
      url            = var.backend_repository
      branch         = "main"
      subfolder_path = var.backend_subfolder_path
    }
  }
}

# Create clinic-config.json for storefront dynamically
resource "local_file" "storefront_config" {
  filename = "clinic-config-${var.environment}.json"
  content = jsonencode({
    clinic_id   = var.clinic_id
    clinic_code = var.clinic_code
    clinic_name = var.clinic_name
    # The storefront module doesn't expect "environment" in the JSON
    branding = {
      logo_url        = var.brand_logo_url
      primary_color   = var.brand_primary_color
      secondary_color = var.brand_secondary_color
      font_family     = var.brand_font_family
    }
    backend = {
      api_url = module.backend.backend_url
    }
    domain = {
      custom_domain = var.storefront_custom_domain
    }
    contact_info = {
      email = var.contact_email
      phone = var.contact_phone
    }
  })
}

# 2. STRAPI - Uses backend_url from backend (implicit dependency)
module "strapi" {
  source = "../strapi-tf"

  # Clinic configuration
  clinic_name        = var.clinic_name
  clinic_environment = var.environment
  clinic_region      = var.region

  # Strapi configuration
  strapi_repo           = var.strapi_repo
  strapi_branch         = var.strapi_branch
  strapi_repo_subdir    = var.strapi_repo_subdir
  strapi_admin_email    = var.strapi_admin_email
  strapi_admin_password = var.strapi_admin_password

  # Database configuration
  db_name     = "${local.resource_prefix}-strapi-db"
  db_username = var.strapi_db_username
  db_password = var.strapi_db_password

  # Azure configuration
  azure_resource_group_prefix = var.prefix
  azure_app_service_plan_sku  = var.strapi_app_service_plan_sku

  # Integration URLs
  linked_storefront_url = "https://${var.clinic_code}-app.azurewebsites.net" # CHANGED: Uses updated clinic_code
  backend_url           = module.backend.backend_url
  github_token          = var.github_token

  # Branding
  brand_primary_color   = var.brand_primary_color
  brand_secondary_color = var.brand_secondary_color
  brand_logo_url        = var.brand_logo_url
  brand_favicon_url     = var.brand_favicon_url
}

# 3. STOREFRONT - Depends on backend and config file
module "storefront" {
  source = "../storefront-tf"

  clinic_config_path = local_file.storefront_config.filename
}