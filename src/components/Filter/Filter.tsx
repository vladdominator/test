import React from "react";
import "./Filter.scss";
import DatePicker from "react-datepicker";

interface IFilter {
  dateFrom?: Date;
  setDateFrom(date: Date): void;
  dateEnd?: Date;
  setDateEnd(date: Date): void;
}

const Filter: React.FC<IFilter> = (props) => {
  return (
    <div className="filter_container">
      <div className="filter__block">
        <div className="filter__f">
          <p className="filter__text"> Date from</p>
          <DatePicker
            locale="en"
            selected={props.dateFrom}
            onChange={props.setDateFrom}
            className="filter__input"
          />
        </div>
        <div className="filter__f">
          <p className="filter__text">Date to</p>
          <DatePicker
            locale="en"
            selected={props.dateEnd}
            onChange={props.setDateEnd}
            className="filter__input"
          />
        </div>
      </div>
    </div>
  );
};

export { Filter };
