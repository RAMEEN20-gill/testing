# Task Management System

A full-featured Task Management System built with **MERN Stack (MongoDB, Express, React, Node.js)**. Includes task sharing, real-time notifications, analytics dashboard, dark mode, and file attachments.

##  Live Demo


📝 Demo Credentials:  
- **Email:** test@example.com  
- **Password:** 123456

---

##  Project Structure

TAILWIND-REACT-TEMPLATE/
│
├── backend/
│ ├── controllers/
│ ├── middleware/
│ ├── models/
│ ├── routes/
│ ├── uploads/
│ ├── server.js
│ └── config/
│
├── frontend/
│ ├── public/
│ ├── src/
│ │ ├── assets/
│ │ ├── components/
│ │ ├── context/
│ │ ├── pages/
│ │ ├── services/
│ │ ├── App.jsx
│ │ └── main.jsx
│ └── tailwind.config.js


##  Features

### ✅ Week 1–3: Core System
- Authentication (Register/Login)
- Create, Read, Update, Delete tasks
- Task filtering and search
- Task progress bar
- Protected routes with JWT
- Backend pagination

### ✅ Week 4: Collaboration & Notifications
- Task sharing between users (`owner`, `sharedWith`)
- Real-time notifications with **Socket.IO**
- Notification dropdown
- API:
  - `PUT /tasks/:id/share`
  - `GET /tasks/shared`
  - `GET /notifications`

### ✅ Week 5: Analytics
- Dashboard overview (total tasks, completed, shared)
- Charts for weekly/monthly task creation
- Pie/Bar charts with **Chart.js**
- Backend endpoints:
  - `GET /analytics/overview`
  - `GET /analytics/trends`

### ✅ Week 6: Final Touches & Deployment
- Manual dark mode toggle
- File attachments for tasks
- Fully responsive UI with Tailwind CSS
- Deployed with **Render (Backend)** and **Vercel (Frontend)**

---

##  Tech Stack

- **Frontend:** React.js, Tailwind CSS, Axios, Chart.js, Socket.IO Client
- **Backend:** Node.js, Express.js, MongoDB, Mongoose, Socket.IO
- **Auth:** JWT + bcrypt
- **File Uploads:** multer
- **Deployment:** Vercel (frontend), Render (backend)

---

##  Installation (Local Setup)

### 1. Clone the Repo

```bash
git clone https://github.com/RAMEEN20-gill/testing.git
cd testing

2. Backend Setup
bash
cd backend
npm install
➕ Create a .env file:
env
 PORT=5000
MONGO_URI=mongodb://localhost:27017/taskmanager
JWT_SECRET=myTOPsecret234
Start Backend
node server.js

3. Frontend Setup
cd ../frontend
npm install
npm run dev
🧪 Testing
Backend tested with Jest + Supertest

Frontend tested with React Testing Library

📊 API Overview
Method	Endpoint	Description
POST	/api/users/register	Register new user
POST	/api/users/login	User login
GET	/api/users/me	Get current user
GET	/api/tasks	Get user tasks
POST	/api/tasks	Create new task
PUT	/api/tasks/:id	Update task
DELETE	/api/tasks/:id	Delete task
PUT	/api/tasks/:id/share	Share task with other users
GET	/api/tasks/shared	Get shared tasks
GET	/api/notifications	Get user notifications
GET	/api/analytics/overview	Get overview data
GET	/api/analytics/trends	Get chart data

📷 Screenshots
🏠 Dashboard

📑 Tasks

📈 Analytics

🌙 Dark Mode

 Author
Rameen Gill


### ✅ What's Included:

- Deployment-ready instructions
- All feature details
- API reference table
- Screenshot placeholders (add actual screenshots in `frontend/public/screens/`)
- Clean, professional structure




