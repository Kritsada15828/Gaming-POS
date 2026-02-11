import React, { useState } from 'react';
import { auth, googleProvider } from '../firebase';
import { signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err: any) {
      setError("Failed to sign in with Google. " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err: any) {
      setError("Login failed. Check your email and password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Cafe POS System</h1>
          <p className="text-gray-500 mt-2">Sign in to start selling</p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        <form onSubmit={handleEmailLogin} className="space-y-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email Address
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="email"
              type="email"
              placeholder="user@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="password"
              type="password"
              placeholder="******************"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            type="submit"
            disabled={loading}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="mt-4 w-full flex justify-center items-center bg-white border border-gray-300 rounded-lg shadow-sm py-2 px-4 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150"
          >
            <svg className="h-5 w-5 mr-2" aria-hidden="true" viewBox="0 0 24 24">
              <path
                d="M12.0003 20.45c4.656 0 8.556-3.21 9.9-7.56H12.0003v-4.17h14.04c.15 1.05.21 2.16.21 3.27 0 7.35-4.89 12.63-12.24 12.63-7.05 0-12.75-5.7-12.75-12.75s5.7-12.75 12.75-12.75c3.27 0 6.27 1.17 8.64 3.24l-3.3 3.3c-1.23-1.17-3.03-1.89-5.34-1.89-4.83 0-8.88 3.51-10.35 8.13-1.47 4.62 2.07 9.54 6.9 9.54z"
                fill="#4285F4"
              />
              <path
                d="M3.66016 13.9199c-.3-1.05-.51-2.13-.51-3.2699s.21-2.22.51-3.27l-3.21-3.3c-.9 1.83-1.44 3.9-1.44 6.57s.54 4.74 1.44 6.57l3.21-3.3z"
                fill="#34A853"
              />
              <path
                d="M12.0002 4.77005c2.16 0 4.14.9 5.61 2.37001l4.2-4.2C19.2602.480048 15.9002-.689952 12.0002-.689952c-4.98 0-9.33 2.85-11.55 7.14l3.21 3.3c1.47-4.62 5.52-8.13 10.35-8.13z"
                fill="#EA4335"
              />
              <path
                d="M21.9003 12.89c.15 1.05.21 2.16.21 3.27 0 7.35-4.89 12.63-12.24 12.63-3.6 0-6.84-1.35-9.24-3.57l3.3-3.21c1.98 1.62 4.08 2.22 5.94 2.22 4.83 0 9.75-4.92 6.9-9.54h-2.85v4.2z"
                fill="#FBBC05"
              />
            </svg>
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;