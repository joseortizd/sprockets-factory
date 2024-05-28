# sprockets-factory
# NodeJS Backend Challenge.


## Project Description:
This project focuses on building a REST API for managing data and sprockets within a factory setting.
The API will facilitate functionalities like retrieving all factory data,
obtaining specific factory details using an ID, fetching individual sprockets by ID, creating new sprockets,
and updating existing ones.

## Steps to run the project:
1. Clone the repository
2. Run `npm install`
if you want to run the project in development mode:
3. Run `npm run start:dev`
else if you want to run the project in production mode:
4. Run `npm run start`

The project will run on port 3000 by default.
If you want to change the port, you can do so by changing the value of the PORT variable in the .env file. 
Example of the .env file:
```
PORT=3000
```


### Run project using Docker:
1. Clone the repository
2. Run `docker build -t sprockets-factory .`
3. Run `docker run -p 3000:3000 sprockets-factory`

The project will run on port 3000 by default.


### Required Configurations:

You need to have defined the following environment variables in a .env file at the root of the project:
```
CONNECTION_STRING=...
SPROCKETS_STRATEGY= (MEMORY | SEQUELIZE)
```


