# Ambulance Management System — Frontend

## About the Project

The Ambulance Management System is a Java Full Stack web application designed to simplify emergency ambulance services. The frontend is developed using React.js and Vite, providing a user-friendly interface for patients, drivers, and administrators. Patients can register, log in, submit emergency requests, and track their request status. Administrators can manage emergency requests and assign available ambulances and drivers, while drivers can view their assigned requests and mark them as completed.

## Technologies Used

- React.js
- JavaScript
- HTML5
- CSS3
- Vite
- Axios
- React Router
- Git and GitHub

## Features

- User registration and login
- Patient dashboard
- Emergency request creation
- Emergency request status tracking
- Driver dashboard
- Admin dashboard
- Ambulance and driver assignment
- Responsive user interface
- Integration with Spring Boot REST APIs

## Prerequisites

- Node.js
- npm
- Ambulance Management System backend

## Installation

Clone the frontend repository:

```bash
git clone https://github.com/Aravind6082/ambulance-management-system_frontend.git
```

Navigate to the project directory:

```bash
cd ambulance-management-system_frontend
```

Install dependencies:

```bash
npm install
```

## Run the Application

Start the development server:

```bash
npm run dev
```

Open the local URL displayed in your terminal. The default Vite address is usually:

http://localhost:5173

## Backend Integration

The frontend communicates with the Spring Boot backend through REST APIs. Ensure the backend is running at `http://localhost:8080` and that the frontend API configuration points to the correct backend address.

## Application Workflow

1. Patients register and log in.
2. Patients create emergency ambulance requests.
3. Administrators view requests and assign available ambulances and drivers.
4. Drivers view assigned requests and complete them.
5. Request status and resource availability are updated.

## Future Enhancements

- Real-time ambulance GPS tracking
- Interactive maps and route optimization
- Emergency notifications
- Enhanced security and role-based access control

## Author

**Aravind Reddy**

## Repository

[Ambulance Management System Frontend](https://github.com/Aravind6082/ambulance-management-system_frontend)
