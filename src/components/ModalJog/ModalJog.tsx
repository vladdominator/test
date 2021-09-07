import React from "react";
import "./ModalJog.scss";

interface IModalJog {
  setModalJog(bool: boolean): void;
}

const ModalJog: React.FC<IModalJog> = () => {
  return <div className="modal__jog_container"></div>;
};

export { ModalJog };
