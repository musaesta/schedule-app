import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { logout } from "../services/authService"; // Ваш сервис для logout
import styles from "./SchedulePage.module.css";

const SchedulePage = () => {
  const [schedule, setSchedule] = useState([]); // Массив расписания
  const [error, setError] = useState(""); // Ошибка
  const navigate = useNavigate(); // Для навигации

  // Загружаем расписание при первом рендере компонента
  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const token = localStorage.getItem("token"); // Берем токен из LocalStorage
        const response = await axios.get("http://localhost:3000/schedule", {
          headers: {
            Authorization: `Bearer ${token}`, // Передаем токен в заголовке
          },
        });
        const scheduleArray = Object.entries(response.data).map(
          ([day, { startTime, endTime }]) => ({
            day,
            startTime,
            endTime,
          })
        );
        setSchedule(scheduleArray); // Сохраняем полученные данные в состоянии
      } catch (err) {
        setError(err, "Ошибка загрузки расписания"); // В случае ошибки
      }
    };

    fetchSchedule();
  }, []);

  // Обработчик изменения времени
  const handleChange = async (day, startTime, endTime) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        "http://localhost:3000/schedule", // Отправляем PUT запрос на сервер
        { day, start: startTime, end: endTime },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Передаем токен для авторизации
          },
        }
      );

      // Обновляем состояние с измененным временем
      setSchedule((prev) =>
        prev.map((item) =>
          item.day === day ? { day, start: startTime, end: endTime } : item
        )
      );
    } catch (err) {
      setError(err, "Ошибка обновления расписания"); // В случае ошибки
    }
  };

  // Обработчик выхода из системы
  const handleLogout = () => {
    logout();
    navigate("/"); // Перенаправляем на главную страницу
  };

  return (
    <div className={styles.container}>
      <h2>Расписание</h2>
      {error && <p>{error}</p>}
      <button className={styles.logout} onClick={handleLogout}>
        Выйти
      </button>
      <ul className={styles.list}>
        {schedule.map(({ day, start, end }) => (
          <li className={styles.item} key={day}>
            <strong>{day}</strong>
            <input
              type="time"
              onChange={(e) => handleChange(day, e.target.value, end)}
            />
            <input
              type="time"
              value={end || ""}
              onChange={(e) => handleChange(day, start, e.target.value)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SchedulePage;
