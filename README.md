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
3. Run `docker run -p 3000:3000 -it sprockets-factory`
4. Run `node ./config/init.js` to create the database and tables. (Only if you want to use postgres database)

The project will run on port 3000 by default.


### Required Configurations for running locally on a docker container:

You need to have defined the following environment variables in a .env file at the root of the project:

If you want to use a postgres database, you need to define the following environment variables:
```
SPROCKETS_STRATEGY=SEQUELIZE
FACTORIES_STRATEGY=SEQUELIZE
DB_PASSWORD=
DB_NAME=sprockets_factory
DB_USER=
DB_HOST=
DB_PORT=5432
```
> [!TIP]
> If you need to change the database name, please update the file ./config/init.sql and set the new database name.

If yoy want to use a memory database, you don't need to define the environment variables.

### In case you need to mount a container with a docker postgres and run the project on docker too you must:
1. Create the .env file with the following environment variables:
```
SPROCKETS_STRATEGY=SEQUELIZE
FACTORIES_STRATEGY=SEQUELIZE
DB_PASSWORD=
DB_NAME=sprockets_factory
DB_USER=
DB_HOST=postgres
DB_PORT=5432
```
2. Run the following command to run docker-compose:
```
docker-compose up
```
3. The project will run on port 3000 by default, wait until is ready.

### Others Commands:
- Run tests: `npm run test`
- Run lint: `npm run lint`
- Start development server: `npm run start:dev`

### API Documentation:
Postman collection is insede docs/collection folder
