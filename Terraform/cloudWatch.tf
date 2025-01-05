resource "aws_cloudwatch_metric_alarm" "naughty_messages_queue_alarm" {
    alarm_name = "naughty_messages_queue_alarm"
    namespace = "AWS/SQS"
    metric_name = "NumberOfMessagesSent"
    statistic = "Sum"
    period = 60
    evaluation_periods = 1
    comparison_operator = "GreaterThanOrEqualToThreshold"
    threshold = 4
    dimensions = {
        QueueName = aws_sqs_queue.terraform-backend-lambda-queue.name
    }
    alarm_actions = [aws_sns_topic.alarm_sns.arn]
}
resource "aws_sns_topic" "alarm_sns" {
  name = "alarm_sns"
}

resource "aws_sns_topic_subscription" "alarm_sns_target" {
  topic_arn = aws_sns_topic.alarm_sns.arn
  protocol  = "email"
  endpoint  = "253027@student.pwr.edu.pl"
}