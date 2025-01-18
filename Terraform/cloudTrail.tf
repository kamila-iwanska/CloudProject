resource "aws_s3_bucket" "s3_bucket"{
    bucket = "s3-bucket-free"
    force_destroy = true
}

data "aws_iam_policy_document" "cloudtrail_policy" {
  statement {
    principals {
        type        = "Service"
        identifiers = ["cloudtrail.amazonaws.com"]
    }

    actions = ["s3:*"]

    resources = [
        aws_s3_bucket.s3_bucket.arn,
        "${aws_s3_bucket.s3_bucket.arn}/*"
    ]
  }
}

resource "aws_s3_bucket_policy" "s3_bucket_policy" {
    bucket = aws_s3_bucket.s3_bucket.bucket
    policy = data.aws_iam_policy_document.cloudtrail_policy.json
}

resource "aws_cloudtrail" "cloudtrail" {
    depends_on = [ aws_s3_bucket_policy.s3_bucket_policy ]

    name = "cloudtrail"
    s3_bucket_name = aws_s3_bucket.s3_bucket.bucket
    s3_key_prefix = "cloudtrail"
}