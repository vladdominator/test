import React, {
  ButtonHTMLAttributes,
  InputHTMLAttributes,
  useState,
} from "react";
import { asyncUserMethod, IJogs } from "../../asyncUserMethod";
import "./ModalJog.scss";

interface IModalJog {
  setModalJog(bool: boolean): void;
  setJogs(jogs: IJogs[]): void;
}

const ModalJog: React.FC<IModalJog> = (props) => {
  const [date, setDate] = useState<string>("");
  const [distance, setDistance] = useState<string>("");
  const [time, setTime] = useState<string>("");

  const handleJog = async (e: React.MouseEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("distance", distance);
    formData.append("date", date);
    formData.append("time", time);
    try {
      if (token) {
        const data = await fetch(
          "https://jogtracker.herokuapp.com/api/v1/data/jog",
          {
            method: "POST",
            body: formData,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }
      if (token) {
        const [userData,jogsData] = await asyncUserMethod(token);
        props.setJogs(
          jogsData.filter((item: IJogs) => item.user_id == userData.response.id)
        );
        setDate("");
        setDistance("");
        setTime("");
        props.setModalJog(false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="modal__jog_container">
      <img
        className="cancel__modal"
        src="../images/cancel.svg"
        alt="cancel"
        onClick={() => props.setModalJog(false)}
      />
      <form action="POST">
        <div className="distance_cont">
          <p>Distance</p>
          <input
            type="text"
            className="distance__input"
            value={distance}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setDistance(e.target.value)
            }
          />
        </div>
        <div className="time_cont">
          <p>Time</p>
          <input
            type="text"
            className="time__input"
            value={time}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setTime(e.target.value)
            }
          />
        </div>
        <div className="date_cont">
          <p>Date</p>
          <input
            type="date"
            className="date__input"
            value={date}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setDate(e.target.value)
            }
          />
        </div>
        <button
          className="save__jog"
          onClick={handleJog}
          disabled={date && time && distance ? false : true}
        >
          Save
        </button>
      </form>
    </div>
  );
};

export { ModalJog };
