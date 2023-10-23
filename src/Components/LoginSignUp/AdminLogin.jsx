import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import themeHook from '../Admin/ContextP';
import { useNavigate } from 'react-router-dom'
export default function AdminLogin() {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const { setUsername, setLoggedIn ,setAuth,auth} = themeHook();
    const urlBackend = import.meta.env.VITE_BACKEND_API
    const navigate=useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('password', password);

            const response = await axios.post(`${urlBackend}/api/v3/admin-login`, formData);

            if (response.data.success) {
                setLoggedIn(true);
                setAuth({
                    ...auth,
                    user: response.data.user,
                });
                localStorage.setItem("username", response.data?.user.name);
                setUsername(response.data.user.name);
                localStorage.setItem("userId", response.data?.user._id);
                localStorage.setItem("auth", JSON.stringify(response.data.user));
                toast.success(`Admin Logged In Successfully`);
                navigate('/');
            } else {
                setLoggedIn(false);
                toast.error('Invalid Credentials! Please Try Again');
            }
        } catch (error) {
            toast.error(error.message);
        }


        setName('');
        setPassword('');
    }

    return (
        <div className="text-center flex flex-col items-center justify-center bg-white rounded-md pt-5 pb-5">
            <h1 className="text-2xl font-semibold">Admin Login</h1>
            <form className="mt-10" onSubmit={handleSubmit}>
                <input
                    type="text"
                    className="text-xl font-semibold placeholder:text-slate-500 border-b-2 border-blue-300 hover:border-blue-900 focus:border-blue-900 focus:outline-none w-[80%] my-2"
                    placeholder="Name"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    required
                />
                <input
                    type="password"
                    className="text-xl font-semibold placeholder:text-slate-500 border-b-2 border-blue-300 hover:border-blue-900 focus:border-blue-900 focus:outline-none w-[80%] my-2"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required
                />
                <br />
                <button className="mt-5 py-2 px-5 bg-blue-600 rounded-lg text-white cursor-pointer hover:bg-blue-500">
                    Login
                </button>
            </form>
        </div>
    );
}
