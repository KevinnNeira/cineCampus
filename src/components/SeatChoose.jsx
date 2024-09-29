import React, { useState } from 'react';

export const SeatBooking = () => {
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [selectedDay, setSelectedDay] = useState('Fri 17');
  const [selectedTime, setSelectedTime] = useState('13:00');

  const seats = [
    ['A1', 'A2', 'A3', 'A4', 'A5', 'A6'],
    ['B1', 'B2', 'B3', 'B4', 'B5', 'B6'],
    ['C1', 'C2', 'C3', 'C4', 'C5', 'C6'],
    ['D1', 'D2', 'D3', 'D4', 'D5', 'D6'],
    ['E1', 'E2', 'E3', 'E4', 'E5', 'E6']
  ];

  const reservedSeats = ['A1', 'B3', 'C4'];

  const handleSeatClick = (seat) => {
    setSelectedSeat(seat);
  };

  return (
    <div className="seat-booking">
      <SeatSelector seats={seats} reservedSeats={reservedSeats} selectedSeat={selectedSeat} onSeatClick={handleSeatClick} />
      <DateSelector selectedDay={selectedDay} setSelectedDay={setSelectedDay} />
      <TimeSelector selectedTime={selectedTime} setSelectedTime={setSelectedTime} />
      <TicketPrice price="$24.99" />
    </div>
  );
};
const SeatSelector = ({ seats, reservedSeats, selectedSeat, onSeatClick }) => {
  return (
    <div className="seat-selector">
      {seats.map((row, rowIndex) => (
        <div className="seat-row" key={rowIndex}>
          {row.map((seat) => (
            <button
              key={seat}
              className={`seat ${reservedSeats.includes(seat) ? 'reserved' : selectedSeat === seat ? 'selected' : 'available'}`}
              onClick={() => !reservedSeats.includes(seat) && onSeatClick(seat)}
              disabled={reservedSeats.includes(seat)}
            >
              {seat}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};
const DateSelector = ({ selectedDay, setSelectedDay }) => {
  const days = ['Fri 17', 'Sat 18', 'Sun 19', 'Mon 20', 'Tue 21'];

  return (
    <div className="date-selector">
      {days.map((day) => (
        <button
          key={day}
          className={`day ${selectedDay === day ? 'active' : ''}`}
          onClick={() => setSelectedDay(day)}
        >
          {day}
        </button>
      ))}
    </div>
  );
};
const TimeSelector = ({ selectedTime, setSelectedTime }) => {
  const times = ['13:00', '15:45', '18:50', '20:30'];

  return (
    <div className="time-selector">
      {times.map((time) => (
        <button
          key={time}
          className={`time ${selectedTime === time ? 'active' : ''}`}
          onClick={() => setSelectedTime(time)}
        >
          {time}
        </button>
      ))}
    </div>
  );
};
const TicketPrice = ({ price }) => {
  return (
    <div className="ticket-price">
      <p>Price</p>
      <h2>{price}</h2>
      <button className="buy-button">Buy ticket</button>
    </div>
  );
};

export default SeatBooking;
