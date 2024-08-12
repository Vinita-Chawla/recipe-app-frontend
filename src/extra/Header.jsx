import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

  let auth = localStorage.getItem("user");
  let user = JSON.parse(auth);

  const userLogout = ()=>{
    localStorage.removeItem("user");
    setTimeout(() => {
      navigate("/login")
    }, 1000);
   
  }


  return (
    <div className="flex flex-col h-full">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 w-[18rem] sm:w-[20rem] bg-gray-800 text-white h-full transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out md:translate-x-0`}
      >
        <div className="p-4">
          {auth ? (
            <div className="flex items-center gap-[0.6rem]">
              <img
                src={user.profile}
                alt=""
                className="w-[45px] h-[45px] rounded-[50%]"
              />
              <h5 className="capitalize m-[0] font-medium">{user.name}</h5>
            </div>
          ) : (
            ""
          )}
          <ul className="mt-[3rem] flex flex-col gap-[2rem]">
            <li>
              <Link className="text-white no-underline font-normal text-[1.2rem]" to="/">Home</Link>
            </li>
            <li>
              <Link className="text-white no-underline font-normal text-[1.2rem]" to="/add-recipe">Add Recipe</Link>
            </li>
            <li>
              <Link className="text-white no-underline font-normal text-[1.2rem]" to="/favorites">Favorites</Link>
            </li>
            <li>
              <Link className="text-white no-underline font-normal text-[1.2rem]" onClick={userLogout}>Logout</Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-gray-900 text-white md:hidden">
        <h1 className="text-xl font-bold">Header</h1>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="focus:outline-none"
        >
          {isOpen ? (
            <i className="fas fa-times w-6 h-6"></i>
          ) : (
            <i className="fas fa-bars w-6 h-6"></i>
          )}
        </button>
      </div>
    </div>
  );
}

export default Header;
