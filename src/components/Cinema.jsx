import React, { useEffect, useState, useRef } from 'react';
import flecha from '../../public/arrow-right.svg';
import zoom from '../../public/Cine-Club.jpg';
import menu from '../../public/more-vertical.svg'
import reproduce from '../../public/Polygon 1.svg'
import caster from '../../public/Ellipse 208.svg'

export const Cinema = () => {
  return (
    <>
    <div className='mainContainer'>
        <div className='container__header'>
          <div className="arrow__container">
            <img id='arrow__image' src={flecha}/>
          </div>
          <div className="title__container">
            <strong id='title'>Cinema Selection</strong>
          </div>
          <div className="menu_container">
            <img id='image__menu' src={menu}/>
          </div>
        </div>
        <div className="imagecontainer">
        <img id='image__front__page' src={zoom}/>
        </div>
        <div className="movie-card">
          <div className="movie-header">
            Puss in boots the last wish
            <button className="trailer-button"><img src={reproduce}/>Watch Trailer</button>
          </div>
          <div className="movie-genre">
            Action, Adventure
          </div>
          <div className="movie-description">
            Jake Sully and Ney'tiri have formed a family and are doing everything to stay together. However, they must leave their home and explore the regions of Pandora. When an ancient threat resurfaces, Jake must fight a difficult war against the humans.
          </div>
          <strong id='titleCast'>Cast</strong>
        </div>
          <div className="movie-cast">
          <div className="cast-member">
            <img id='caster__image' src={caster}/>
            </div>
            <div className="info__caster">
              <strong id="name__caster">Antonio Banderas</strong>
              <span id="character__casting">Antonio Banderas</span>
            </div>
            <div className="cast-member">
            <img id='caster__image' src={caster}/>
            </div>
            <div className="info__caster">
            <strong id="name__caster">Antonio Banderas</strong>
              <span id="character__casting">Antonio Banderas</span>
            </div>
            <div className="cast-member">
            <img id='caster__image' src={caster}/>
            </div>
            <div className="info__caster">
            <strong id="name__caster">Antonio Banderas</strong>
              <span id="character__casting">Antonio Banderas</span>
            </div>
            <div className="cast-member">
            <img id='caster__image' src={caster}/>
            </div>
            <div className="info__caster">
            <strong id="name__caster">Antonio Banderas</strong>
              <span id="character__casting">Antonio Banderas</span>
            </div>
            <div className="cast-member">
            <img id='caster__image' src={caster}/>
            </div>
            <div className="info__caster">
            <strong id="name__caster">Antonio Banderas</strong>
              <span id="character__casting">Antonio Banderas</span>
            </div>
          </div>
        <strong id='titleCinemaPlace'>Cinema</strong>
        <div className="placesContainer">
          <div className="places">
            <div className="imageContainer">
            <img id='frontPageCommingSoon' src={zoom}/>
            </div>
            <div className="containPlace">
            <strong id='placeName'>Campuslands</strong>
            <p id='ubicationPlace'>Zonza franca, torre </p>
              </div>
          </div>
        </div>
        </div>
        <footer className="footer__nav__cinema">
        <ul className="footer__bar__cinema">
          <li>
            <strong id='title__footer'>Book now</strong>
          </li>
        </ul>
      </footer>
    </>
  )
}
export default Cinema;
