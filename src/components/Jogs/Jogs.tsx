import React from "react";
import { IJogs } from "../../asyncUserMethod";
interface IJogComponent {
  jogs: IJogs[];
}

const Jogs: React.FC<IJogComponent> = (props) => {
  return (
    <div className="container">
      {props.jogs.map((item: IJogs) => (
        <div key={item.id}>{item.time}</div>
      ))}
    </div>
  );
};

export { Jogs };
