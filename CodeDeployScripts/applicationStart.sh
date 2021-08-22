echo "Connecting to EC2 instance"
ssh -i ../resultsquare.pem ubuntu@3.21.127.241 "sudo bash ./deploy.sh"
