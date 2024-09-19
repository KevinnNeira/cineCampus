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
        <section className="section__form" >
            <h1>Create account</h1>
            <form action="" method="post" className="login" onSubmit={route}>
                <label for="">Username</label>
                <input type="text" placeholder="Your username" />
                <label for="">Email</label>
                <input type="email" placeholder="Your email" />
                <label for="">Password</label>
                <input type="password" value="123456789" />
                <span>I accept the terms and privacy policy</span>
                <div className='button'>
                <button type="submit" className="link">Log in</button>
                </div>
            </form>
        </section>
    </main>
    </>
  )
}
export default SignUp;
