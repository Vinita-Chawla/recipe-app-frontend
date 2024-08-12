import React, { useState,useEffect } from "react";
import { Link, useNavigate} from "react-router-dom";

const Navbar = () => {
  const [menuBtn, setMenuBtn] = useState(false);

  const navigate = useNavigate();


  function handleScroll() {
    setMenuBtn(false);
  }

  function closeMenu() {
    setMenuBtn(false);
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  let auth = localStorage.getItem("user");
  let user = JSON.parse(auth);


  const userLogout = ()=>{
    localStorage.removeItem("user");
    localStorage.removeItem("auth");
    setTimeout(() => {
      navigate("/login")
    }, 1000);
   
  }



  return (
    <>
      <header className="fixed top-0 left-0 w-full bg-[#F7EFE5] shadow-md z-50 shadow-md shadow-black-300/40 ">
        <div className="flex items-center justify-between w-full gap-4 py-[0.9rem] px-8">
      

{
  auth ? 
  <div className="flex items-center justify-center gap-[0.6rem]">
            <img src={user.profile} alt="" className="w-[45px] h-[45px] rounded-[50%]"/>
            <h5 className="capitalize m-[0] text-[#674188] font-bold">{user.name}</h5>
          </div>
          :
        <h1 className='text-[#674188] font-bold text-[2rem]'>Meal App</h1>

}
         

          <ul
            className={`${
              menuBtn ? "flex" : "hidden"
            } md:flex flex-col md:flex-row items-center gap-2 p-1 m-0 absolute md:relative top-full md:top-0 right-0 md:right-0 bg-[#F7EFE5] md:bg-transparent w-full md:w-auto transition-all duration-500 ease-in-out`}
          >
            <li className="mx-3 my-2 md:my-0" onClick={() => closeMenu()}>
              <Link className="no-underline text-[#674188] font-medium text-[#674188]" to="/">
                Home
              </Link>
            </li>

            <li className="mx-3 my-2 md:my-0" onClick={() => closeMenu()}>
              <Link className="text-[#674188] font-medium no-underline text-[#674188]" to="/about">
                About
              </Link>
            </li>
           

            <li className="mx-3 my-2 md:my-0" onClick={() => closeMenu()}>
            <Link className="no-underline text-[#674188] font-medium" to="/favorites">Favorites</Link>
            </li>
            
            <li className="mx-3 my-2 md:my-0" onClick={() => closeMenu()}>
            <Link className="no-underline text-[#674188] font-medium" to="/submit-recipe">Submit Recipe</Link>
            </li>

            <li className="mx-3 my-2 md:my-0" onClick={() => closeMenu()}>
            <Link className="no-underline text-[#674188] font-medium" to="/">Contact</Link>
            </li>
          
            <li className="mx-3 my-2 md:my-0" onClick={() => closeMenu()}>
              <Link className="no-underline text-[#674188] font-medium" to="/login">
                Login
              </Link>
            </li>

          {
            auth?   <li className="mx-3 my-2 md:my-0">
              <Link
                className="no-underline text-[#674188] font-medium"
                onClick={userLogout}
              >
                Logout
              </Link>
            </li>
            : ""
          }
          </ul>

          <div className="flex items-center justify-center gap-[0.5rem]">
            <div
              id="menu-btn"
              onClick={() => setMenuBtn(!menuBtn)}
              className={`${
                menuBtn ? "fas fa-times" : "fas fa-bars"
              } text-[#674188] text-[1.4rem] md:hidden cursor-pointer font-bold`}
            ></div>

           

          </div>
        </div>
      </header>



    
    </>
  );
};

export default Navbar;
