resource "aws_db_instance" "chmurki_rds" {
  identifier             = "chmurki-rds"
  engine                 = "postgres"
  engine_version         = "14.14"
  instance_class         = "db.t3.micro"
  allocated_storage      = 6 # GB
  db_name                = "chmurki_db"
  username               = "kamila1"
  password               = "jamniczek"
  publicly_accessible    = true
  skip_final_snapshot    = true
  vpc_security_group_ids = [aws_security_group.chmurki_sg_rds.id]
}
resource "aws_security_group" "chmurki_sg_rds" {
  name        = "Chmurki_sg_rds_Security Group"
}

resource "aws_vpc_security_group_egress_rule" "chmurki_sg_rds_egress_all" {
  security_group_id = aws_security_group.chmurki_sg_rds.id

  cidr_ipv4   = "0.0.0.0/0"
  ip_protocol = "-1"
}

resource "aws_vpc_security_group_ingress_rule" "chmurki_sg_rds_ingress_postgres" {

  security_group_id = aws_security_group.chmurki_sg_rds.id

  cidr_ipv4   = "0.0.0.0/0"
  ip_protocol = "tcp"
  from_port   = 5432
  to_port     = 5432
}

output "rds_url" {
  value     = "postgresql://${aws_db_instance.chmurki_rds.endpoint}/chmurki_db?user=kamila1&password=jamniczek"
}