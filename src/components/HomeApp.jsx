import React, { useEffect, useState, useRef } from 'react';
import image__profile from '../../public/profileImage.svg';
import campana from '../../public/Campana.svg';
import lupa from '../../public/lupa.png';
import menuPuntos from '../../public/menu.svg';
import Home from '../../public/Frame 3.svg';
import zoom from '../../public/Frame 4.svg';
import ticket from '../../public/Frame 5.svg';
import profile from '../../public/Frame 6.svg';
import { useNavigate } from 'react-router-dom';

export const Homme = () => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    fetch('http://localhost:3000/getMovie')
      .then(response => response.json())
      .then(data => setMovies(data))
      .catch(error => console.error('Error fetching movies:', error));
  }, []);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = scrollContainerRef.current.scrollWidth / 1.89;
    }
  }, [movies]);

  const handleMovieClick = (movie) => {
    navigate(`/cinema/${movie._id}`, { state: { movie } });
  };

  return (
    <>
      <div className='mainContainer'>
        <div className='profile__header'>
          <div className="image__container">
            <img id='image__profile' src={image__profile} alt="Profile" />
          </div>
          <div className="welcome__container">
            <p id='welcome__title'>Hi, Kevin Neira</p>
            <strong id='welcome__subtitle'>Let’s watch movie together!</strong>
          </div>
          <div className="bell_container">
            <img id='image__bell' src={campana} alt="Bell" />
          </div>
        </div>
        <div className="search_bar">
          <img id='image__zoom' src={lupa} alt="Search" />
          <input id='bar' placeholder='Search movie, cinema, genre...' type="text" />
        </div>
        <div className="contain__title__flex">
          <strong id='title__flex'>Now playing</strong>
        </div>
        <div className="scrollcards" ref={scrollContainerRef}>
          <div className="allcards">
            {movies.length > 0 ? (
              movies.filter(movie => movie.estados === 'Disponible').map(movie => (
                <div 
                  className="infoContainer" 
                  key={movie._id} 
                  onClick={() => handleMovieClick(movie)}
                >
                  <div className="cards">
                    <img id='frontPage' src={movie.portada} alt={movie.nombre} />
                  </div>
                  <strong id='title__movie'>{movie.nombre}</strong>
                  <p id='genre'>{movie.genero}</p>
                </div>
              ))
            ) : (
              <p>No movies available</p>
            )}
          </div>
        </div>
        <div className="menuContainer">
          <img id='menu' src={menuPuntos} />
        </div>
        <strong id='titleCommingSoon'>Coming soon</strong>
        {movies.length > 0 ? (
          movies.filter(movie => movie.estados === 'Preventa').map(movie => (
            <div className="commingSoonMoviesContainer" key={movie._id}>
              <div className="commingSoonMovie">
                <div className="imageContainer">
                  <img id='frontPageCommingSoon' src={movie.portada} />
                </div>
                <div className="containMovie">
                  <strong id='titleMovie'>{movie.nombre}</strong>
                  <p id='genreMovie'>{movie.genero}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No movies available</p>
        )}
      </div>
      <footer className="footer__nav">
        <ul className="footer__bar">
          <li>
            <img src={Home} />
          </li>
          <li>
            <img src={zoom} />
          </li>
          <li>
            <img src={ticket} />
          </li>
          <li>
            <img src={profile} />
          </li>
        </ul>
      </footer>
    </>
  );
};

export default Homme;
