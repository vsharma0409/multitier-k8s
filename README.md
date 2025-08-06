Link For Code Repository - https://github.com/vsharma0409/multitier-k8s.git

Service tier - Docker Hub Image URL - https://hub.docker.com/r/vinay0409/nagp-2025-api

Database tier - Docker Hub Image URL - https://hub.docker.com/_/postgres

URL for Service API tier to view the records from backend tier -http://35.188.94.57/items

Note: The above mentioned url uses the external endpoint for Ingress.
If it does not work its because the cluster is stopped on GCP. Kindly contact me in case required.


How to populate the database with initial data: 
There are two following ways in which database can be populated with initial data
 
1.After the database deployment is done run the following commands from the cloud shell inside the cluster:

kubectl exec -it db-stateful-0 -- bash

psql -U vinay -d nagp-db -c " CREATE TABLE items ( id SERIAL PRIMARY KEY, name VARCHAR(255), price DECIMAL(10, 2) ); INSERT INTO items (name, price) VALUES ('Item 1', 3.99), ('Item 2', 4.99), ('Item 3', 5.99), ('Item 4', 1.99), ('Item 5', 2.99), ('Item 6', 7.99), ('Item 7', 8.99), ('Item 8', 9.99), ('Item 9', 1.99), ('Item 10', 6.99); "

or

2.Using a convenience API endpoint created for this assignment in Service tier which can be run once to populate the Database. This requires both the database and service tier to be deployed. This uses the external endpoint for Service tier - http://35.188.94.57/populatedb


The database and service tier deployment is done using Google kubernetes Engine (GKE) in Google cloud platform

Steps to deploy Database and Service tier:

Create and Connect to GCP cluster in the cloud shell inside GKE.
Upload all the files in the K8s folder in the code repository using the cloud shell.
Apply the db-config and db-secret.
Apply the db-pvc.
Apply the db-stateful-deployment and db-headless-service.
Apply the api-deployment and api-service.
Provision the nginx ingress controller-> kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.13.0/deploy/static/provider/cloud/deploy.yaml
Apply the app-ingress.
Populate the database with initial data.
