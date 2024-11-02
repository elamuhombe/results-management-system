//src/components/Login/LoginForm/LoginButton.tsx
import React from 'react';
import { LoginButtonProps } from '../../../types/client';


export const LoginButton: React.FC<LoginButtonProps> = ({ loading, onClick }) => {
  return (
    <button 
      onClick={onClick} 
      disabled={loading} 
      className={`ml-24 mt-4  bg-purple-600 justify-center items-center flex w-3/4  text-white py-2 px-4 rounded transition duration-300 
                  ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-purple-700'}`}
    >
      {loading ? 'Loading...' : 'Login'}
    </button>
  );
};
