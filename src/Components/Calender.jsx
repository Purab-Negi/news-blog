import React, { useState } from 'react';
import './Calender.css';

const Calender = () => {
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthOfYear = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ];

  const currentDate = new Date();
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay(); // Fixed this to getDay()

  const prevMonth = () => {
    setCurrentMonth((prevMonth) => (prevMonth === 0 ? 11 : prevMonth - 1));
    setCurrentYear((prevYear) => (currentMonth === 0 ? prevYear - 1 : prevYear));
  };

  const nextMonth = () => {
    setCurrentMonth((prevMonth) => (prevMonth === 11 ? 0 : prevMonth + 1));
    setCurrentYear((prevYear) => (currentMonth === 11 ? prevYear + 1 : prevYear));
  };

  const emptyDays = [...Array(firstDayOfMonth).keys()]; // Empty days array to fill initial spaces

  return (
    <div className='calender'>
      <div className="navigate-date">
        <h4 className="month">{monthOfYear[currentMonth]}</h4>
        <h4 className="year">{currentYear}</h4>
        <div className="buttons">
          <i className="bx bx-chevron-left" onClick={prevMonth}></i>
          <i className="bx bx-chevron-right" onClick={nextMonth}></i>
        </div>
      </div>

      <div className="weekdays">
        {daysOfWeek.map((day) => (
          <span key={day}>{day}</span>
        ))}
      </div>

      <div className="days">
        {/* Empty days to fill space before the 1st of the month */}
        {emptyDays.map((_, index) => (
          <span key={`empty-${index}`}></span>
        ))}
        {/* Actual days */}
        {[...Array(daysInMonth).keys()].map((day) => (
          <span
            key={day + 1}
            className={day + 1 === currentDate.getDate() && currentMonth === currentDate.getMonth()
              && currentYear === currentDate.getFullYear() ? 'current-date' : ''}
          >
            {day + 1}
          </span>
        ))}
        {[...Array((7 - (emptyDays.length + daysInMonth) % 7) % 7)].map((_, index) => (
          <span key={`trailing-${index}`}></span>
        ))}
      </div>
    </div>
  );
};

export default Calender;
