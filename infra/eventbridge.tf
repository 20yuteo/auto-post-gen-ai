resource "aws_cloudwatch_event_rule" "example_rule" {
  name                = "example_event_rule"
  description         = "Trigger Lambda on a schedule"
  schedule_expression = "rate(5 minutes)"
}

resource "aws_cloudwatch_event_target" "lambda_target" {
  rule      = aws_cloudwatch_event_rule.example_rule.name
  target_id = "lambda"
  arn       = aws_lambda_function.example_lambda.arn
}