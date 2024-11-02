// src/components/Login.tsx

import LoginForm from "./LoginForm/LoginForm";

function Login() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-1/2 pl-28">
        <LoginForm />
      </div>
      <div className="w-1/2 p-4">
        <img src="/images/image01.avif" alt="login-placeholder-image" className="w-full h-auto" />
      </div>
    </div>
  );
}

export default Login;
