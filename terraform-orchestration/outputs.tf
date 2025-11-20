# Backend Outputs
output "backend_url" {
  description = "Backend API URL"
  value       = module.backend.backend_url
}

output "backend_admin_email" {
  description = "Backend admin email"
  value       = module.backend.admin_email
}

output "backend_resource_group" {
  description = "Backend resource group"
  value       = module.backend.resource_group
}

# Strapi Outputs
output "strapi_cms_url" {
  description = "Strapi CMS URL"
  value       = module.strapi.cms_url
}

output "strapi_admin_email" {
  description = "Strapi admin email"
  value       = module.strapi.cms_admin_email
}

output "strapi_resource_group" {
  description = "Strapi resource group"
  value       = module.strapi.resource_group
}

# Storefront Outputs
output "storefront_url" {
  description = "Storefront URL"
  value       = module.storefront.storefront_url
}

output "branding_blob_url" {
  description = "Branding storage blob URL"
  value       = module.storefront.branding_blob_url
}

output "clinic_code" {
  description = "Deployed clinic code"
  value       = module.storefront.clinic_code
}

# Environment Info
output "environment" {
  description = "Deployed environment"
  value       = var.environment
}

# Comprehensive Deployment Summary
output "deployment_summary" {
  description = "Complete deployment summary with all URLs"
  value = {
    backend = {
      api_url        = module.backend.backend_url
      admin_email    = module.backend.admin_email
      resource_group = module.backend.resource_group
    }
    strapi = {
      cms_url        = module.strapi.cms_url
      admin_email    = module.strapi.cms_admin_email
      resource_group = module.strapi.resource_group
    }
    storefront = {
      url          = module.storefront.storefront_url
      branding_url = module.storefront.branding_blob_url
      clinic_code  = module.storefront.clinic_code
    }
    environment = var.environment
    region      = var.region
    clinic_name = var.clinic_name
  }
}

# Quick Access URLs
output "application_urls" {
  description = "Quick access to all application URLs"
  value = {
    backend_api = module.backend.backend_url
    strapi_cms  = module.strapi.cms_url
    storefront  = module.storefront.storefront_url
  }
}