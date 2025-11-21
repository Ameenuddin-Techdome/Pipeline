variable "clinic_code" {
  description = "Clinic code for naming resources"
  type        = string
}

variable "backend_url" {
  description = "Backend URL for the storefront"
  type        = string
}

variable "acr_name" {
  description = "Azure Container Registry name"
  type        = string
}

variable "app_service_plan_sku" {
  description = "SKU for the App Service Plan"
  type        = string
}

variable "resource_group_name" {
  description = "Resource group name"
  type        = string
}

variable "location" {
  description = "Azure location"
  type        = string
}
