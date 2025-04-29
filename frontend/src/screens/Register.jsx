import React, {useState, useContext} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from '../config/axios';
import { UserContext } from '../context/user.context';

// const BASE_URL=import.meta.env.MODE === "development" ? "http://localhost:8080": "/";

const Register = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(""); 

    const { setUser } = useContext(UserContext);

    const navigate = useNavigate();

    function submitHandler(e) {
        
        e.preventDefault();
        if (password.length < 3) {
            setError("Password must be at least 3 characters long.");
            return;  // Stop the form submission if password length is insufficient
        } else {
            setError("");  // Clear the error if password is valid
        }
        axios.post('/users/register', {
            email,
            password
        }).then((res) => {
            console.log(res.data);
            localStorage.setItem('token', res.data.token);
            setUser(res.data.user);
            navigate('/');
        }).catch((err) => {
            console.log(err.response.data);
        })
    }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
            <div className="backdrop-blur-md bg-white/10 border border-white/20 p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-white mb-6 text-center">Register</h2>
                <form onSubmit={submitHandler}>
                    <div className="mb-4">
                        <label className="block text-gray-300 mb-2" htmlFor="email">Email</label>
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            id="email"
                            className="w-full p-3 rounded bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your email"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-300 mb-2" htmlFor="password">Password</label>
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            id="password"
                            className="w-full p-3 rounded bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your password"
                        />
                    </div>
                    {error && <p className="text-red-400 text-center mb-4">{error}</p>}
                    <button
                        type="submit"
                        className="w-full p-3 rounded bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Register
                    </button>
                </form>
                <p className="text-gray-400 mt-4">
                    Already have an account? <Link to="/login" className="text-blue-500 hover:underline">Login</Link>
                </p>
            </div>
    </div>
  )
}

export default Register
