output "admin_email" {
  value = local.admin_email
}

output "admin_password" {
  value = local.admin_password
}

output "resource_group" {
  value = module.resource_group.name
}

output "environment" {
  value = local.environment
}

output "backend_url" {
  value = module.app_services.default_hostname
}
