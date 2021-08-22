echo "Listing all containers"
sudo docker ps --all
echo "Deleting all containers"
sudo docker rm -f $(docker ps -a -q)
echo "Deleting all images"
sudo docker rmi -f $(docker images -a -q)
echo "Pull and run new rs-server-api container"
sudo docker run -d --name rs-server-api -p 3000:3000 resultsquare/rs-server-api:master-5234a61
echo "Pull and run new rcc-webapp container"
docker run -d --name rs-admin-webapp -p 80:80 -e "WEBAPP_FQDN=rcc.resultsquare.pk" -e "API_SERVER_FQDN=3.21.127.241:3000" resultsquare/rcc-webapp:master-b8697c5
