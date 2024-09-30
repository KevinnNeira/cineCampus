import React from 'react'
import { Link } from 'react-router-dom';
import Ilustration from '../../public/Image__icon.jpg'

export const Home = () => {
    
  return (
    <>
    <main>
        <section className="section__imagen">
            <div className="section__container">
                <img src= {Ilustration} />
            </div>
            <div className="section__text">
                <h1>Cine Campus</h1>
                <small>Disfruta de tus peliculas favoritas en el mejor lugar</small>
            </div>
        </section>
        <section className="section__button">
            <Link to="/login">Sign In</Link>
            <Link to="/signup">Create account</Link>
        </section>
    </main>
    </>
  )
}

export default Home