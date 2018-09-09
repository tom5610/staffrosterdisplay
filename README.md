# Intro
A private serverless API service demo with:
* Private API Gateway
* Lambda function
* VPC Endpoint

# Properties Configuration

Please make sure update properties before kick off any deployment.

* API module with serverless framework - ./api/serverless.yml
  * region: AWS Region
* Playbook general configuration - ./playbooks/vars/main.yml
	* AWSAccountId: AWS Account ID
	* APIGatewayName: API Gateway Name
	* EndpointStackName: VPC endpoint CloudFormation stack name
	* Region: AWS Region
* VPC Endpoint configuration - ./playbooks/vpcendpoint/vars/main.yml
  * VPCId: Target VPC ID
	* NumberOfAZs: number of AZs for VPC Endpoints deployment
	* SubnetIdList: subnet id list (please don't include any space and it must match with NumberOfAZs)
	* EndpointIngressCIDR: VPC Endpoint security group ingress rule source CIDR.

# Deployment Steps

## Deploy Serverless API

* Install node.js v8.10.0
* Install serverless package
* Setup environment variables or aws cli profile
 * AWS_ACCESS_KEY_ID
 * AWS_SECRET_ACCESS_KEY
 * or aws configure
* Deploy API
```
cd ./api
npm install
sls deploy
```

## Deploy VPC Endpoint

* Install Ansible > v2.5
* Install latest jq & awscli
* Deploy AWS VPC Endpoint
```
cd ./playbooks
ansible-playbook deploy-vpc-endpoint.yml -vvv
```

## Deploy Resource Policy for the API Gateway

* Deploy Resource Policy
```
cd ./playbooks
ansible-playbook update-apigateway-resource-policy.yml -vvv
```
* To make sure Resource Policy takes effect, please re-deploy api service.

## Test API from private subnet

* Login to an EC2 instance under the VPC
* Run curl command:
```
curl -X GET https://{{VPC_Endpoint_DNS_Name}}/dev/staffrosterdisplay -H'Host:{{API_ID}}.execute-api.ap-southeast-2.amazonaws.com'
```
	* VPC_Endpoint_DNS_Name - You may go to AWS VPC Console -> Endpoints View to find the DNS host name, such as vpce-0371244a9a8a896d1-ty9stt0p.execute-api.ap-southeast-2.vpce.amazonaws.com. Or run a command to find out the name:
	```
	aws ec2 describe-vpc-endpoints
	```
	* API_ID - You may go to API Gateway Console -> Select the created API and you can find the API Gateway ID. Or run a command to find out the ID:
	```
	aws apigateway get-rest-apis
	```
* Surely, if your on-prem connects to the VPC, you can run the test command on the a on-prem host.

## Notes
* The running environment is at my MacBook Pro and the test script is running on EC2 Amazon Linux instance.

## Reference Link

* [Introducing Amazon API Gateway Private Endpoints](https://aws.amazon.com/blogs/compute/introducing-amazon-api-gateway-private-endpoints/)
