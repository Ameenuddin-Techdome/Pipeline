variable "resource_group_name" {
  description = "Name of the resource group to create resources in"
  type        = string
}

variable "location" {
  description = "Azure location (region) for resources"
  type        = string
}

variable "clinic_code" {
  description = "Short clinic code used for resource naming"
  type        = string
}

variable "branding_json" {
  description = "Branding JSON content to upload as a blob"
  type        = string
}
