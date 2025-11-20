# Azure Credentials
variable "subscription_id" {
  type        = string
  description = "Azure subscription ID"
}

variable "client_id" {
  type        = string
  description = "Azure client ID"
}

variable "client_secret" {
  type        = string
  description = "Azure client secret"
  sensitive   = true
}

variable "tenant_id" {
  type        = string
  description = "Azure tenant ID"
}

# Environment Configuration
variable "prefix" {
  type        = string
  description = "Prefix for all resources"
  default     = "ecomm"
}

variable "environment" {
  type        = string
  description = "Environment (dev/staging/prod)"
  validation {
    condition     = contains(["dev", "staging", "prod"], var.environment)
    error_message = "Environment must be dev, staging, or prod."
  }
}

variable "region" {
  type        = string
  description = "Azure region"
  default     = "centralus"
}

# Clinic Configuration
variable "clinic_id" {
  type        = string
  description = "Unique clinic identifier"
}

variable "clinic_code" {
  type        = string
  description = "Clinic code for naming"
}

variable "clinic_name" {
  type        = string
  description = "Full clinic name"
}

# Backend Configuration
variable "backend_repository" {
  type        = string
  description = "Backend GitHub repository URL"
}

variable "backend_subfolder_path" {
  type        = string
  description = "Subfolder path in backend repository"
  default     = "medusa-backend"
}

variable "backend_admin_email" {
  type        = string
  description = "Backend admin email"
}

variable "backend_admin_password" {
  type        = string
  description = "Backend admin password"
  sensitive   = true
}

variable "backend_database_sku" {
  type        = string
  description = "Backend database SKU"
  default     = "Basic"
}

variable "backend_app_service_plan" {
  type        = string
  description = "Backend app service plan"
  default     = "B1"
}

# Strapi Configuration
variable "strapi_repo" {
  type        = string
  description = "Strapi GitHub repository URL"
}

variable "strapi_branch" {
  type        = string
  description = "Strapi repository branch"
  default     = "main"
}

variable "strapi_repo_subdir" {
  type        = string
  description = "Strapi subdirectory in repository"
  default     = "my-strapi-project"
}

variable "strapi_admin_email" {
  type        = string
  description = "Strapi admin email"
}

variable "strapi_admin_password" {
  type        = string
  description = "Strapi admin password"
  sensitive   = true
}

variable "strapi_db_username" {
  type        = string
  description = "Strapi database username"
  default     = "strapi_admin"
}

variable "strapi_db_password" {
  type        = string
  description = "Strapi database password"
  sensitive   = true
}

variable "strapi_app_service_plan_sku" {
  type        = string
  description = "Strapi app service plan SKU"
  default     = "B1"
}

# Branding Configuration
variable "brand_primary_color" {
  type        = string
  description = "Primary brand color"
  default     = "#1E90FF"
}

variable "brand_secondary_color" {
  type        = string
  description = "Secondary brand color"
  default     = "#FFFFFF"
}

variable "brand_logo_url" {
  type        = string
  description = "Brand logo URL"
  default     = "https://example.com/logo.png"
}

variable "brand_favicon_url" {
  type        = string
  description = "Brand favicon URL"
  default     = "https://example.com/favicon.ico"
}

variable "brand_font_family" {
  type        = string
  description = "Brand font family"
  default     = "Poppins"
}

# Storefront Configuration
variable "storefront_custom_domain" {
  type        = string
  description = "Custom domain for storefront"
  default     = ""
}

variable "contact_email" {
  type        = string
  description = "Contact email"
  default     = "info@example.com"
}

variable "contact_phone" {
  type        = string
  description = "Contact phone number"
  default     = "+1-555-0123"
}

# GitHub Configuration
variable "github_token" {
  type        = string
  description = "GitHub Personal Access Token"
  sensitive   = true
  default     = ""
}