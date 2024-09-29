import React, { useState } from 'react';
import flecha from '../../public/arrow-right.svg';
import menu from '../../public/more-vertical.svg'

export const TotalOrder = () => {
    return (
      <>
    <div className="main__container__order">
    <div className='container__header__order'>
          <div className="arrow__container">
          <a href="/cinema">
            <img id='arrow__image__order' src={flecha}/>
            </a>          </div>
          <div className="title__container">
            <strong id='title__order'>Order Summary</strong>
          </div>
          <div className="menu_container">
            <img id='image__menu__order' src={menu}/>
          </div>
        </div>
    </div>
    <div className="information_order">
        <div className="image__order__movie">
            
        </div>
    </div>
      </>
    )
  }
  
  export default TotalOrder;
  