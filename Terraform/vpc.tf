resource "aws_vpc" "chmurki_vpc" {
  cidr_block = "10.0.0.0/16"
  tags = {
    Name = "chmurki-vpc"
  }
}

resource "aws_subnet" "chmurki_vpc_public_subnet" {
  vpc_id                  = aws_vpc.chmurki_vpc.id
  cidr_block              = "10.0.0.0/24"
  map_public_ip_on_launch = true
  availability_zone = "us-east-1a"
  tags = {
    Name = "chmurki-public-subnet"
  }
}

resource "aws_subnet" "chmurki_vpc_public_subnet_2" {
  vpc_id                  = aws_vpc.chmurki_vpc.id
  cidr_block              = "10.0.10.0/24"
  map_public_ip_on_launch = true
  availability_zone = "us-east-1b"
  tags = {
    Name = "chmurki-public-subnet-2"
  }
}

resource "aws_internet_gateway" "chmurki_vpc_gateway" {
  vpc_id = aws_vpc.chmurki_vpc.id
  tags = {
    Name = "chmurki-internet-gateway"
  }
}

resource "aws_route_table" "chmurki_vpc_route_table" {
  vpc_id = aws_vpc.chmurki_vpc.id
  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.chmurki_vpc_gateway.id
  }
  tags = {
    Name = "chmurki-route-table"
  }
}

resource "aws_route_table_association" "chmurki_vpc_route_table_association" {
  subnet_id      = aws_subnet.chmurki_vpc_public_subnet.id
  route_table_id = aws_route_table.chmurki_vpc_route_table.id
}

resource "aws_route_table_association" "chmurki_vpc_route_table_association_2" {
  subnet_id      = aws_subnet.chmurki_vpc_public_subnet_2.id
  route_table_id = aws_route_table.chmurki_vpc_route_table.id
}

resource "aws_security_group" "chmurki_sg" {
  name        = "Chmurki_sgSecurity Group"
  vpc_id      = aws_vpc.chmurki_vpc.id
}

resource "aws_vpc_security_group_egress_rule" "chmurki_sg_egress_all" {
  security_group_id = aws_security_group.chmurki_sg.id

  cidr_ipv4   = "0.0.0.0/0"
  ip_protocol = "-1"
}

resource "aws_vpc_security_group_ingress_rule" "chmurki_sg_ingress_ssh" {

  security_group_id = aws_security_group.chmurki_sg.id

  cidr_ipv4   = "0.0.0.0/0"
  ip_protocol = "tcp"
  from_port   = 22
  to_port     = 22
}

resource "aws_vpc_security_group_ingress_rule" "chmurki_sg_ingress_http" {

  security_group_id = aws_security_group.chmurki_sg.id

  cidr_ipv4   = "0.0.0.0/0"
  ip_protocol = "tcp"
  from_port   = 80
  to_port     = 80
}

resource "aws_vpc_security_group_ingress_rule" "chmurki_sgg_ingress_backend" {
  security_group_id = aws_security_group.chmurki_sg.id

  cidr_ipv4   = "0.0.0.0/0"
  ip_protocol = "tcp"
  from_port   = 3000
  to_port     = 3000
}


resource "aws_vpc_security_group_ingress_rule" "chmurki_sgg_ingress_frontend" {
  security_group_id = aws_security_group.chmurki_sg.id

  cidr_ipv4   = "0.0.0.0/0"
  ip_protocol = "tcp"
  from_port   = 5173
  to_port     = 5173
}
