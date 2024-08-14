"use client";
import React, { useState } from 'react';
import Login from '../../components/Login';
import Signup from '../../components/Signup';

export default function Home() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setIsLogin(true)}
          className={`p-3 rounded-md font-semibold ${isLogin ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-800'}`}
        >
          Login
        </button>
        <button
          onClick={() => setIsLogin(false)}
          className={`p-3 rounded-md font-semibold ${!isLogin ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-800'}`}
        >
          Signup
        </button>
      </div>
      {isLogin ? <Login /> : <Signup />}
    </div>
  );
}

