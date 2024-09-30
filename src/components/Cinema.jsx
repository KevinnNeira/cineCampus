import React from 'react';
import flecha from '../../public/arrow-right.svg';
import zoom from '../../public/Cine-Club.jpg';
import menu from '../../public/more-vertical.svg'
import reproduce from '../../public/Polygon 1.svg'
import caster from '../../public/Ellipse 208.svg'
import { useLocation } from 'react-router-dom';

export const Cinema = () => {
  const location = useLocation();
  const movie = location.state?.movie;
console.log(movie)
  return (
    <>
      <div className='mainContainerCinema'>
        <div className='container__header'>
          <div className="arrow__container">
            <a href="/homeapp">
              <img id='arrow__image' src={flecha} />
            </a>
          </div>
          <div className="title__container">
            <strong id='title'>Cinema Selection</strong>
          </div>
          <div className="menu_container">
            <img id='image__menu' src={menu} />
          </div>
        </div>
        <div className="imagecontainer">
          <img id='image__front__page' src={movie?.portada} alt={movie?.nombre} />
        </div>
        <div className="movie-card">
          <div className="movie-header">
            {movie?.nombre}
            <button className="trailer-button"><img src={reproduce} />Watch Trailer</button>
          </div>
          <div className="movie-genre">
            {movie?.genero}
          </div>
          <div className="movie-description">
            {movie?.sinopsis}
          </div>
          <strong id='titleCast'>Cast</strong>
        </div>

      </div>
      <a href="/SeatBooking">
        <footer className="footer__nav__cinema">
          <ul className="footer__bar__cinema">
            <li>
              <strong id='title__footer'>Book now</strong>
            </li>
          </ul>
        </footer>
      </a>
    </>
  );
};

export default Cinema;
