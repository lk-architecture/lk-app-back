import {hostname} from "os";

export const NODE_ENV = process.env.NODE_ENV || "development";
export const PORT = process.env.PORT || 3000;
export const HOSTNAME = process.env.HOSTNAME || "localhost";
export const HOST = `${HOSTNAME}:${PORT}`;

export const SERVER_ID = `lk-app-back@${hostname()}`;
export const AWS_CLOUDWATCH_GROUP = "lk-app-back";
export const AWS_CLOUDWATCH_STREAM = SERVER_ID;
export const AWS_CLOUDWATCH_REGION = process.env.AWS_CLOUDWATCH_REGION;

export const DYNAMODB_ENVIRONMENTS_TABLE = "lk-environments";
export const DYNAMODB_LAMBDAS_TABLE = "lk-lambdas";
export const DYNAMODB_DEPLOYMENTS_TABLE = "lk-deployments";
