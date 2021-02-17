import * as cdk from "@aws-cdk/core";
import * as cloudfront from "@aws-cdk/aws-cloudfront";
import * as s3 from "@aws-cdk/aws-s3";
import * as s3Deploy from "@aws-cdk/aws-s3-deployment";

export class CdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // S3:
    const bucket = new s3.Bucket(this, "Bucket", {
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    // Deployment:
    const src = new s3Deploy.BucketDeployment(this, "Deployment", {
      sources: [s3Deploy.Source.asset("../build")],
      destinationBucket: bucket,
    });

    // Allow CF to access the S3 bucket:
    const oai = new cloudfront.OriginAccessIdentity(
      this,
      "OriginAccessIdentity",
      {}
    );

    // Cloudfront:
    const cf = new cloudfront.CloudFrontWebDistribution(this, "Distribution", {
      originConfigs: [
        {
          s3OriginSource: {
            s3BucketSource: bucket,
            originAccessIdentity: oai,
          },
          behaviors: [{ isDefaultBehavior: true }],
        },
      ],
    });
  }
}
