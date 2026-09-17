# bp-monitoring

## Tech Stack
* Frontend: ReactJs
* Backend: Java Spring Boot
* Database: PostgreSQL

🩸 BP Monitoring System

A full-stack Blood Pressure Monitoring System built with
React.js, Spring Boot, and PostgreSQL. The application
allows users to record blood pressure readings and retrieve a patient's
recorded BP history through REST APIs.
🚀 Features

    Add blood pressure records for a patient.

    Search and retrieve BP records using Patient ID.

    Delete an existing BP record.

    Store patient BP data in PostgreSQL.

    RESTful backend API using Spring Boot.

    Responsive frontend built with React.js.

    Docker-based backend deployment.

    Render deployment configuration using render.yaml.

🛠️ Technologies Used

    Frontend

        React.js

        JavaScript

        HTML5

        CSS3

        Vite

        REST API

    Backend

        Java 17

        Spring Boot

        Spring Data JPA

        Hibernate

        Maven

        REST API

    Database

        PostgreSQL

    Deployment

        Docker

        Render

📁 Project Structure    
        BP-MONITORING/
    ├── backend/
    │   ├── src/
    │   │   └── main/
    │   │       ├── java/
    │   │       └── resources/
    │   │           └── application.properties
    │   ├── pom.xml
    │   ├── Dockerfile
    │   └── mvnw
    │
    ├── frontend/
    │   ├── src/
    │   ├── public/
    │   ├── package.json
    │   └── vite.config.js
    │
    ├── render.yaml
    ├── README.md
    └── .gitignore
🔌 Backend API

    The backend runs locally on:

    http://localhost:8080    

Add BP Record

POST /api/bp

Example JSON:

{
  "patientId": "1001",
  "bpValue": "120/80"
} 

Get All BP Records

GET /api/bp

Get Patient BP Records

GET /api/bp/patient/{patientId}

Example:

GET /api/bp/patient/1001    

Delete BP Record

DELETE /api/bp/{id}

Example:

DELETE /api/bp/1

💻 Run the Backend Locally

Go to the backend directory:

cd backend

Run the Spring Boot application:

./mvnw spring-boot:run

On Windows:

mvnw.cmd spring-boot:run

The backend will be available at:

http://localhost:8080

🌐 Run the Frontend Locally

Open another terminal and go to the frontend directory:

cd frontend

Install dependencies:

npm install

Start the development server:

npm run dev

Vite will display the local frontend URL, usually:

http://localhost:5173

🗄️ PostgreSQL Configuration

For local development, create a PostgreSQL database named:

bp_database

The application uses the DATABASE_URL environment variable for the
database connection.

Example:

spring.datasource.url=${DATABASE_URL}
spring.datasource.driver-class-name=org.postgresql.Driver

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=false

server.port=${PORT:8080}

Do not commit database passwords or other secrets to GitHub.

☁️ Render Deployment

The project includes a render.yaml Blueprint configuration for
deployment.

The deployment contains:

Backend: Spring Boot Docker Web Service

Frontend: React/Vite Static Site

Database: PostgreSQL

The backend receives the PostgreSQL connection through:

envVars:
  - key: DATABASE_URL
    fromDatabase:
      name: bp-database
      property: connectionString

After deployment, update the frontend API environment variable with the
deployed backend URL:

VITE_API_URL=https://your-backend-url

The frontend uses:

const API_URL = `${import.meta.env.VITE_API_URL}/api/bp`;

🔐 Environment Variables

Backend

DATABASE_URL=your_postgresql_connection_string
PORT=8080

Frontend

VITE_API_URL=http://localhost:8080

For production, replace the local backend URL with the deployed Render
backend URL.

🔄 Application Flow

React Frontend
      │
      │ HTTP / REST API
      ▼
Spring Boot Backend
      │
      │ Spring Data JPA
      ▼
PostgreSQL Database

📌 Future Improvements

User authentication and authorization.

Blood pressure charts and graphical reports.

Date and time tracking for readings.

Input validation for systolic and diastolic values.

Patient profile management.

Pagination for large numbers of records.

Improved dashboard and reporting features.

👨‍💻 Author

Sakthi S

GitHub: https://github.com/sakthi-04

📄 License

This project is available under the license included in this repository.
