# Overview

This CDK project deploys the yata-web-app to S3 and CloudFormation.

# Setup

1. If you haven't bootstrapped a CDK project in your AWS account:
   `cdk bootstrap`.

# Development & Deployment

## Development

1. Make changes to `.ts` files; `.js` files are generated automatically during build.
1. Run `npm run build` to compile.
1. When adding new `@aws-cdk` dependencies makes sure they are the same exact
   version as the others or else you'll have problems.

## Deployment

If you are making changes to the web app in the parent directory you will need
to run `npm run build` to build a production build first before deploying.

1. Make changes in this directory.
1. Make sure it builds with `npm run build`.
1. Deploy it with `cdk deploy`.
1. Go to the CloudFront console, locate your distribution, and view it's URL.

## TODO

1. Add tests.
