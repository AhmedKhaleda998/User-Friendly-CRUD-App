A Docker image that hosts a RESTful API for managing person objects. 
The API should allow users to perform CRUD (Create, Read, Update, Delete) operations on person objects.
Each person object should have the following attributes:
• id: A unique identifier for the person object.
• name: The name of the person.
• age: The age of the person.
• gender: The gender of the person.
• email: The email address of the person.

The RESTful API should have the following endpoints:
• GET /persons: Retrieve a list of all person objects.
• POST /persons: Create a new person object.
• GET /persons/{id}: Retrieve a specific person object by its ID.
• PUT /persons/{id}: Update a specific person object by its ID.
• DELETE /persons/{id}: Delete a specific person object by its ID.

The API presents the data to users in a user-friendly way using EJS.
• Display a list of all people in the database
• Allow users to add a new person to the database
• Allow users to update an existing person in the database
• Allow users to delete a person from the database


The API presents the data to users in a user-friendly way using EJS.
• Display a list of all people in the database
• Allow users to add a new person to the database
• Allow users to update an existing person in the database
• Allow users to delete a person from the database

The Dockerfile used to build the Docker image.

// To pull the image from docker hub
$ docker pull ahmedkhaleda/user-friendly-crud

// To build the container of the Node.js use the command
$ docker build -t ahmedkhaleda/user-friendly-crud .

// To start the container
$ docker run 5200:5200 ahmedkhaleda/user-friendly-crud

// Use http://localhost:5200/persons in the URL to open the app 

// To stop the container
$ docker stop CONTAINER_NAME
