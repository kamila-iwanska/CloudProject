data "aws_iam_role" "ecs_task_execution_role" {
  name = "LabRole"
}
resource "aws_ecs_task_definition" "task_definition" {
  family                   = "task_definition_${var.family}"
  requires_compatibilities = ["FARGATE"]
  network_mode             = "awsvpc"
  cpu                      = 256
  memory                   = 512
  task_role_arn            = "${data.aws_iam_role.ecs_task_execution_role.arn}"
  execution_role_arn       = "${data.aws_iam_role.ecs_task_execution_role.arn}"
  container_definitions    = jsonencode([
    {
      name      = var.family
      image     = "ayneisy/cloud-${var.family}:latest"
      cpu       = 256
      memory    = 512
      essential = true
      portMappings = [
        {
          containerPort = var.containerPort
        }
      ]
      environment = var.environment
      logConfiguration = {
        logDriver = "awslogs"
        options = {
          "awslogs-create-group" = "true"
          "awslogs-group"  = "/chmurki/"
          "awslogs-region" = "us-east-1"
          "awslogs-stream-prefix" = "${var.family}"
        }
      }
    }
  ])  
}

resource "aws_ecs_service" "service" {
  name            = "service_${var.family}"
  cluster         = var.cluster_id
  task_definition = aws_ecs_task_definition.task_definition.arn
  launch_type = "FARGATE"
  desired_count   = 2
  deployment_circuit_breaker {
    enable   = true
    rollback = false
  }
  network_configuration {
    subnets          = var.subnets
    security_groups  = [var.security_group]
    assign_public_ip = true
  }
 
  load_balancer {
    target_group_arn = aws_lb_target_group.lb_target_group.arn
    container_name   = var.family
    container_port   = var.containerPort
  }
}

resource "aws_lb" "load_balancer" {
  name = "${var.family}-load-balancer"
  internal = false
  load_balancer_type = "application"
  security_groups = [var.security_group]
  subnets = var.subnets
}

resource "aws_lb_target_group" "lb_target_group" {
  name     = "${var.family}-target-group"
  port     = var.containerPort
  target_type = "ip"
  protocol = "HTTP"
  vpc_id   = var.vpc_id
  health_check {
    path = var.health_check_path
    interval = 300
  }
}

resource "aws_lb_listener" "lb_listener" {
  load_balancer_arn = aws_lb.load_balancer.arn
  port = 80
  protocol = "HTTP"
  default_action {
    type = "forward"
    target_group_arn = aws_lb_target_group.lb_target_group.arn
  }
}

output "load_balancer_dns" {
  value = "http://${aws_lb.load_balancer.dns_name}"
}