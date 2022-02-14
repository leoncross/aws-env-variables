# aws-env-variables

aws-env-variables is a small utility package that gets environment variables from either AWS Secret Manager or AWS Parameter Store

This package will retrieve secrets from AWS and save them in a `.env` file

## Installation

```
npm install aws-env-variables --save-dev
```

## How to use this package:

```
aws-env-variables

Flag            Example

Type of service, accepts `secretsManager` or `paramStore`
--service        paramStore

To customise the output path of the .env file. Defaults to project directory
--filePath       ./src

To customise the filename of the .env file. Defaults to .env
--fileName       .env.test

to pass the Secret name of the secret stored in the Secret Manager
--secretId      prod/tamagotchi

to pass the SSM Param Store file of all the secrets you with to request
--ssmFile       prod/helloworld
```

## Example of use

```
// AWS Secrets Manager
aws-env-variables --service=secretsManager --secretId=prod/helloworld

// SSM Param Store
aws-env-variables --service=paramStore --ssmFile=./ssmVars.json         

// Custom file path and file names
aws-env-variables --service=secretsManager --secretId=prod/tamagotchi --filePath=./secrets/ --fileName=.env.local

```

# Constructing an SSM File:

This should be a json file that has the KEY as the environment variable key, and the value as the parameter to get from the SSM Parameter Store 

Example below:
```
// ssmVars.json
{
  "TEST_ID": "leon-testing-param-store",
  "EXAMPLE": "asdfstore"
}
```

# Usage:

```
// package.json
...
"scripts": {
    aws-env-variables --service=paramStore --ssmFile=./ssmVars.json
}
```
