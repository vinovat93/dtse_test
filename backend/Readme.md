# Install project

##Step 1 : 
Create env `docker compose build --no-cache`
##Step 2 : 
Generate fake data `docker-compose run web python3 manage.py migrate && docker-compose run web python3 manage.py generate_fake_data -u 1`
##Step 3 : 
Start containers `docker compose up`
