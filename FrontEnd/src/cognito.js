import { CognitoIdentityProviderClient, SignUpCommand, InitiateAuthCommand } from "@aws-sdk/client-cognito-identity-provider";

const clientId = import.meta.env.VITE_COGNITO_CLIENT_ID;
const client = new CognitoIdentityProviderClient({ region: "us-east-1" });

export function cognitoSignUp(email, username, password) {
  return client.send(new SignUpCommand({
    ClientId: clientId,
    Username: username,
    Password: password,
    UserAttributes: [
      {
        Name: "email",
        Value: email,
      },
    ],
  }));
}

export function cognitoLogin(username, password) {
  return client.send(new InitiateAuthCommand({
    ClientId: clientId,
    AuthFlow: "USER_PASSWORD_AUTH",
    AuthParameters: {
      USERNAME: username,
      PASSWORD: password,
    },
  }));
}
