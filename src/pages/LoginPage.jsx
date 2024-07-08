import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/useAuth';
import axios from 'axios';
import { Button } from '@/components/ui/button';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { auth, setAuth } = useAuth();
    const navigate = useNavigate();    

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8080/api/authenticate', {
                username: email,
                password: password
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const jwtToken = response.data.jwt;
            console.log(response.data.jwt)
            setAuth({ email, jwtToken });
            navigate('/administrador');
            console.log(auth)
        } catch (error) {
            console.error('Login failed', error);
            // Handle login error (e.g., show error message to user)
        }
    };

    return (
        <div>
            <div className="max-w-sm mx-auto my-10 p-8 rounded-[0.5rem] shadow-lg bg-white">
                <h2 className="text-start text-2xl font-bold mb-2">Log in</h2>
                <p className="text-start mb-6">Ingresa tus credenciales para acceder a la sección de administrador</p>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <input 
                            placeholder="Email" 
                            type="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            className='col-span-3 w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-[#016654] dark:bg-gray-700 dark:text-white dark:border-gray-600'
                        />
                    </div>
                    <div className="mb-4">
                        <input 
                            placeholder="Password" 
                            type="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)}
                            className='col-span-3 w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-[#016654] dark:bg-gray-700 dark:text-white dark:border-gray-600' 
                        />
                    </div>
                    <div className="mb-2">
                        <Button 
                            className="w-full col-span-2 px-4 py-2 font-medium text-white bg-[#016654] rounded hover:bg-[#01AA8D] focus:outline-none focus:ring focus:ring-[#016654]" 
                            type="submit"
                        >
                            Log in
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginPage;