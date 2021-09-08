import React, { useState } from "react";
import { IJogs } from "../../asyncUserMethod";
import { Filter } from "../Filter/Filter";
import { ModalJog } from "../ModalJog/ModalJog";
import "./Jogs.scss";
interface IJogComponent {
  jogs: IJogs[];
  setJogs(jogs: IJogs[]): void;
  filter: boolean;
}

const Jogs: React.FC<IJogComponent> = (props) => {
  const [modalJog, setModalJog] = useState<boolean>(false);
  const [dateFrom, setDateFrom] = useState<Date>();
  const [dateEnd, setDateEnd] = useState<Date>();

  if (modalJog) {
    return <ModalJog setModalJog={setModalJog} setJogs={props.setJogs} />;
  }

  return (
    <>
      {props.filter ? (
        <Filter
          dateFrom={dateFrom}
          setDateFrom={setDateFrom}
          dateEnd={dateEnd}
          setDateEnd={setDateEnd}
        />
      ) : (
        ""
      )}
      <div className="container__jogs">
        {props.jogs
          .filter((item: IJogs) => {
            if (item.date && item.date > 0) {
              if (item.date && dateFrom && dateEnd) {
                return (
                  item.date * 1000 >= dateFrom?.getTime() &&
                  item.date * 1000 <= dateEnd?.getTime()
                );
              } else if (item.date && dateFrom) {
                return item.date * 1000 >= dateFrom?.getTime();
              } else if (item.date && dateEnd) {
                return item.date * 1000 <= dateEnd?.getTime();
              } else {
                return item;
              }
            }
          })
          .map((item: IJogs) => (
            <div key={item.id} className="jogs__item">
              <img src="../images/icon.png" alt="icon" />
              <div className="jogs__information">
                <p className="jog__date">
                  {item.date
                    ? new Date(item.date * 1000)
                        .toISOString()
                        .replace(/T().*$/, " $1")
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
    </>
  );
};

export { Jogs };
