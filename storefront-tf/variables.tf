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

# --- New root-level variables to feed into the app module ---
variable "acr_login_server" {
  description = "ACR login server (e.g. mystoreacr.azurecr.io)"
  type        = string
}

variable "acr_username" {
  description = "ACR username"
  type        = string
}

variable "acr_password" {
  description = "ACR password (service principal or ACR password)"
  type        = string
  sensitive   = true
}

variable "publishable_key" {
  description = "Medusa publishable key (NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY)"
  type        = string
}

variable "strapi_url" {
  description = "NEXT_PUBLIC_STRAPI_URL"
  type        = string
}
