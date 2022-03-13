## Build

Run `mvn clean install` to build the project. Maven will build both Java and Angular stuff.

## Development

To recreate the database, simply uncomment the line `spring.jpa.hibernate.ddl-auto=create` in `application.properties`.

To populate the database, see `sample_data.sql` in the root directory of the project.

Run `ng serve` for an Angular dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

Run `mvn spring-boot:run` to spin up the backend Java server.

Run `docker-compose:up` to spin up the Database.
