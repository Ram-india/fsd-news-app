import React from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const{user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };
    
  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center px-4'>
        <div className="bg-white shadow-md rounded-lg p-6 max-w-md w-full">
            <h1 className="text-3xl font-bold text-blue-600 mb-4">
                Welcome,{user?.name || 'User'}!
            </h1>
            <p className="mb-6 text-gray-700">
                You have successfully Logged in to th e news app
            </p>
            <button
             className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-400"
             onClick={handleLogout}
             >
             Logout
            </button>
        </div>
    </div>
  )
}

export default Home