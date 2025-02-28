import { useState } from "react";
import { checkAccess } from "../services/api";

const AccessCheckButton = () => {
  const [accessMessage, setAccessMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleCheckAccess = async () => {
    try {
      const response = await checkAccess();
      setAccessMessage(
        response.access !== "allowed"
          ? "✅ Доступ разрешен!"
          : "⛔ Доступ запрещен!"
      );
    } catch (error) {
      setAccessMessage("⛔ Доступ запрещен!"); // Обрабатываем 403 ошибку
    }
    setShowModal(true);
  };

  return (
    <div>
      <button onClick={handleCheckAccess}>Проверить доступ</button>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <p>{accessMessage}</p>
            <button onClick={() => setShowModal(false)}>Закрыть</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccessCheckButton;
