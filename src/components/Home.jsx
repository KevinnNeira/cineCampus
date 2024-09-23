import React from 'react'
import { Link } from 'react-router-dom';
import Ilustration from '../../public/Illustration.svg'

export const Home = () => {
    
  return (
    <>
    <main>
        <section className="section__imagen">
            <div className="section__container">
                <img src= {Ilustration} />
            </div>
            <div className="section__text">
                <h1>Explore the app</h1>
                <small>Now your finances are in one place and always under control</small>
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