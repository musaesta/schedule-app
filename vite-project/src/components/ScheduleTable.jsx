import { useState, useEffect, useContext } from "react";
import { fetchSchedule, updateSchedule } from "../services/api";
import { AuthContext } from "../context/AuthContext";

const ScheduleTable = () => {
  const { token } = useContext(AuthContext);
  const [schedule, setSchedule] = useState(null);
  const [editedSchedule, setEditedSchedule] = useState({});

  useEffect(() => {
    if (token) {
      fetchSchedule(token)
        .then((data) => {
          setSchedule(data);
          setEditedSchedule(data);
        })
        .catch(console.error);
    }
  }, [token]);

  const handleChange = (day, index, value) => {
    setEditedSchedule((prev) => ({
      ...prev,
      [day]: prev[day].map((time, i) => (i === index ? value : time)),
    }));
  };

  const handleSave = async () => {
    await updateSchedule(token, editedSchedule);
    setSchedule(editedSchedule);
  };

  return (
    <div>
      <h2>Редактируемое расписание</h2>
      {schedule &&
        Object.entries(schedule).map(([day, times]) => (
          <div key={day} style={{ marginBottom: "10px" }}>
            <strong>{day}: </strong>
            <select
              value={editedSchedule[day][0]}
              onChange={(e) => handleChange(day, 0, e.target.value)}
            >
              {generateTimeOptions()}
            </select>
            -
            <select
              value={editedSchedule[day][1]}
              onChange={(e) => handleChange(day, 1, e.target.value)}
            >
              {generateTimeOptions()}
            </select>
          </div>
        ))}
      <button onClick={handleSave}>Сохранить изменения</button>
    </div>
  );
};

// Генерация списка временных опций (00:00 - 23:30 с шагом 30 минут)
const generateTimeOptions = () => {
  const options = [];
  for (let h = 0; h < 24; h++) {
    for (let m = 0; m < 60; m += 30) {
      const time = `${String(h).padStart(2, "0")}:${String(m).padStart(
        2,
        "0"
      )}`;
      options.push(
        <option key={time} value={time}>
          {time}
        </option>
      );
    }
  }
  return options;
};

export default ScheduleTable;
