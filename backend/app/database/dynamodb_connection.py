import boto3
from botocore.exceptions import ClientError


class DynamoDBConnection:
    def __init__(self):
        self.dynamodb = None

    def get_dynamodb_resource(self):
        if self.dynamodb is None:
            self.dynamodb = boto3.resource(
                "dynamodb",
                region_name="ap-southeast-1",  # Replace with your region
                aws_access_key_id="your-access-key",  # Replace with your key
                aws_secret_access_key="your-secret-key",  # Replace with your secret
            )
        return self.dynamodb
