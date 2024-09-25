import React, { useEffect, useRef } from 'react';
import image__profile from '../../public/profileImage.svg';
import campana from '../../public/Campana.svg';
import lupa from '../../public/lupa.png';
import smileMovie from '../../public/Cine-Club.jpg';
import noDigasSuNombre from '../../public/portadaImagen.jpg';
import menuPuntos from '../../public/menu.svg'
import Home from '../../public/Frame 3.svg';
import zoom from '../../public/Frame 4.svg';
import ticket from '../../public/Frame 5.svg';
import profile from '../../public/Frame 6.svg';


const movies = [
  { id: 1, title: "Smile", genre: "Terror", image: smileMovie },
  { id: 2, title: "No Digas Su Nombre", genre: "Terror", image: noDigasSuNombre },
  { id: 3, title: "Smile", genre: "Terror", image: smileMovie },
  { id: 4, title: "No Digas Su Nombre", genre: "Terror", image: noDigasSuNombre }
];

export const Homme = () => {
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = scrollContainerRef.current.scrollWidth / 2.4; // Centrar el scroll
    }
  }, []);

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
            {movies.map(movie => (
              <div className="infoContainer" key={movie.id}>
                <div className="cards">
                  <img id='frontPage' src={movie.image} alt={movie.title} />
                </div>
                <strong id='title__movie'>{movie.title}</strong>
                <p id='genre'>{movie.genre}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="menuContainer">
        <img id='menu' src={menuPuntos}/>
        </div>
        <div className="commingSoonMoviesContainer">
          <strong id='titleCommingSoon'>Comming soon</strong>
          <div className="commingSoonMovie">
            <div className="imageContainer">
            <img id='frontPageCommingSoon' src={smileMovie}/>
            </div>
            <div className="containMovie">
            <strong id='titleMovie'>Smile</strong>
            <p id='genreMovie'>Miedo</p>

              </div>
          </div>
          <div className="commingSoonMovie">
            <div className="imageContainer">
            <img id='frontPageCommingSoon' src={noDigasSuNombre}/>
            </div>
              <div className="containMovie">
            <strong id='titleMovie'>No Digas Su Nombre</strong>
            <p id='genreMovie'>Miedo</p>

              </div>
          </div>
          <div className="commingSoonMovie">
            <div className="imageContainer">
            <img id='frontPageCommingSoon' src={noDigasSuNombre}/>
            </div>
              <div className="containMovie">
            <strong id='titleMovie'>No Digas Su Nombre</strong>
            <p id='genreMovie'>Miedo</p>
              </div>
          </div>
        </div>
      </div>
      <footer className="footer__nav">
        <ul className="footer__bar">
            <li>
                    <img src={Home}/>
            </li>
            <li>
                    <img src={zoom}/>
            </li>
            <li>
                    <img src={ticket}/>
            </li>
            <li>
                    <img src={profile}/>
            </li>
        </ul>
    </footer>
    </>
  );
};

export default Homme;
