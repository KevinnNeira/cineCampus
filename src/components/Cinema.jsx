import React, { useEffect, useState, useRef } from 'react';
import flecha from '../../public/arrow-right.svg';
import zoom from '../../public/Cine-Club.jpg';
import menu from '../../public/more-vertical.svg'

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
        </div>
    </>
  )
}
export default Cinema;
