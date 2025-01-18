data "aws_iam_role" "lambda_role" {
  name = "LabRole"
}

resource "aws_sqs_queue" "terraform-backend-lambda-queue" {
  name                      = "backend-lambda-queue"
  message_retention_seconds = 3600
  receive_wait_time_seconds = 10

}

resource "aws_sqs_queue" "terraform-lambda-backend-queue" {
  name                      = "lambda-backend-queue"
  message_retention_seconds = 3600
  receive_wait_time_seconds = 10

}

data "archive_file" "lambda" {
    type = "zip"
    source_file = "lambda.mjs"
    output_path = "lambda.zip"
}
resource "aws_lambda_function" "terraform-backend-lambda" {
    filename = "lambda.zip"
    function_name = "terraform-backend-lambda"
    role = data.aws_iam_role.lambda_role.arn
    handler = "lambda.handler"
    source_code_hash = data.archive_file.lambda.output_base64sha256 
    runtime = "nodejs18.x"
    timeout = 10
    reserved_concurrent_executions = 2

    environment {
        variables = {
            FROM_LAMBDA_TO_BACKEND_QUEUE_URL = aws_sqs_queue.terraform-lambda-backend-queue.url
        }
    }
}   

resource "aws_lambda_event_source_mapping" "example" {
  event_source_arn = aws_sqs_queue.terraform-backend-lambda-queue.arn
  function_name    = aws_lambda_function.terraform-backend-lambda.arn
  batch_size       = 1 
}