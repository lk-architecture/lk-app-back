import {DynamoDB, S3} from "aws-sdk";
import {promisifyAll} from "bluebird";

import {NODE_ENV} from "config";

export function getDynamodb (options) {
    const dynamodb = (
        NODE_ENV === "development" ?
        new DynamoDB.DocumentClient({
            apiVersion: "2012-08-10",
            accessKeyId: "accessKeyId",
            secretAccessKey: "secretAccessKey",
            endpoint: "http://localhost:8000",
            region: "us-east-1"
        }) :
         new DynamoDB.DocumentClient({
             apiVersion: "2012-08-10",
             accessKeyId: options.accessKeyId,
             secretAccessKey: options.secretAccessKey,
             region: options.region
         })
    );
    return promisifyAll(dynamodb);
}

export function getS3 (options) {
    const s3 = (
        NODE_ENV === "development" ?
        new S3({
            accessKeyId: "accessKeyId",
            secretAccessKey: "secretAccessKey",
            endpoint: "http://localhost:8000",
            region: "us-east-1"
        }) :
        new S3({
            accessKeyId: options.accessKeyId,
            secretAccessKey: options.secretAccessKey,
            region: options.region
        })
    );
    return promisifyAll(s3);
}
