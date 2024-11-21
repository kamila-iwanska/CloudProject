import { CognitoJwtVerifier } from "aws-jwt-verify";
import { addUserToDB } from "./database.js";

const verifier = CognitoJwtVerifier.create({
  userPoolId: process.env.COGNITO_POOL_ID,
  tokenUse: "access",
  clientId: process.env.COGNITO_CLIENT_ID,
});
  
export async function extractUser(c){
  const authorization = c.req.header('Authorization')
  if (!authorization) {
    console.log("No token provided");
    return null
  }
  const token = authorization.replace('Bearer ', '')

  try {
    const payload = await verifier.verify(token);
    console.log("Token is valid. Payload:",{sub: payload.sub, username: payload.username});
    await addUserToDB(payload.sub, payload.username)
    return { sub: payload.sub, username: payload.username }
  } catch {
    console.log("Token is invalid");
    return null
  }
}