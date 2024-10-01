import React, { useState } from 'react';
import flecha from '../../public/arrow-right.svg';
import menu from '../../public/more-vertical.svg';
import bar from '../../public/Group 18102.svg';

export const SeatBooking = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedDay, setSelectedDay] = useState('Fri 17');
  const [selectedTime, setSelectedTime] = useState('13:00');
  const pelicula_id = "66d05a83b06d8dfb19429685";
  const fecha = new Date();

  const seats = [
    ['A1', 'A2', 'A3', 'A4', 'A5', 'A6'],
    ['B1', 'B2', 'B3', 'B4', 'B5', 'B6'],
    ['C1', 'C2', 'C3', 'C4', 'C5', 'C6'],
    ['D1', 'D2', 'D3', 'D4', 'D5', 'D6'],
    ['E1', 'E2', 'E3', 'E4', 'E5', 'E6']
  ];

  const reservedSeats = ['A1', 'B3', 'C4'];

  const handleSeatClick = (seat) => {
    setSelectedSeats(prevSelectedSeats => {
      const updatedSeats = prevSelectedSeats.includes(seat)
        ? prevSelectedSeats.filter(s => s !== seat)
        : [...prevSelectedSeats, seat];

      return updatedSeats;
    });
  };

  const handleReserveSeats = async () => {
    const hora_inicio = selectedTime;

    try {
      const response = await fetch('http://localhost:3000/reserveSeats', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ pelicula_id, fecha, hora_inicio, asientosSeleccionados: selectedSeats }),
      });

      if (!response.ok) {
        throw new Error('Error al procesar la reserva');
      }

      const data = await response.json();
      alert(data.message);
    } catch (error) {
      console.error('Error:', error);
      alert('Error al procesar la reserva');
    }
  };

  return (
    <>
      <div className='container__header__seat'>
        <div className="arrow__container">
          <a href="/cinema">
            <img id='arrow__image__seat' src={flecha} alt="Back" />
          </a>
        </div>
        <div className="title__container">
          <strong id='title__seat'>Cinema Selection</strong>
          <img id='image__bar' src={bar} alt="Bar" />
        </div>
        <div className="menu_container">
          <img id='image__menu__seat' src={menu} alt="Menu" />
        </div>
      </div>
      <div className="seat-booking">
        <SeatSelector
          seats={seats}
          reservedSeats={reservedSeats}
          selectedSeats={selectedSeats}
          onSeatClick={handleSeatClick}
        />
        <DateSelector selectedDay={selectedDay} setSelectedDay={setSelectedDay} />
        <TimeSelector selectedTime={selectedTime} setSelectedTime={setSelectedTime} />
        <TicketPrice price={`$${(selectedSeats.length * 24.99).toFixed(2)}`} />
        <button className="buy-button" onClick={handleReserveSeats}>
          Buy ticket
        </button>
      </div>
    </>
  );
};

const SeatSelector = ({ seats, reservedSeats, selectedSeats, onSeatClick }) => {
  return (
    <div className="seat-selector">
      {seats.map((row, rowIndex) => (
        <div className="seat-row" key={rowIndex}>
          {row.map((seat) => (
            <button
              key={seat}
              className={`seat ${reservedSeats.includes(seat) ? 'reserved' : selectedSeats.includes(seat) ? 'selected' : 'available'}`}
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
      <h5>{price}</h5>
    </div>
  );
};

export default SeatBooking;
