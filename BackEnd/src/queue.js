import { SQSClient, SendMessageCommand } from "@aws-sdk/client-sqs";
import { Consumer } from "sqs-consumer";
import { addMessageToDB, getAdminFromDB } from "./database.js";

const client = new SQSClient({ region: "us-east-1" });
// From backend to queue
export async function sendMessagesToQueue(queueUrl, message){
    return client.send(new SendMessageCommand({
        QueueUrl: queueUrl,
        MessageBody: JSON.stringify(message),
    }));
}

// From queue to backend
const consumer = Consumer.create({
    queueUrl: process.env.FROM_LAMBDA_TO_BACKEND_QUEUE_URL,
    handleMessage: async (message) => {
        console.log(message.Body);

        const sent_message = JSON.parse(message.Body).message+ " (message author: "+JSON.parse(message.Body).sender+")";
        const sender = await getAdminFromDB();
        const receiver = sender;
        await addMessageToDB(sent_message, sender, receiver)
    },
});

consumer.on('error', (err) => {
    console.error(err.message);
});

consumer.on('processing_error', (err) => {
    console.error(err.message);
});

consumer.start();
