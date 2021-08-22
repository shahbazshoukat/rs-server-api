echo "*****Listing all containers*****"
sudo docker ps --all
echo "*****Deleting container with name=rs-server-api*****"
sudo docker rm -f $(sudo docker ps --filter name=rs-server-api)
echo "*****Listing all images*****"
sudo docker images
echo "*****Deleting images with reference=resultsquare/rs-server-api:latest*****"
sudo docker rmi -f $(sudo docker images --filter reference=resultsquare/rs-server-api:latest)
echo "*****Pull and run new rs-server-api container*****"
sudo docker run -d --name rs-server-api -p 3000:3000 resultsquare/rs-server-api:latest
echo "*****Closing the connection with ec2 instance*****"
exit
