# Ambulance Management System — Frontend

## About the Project
The Ambulance Management System Frontend is developed using React.js and Vite. It provides a user-friendly interface for patients, ambulance drivers, and administrators to interact with the ambulance management platform. The frontend communicates with the Spring Boot backend through REST APIs to display information and manage emergency requests.

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
- User registration and login interface
- Patient dashboard
- Emergency request submission
- Emergency request status tracking
- Driver dashboard for assigned requests
- Admin dashboard for managing emergency requests
- Ambulance and driver assignment interface
- Responsive dashboard styling
- Backend communication using Axios

## Project Structure
```text
frontend/
├── public/
├── src/
│   ├── components/
│   ├── context/
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── PatientDashboard.jsx
│   │   ├── DriverDashboard.jsx
│   │   └── AdminDashboard.jsx
│   ├── services/
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── package-lock.json
└── vite.config.js
```

## Prerequisites
- Node.js
- npm
- A running instance of the Ambulance Management System backend

## Installation
Open CMD or a terminal inside the frontend folder.

Install dependencies:

```cmd
npm install
```

## How to Run
Start the development server:

```cmd
npm run dev
```

Open the URL displayed in the terminal. By default, Vite commonly uses:

`http://localhost:5173`

## Backend Configuration
Ensure the Spring Boot backend is running at:

`http://localhost:8080`

If the backend URL is configured in a frontend service file, update it there when using a different server address.

## Application Workflow
1. A patient registers and logs in.
2. The patient submits an emergency request with pickup and destination locations.
3. The administrator views pending requests and assigns an available ambulance and driver.
4. The driver views the assigned request and completes it.
5. The system updates the request status and restores ambulance and driver availability.

## Future Enhancements
- Live ambulance location tracking
- Interactive maps and route visualization
- Real-time notifications
- Enhanced responsive design
- Improved authentication and route protection

## Author
**Aravind Reddy**

## Repository
[Ambulance Management System Frontend](https://github.com/Aravind6082/ambulance-management-system_frontend)
