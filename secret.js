// Use this code snippet in your app.
// Load the AWS SDK
var AWS = require("aws-sdk"),
    endpoint = "https://secretsmanager.us-east-1.amazonaws.com",
    region = "us-east-1",
    secretName = "RDS_PASSWORD",
    secret,
    binarySecretData;

// Create a Secrets Manager client
var client = new AWS.SecretsManager({
    endpoint: endpoint,
    region: region
});

client.getSecretValue({ SecretId: secretName }, function(err, data) {
    if (err) {
        if (err.code === "ResourceNotFoundException")
            console.log(
                "The requested secret " + secretName + " was not found"
            );
        else if (err.code === "InvalidRequestException")
            console.log("The request was invalid due to: " + err.message);
        else if (err.code === "InvalidParameterException")
            console.log("The request had invalid params: " + err.message);
    } else {
        // Decrypted secret using the associated KMS CMK
        // Depending on whether the secret was a string or binary, one of these fields will be populated
        if (data.SecretString !== "") {
            secret = data.SecretString;
        } else {
            binarySecretData = data.SecretBinary;
        }
    }

    // Your code goes here.
});
