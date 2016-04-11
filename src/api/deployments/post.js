import {promisify} from "bluebird";
import {exec} from "child_process";
import {stringifyEnvVars} from "lk-lambda-deploy";
import {v4} from "node-uuid";

import * as config from "config";
import {getDynamodb} from "services/aws";
import getGithubRef from "utils/get-github-ref";

const execAsync = promisify(exec);

export const path = "/deployments";
export const method = "post";
export const description = "Create a new deployment";
export const parameters = [{
    name: "deployment",
    in: "body",
    required: true,
    schema: {
        type: "object",
        properties: {
            awsAccessKeyId: {
                description: "AWS access key id",
                type: "string"
            },
            awsSecretAccessKey: {
                description: "AWS secret access key",
                type: "string"
            },
            awsRegion: {
                description: "AWS region",
                type: "string"
            },
            environmentName: {
                description: "Environment name",
                type: "string"
            },
            lambdaName: {
                description: "Lambda name",
                type: "string"
            }
        },
        additionalProperties: false,
        required: [
            "awsAccessKeyId",
            "awsSecretAccessKey",
            "awsRegion",
            "environmentName",
            "lambdaName"
        ]
    }
}];
export const responses = {
    "201": {
        description: "Deployment created"
    }
};
export async function handler (req, res) {
    const {
        awsRegion,
        awsAccessKeyId,
        awsSecretAccessKey,
        environmentName,
        lambdaName
    } = req.body;
    const dynamodb = getDynamodb({
        accessKeyId: awsAccessKeyId,
        secretAccessKey: awsSecretAccessKey,
        region: awsRegion
    });
    const {Item: lambda} = await dynamodb.getAsync({
        TableName : config.DYNAMODB_LAMBDAS_TABLE,
        Key: {
            name: lambdaName,
            environmentName: environmentName
        }
    });
    const githubRef = await getGithubRef(lambda);
    const environmentVariables = stringifyEnvVars(lambda.environmentVariables);
    await execAsync([
        "$(npm bin)/lk-lambda-deploy",
        `--awsAccessKeyId ${awsAccessKeyId}`,
        `--awsSecretAccessKey ${awsSecretAccessKey}`,
        `--awsRegion ${awsRegion}`,
        `--githubRef ${githubRef}`,
        `--lambdaName lk-${lambdaName}-${environmentName}`,
        `--lambdaRole ${lambda.role}`,
        `--environmentVariables "${environmentVariables}"`
    ].join(" "), {stdio: "inherit"});
    const deploymentId = v4();
    await dynamodb.putAsync({
        TableName : config.DYNAMODB_DEPLOYMENTS_TABLE,
        Item: {
            id: deploymentId,
            lambdaName: lambdaName,
            environmentName: environmentName,
            awsRegion: awsRegion,
            githubRef: githubRef,
            lambdaRole: lambda.role,
            environmentVariables: lambda.environmentVariables,
            timestamp: new Date().toISOString()
        }
    });
    res.status(201).send({id: deploymentId});
}
