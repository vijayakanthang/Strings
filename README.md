# 🧵 Strings – Minimalist Social Media Platform

**Strings** is a clean, text-focused social media platform that encourages open expression through short posts – similar to platforms like Twitter, Threads, or Reddit. Users can sign up, log in, view profiles, and share what's on their minds.

🔗 **Live Demo**: [strings-social.vercel.app](https://strings-social.vercel.app/)
📁 **GitHub Repo**: [Strings (Frontend + Backend)](https://github.com/vijayakanthang/Strings)

---

## 🚀 Features

* 🔐 **JWT Authentication** – Secure login and signup system
* 🧑‍💻 **User Profiles** – View your own and others' profiles
* ✍️ **Text-based Posts** – Share updates, thoughts, or threads
* 📜 **Feed View** – See all recent posts in a unified feed
* 🛏️ **Navigation** – Clean and intuitive navigation between pages
* ⚙️ **Responsive Design** – Works well on both desktop and mobile

---

## 🛠️ Tech Stack

### 💻 Frontend

* **React.js**
* **Axios** (API calls)
* **React Router DOM**
* **Vite** (for fast development)
* **Custom CSS**

### 🌐 Backend

* **Node.js** + **Express.js**
* **MongoDB** + **Mongoose**
* **JWT** (Authentication)
* **bcrypt** (Password hashing)
* **CORS**, **dotenv**, etc.

---

## 🗂️ Folder Structure

```
strings/
🔹 backend/
│   └── src/
│       ├── controllers/
│       ├── models/
│       ├── routes/
│       └── index.js
🔹 web/
    ├── public/
    └── src/
        ├── components/
        ├── pages/
        ├── stylesheet/
        └── main.jsx
```

---

## 🧪 Setup Instructions

### 🔧 Backend

```bash
cd backend
npm install
npm run dev
```

> Make sure to set up your `.env` file with:

```
PORT=8080
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### 🌐 Frontend

```bash
cd web
npm install
npm run dev
```

> Create a `.env` file in `web/`:

```
VITE_API_BASE_URL=http://localhost:8080
```

---

## ✨ Future Improvements

* 🔄 Post editing/deletion
* 💬 Comments & replies
* ❤️ Reactions/likes
* 🔍 Search and filtering
* 📸 Media upload support

---

## 🧑‍💻 Author

Made with ❤️ by [Vijayakanthan G](https://github.com/vijayakanthang)

---
