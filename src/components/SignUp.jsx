import React from 'react'
import star from '../../public/Star.svg'
import { useNavigate } from 'react-router-dom'

export const SignUp = () => {
    const navigate = useNavigate();
    const route = async (e) => {
        e.preventDefault();
        navigate('/signUp');
    }
  return (
    <>
    <header>
        <div className="header__logo">
            <img src={ star }/>
        </div>
    </header>
    <main>
    <section class="section__form">
            <h1>Create account</h1>
            <form action="" method="post" class="login">
                <label for="">Username</label>
                <input type="text" placeholder="Your username"/>
                <label for="">Email</label>
                <input type="email" placeholder="Your email"/>
                <label for="">Password</label>
                <input type="password"/>
                <span>I accept the terms and privacy policy</span>
                <input type="submit" value="Log in"/>
            </form>
        </section>
    </main>
    </>
  )
}
export default SignUp;
