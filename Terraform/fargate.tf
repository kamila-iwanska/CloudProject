resource "aws_ecs_cluster" "chmurki_cluster" {
  name = "chmurki_cluster"
}

module "frontend-service"{
    source = "./service"
    family = "frontend"
    containerPort = 5173
    environment = [
        {
            name = "VITE_COGNITO_CLIENT_ID"
            value = "${aws_cognito_user_pool_client.cognito_user_pool_client.id}"
       },
       {
            name = "VITE_BACKEND_URL"
            value = module.backend-service.load_balancer_dns
       }
    ]
    cluster_id = aws_ecs_cluster.chmurki_cluster.id
    subnets = [aws_subnet.chmurki_vpc_public_subnet.id, aws_subnet.chmurki_vpc_public_subnet_2.id]
    security_group = aws_security_group.chmurki_sg.id
    vpc_id = aws_vpc.chmurki_vpc.id
}

module "backend-service"{
    source = "./service"
    family = "backend"
    containerPort = 3000
    environment = [
        {
            name = "COGNITO_CLIENT_ID"
            value = "${aws_cognito_user_pool_client.cognito_user_pool_client.id}"
       },
       {
            name = "COGNITO_POOL_ID"
            value = "${aws_cognito_user_pool.cognito_user_pool.id}"
       },
       {
            name = "CONNECTION_STRING"
            value = "postgresql://${aws_db_instance.chmurki_rds.endpoint}/chmurki_db?user=kamila1&password=jamniczek"
       }
    ]
    cluster_id = aws_ecs_cluster.chmurki_cluster.id
    subnets = [aws_subnet.chmurki_vpc_public_subnet.id, aws_subnet.chmurki_vpc_public_subnet_2.id]
    security_group = aws_security_group.chmurki_sg.id
    vpc_id = aws_vpc.chmurki_vpc.id
    health_check_path = "/health"
}