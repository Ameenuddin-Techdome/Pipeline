variable "name" {
  type        = string
  description = "Name of the app service"
  default = "wizlo-production-appservice-centralus-backend"
  
}

variable "resource_group" {
  type        = string
  description = "Resource group for the app service"
}

variable "region" {
  type        = string
  description = "Azure region for deployment"
  default = "centralus"
}

variable "repository" {
  type        = string
  description = "GitHub repository for deployment"
}

variable "admin_email" {
  type        = string
  description = "Admin email for the app"
}
variable "subfolder_path" {}
variable "admin_password" {
  type        = string
  description = "Admin password for the app"
}

variable "database_url" {
  type        = string
  description = "Database connection string"
}

variable "extra_settings" {
  type        = map(string)
  description = "Additional app settings"
  default     = {}
}
