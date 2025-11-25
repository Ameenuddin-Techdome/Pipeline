variable "resource_group_name" { 
  type = string 
}

variable "location" {
  type = string 
}

variable "clinic_code" {
  type = string 
}

variable "backend_url" { 
  type = string 
}

variable "branding_blob_url" {
  type = string 
}

# New variables for ACR + app settings
variable "acr_login_server" {
  type = string
}

variable "acr_username" {
  type = string
}

variable "acr_password" {
  type     = string
  sensitive = true
}

variable "publishable_key" {
  type = string
}

variable "strapi_url" {
  type = string
}
