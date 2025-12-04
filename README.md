SpringBootTodo
A full-stack Todo List application featuring a secure REST API backend built with Spring Boot and a lightweight frontend using vanilla HTML, CSS, and JavaScript.

This project demonstrates secure user authentication using JWT (JSON Web Tokens), CRUD operations for managing tasks, and integration with a PostgreSQL database.

.>Features
User Authentication: Secure Registration and Login API using JWT.

Todo Management: Create, Read, Update (mark as complete), and Delete tasks.

Security: Stateless authentication with Spring Security.

Database: Persistent data storage using PostgreSQL.

Frontend: Responsive and clean UI to interact with the API.

API Documentation: Integrated with OpenAPI/Swagger.

.>Tech Stack
Backend

Java: 24 (Configured in pom.xml)

Framework: Spring Boot 3.5.3

Database: PostgreSQL

Security: Spring Security, JWT (jjwt)

Build Tool: Maven

Frontend

HTML5, CSS3, JavaScript (Fetch API)

⚙️ Prerequisites
Before you begin, ensure you have the following installed:

Java Development Kit (JDK) (Version 24 or compatible)

Maven

PostgreSQL

.>Installation & Setup
1. Database Setup
Open your PostgreSQL client (e.g., pgAdmin, DBeaver, or command line).

Create a new database named tododb:

SQL

CREATE DATABASE tododb;
(Note: The application is configured to connect to tododb on port 5432 with username postgres and password 1234. Update src/main/resources/application.properties if your credentials differ.)

2. Backend Setup
Navigate to the TodoBackend directory:

Bash

cd TodoBackend
Install dependencies and build the project:

Bash

mvn clean install
Run the application:

Bash

mvn spring-boot:run
The backend server will start at http://localhost:8080.

3. Frontend Setup
Navigate to the TodoFrontend directory.

Since the frontend uses simple HTML files, you can open them directly in a browser.

Open login.html to start.

Note: The frontend script.js is configured to look for the backend at http://localhost:8080. Ensure the backend is running before using the frontend.

.> API Documentation
Once the backend application is running, you can access the interactive API documentation (Swagger UI) at:

Swagger UI: http://localhost:8080/swagger-ui.html or http://localhost:8080/swagger-ui/index.html

Key Endpoints
Authentication

POST /auth/register: Register a new user (email, password).

POST /auth/login: Login to receive a JWT token.

Todo Operations (Requires Authorization: Bearer <token> header)

GET /api/v1/todo: Get all todos for the logged-in user.

GET /api/v1/todo/{id}: Get a specific todo.

POST /api/v1/todo/create: Create a new todo.

PUT /api/v1/todo: Update an existing todo.

DELETE /api/v1/todo/{id}: Delete a todo.

📁 Project Structure
├── TodoBackend              # Spring Boot Server
│   ├── src/main/java        # Java Source Code
│   │   ├── controller       # REST Controllers (Auth, Todo)
│   │   ├── models           # JPA Entities (User, Todo)
│   │   ├── repository       # Data Access Layer
│   │   ├── service          # Business Logic
│   │   ├── utils            # Utility classes (JwtUtil)
│   │   ├── SecurityConfig   # Spring Security & CORS config
│   │   └── TodoApplication  # Main Entry Point
│   └── src/main/resources   # Config files (application.properties)
│
└── TodoFrontend             # Client-side UI
    ├── login.html           # Login Page
    ├── register.html        # Registration Page
    ├── todos.html           # Main Dashboard
    ├── script.js            # API Integration Logic
    └── style.css            # Styling
🛡️ Security Note
This project uses a hardcoded JWT secret key in JwtUtil.java for demonstration purposes. For a production environment, always store secrets securely (e.g., in environment variables) and use a strong, generated key.
