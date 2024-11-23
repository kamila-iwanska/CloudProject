resource "aws_cognito_user_pool" "cognito_user_pool" {
  name = "Projekt1 User Pool"

  password_policy {
    minimum_length    = 6
    require_lowercase = false
    require_uppercase = false
    require_numbers   = false
    require_symbols   = false
  }

  auto_verified_attributes = ["email"]
  verification_message_template {
    default_email_option = "CONFIRM_WITH_LINK"
  }
}

resource "aws_cognito_user_pool_client" "cognito_user_pool_client" {
  name = "Projekt1 User Pool Client"
  user_pool_id = aws_cognito_user_pool.cognito_user_pool.id
  explicit_auth_flows = ["ALLOW_USER_PASSWORD_AUTH", "ALLOW_REFRESH_TOKEN_AUTH"]
}

resource "aws_cognito_user_pool_domain" "cognito_user_pool_domain" {
  domain = "my-jamniczek-domain"
  user_pool_id = aws_cognito_user_pool.cognito_user_pool.id
}

output "COGNITO_POOL_ID" {
  value = aws_cognito_user_pool.cognito_user_pool.id
}

output "COGNITO_CLIENT_ID" {
  value = aws_cognito_user_pool_client.cognito_user_pool_client.id
}