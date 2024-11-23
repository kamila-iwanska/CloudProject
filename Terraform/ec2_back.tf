resource "aws_instance" "chmurki_ec2_back" {

  ami                    = "ami-0866a3c8686eaeeba" # Ubuntu Server 24.04 LTS 64-bit (x86)
  instance_type          = "t2.micro"
  vpc_security_group_ids = [aws_security_group.chmurki_sg.id]
  key_name               = "vockey"
  tags = {
    Name = "Chmurki_ec2_back"
  }
}
output "ec2_back_ip" {
  value = aws_instance.chmurki_ec2_back.public_ip
}