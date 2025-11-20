variable "resource_group_name" {}
variable "location" {}
variable "plan_sku" {}
variable "clinic_name" {}
variable "repo_url" {}
variable "repo_branch" {}
variable "repo_subdir" {}
variable "admin_email" {}
variable "admin_password" {
  sensitive = true
}
variable "db_connection_string" {
  sensitive = true
}
variable "linked_storefront_url" {}
variable "backend_url" {}
variable "brand_primary_color" {}
variable "brand_secondary_color" {}
variable "brand_logo_url" {}
variable "brand_favicon_url" {}

variable "github_token" {
  description = "GitHub Personal Access Token"
  sensitive   = true
}
