# 🏥 MediConnect – Multi-Clinic Digital Healthcare Platform

MediConnect is a full-stack healthcare management system that allows multiple clinics to register, manage patients, and handle appointments digitally.

It supports:

- 👤 Patient Registration & Login
- 🏥 Clinic/Hospital Login
- 📅 Appointment Booking System
- 🧾 Appointment History Tracking
- 🔐 Secure Authentication (JWT Ready)
- 🧑‍⚕ Multi-Tenant Clinic Architecture

---

## 🚀 Live Features

### 👨‍⚕ Patient Side
- Register / Login
- View Clinics
- Book Appointment
- Select Doctor & Time Slot
- View Appointment History
- Secure Logout

### 🏥 Clinic Side
- Clinic Registration
- Login Dashboard
- View Appointments
- Manage Patient Visits

---

## 🛠 Tech Stack

### Frontend
- React.js
- React Router DOM
- CSS3
- React Icons
- LocalStorage Authentication

### Backend
- Spring Boot
- REST APIs
- MySQL
- JPA / Hibernate
- Multi-Tenant Data Isolation

---

## 📂 Project Structure

### 📦 Frontend (React)

```
medi-connect-frontend/
│
├── public/
│
├── src/
│   ├── components/
│   │   ├── Navbar/
│   │   │   ├── Navbar.jsx
│   │   │   └── Navbar.css
│   │   │
│   │   ├── ClinicCard.jsx
│   │   ├── Footer.jsx
│   │
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── About.jsx
│   │   ├── Contact.jsx
│   │   ├── Auth.jsx
│   │   ├── OrganizationLogin.jsx
│   │   ├── BookAppointment.jsx
│   │   ├── PatientDashboard.jsx
│   │   ├── OrganizationDashboard.jsx
│   │
│   ├── styles/
│   │   ├── Navbar.css
│   │   ├── Appointment.css
│   │   ├── Dashboard.css
│   │
│   ├── App.js
│   ├── index.js
│
└── package.json
```

---

### 📦 Backend (Spring Boot)

```
medi-connect-backend/
│
├── src/main/java/com/mediconnect/
│
│   ├── controller/
│   │   ├── PatientController.java
│   │   ├── ClinicController.java
│   │   ├── AppointmentController.java
│   │
│   ├── service/
│   │   ├── PatientService.java
│   │   ├── ClinicService.java
│   │   ├── AppointmentService.java
│   │
│   ├── repository/
│   │   ├── PatientRepository.java
│   │   ├── ClinicRepository.java
│   │   ├── AppointmentRepository.java
│   │
│   ├── entity/
│   │   ├── Patient.java
│   │   ├── Clinic.java
│   │   ├── Appointment.java
│   │
│   ├── dto/
│   │   ├── AppointmentRequestDTO.java
│   │   ├── LoginRequestDTO.java
│   │
│   └── MediConnectApplication.java
│
├── src/main/resources/
│   ├── application.properties
│
└── pom.xml
```

---

## 🔐 Authentication Flow

1. User logs in
2. Backend validates credentials
3. Frontend stores:
   - `user`
   - `patientId`
4. Protected pages check localStorage
5. Logout clears localStorage

---

## 📅 Appointment Booking Flow

1. Patient selects clinic
2. Select doctor
3. Select time slot
4. Select date
5. Data sent to backend
6. Appointment stored in database
7. Redirect to dashboard

---

## 🧠 Architecture Design

- Multi-tenant clinic support
- Role-based access (Patient / Clinic)
- Secure booking validation
- Frontend protected routes
- Backend REST APIs

---

## 🏗 Installation Guide

### Frontend

```bash
cd medi-connect-frontend
npm install
npm start
```

Runs on:
```
http://localhost:3000
```

---

### Backend

```bash
cd medi-connect-backend
mvn spring-boot:run
```

Runs on:
```
http://localhost:8080
```

---

## 🌐 API Endpoints

| Method | Endpoint | Description |
|--------|----------|------------|
| POST | /api/patients/login | Patient Login |
| POST | /api/clinics/login | Clinic Login |
| GET | /mediconnect/all | Get All Clinics |
| POST | /api/appointments/book | Book Appointment |

---

## 🎯 Future Improvements

- JWT Authentication
- Spring Security
- Email Notifications
- SMS Alerts
- Doctor Availability System
- Admin Panel
- Payment Integration

---

## 👨‍💻 Developed By

**A. Anand Raju**  
3rd Year CSE  
G. Pulla Reddy Engineering College  

GitHub: (Add your link here)

---

## 📜 License

This project is developed for educational and hackathon purposes.