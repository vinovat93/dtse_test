# Install project

##Steps to config backend side

######Screen record for setup : https://chetaflorinalexandru-gmail.tinytake.com/msc/OTgzMjkyNF8yMzQ4NDczMw
######Screen record with the app : https://chetaflorinalexandru-gmail.tinytake.com/msc/OTgzMjk2Ml8yMzQ4NDgwMA 

###Step 1 :
Go to backend  folder `cd backend`
###Step 2 : 
Create env `docker compose build --no-cache`
###Step 3 : 
Run migrations `docker-compose run web-dtse python manage.py migrate`
###Step 4 : 
Start containers `docker compose up`


##Steps to config frontend side

###Step 1 :
Go to frontend  folder `cd frontend`
###Step 2 : 
Create env `docker compose build --no-cache`
###Step 3 : 
Start containers `docker compose up`