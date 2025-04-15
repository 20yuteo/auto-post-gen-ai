data "archive_file" "upload_lambda_zip" {
  type        = "zip"
  source_file = "${path.module}/lambda/index.js"
  output_path = "${path.module}/lambda/upload.zip"
}

resource "aws_lambda_function" "example_lambda" {
  function_name    = "example_lambda"
  role             = aws_iam_role.lambda_exec.arn
  handler          = "index.handler"
  runtime          = "nodejs20.x"
  filename         = data.archive_file.upload_lambda_zip.output_path
  source_code_hash = data.archive_file.upload_lambda_zip.output_base64sha256
  environment {
    variables = {
      API_KEY                       = var.API_KEY,
      API_SECRET_KEY                = var.API_SECRET_KEY,
      TOKEN                         = var.TOKEN,
      CLIENT_ID                     = var.CLIENT_ID,
      CLIENT_SECRET                 = var.CLIENT_SECRET,
      ACCESS_TOKEN                  = var.ACCESS_TOKEN,
      ACCESS_TOKEN_SECRET           = var.ACCESS_TOKEN_SECRET,
      GOOGLE_API_KEY                = var.GOOGLE_API_KEY,
      SLACK_BOT_TOKEN               = var.SLACK_BOT_TOKEN,
      SLACK_REFRESH_TOKEN           = var.SLACK_REFRESH_TOKEN,
      SLACK_USER_AUTH_TOKEN         = var.SLACK_USER_AUTH_TOKEN,
      SLACK_BOT_USER_AUTH_TOKEN     = var.SLACK_BOT_USER_AUTH_TOKEN,
      POSTGRES_URL                  = var.POSTGRES_URL,
      POSTGRES_PRISMA_URL           = var.POSTGRES_PRISMA_URL,
      SUPABASE_HOST                 = var.SUPABASE_HOST,
      SUPABASE_USER                 = var.SUPABASE_USER,
      SUPABASE_PASSWORD             = var.SUPABASE_PASSWORD,
      SUPABASE_DATABASE             = var.SUPABASE_DATABASE,
      SUPABASE_URL                  = var.SUPABASE_URL,
      SUPABASE_ANON_KEY             = var.SUPABASE_ANON_KEY,
      POSTGRES_URL_NON_POOLING      = var.POSTGRES_URL_NON_POOLING,
      SUPABASE_JWT_SECRET           = var.SUPABASE_JWT_SECRET,
      POSTGRES_USER                 = var.POSTGRES_USER,
      POSTGRES_PASSWORD             = var.POSTGRES_PASSWORD,
      POSTGRES_DATABASE             = var.POSTGRES_DATABASE,
      SUPABASE_SERVICE_ROLE_KEY     = var.SUPABASE_SERVICE_ROLE_KEY,
      POSTGRES_HOST                 = var.POSTGRES_HOST,
      NEXT_PUBLIC_SUPABASE_ANON_KEY = var.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      DB_URL                        = var.DB_URL,
      ENV                           = var.ENV,
      NEXT_PUBLIC_API_ENDPOINT      = var.NEXT_PUBLIC_API_ENDPOINT,
      CLERK_SECRET_KEY              = var.CLERK_SECRET_KEY,
    }
  }
}

resource "aws_lambda_permission" "allow_eventbridge" {
  statement_id  = "AllowExecutionFromEventBridge"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.example_lambda.function_name
  principal     = "events.amazonaws.com"
  source_arn    = aws_cloudwatch_event_rule.example_rule.arn
}