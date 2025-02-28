Это SPA-приложение на React (Frontend) и Node.js + MongoDB (Backend) для управления расписанием доступа. Позволяет:

Авторизоваться через email и пароль

Просматривать и изменять расписание доступа

Проверять доступ без авторизации

🚀 Технологии

Frontend:

React

React Router

Axios


Backend:

Node.js (Express)

MongoDB (Mongoose)

JWT (jsonwebtoken)

dotenv (для переменных окружения)

📂 Архитектура проекта

Frontend (React):

/src
├── components # Компоненты UI
├── pages # Страницы (Login, Dashboard)
├── services # API-запросы (axios)
├── store # Zustand (глобальное состояние)
├── App.jsx # Корневой компонент
├── main.jsx # Точка входа

Backend (Node.js + Express):

/src
├── config # Конфигурации (MongoDB)
├── controllers # Обработчики API
├── middleware # JWT-авторизация
├── models # Mongoose-схемы
├── routes # Роуты Express
├── server.js # Запуск сервера

⚙️ Установка и запуск

1. Клонирование репозитория

git clone https://github.com/your-repo.git
cd your-repo

2. Установка зависимостей

# Установить backend зависимости

cd backend
npm install

# Установить frontend зависимости

cd ../frontend
npm install

3. Настройка окружения

Создай .env файл в backend/:

PORT=5000
MONGO_URI=mongodb://localhost:27017/access_db
JWT_SECRET=your_secret_key

4. Запуск приложения

# Запуск backend

cd backend
npm start

# Запуск frontend

cd ../frontend
npm run dev

🛠 API Документация

1. Авторизация

POST /auth/login

Body: { "email": "user1@some.com", "password": "user1@some.com" } //забыл сделать для "user2@some.com"

Response: { "token": "jwt_token" }

2. Расписание

GET /schedule

Headers: { Authorization: "Bearer jwt_token" }

Response: { "schedule": { "Monday": ["08:00", "18:00"] } }

PUT /schedule

Headers: { Authorization: "Bearer jwt_token" }

Body: { "schedule": { "Monday": ["08:00", "18:00"] } }

Response: { "message": "Schedule updated" }

3. Проверка доступа без авторизации

GET /access/check-access

Response: { "access": "allowed" } или { "access": "denied" }


