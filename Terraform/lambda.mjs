import { SQSClient, SendMessageCommand } from "@aws-sdk/client-sqs";



export async function handler(event) {
  console.log("Received event:", JSON.stringify(event, null, 2));
  const body = JSON.parse(event.Records[0].body);
  const message = body.message;
  await sleep(5000)
  if (/[0-9]/.test(message)) {
    console.log("Message contains a number");
    const client = new SQSClient({ region: "us-east-1" });
    await client.send(new SendMessageCommand({QueueUrl: process.env.FROM_LAMBDA_TO_BACKEND_QUEUE_URL,  MessageBody: JSON.stringify(body)}))
  }
  return event;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
} 

