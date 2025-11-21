variable "resource_group_name" {
  description = "Name of the Azure Resource Group"
  type        = string
  default     = "wizlo-dev-database-centralus-backend"
}

variable "tier" {
  description = "Database tier"
  type        = string
  default     = "basic"
}
