import React from 'react'
import image__profile from '../../public/profileImage.svg'
import campana from '../../public/Campana.svg'
import lupa from '../../public/lupa.png'
import smileMovie from '../../public/Cine-Club.jpg'
import noDigasSuNombre from '../../public/portadaImagen.jpg'

export const Homme = () => {
  return (
    <>
    <div className='profile__header'>
      <div className="image__container">
        <img id='image__profile' src={image__profile}/>
      </div>
      <div className="welcome__container">
        <p id='welcome__title'>Hi, Kevin Neira</p>
        <strong id='welcome__subtitle'>Let’s watch movie together!</strong>
      </div>
      <div className="bell_container">
        <img id='image__bell' src={campana}/>
      </div>
    </div>
    <div className="search_bar">
      <img id='image__zoom'src={lupa}/>
      <input id='bar' placeholder='Search movie, cinema, genre...' type="text"/>
    </div>
    <div className="contain__title__flex">
      <strong id='title__flex'>Now playing</strong>
      </div>
      <div className="scrollcards">
            <div className="allcards">
                <div className="cards">
                <img id='frontPage' src={smileMovie}/>
                <p id='title__movie'>title</p>
                </div>
                <div className="cards">
                <img id='frontPage' src={noDigasSuNombre}/>
                </div>
                <div className="cards">
                <img id='frontPage' src={smileMovie}/>
                </div>
                <div className="cards">
                <img id='frontPage' src={smileMovie}/>
                </div>
            </div>
        </div>
    </>
    
  )
}

export default Homme
