"use client"

import { useState } from 'react';
import { supabase } from '@/utils/supabase';

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [authType, setAuthType] = useState('login'); // Toggle between login/signup

  const handleAuth = async () => {
    setLoading(true);
    if (authType === 'login') {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) alert(error.message);
    } else {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) alert(error.message);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-md shadow">
        <h1 className="text-2xl font-bold">{authType === 'login' ? 'Login' : 'Sign Up'}</h1>
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 bg-gray-100 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 bg-gray-100 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="w-full p-3 text-white bg-blue-500 rounded"
          onClick={handleAuth}
          disabled={loading}
        >
          {loading ? 'Loading...' : authType === 'login' ? 'Login' : 'Sign Up'}
        </button>
        <button
          className="text-blue-500"
          onClick={() => setAuthType(authType === 'login' ? 'signup' : 'login')}
        >
          {authType === 'login' ? "Don't have an account? Sign Up" : 'Already have an account? Login'}
        </button>
      </div>
    </div>
  );
}
