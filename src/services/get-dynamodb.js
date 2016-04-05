import {DynamoDB} from "aws-sdk";
import {promisifyAll} from "bluebird";

import {NODE_ENV} from "config";

export default function getDynamodb (options) {
    const dynamodb = (
        NODE_ENV === "production" ?
        new DynamoDB.DocumentClient({
            apiVersion: "2012-08-10",
            accessKeyId: options.accessKeyId,
            secretAccessKey: options.secretAccessKey,
            region: options.region
        }) :
        new DynamoDB.DocumentClient({
            apiVersion: "2012-08-10",
            accessKeyId: "accessKeyId",
            secretAccessKey: "secretAccessKey",
            endpoint: "http://localhost:8000",
            region: "us-west-1"
        })
    );
    return promisifyAll(dynamodb);
}
