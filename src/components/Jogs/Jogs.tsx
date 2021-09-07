import React, { useEffect, useState } from "react";
import { IJogs } from "../../asyncUserMethod";
import { ModalJog } from "../ModalJog/ModalJog";
import "./Jogs.scss";
interface IJogComponent {
  jogs: IJogs[];
}

const Jogs: React.FC<IJogComponent> = (props) => {
  const [modalJog, setModalJog] = useState<boolean>(false);

  if (modalJog) {
    return <ModalJog setModalJog={setModalJog} />;
  }

  return (
    <div className="container__jogs">
      {props.jogs.map((item: IJogs) => (
        <div key={item.id} className="jogs__item">
          <img src="../images/icon.png" alt="icon" />
          <div className="jogs__information">
            <p className="jog__date">
              {item.date
                ? `${new Date(item.date).getDate()}.${
                    new Date(item.date).getMonth() + 1
                  }.${new Date(item.date).getFullYear()}`
                : ""}
            </p>
            <p className="jog__speed">
              Speed:
              <span>
                {item.distance && item.time
                  ? Math.round(item.distance / item.time)
                  : ""}
              </span>
            </p>
            <p className="jog__distance">
              Distance: <span>{item.distance}</span>
            </p>
            <p className="jog__time">
              Time: <span>{item.time}</span>
            </p>
          </div>
        </div>
      ))}
      <img
        className="add_jogs_button"
        src="../images/add.png"
        alt="add"
        onClick={() => setModalJog((prev: boolean) => !prev)}
      />
    </div>
  );
};

export { Jogs };
