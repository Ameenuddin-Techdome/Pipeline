
variable "client_id" {}
variable "client_secret" {}
variable "subscription_id" {}
variable "tenant_id" {}
variable "region" {
  default = "centralus"
}
variable "environment" {

}
variable "app_name" {
  description = "App service name"
  type        = string
}

variable "repository" {

}
variable "admin_password" {

}
variable "admin_email" {

}
variable "database_sku" {

}
variable "app_service_plan" {

}
variable "resource_group" {
  description = "The name of the resource group"
  type        = string
}
variable "subfolder_path" {
  description = "Path to Medusa backend subfolder in GitHub repo"
  type        = string
}

# Tenant configuration (your JSON)
variable "config" {
  description = "Tenant configuration object"
  type = object({
    tenant_id        = string
    environment      = string
    region           = string
    app_service_plan = string
    database_sku     = string
    admin_email      = string
    admin_password   = string
    repository = object({
      url    = string
      branch = string
    })
  })
}