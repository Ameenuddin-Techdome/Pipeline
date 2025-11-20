output "cms_url" {
  description = "URL of the deployed Strapi CMS"
  value       = module.app_service.cms_url
} 
 
output "cms_admin_email" {
  description = "email configured for Strapi"
  value       = var.strapi_admin_email
}

output "cms_admin_password" {
  description = "password for CMS login"
  value       = var.strapi_admin_password
  sensitive   = true
}

output "linked_storefront_url" {
  description = "Storefront URL integrated with CMS"
  value       = var.linked_storefront_url
}

output "resource_group" {
  description = "Azure resource group for deployment"
  value       = module.resource_group.name
}

output "app_service_name" {
  value = module.app_service.app_service_name
}

output "resource_group_name" {
  value = module.resource_group.resource_group_name
}

output "environment" {
  description = "Environment type"
  value       = var.clinic_environment
}
