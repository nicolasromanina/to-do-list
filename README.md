# To-Do List Application

A full-stack task management application with a Spring Boot backend and a React + TypeScript + Vite frontend.

![App Screenshot](frontend/public/screenshot.png) <!-- Replace with your actual screenshot -->

## Features

### Backend (Spring Boot)
- **REST API** for CRUD operations on tasks
- MongoDB integration for data persistence
- Input validation and error handling
- CORS configuration for frontend communication
- API endpoints:
  - Create, read, update, and delete tasks
  - Filter tasks by status/due date
  - Search tasks by title/description

### Frontend (React + TypeScript + Vite)
- Modern UI with responsive design
- View tasks in list/card layouts
- Add new tasks with form validation
- Edit existing tasks
- Mark tasks as complete/in progress
- Filter tasks by status (All/Completed/In Progress)
- Sort tasks by due date/creation date
- Error handling and loading states
- Local state management with Context API

## Technologies

### Backend
- **Java 21**
- Spring Boot 3.x
- Spring Data MongoDB
- Lombok
- Spring Validation
- Maven

### Frontend
- React 18
- TypeScript
- Vite
- Axios (HTTP client)
- React-Bootstrap (UI components)
- React Icons
- CSS Modules

### Database
- MongoDB

### Tools
- Postman (API testing)
- VS Code/IntelliJ IDEA

## Installation & Setup

### Prerequisites
- Java 17+ (Backend)
- Node.js 18+ (Frontend)
- MongoDB 6.0+
- Maven 3.8+

### Backend Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/nicolasromanina/to-do-list.git
   cd todo-list/backend
   ```
2. Install dependencies and build the project:
   ```bash
   mvn clean install
   ```
3. Configure MongoDB and start the service:
   ```bash
   sudo systemctl start mongod
   ```
4. Update `src/main/resources/application.properties` if necessary:
   ```properties
   server.port=8080
   spring.data.mongodb.uri=mongodb://localhost:27017/todolist
   ```
5. Run the backend application:
   ```bash
   mvn spring-boot:run
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create `.env` file from `.env.example`:
   ```env
   VITE_API_BASE_URL=http://localhost:8080/api
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open the application in your browser:
   ```
   http://localhost:5173
   ```

## API Documentation

### Endpoints

| Method | Endpoint         | Description          |
|--------|-----------------|----------------------|
| GET    | /api/tasks      | Get all tasks       |
| POST   | /api/tasks      | Create new task     |
| GET    | /api/tasks/{id} | Get single task     |
| PUT    | /api/tasks/{id} | Update task        |
| DELETE | /api/tasks/{id} | Delete task        |

### Example Request
```bash
curl -X POST http://localhost:8080/api/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Buy groceries",
    "description": "Milk, eggs, bread",
    "dueDate": "2024-03-01"
  }'
```

### Example Response
```json
{
  "id": "65e8a3f1c8b1d84d4f7e3a1d",
  "title": "Buy groceries",
  "description": "Milk, eggs, bread",
  "dueDate": "2024-03-01",
  "status": "Pending",
  "createdAt": "2024-03-05T10:00:00Z"
}
```

## Project Structure

### Backend
```
backend/
├── src/
│   ├── main/
│   │   ├── java/com/dashboard/todo/
│   │   │   ├── config/       # CORS & other configurations
│   │   │   ├── controller/   # REST API controllers
│   │   │   ├── exception/    # Custom exceptions
│   │   │   ├── model/        # Data models
│   │   │   ├── repository/   # MongoDB repositories
│   │   │   └── service/      # Business logic
│   │   └── resources/        # Properties files
└── pom.xml                   # Maven dependencies
```

### Frontend
```
frontend/
├── src/
│   ├── components/     # Reusable UI components
│   ├── context/        # React context providers
│   ├── hooks/          # Custom hooks
│   ├── types/          # TypeScript type definitions
│   ├── utils/          # Utility functions
│   ├── App.tsx         # Main component
│   └── main.tsx        # Entry point
├── public/             # Static assets
└── vite.config.ts      # Vite configuration
```

## Testing

### Backend Tests
```bash
cd backend
mvn test
```

### Frontend Tests
```bash
cd frontend
npm test
```

## Troubleshooting

### Common Issues:
- **CORS Errors:** Ensure backend CORS config matches frontend URL
- **MongoDB Connection:** Verify MongoDB is running on port 27017
- **Dependency Issues:** Run `mvn clean install` and `npm install`

## Contributing
1. Fork the repository
2. Create your feature branch:
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. Commit your changes:
   ```bash
   git commit -m 'Add some amazing feature'
   ```
4. Push to the branch:
   ```bash
   git push origin feature/amazing-feature
   ```
5. Open a Pull Request

## License
Distributed under the MIT License. See `LICENSE` for more information.

