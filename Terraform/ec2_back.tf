# resource "aws_instance" "chmurki_ec2_back" {

#   ami                    = "ami-0866a3c8686eaeeba" # Ubuntu Server 24.04 LTS 64-bit (x86)
#   instance_type          = "t2.micro"
#   vpc_security_group_ids = [aws_security_group.chmurki_sg.id]
#   subnet_id              = aws_subnet.chmurki_vpc_public_subnet.id
#   key_name               = "vockey"
#   tags = {
#     Name = "Chmurki_ec2_back"
#   }
#   user_data_replace_on_change = true
#   user_data = <<-EOF
#     #!/bin/bash
#     set -x
#     apt-get update -y
#     apt-get install -y ca-certificates curl
#     install -m 0755 -d /etc/apt/keyrings
#     curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
#     chmod a+r /etc/apt/keyrings/docker.asc

#     echo \
#       "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
#       $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
#       tee /etc/apt/sources.list.d/docker.list > /dev/null
#     apt-get update -y
#     apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
#     cd ~
#     export COGNITO_CLIENT_ID="${aws_cognito_user_pool_client.cognito_user_pool_client.id}"
#     export COGNITO_POOL_ID="${aws_cognito_user_pool.cognito_user_pool.id}"
#     export CONNECTION_STRING="postgresql://${aws_db_instance.chmurki_rds.endpoint}/chmurki_db?user=kamila1&password=jamniczek"
#     docker run -d -p 80:3000 -e COGNITO_CLIENT_ID -e COGNITO_POOL_ID -e CONNECTION_STRING ayneisy/cloud-backend:latest
#     EOF 
# }
# output "ec2_back_ip" {
#   value = aws_instance.chmurki_ec2_back.public_ip
# }