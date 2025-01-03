variable "family" {
    description = "The name of the task definition"
    type        = string
}

 variable "containerPort" {
    description = "The port the container listens on"
    type        = number
}

variable "environment" {
    description = "The environment variables to pass to the container"
    type        = list(object({
        name  = string
        value = string
    }))
}

variable "cluster_id" {
    description = "The name of the ECS cluster"
    type        = string
}

variable "subnets" {
    description = "The subnets to place the ECS service"
    type        = list(string)
}

variable "security_group" {
    description = "The security groups to place the ECS service"
    type        = string
  
}

variable "vpc_id"{
    description = "The VPC ID"
    type        = string
}

variable "health_check_path" {
    description = "The path to use for HTTP health checks"
    type        = string
    default     = "/"
}