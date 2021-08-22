echo "Connecting to EC2 instance"
ssh -i ./resultsquare.pem ubuntu@3.21.127.241 "bash ./deploy.sh"
## IP of prod website instance: 3.14.147.229
## IP of prod admin dashboard instance: 3.21.127.241

