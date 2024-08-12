import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Link, useNavigate} from "react-router-dom"

function Recipes() {
  const [recipes, setRecipes] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);

  let auth = localStorage.getItem("user");
  let user = JSON.parse(auth);

  const navigate = useNavigate();


  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    getRecipes();
  }, []);

  const getRecipes = async () => {
    let response = await axios.get('https://recipe-app-backend-orcin.vercel.app/recipe/getAllRecipes');
    setRecipes(response.data);
  };

  const handleClick = (recipeId)=>{
    if(user.premium){
      navigate(`/recipe?id=${recipeId}`)
    }
    else{
      openModal();
    }
  }



  return (
    <div className='mt-[5rem] w-[95%] sm:w-[80%] mx-auto'>
      <h3 className='text-[#674188] font-bold text-[2rem]'>Latest Recipes</h3>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[1.5rem] mt-[2rem] justify-items-center'>
        {recipes?.map((recipe, index) => (
          <div onClick={()=> handleClick(recipe._id)} key={index} className='cursor-pointer flex flex-col gap-[0.6rem] w-[250px] bg-white p-[1rem] rounded shadow-lg shadow-indigo-500/40 '>
            <img className='w-[250px] h-[250px] rounded' src={recipe.recipe_photo} alt='' />
            <p className='text-[#606060] font-medium text-[1.1rem]'>{recipe.recipe_title}</p>
            <p className='self-end text-[#909090] font-bold flex gap-[0.3rem] items-center'>
              <i className='fas fa-clock'></i>
              {recipe.prep_time}
            </p>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className='modal'>
          <div className='modal-content'>
            <button className='modal-close' onClick={closeModal}>&times;</button>
            <h2 className='text-2xl font-bold mb-4'>Subscription Plans</h2>
            <p className='mb-4'>Choose a plan that fits your needs:</p>
            <div className='container'>
              <div className='row'>
                <div className='col-sm-4'>
                  <div className='card text-center'>
                    <div className='title'>
                      <i className='fa fa-paper-plane' aria-hidden='true'></i>
                      <h2>Weekly</h2>
                    </div>
                    <div className='price'>
                      <h4>
                        <sup>$</sup>25
                      </h4>
                    </div>
                    <div className='option'>
                      <ul>
                        <li>
                          <i className='fa fa-check' aria-hidden='true'></i> 10 GB Space
                        </li>
                        <li>
                          <i className='fa fa-check' aria-hidden='true'></i> 3 Domain Names
                        </li>
                        <li>
                          <i className='fa fa-check' aria-hidden='true'></i> 20 Email Address
                        </li>
                        <li>
                          <i className='fa fa-times' aria-hidden='true'></i> Live Support
                        </li>
                      </ul>
                    </div>
                    <Link to={`/payment?price=25&interval=week&plan=basic`}>Order Now</Link>
                  </div>
                </div>

                <div className='col-sm-4'>
                  <div className='card text-center'>
                    <div className='title'>
                      <i className='fa fa-plane' aria-hidden='true'></i>
                      <h2>Monthly</h2>
                    </div>
                    <div className='price'>
                      <h4>
                        <sup>$</sup>50
                      </h4>
                    </div>
                    <div className='option'>
                      <ul>
                        <li>
                          <i className='fa fa-check' aria-hidden='true'></i> 50 GB Space
                        </li>
                        <li>
                          <i className='fa fa-check' aria-hidden='true'></i> 5 Domain Names
                        </li>
                        <li>
                          <i className='fa fa-check' aria-hidden='true'></i> Unlimited Email Address
                        </li>
                        <li>
                          <i className='fa fa-times' aria-hidden='true'></i> Live Support
                        </li>
                      </ul>
                    </div>
                    <Link to={`/payment?price=50&interval=month&plan=standard`}>Order Now </Link>
                  </div>
                </div>

                <div className='col-sm-4'>
                  <div className='card text-center'>
                    <div className='title'>
                      <i className='fa fa-rocket' aria-hidden='true'></i>
                      <h2>Yearly</h2>
                    </div>
                    <div className='price'>
                      <h4>
                        <sup>$</sup>100
                      </h4>
                    </div>
                    <div className='option'>
                      <ul>
                        <li>
                          <i className='fa fa-check' aria-hidden='true'></i> Unlimited GB Space
                        </li>
                        <li>
                          <i className='fa fa-check' aria-hidden='true'></i> 30 Domain Names
                        </li>
                        <li>
                          <i className='fa fa-check' aria-hidden='true'></i> Unlimited Email Address
                        </li>
                        <li>
                          <i className='fa fa-check' aria-hidden='true'></i> Live Support
                        </li>
                      </ul>
                    </div>
                    <Link to={`/payment?price=100&interval=year&plan=premium`}>Order Now </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Recipes;
