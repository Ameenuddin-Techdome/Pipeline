locals {
  cfg = jsondecode(file("${path.module}/clinic-config.json"))
}

module "rg" {
  source   = "./modules/resource_group"
  name     = local.cfg.clinic_code
  location = "East US"
  tags     = { clinic = local.cfg.clinic_code }
}

module "branding_storage" {
  source              = "./modules/storage_branding"
  resource_group_name = module.rg.name
  location            = module.rg.location
  clinic_code         = local.cfg.clinic_code
  branding_json       = jsonencode(local.cfg.branding)
}

module "app" {
  source              = "./modules/app_service"
  resource_group_name = module.rg.name
  location            = module.rg.location
  clinic_code         = local.cfg.clinic_code
  backend_url         = local.cfg.backend.api_url
  branding_blob_url   = module.branding_storage.branding_blob_url

  # Pass ACR + app setting values from root variables
  acr_login_server    = var.acr_login_server
  acr_username        = var.acr_username
  acr_password        = var.acr_password

  publishable_key     = var.publishable_key
  strapi_url          = var.strapi_url
}
