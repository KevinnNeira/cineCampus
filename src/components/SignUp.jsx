import React, { useState } from 'react';
import star from '../../public/Image__icon.jpg'
import { useNavigate } from 'react-router-dom';

export const SignUp = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userData = {
            Username: username,
            Email: email,
            Password: password,
        };
        const response = await fetch('http://localhost:3000/insertUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        if (response.ok) {
            const data = await response.json();
            console.log('User created:', data);
            navigate('/login');
        } else {
            const errorData = await response.json();
            console.error('Error:', errorData.message);
            alert(errorData.message);
        }
    };

    return (
        <>
            <header>
                <div className="header__logo">
                    <img src={star} alt="Logo" />
                </div>
            </header>
            <main>
                <section className="section__form">
                    <h1>Create account</h1>
                    <form onSubmit={handleSubmit} className="login">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            placeholder="Your username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <span>I accept the terms and privacy policy</span>
                        <input type="submit" value="Create account" />
                    </form>
                </section>
            </main>
        </>
    );
};

export default SignUp;
