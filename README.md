# aws-env-variables

aws-env-variables is a small utility package that gets environment variables from either AWS Secret Manager or AWS Parameter Store

This package will retrieve secrets from AWS and save them in a `.env` file


[![Codacy Badge](https://app.codacy.com/project/badge/Grade/f701f47664a44534aca7232bf3247f45)](https://www.codacy.com/gh/leoncross/aws-env-variables/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=leoncross/aws-env-variables&amp;utm_campaign=Badge_Grade)
[![npm version](https://badge.fury.io/js/aws-env-variables.svg)](https://badge.fury.io/js/aws-env-variables)

## Installation

```
npm install aws-env-variables --save-dev
```

## Prerequisite
This utility package authenticates with AWS through environment variables.

Ensure you have these set, see example below:

```
$ export AWS_ACCESS_KEY_ID=AKIAIOSFODNN7EXAMPLE
$ export AWS_SECRET_ACCESS_KEY=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
$ export AWS_DEFAULT_REGION=us-west-2
```
For more help with this, see the [AWS User guide](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-envvars.html)

## How to use this package
### Options

```
aws-env-variables

Flag            Example

To customise the output path of the .env file. Defaults to project directory
--filePath       ./src

To customise the filename of the .env file. Defaults to .env
--fileName       .env.test

to pass the Secret name of the secret stored in the Secret Manager
--secretsManagerId      prod/tamagotchi

to pass the SSM Param Store file of all the secrets you with to request
--paramStoreFileName       prod/helloworld
```

### Example of use

```
// AWS Secrets Manager
aws-env-variables --secretsManagerId=prod/helloworld

// SSM Param Store
aws-env-variables --paramStoreFileName=./ssmVars.json         

// Custom file path and file names
aws-env-variables --secretsManagerId=prod/tamagotchi --filePath=./secrets/ --fileName=.env.local

```

## Constructing an SSM File
This should be a json file that has the key as the environment variable key, and the value as the parameter to get from the SSM Parameter Store 

Example below:
```
// ssmVars.json
{
  "TEST_ID": "leon-testing-param-store",
  "EXAMPLE": "another-aws-secret-name"
}

// produces:
// .env

TEST_ID=supersecretresultfromaws
EXAMPLE=topsecretdata
```

## Usage
Using pre-deployment scripts:
```
// package.json
...
"scripts": {
    aws-env-variables --paramStoreFileName=./ssmVars.json
}
```

## Extending usage to better handle environment variables
Using scripts and environment variables
Extension of usage using the [config](https://www.npmjs.com/package/config) package:

[GitHub - demo-environment-variables](https://github.com/leoncross/demo-environment-variables)
