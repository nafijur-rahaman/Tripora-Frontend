#  Tripora – Travel Package Management

A **full-stack travel package management system** with **Node.js, Express, MongoDB, Firebase**, and **React + Tailwind CSS** for a modern, responsive, and secure booking platform.

---

## 🚀 Features

- User authentication with **Firebase**
- CRUD operations for **travel packages**
- **Package booking management**
- **Category management**
- Token-protected APIs for secure access
- Responsive **frontend with React + Tailwind CSS**
- Smooth animations using **Framer Motion**
- Interactive carousels with **React Slick**

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas |
| Authentication | Firebase Admin SDK |
| Frontend | React, Tailwind CSS, Axios, React Router |
| Animations & UI | Framer Motion, Lucide React, React Icons, SweetAlert2, React Slick |

---

## 🌐 Frontend Setup

### 1. Installation

#### Clone the repository and install dependencies:

```bash
git clone https://github.com/nafijur-rahaman/Tripora-Frontend.git
cd Tripora-Frontend
npm install
```


### Environment Variables
#### Create a .env file in the root directory with the following variables:

```bash
VITE_API_URL=http://localhost:5000
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

```

### Run Frontend
#### Start the development server:

```bash
npm run dev

```
## 📂 Backend Setup


## Installation
### Follow these steps to get the project up and running:

1. **Clone the repository**

```bash
git clone https://github.com/nafijur-rahaman/Tripora-Backend.git
cd Tripora-Backend
```

2. **Install dependencies**

```bash
npm install
```

3. **Run The Project**

```bash
npm start
```

> Make sure you have Node.js and npm installed on your system.


4. **Create .env file**

```bash
PORT=5000
DB_USER=your_mongodb_user
DB_PASS=your_mongodb_password
DB_NAME=triporaDB

FIREBASE_PROJECT_ID=your_project_id
FIREBASE_PRIVATE_KEY=your_private_key
FIREBASE_CLIENT_EMAIL=your_client_email

```
## API Endpoints

### Public Routes


| Method | Endpoint    | Description                |
| :-------- | :------- | :------------------------- |
| `GET` | `/` | **check for the server** |
| `GET` | `/api/get_all_packages/` | **Fetch all travel packages** |
| `GET` | `/api/categories` | **Fetch all travel categories** |


### Protected Routes (require Firebase token in Authorization header)



##  API Endpoints

| Method | Endpoint | Description | Parameters |
|--------|---------|-------------|------------|
| POST   | `/api/create_package/` | Create a new package | N/A |
| GET    | `/api/get_limited_packages/` | Fetch 6 packages | N/A |
| GET    | `/api/get_package/:id` | Fetch a single package by ID | `id` **string** - **Required**. ID of the package to fetch |
| GET    | `/api/get_user_packages/` | Get all packages created by a user | N/A |
| PUT    | `/api/update_package/:id` | Update a package by ID | `id` **string** - **Required**. ID of the package to update |
| DELETE | `/api/delete_package/:id` | Delete a package by ID | `id` **string** - **Required**. ID of the package to delete |
| POST   | `/api/book_package/` | Book a package | N/A |
| PUT    | `/api/update_booking/:id` | Update booking status to completed | `id` **string** - **Required**. ID of the booking to update |
| DELETE | `/api/delete_booking/` | Delete a booking | `id` **string** - **Required**. ID of the booking to delete |
| GET    | `/api/get_all_bookings` | Get all bookings for a guide | N/A |



## 📧 Contact

**Author:** Md. Nafijur Rahaman  

**GitHub:** [nafijur-rahaman](https://github.com/nafijur-rahaman)  

**Email:** [tanjidnafis@gmail.com](mailto:tanjidnafis@gmail.com)

