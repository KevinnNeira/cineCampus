import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const LogIn = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userData = {
            Username: username,
            Password: password,
        };

        const response = await fetch('http://localhost:3000/loginUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Login successful:', data);
            // Aquí puedes almacenar el token o cualquier dato que necesites
            navigate('/dashboard'); // Redirige a la página de dashboard o inicio
        } else {
            const errorData = await response.json();
            console.error('Error:', errorData.message);
            alert(errorData.message); // Considera usar un componente para mostrar errores
        }
    };

    return (
        <main>
            <section className="section__form">
                <h1>Login</h1>
                <form onSubmit={handleSubmit} className="login">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
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
                    <input type="submit" value="Login" />
                </form>
            </section>
        </main>
    );
};

export default LogIn;
