import React, { useState } from 'react';
import flecha from '../../public/arrow-right.svg';
import menu from '../../public/more-vertical.svg'
import Mastercard from '../../public/Mastercard.svg'
import zoom from '../../public/Cine-Club.jpg';

export const TotalOrder = () => {
    return (
      <>
     <div className="main__container__order">
                <div className='container__header__order'>
                    <div className="arrow__container">
                        <a href="/cinema">
                            <img id='arrow__image__order' src={flecha} />
                        </a>
                    </div>
                    <div className="title__container">
                        <strong id='title__order'>Order Summary</strong>
                    </div>
                    <div className="menu_container">
                        <img id='image__menu__order' src={menu} />
                    </div>
                </div>

                {/* Información de la película */}
                <div className="information_order">
                    <div className="image__order__movie">
                        <img id='image_order' src={zoom} alt="Movie" />
                    </div>
                    <div className="info__order__movie">
                        <h5 id='title_order_movie'>Smile</h5>
                        <small id='genero_order_movie'>Horror</small>
                        <h5 id='location__order'>Torre Zenith</h5>
                        <small id='fecha_order_movie'>Fri 27 Sep 2024 - 13:00</small>
                    </div>
                    <div className="number__order">
                        <small id='number_order'>Order number: 123456786</small>
                    </div>
                </div>
                <div className="order__summary">
                    <div className="ticket__info">
                        <span>1 TICKET</span>
                        <span>C5</span>
                    </div>
                    <div className="price__details">
                        <div className="price__item">
                            <span>REGULAR SEAT</span>
                            <span>$24.99 x 3</span>
                        </div>
                        <div className="price__item">
                            <span>SERVICE FEE</span>
                            <span>$1.99 x 1</span>
                        </div>
                    </div>
                </div>
                <div className="payment__method">
                    <h5>Payment method</h5>
                    <div className="payment__card">
                        <img src={Mastercard} alt="MasterCard" className="payment__card__image" />
                        <span>**** **** **** 7865</span>
                    </div>
                </div>
                <div className="payment__timer">
                    <span>Complete your payment in</span>
                    <span className="timer__countdown">04:59</span>
                </div>
            </div>
      </>
    )
  }
  
  export default TotalOrder;
  