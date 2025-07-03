import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import API from '../utils/axios';

const Signup = () => {
    const [form, setForm] = useState({name:"", email: "", password:""});
    const navigate = useNavigate();
 
    const handleChange = (e) => {
        setForm({...form,[e.target.name]: e.target.value});
    }
    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
            const res = await API.post('auth/signup', form);
            alert("signup successfull! so you please login..")
            navigate('/login');
        }catch(err){
            console.error(err);
            alert(err.response?.data?.error || "Signup failed..");
        }
    };
  return (
    <form onSubmit={handleSubmit} className='p-4 max-w-md mx-auto'>
        <input 
            type="text"
            name='name'
            placeholder='Name'
            onChange={handleChange}
            value={form.name}
            className='block w-full mb-2 border'
            required
        />
        <input 
            type="email"
            name="email"
            placeholder='Email'
            onChange={handleChange}
            value={form.email}
            className='block w-full mb-2 border'
            required
        />
        <input
            type="password" 
            name="password"
            onChange={handleChange} 
            placeholder="Password" 
            value={form.password}
            className="block w-full mb-2 border"
            required
        />
        <button type='submit' className='bg-blue-600 text-white px-4 py-2 rounded'>Signup</button>


    </form>
  )
}

export default Signup