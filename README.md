# Complaint Management System

A full-stack Complaint Management System built with **Spring Boot** and **React (Vite)**.  
It supports role-based access for **users** and **admins**, JWT authentication, complaint tracking, file uploads, real-time notifications, analytics, and AI-assisted complaint handling.

## Features

### Authentication
- User registration and login
- Role-based access control (`USER`, `ADMIN`)
- JWT token authentication
- Email verification
- Forgot password / reset password

### User Features
- Create complaints
- Select department while creating a complaint
- Attach files (PNG, JPG, JPEG, PDF)
- View own complaints
- Search and paginate complaints
- View complaint details
- View complaint timeline
- Add comments

### Admin Features
- View complaints assigned to their department
- Filter complaints by status and priority
- Assign and resolve complaints
- View complaint timelines
- AI reply assistance
- Analytics dashboard
- Real-time complaint notifications

### UI / UX
- Modern responsive dashboard layout
- Dark mode support
- Glassmorphism-inspired auth pages
- Animated background effects
- Sidebar and navbar navigation
- Live notification panel
- Admin assistant chat panel

## Tech Stack

### Frontend
- React
- Vite
- Tailwind CSS
- React Router
- Axios / Fetch API
- Chart.js
- react-chartjs-2
- react-hot-toast
- lucide-react
- framer-motion

### Backend
- Spring Boot
- Spring Security
- JWT
- Spring Data JPA
- Spring Web
- WebSocket / STOMP
- Java Mail Sender

### Database
- H2 (development)
- MySQL-ready structure

## Project Structure

```text
src/
├── components/
├── pages/
├── services/
├── App.jsx
└── index.css
```

## Main Pages

- `Login`
- `Register`
- `ForgotPassword`
- `VerifyAccount`
- `ResetPassword`
- `UserDashboard`
- `AdminDashboard`
- `CreateComplaint`
- `MyComplaints`
- `ComplaintDetails`
- `AdminComplaints`
- `AdminAnalytics`
- `Profile`

## Backend Highlights

- Role-based authentication with JWT
- Complaint creation and tracking
- Department-based complaint routing
- Complaint activity timeline
- Complaint comments
- Real-time notifications through WebSocket
- AI-assisted categorization and replies

## Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/your-username/complaint-management-system.git
cd complaint-management-system
```

### 2. Start the backend
Open the Spring Boot project and run it from your IDE, or use:

```bash
mvn spring-boot:run
```

### 3. Start the frontend
Go to the React project folder and install dependencies:

```bash
npm install
npm run dev
```

## Environment Variables

### Frontend
Create a `.env` file if needed and configure the backend URL.

```env
VITE_API_BASE_URL=http://localhost:8081
```

### Backend
Configure application properties as needed:

```properties
server.port=8081
spring.datasource.url=jdbc:h2:file:./data/complaintdb
spring.datasource.username=sa
spring.datasource.password=
spring.jpa.hibernate.ddl-auto=update
```

## API Features

### Authentication
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/verify/{token}`
- `POST /api/auth/forgot-password`
- `POST /api/auth/reset-password/{token}`

### Complaints
- `POST /api/user/complaints`
- `GET /api/user/complaints`
- `GET /api/admin/complaints`
- `PUT /api/admin/complaints/{id}/assign`
- `PUT /api/admin/complaints/{id}/resolve`
- `GET /api/complaints/{id}/timeline`

## Screenshots

Add screenshots of:
- Login page
- Register page
- User dashboard
- Admin dashboard
- Complaint details page

## Future Enhancements

- PDF/Excel complaint reports
- SMS notifications
- Advanced AI suggestions
- Complaint drag-and-drop board
- Mobile app version

## License

This project is for learning and portfolio purposes.

## Author

Developed by **Aditya Gnan Sharma**
