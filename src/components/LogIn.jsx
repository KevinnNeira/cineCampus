import React from 'react'
import facebook from '../../public/Facebook.svg'
import google from '../../public/Google.svg'
import apple from '../../public/Apple.svg'
import star from '../../public/Star.svg'

export const LogIn = () => {
  return (
    <>
    <header>
        <div className="header__logo">
            <img src={ star }/>
        </div>
    </header>
    <main>
        <section className="section__form">
            <h1>Log in</h1>
            <form action="" method="post" className="login">
                <label for="">Email address</label>
                <input type="email" value="helloworld@gmail.com"/>
                <label for="">Password</label>
                <input type="password" value="123456789"/>
                <span>Forgot password?</span>
                <input type="submit" value="Log in"/>
            </form>
        </section>
        <section>
            <div className="section__line">
                <span>Or Login with</span>
              </div>
            <div className="section__social">
                <button><img src={ facebook } /></button>
                <button><img src={ google } /></button>
                <button><img src={ apple } /></button>
            </div>
        </section>
    </main>
    <footer>
        <p>Don’t have an account? <b>Sign up</b></p>
    </footer>
    </>
  )
}

export default LogIn;
