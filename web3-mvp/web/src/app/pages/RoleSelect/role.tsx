import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useRole } from '../../../contexts/RoleContext'; // 确保路径正确

const RoleSelect: React.FC = () => {
  const { setRole } = useRole();
  const [navigate, setNavigate] = useState(false);

  const handleRoleSelect = (role: string) => {
    setRole(role);
    setNavigate(true);
  };

  if (navigate) {
    return <Navigate to="/dashboard" />;
  }

  function toggleTheme() {
    if (document.body.classList.contains("dark"))
      document.body.classList.remove("dark");
    else
      document.body.classList.add("dark");
  }


  return (
    <main>
      <div className="relative flex flex-col h-[100vh] items-center justify-center bg-white dark:bg-black transition-bg">
        <div className="absolute inset-0 overflow-hidden">
          <div className="jumbo absolute -inset-[10px] opacity-50"></div>
        </div>
        <h1 className="relative flex items-center text-7xl font-bold text-gray-800 dark:text-white dark:opacity-80 transition-colors">
          Hello
          <span className="ml-1 rounded-xl bg-current p-2 text-[0.7em] leading-none">
            <span className="text-white dark:text-black">Web3</span>
          </span>
        </h1>
        <br></br>
        <p className="relative text-lg text-gray-600 dark:text-gray-400 transition-colors">
          A simple MVP for Web3</p>
        <br></br>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <div className="chat chat-start">
              <div className="chat-bubble">The first Qustion.. <br />Who Are You？</div>
            </div>
            <br></br>
            <div className="flex flex-col space-y-4">
              <div className="inline-block">
                <button
                  onClick={() => handleRoleSelect('Strateger')}
                  className="relative inline-block px-8 py-4 font-medium group outline-none focus:outline-none"
                >
                  <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
                  <span className="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black"></span>
                  <span className="relative text-black group-hover:text-white">
                    KOL
                  </span>
                </button>
                <button
                  onClick={() => handleRoleSelect('User')}
                  className="relative inline-block px-8 py-4 font-medium group outline-none focus:outline-none ml-4" // Added ml-4 for spacing
                >
                  <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
                  <span className="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black"></span>
                  <span className="relative text-black group-hover:text-white">
                    User
                  </span>
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>

    </main>
  );
};

export default RoleSelect;
