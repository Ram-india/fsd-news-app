import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import API from '../utils/axios';



const Login = () => {
    const[form, setForm] = useState({email:'', password:''});
    const navigate = useNavigate();
    const {login } = useAuth();

    const handleChange = (e) => {
        setForm({...form,[e.target.name]: e.target.value});
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const res = await API.post('auth/login', form);
            login(res.data.token, res.data.user);
            navigate('/home');
        }catch(err){
            console.error(err);
            alert(err.response.data.message || "login failed");
            navigate('/login');
        }
    }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-300 px-4'>
    <form onSubmit={handleSubmit} className="p-6 rounded-lg shadow-md bg-white w-full max-w-md mx-auto">
    <input 
        type='email'
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Email"
        className="block w-full mb-2 border"
        required

     />
    <input 
        type="password" 
        name="password" 
        value={form.password}
        onChange={handleChange} 
        placeholder="Password" 
        className="block w-full mb-2 border"
        required 
    />
    <button type="submit" className="bg-blue-600 hover:bg-blue-700 transition text-white px-4 py-2 rounded">Login</button>
  </form>
  </div>
  )
}

export default Login