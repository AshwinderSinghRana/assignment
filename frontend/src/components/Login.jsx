import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import cookie from "js-cookie";
import { toast } from 'react-toastify';

function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [data, setData] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            axios.post(`http://localhost:2108/user/login`, data).then((res) => {
                console.log(res.data);

                if (res.data.status === 200) {
                    setData(res.data.body);
                    cookie.set("userInfo", JSON.stringify(res.data.body));
                    navigate(`/Profile/${res.data.body?._id}`)
                    toast.success(`Hello ${res.data.body.name}! Login successful`);
                } else {
                    toast.error(res.data.message);
                    
                }
            });
        } catch (error) {
            console.log(error);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <>
            <div className="min-h-screen flex flex-col justify-center items-center bg-cover bg-center">
                <div className="backdrop-blur-md bg-white/70 sm:mx-auto sm:w-full sm:max-w-md p-6 rounded-lg shadow-lg">
                    <div className="text-center">
                        <h2 className="mt-6 text-2xl font-bold text-gray-900">
                            User Login Account
                        </h2>
                    </div>

                    <div className="mt-8">
                        <form className="space-y-6" onSubmit={handleSubmit} onChange={handleChange}>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-900 text-left">
                                    Email
                                </label>
                                <div className="mt-2 relative">
                                    <input
                                        id="email"
                                        name="email"
                                        required
                                        className="block w-full rounded-md border-0 py-2 px-4 text-gray-900 shadow-sm ring-1 ring-gray-300 focus:ring-2  focus:outline-none sm:text-sm"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-900 text-left">
                                    Password
                                </label>
                                <div className="mt-2 relative">
                                    <input
                                        id="password"
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        autoComplete="current-password"
                                        required
                                        className="block w-full rounded-md border-0 py-2 px-4 text-gray-900 shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:outline-none sm:text-sm"
                                    />
                                    <span
                                        onClick={togglePasswordVisibility}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                                    >
                                        <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                                    </span>
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md px-4 py-2 text-sm font-semibold text-white shadow-sm focus:outline-none focus:ring-2"
                                    style={{ backgroundColor: 'rgb(229, 70, 70)' }}
                                >
                                    Sign in
                                </button>
                            </div>

                            <div className="mt-4 text-center">
                                <p className="text-sm text-gray-600">Don't have an account?</p>
                                <button
                                    type="button"
                                    onClick={() => navigate("/signUp")} 
                                    className="mt-2 text-sm text-blue-500 hover:underline"
                                >
                                    Register
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;
