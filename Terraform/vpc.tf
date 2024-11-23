resource "aws_security_group" "chmurki_sg" {
  name        = "Chmurki_sgSecurity Group"
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
