#!/usr/bin/env bash

ECS_REGION='us-east-1'

# Name of the ECR

ECR_NAME1='bot_nodejs'

docker build -t $ECR_NAME1 .

login=`aws ecr get-login --no-include-email --region $ECS_REGION`

#Docker Login to AWS with login data from previous step to push the image
$login


#Create repository to push docker image in AWS
#aws ecr create-repository --repository-name "$ECR_NAME1"
#aws ecr create-repository --repository-name "$ECR_NAME2"
#aws ecr create-repository --repository-name "$ECR_NAME3"
#aws ecr create-repository --repository-name "$ECR_NAME4"

#Create repository to push docker image in AWS
aws ecr create-repository --repository-name "$ECR_NAME1"

aws ecr get-login --no-include-email | sh

# Repository Image(URI) of the ECR
ECR_URI1=`aws ecr describe-repositories --repository-names $ECR_NAME1|grep -i "repositoryUri"|awk -F":" '{print $2}'|awk -F"\"" '{print $2}'`

echo "ECR_URI1 for $ECR_NAME1 --->>> $ECR_URI1"

#Tag your image so you can push the image to this repository
docker tag "$ECR_NAME1:latest" "$ECR_URI1:latest"

#Push the docker image to AWS
echo "Pushing Docker Image to AWS ECS Repository......."
docker push "$ECR_URI1:latest"

echo "ECR_URI1 for $ECR_NAME1 --->>> $ECR_URI1 is pushed into ECR successfully."
