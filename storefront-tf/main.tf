locals {
  cfg = jsondecode(file("${path.module}/clinic-config.json"))
}

module "rg" {
  source   = "./modules/resource_group"
  name     = "${local.cfg.clinic_code}-storefront-rg"  # Simple naming
  location = "East US"
  tags = {
    clinic = local.cfg.clinic_code
  }
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
}
