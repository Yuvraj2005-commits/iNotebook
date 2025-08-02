
# 📒 iNotebook

**iNotebook** is a MERN-stack web application that allows users to securely create, view, and manage their personal notes online. It features user authentication, note creation, editing, deletion, and categorization with a clean and responsive UI.

## 🚀 Tech Stack

### 🖥️ Frontend
- **React.js** — Component-based user interface
- **Bootstrap 5** — For responsive design and layout
- **Custom CSS** — For additional styling enhancements

### 🔧 Backend
- **Node.js** — Runtime environment
- **Express.js** — Web framework for handling API routes

### 💾 Database
- **MongoDB** — NoSQL database for storing:
  - User credentials (email & password, securely hashed)
  - Notes (title, content, tags, timestamps)

## ✨ Features

- 🔐 User Authentication (Signup/Login/Logout)
- 📝 Create, Read, Update, Delete (CRUD) Notes
- 🔍 Search and Filter Notes
- 🏷️ Tag Management
- 📱 Responsive Design (Mobile & Desktop)
- 📁 Grid and List Views for Notes
- ⚙️ Logout and Session Handling

## 📸 UI Preview

![iNotebook UI]

## 📦 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/inotebook.git
   cd inotebook
   ```

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   npm start
   ```

3. **Setup Frontend**
   ```bash
   cd frontend
   npm install
   npm start
   ```

4. **Environment Variables**
   Create a `.env` file in your backend folder with:
   ```
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

## 📁 Project Structure

```
inotebook/
├── backend/
│   ├── routes/
│   ├── models/
│   ├── controllers/
│   └── ...
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.js
│   │   └── ...
│   └── ...
└── README.md
```

## 🔐 Security Notes
- Passwords are hashed using `bcrypt`
- Authentication is done using `JWT`
- Sensitive data is managed using environment variables

## 🛠️ Future Improvements

- Note sharing with others
- Rich text formatting for notes
- Dark mode support
- Note reminders or notifications

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you'd like to change.
