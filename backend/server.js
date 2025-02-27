const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");

const app = express();
const port = 3000;

// Используем cors
app.use(cors());

// Парсим JSON в теле запроса
app.use(bodyParser.json());

// Пример пользователей (без хеширования пароля)
const users = [
  { email: "user1@some.com", password: "user1@some.com" },
  { email: "user2@some.com", password: "user2@some.com" },
];

// Расписание доступа
let accessSchedule = {
  Monday: { start: "00:00", end: "24:00" },
  Tuesday: { start: "00:00", end: "24:00" },
  Wednesday: { start: "00:00", end: "24:00" },
  Thursday: { start: "00:00", end: "24:00" },
  Friday: { start: "00:00", end: "24:00" },
  Saturday: { start: "00:00", end: "24:00" },
  Sunday: { start: "00:00", end: "24:00" },
};

// Авторизация
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const user = users.find((user) => user.email === email);

  if (!user) return res.status(404).send("User not found");

  if (user.password !== password)
    return res.status(401).send("Invalid password");

  const token = jwt.sign({ email: user.email }, "secret_key", {
    expiresIn: "1h",
  });
  res.send({ token });
});

// Получение расписания доступа
app.get("/schedule", (req, res) => {
  res.json(accessSchedule);
});

// Изменение расписания доступа (только для авторизованных пользователей)
app.put("/schedule", (req, res) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) return res.status(403).send("Authorization required");

  jwt.verify(token, "secret_key", (err, decoded) => {
    if (err) return res.status(403).send("Invalid or expired token");

    const { day, start, end } = req.body;
    if (accessSchedule[day]) {
      accessSchedule[day] = { start, end };
      res.json({ message: "Schedule updated successfully" });
    } else {
      res.status(400).send("Invalid day");
    }
  });
});

// Простой метод для проверки доступа
app.get("/access", (req, res) => {
  const { day, currentTime } = req.query;

  if (!day || !currentTime)
    return res.status(400).send("Day and time are required");

  const isAccessAllowed = (day, currentTime) => {
    const schedule = accessSchedule[day];
    return currentTime >= schedule.start && currentTime <= schedule.end;
  };

  if (isAccessAllowed(day, currentTime)) {
    res.send({ message: "Access allowed" });
  } else {
    res.status(403).send({ message: "Access denied" });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
