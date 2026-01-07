import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3 } from "../config/s3"

export async function getSignedImageUrl(key: string) {
    const command = new GetObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET_NAME!,
        Key: key,
    });

    // URL valid for 60 seconds
    return getSignedUrl(s3, command, { expiresIn: 60 });
}
