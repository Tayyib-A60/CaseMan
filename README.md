# API

# System Requirements to run the app
    - dotnet core 2.1.8
    - MSSQL Server

# Getting Started
    - Change the value for Server to your sql server instance in appsettings.Development.json and appsetting.json file
    - cd into Api directory and run `dotnet restore` on the terminal
    - run dotnet ef database update to update the database with the initial migrations in the Migrations directory
    - Once restore is completed run dotnet run / dotnet watch run
    - Once the app is up and running the Api documentation can be found in https://localhost:5001/swagger/index.html

# Notable Considerations
    - Admin user created to review any case submitted 

    - FallBackController was added to handle routing error once the SPA is built into the webroot path of the api

# CLIENT

# Requirements
    - node (version 10.0 up)

# First Steps
    - run npm i from the Client directory
    - run ng serve (default port is 4200) <optionally run ng serve --port $PORT (e.g 3000)>
