import getS3 from "services/aws";

export const path = "/buckets";
export const method = "post";
export const description = "Create a new S3 buckets";
export const parameters = [{
    name: "bucket",
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
            s3bucketName: {
                description: "AWS S3 bucket name",
                type: "string"
            }
        },
        additionalProperties: false,
        required: [
            "awsAccessKeyId",
            "awsSecretAccessKey",
            "awsRegion",
            "s3bucketName"
        ]
    }
}];
export const responses = {
    "200": {
        description: "S3 bucket created"
    }
};
export async function handler (req, res) {
    const {
        awsAccessKeyId,
        awsSecretAccessKey,
        awsRegion,
        s3bucketName
    } = req.body;

    const s3 = getS3({
        accessKeyId: awsAccessKeyId,
        secretAccessKey: awsSecretAccessKey,
        region: awsRegion
    });

    await s3.createBucketAsync({
        Bucket: s3bucketName
    });

    res.status(200).send();
}
