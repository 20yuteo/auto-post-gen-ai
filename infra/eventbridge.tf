resource "aws_cloudwatch_event_rule" "x_post_event_rule" {
  name                = "x_post_event_rule"
  description         = "Trigger Lambda on a schedule"
  schedule_expression = "cron(0 * * * ? *)"
}

resource "aws_cloudwatch_event_target" "lambda_target" {
  rule      = aws_cloudwatch_event_rule.x_post_event_rule.name
  target_id = "lambda"
  arn       = aws_lambda_function.x_post_lambda.arn
}