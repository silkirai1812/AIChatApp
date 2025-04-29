import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from '../config/axios';
import { UserContext } from '../context/user.context';

// const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:8080": "/";

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState("");

    const { setUser } = useContext(UserContext);

    const navigate = useNavigate();

    function submitHandler(e) {
        e.preventDefault();
        axios.post('/users/login',{
            email,
            password
        }).then((res) => {
            console.log(res.data);

            localStorage.setItem('token', res.data.token);
            setUser(res.data.user);

            navigate('/');
        }).catch((err) => {
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message);
            } else {
                setError('Something went wrong. Please try again.');
            }
            console.log(err);
        })
    }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
            <div className="backdrop-blur-md bg-white/10 border border-white/20 p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-white mb-6 text-center">Login</h2>
                <form onSubmit={submitHandler}>
                    <div className="mb-4">
                        <label className="block text-gray-300 mb-2" htmlFor="email">Email</label>
                        <input

                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            id="email"
                            className="w-full p-3 rounded bg-white/10 border border-white/20 text-white placeholder-gray-400  focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your email"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-400 mb-2" htmlFor="password">Password</label>
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            id="password"
                            className="w-full p-3 rounded bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your password"
                        />
                    </div>
                    {error && <p className="text-red-500 mb-4">{error}<span> Enter Valid email or password</span></p>}

                    <button
                        type="submit"
                        className="w-full p-3 rounded bg-blue-600 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Login
                    </button>
                </form>
                <p className="text-gray-400 mt-4">
                    Don't have an account? <Link to="/register" className="text-blue-500 hover:underline">Create one</Link>
                </p>
            </div>
    </div>
  )
}

export default Login
