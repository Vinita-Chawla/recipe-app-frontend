import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Link, useNavigate} from "react-router-dom"

function Recipes() {
  const [recipes, setRecipes] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);

  let auth = localStorage.getItem("user");
  let user = JSON.parse(auth);

  let isLikedByUser;

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
    const headers = {
      "Authorization": `bearer ${JSON.parse(localStorage.getItem("auth"))}`,
      "Content-Type":"application/json"
  }
    let response = await axios.get('https://recipe-app-backend-orcin.vercel.app/recipe/getAllRecipes',{headers});
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


  const handleLiked = (recipeId)=>{
    if(user.premium){
      recipeLiked(recipeId)
    }
    else{
      openModal();
    }
  }

  const recipeLiked = async(recipeId)=>{
    const headers = {
      "Authorization": `bearer ${JSON.parse(localStorage.getItem("auth"))}`,
      "Content-Type":"application/json"
  }
    let response = await axios.get(`https://recipe-app-backend-orcin.vercel.app/recipe/singleRecipe/${recipeId}`,{headers});
  
  
     // Convert the object into an array
     let dataArray = Array.isArray(response.data) ? response.data : [response.data];
  
     dataArray.forEach(recipe => {
      recipe?.likes?.forEach(like => {
        if(like.recipeId === recipeId && like.userId === user?._id){
          isLikedByUser = true;
          updateLikes(recipeId, user?._id, like.isLiked);
        }
      });
      if(!isLikedByUser){
        isLikedByUser = false;
        addLikes(recipeId)
    }
    });
    
 
  } 

  const addLikes = async(recipeId)=>{
    console.log("add likes")
    let data = {
      userId:user?._id,
      recipeId: recipeId,
      isLiked:true
    }
    const headers = {
      "Authorization": `bearer ${JSON.parse(localStorage.getItem("auth"))}`,
      "Content-Type":"application/json"
  }
    let response = await axios.post(`https://recipe-app-backend-orcin.vercel.app/recipe/addlikes/${recipeId}`, data, {headers});
    console.log(response.data);
    getRecipes();
  }

  const updateLikes = async(recipeId, userId, isLiked)=>{
    console.log("update likes")
    let data = {
      likes:{
        isLiked:!isLiked
      }
    }

     const headers = {
        "Authorization": `bearer ${JSON.parse(localStorage.getItem("auth"))}`,
        "Content-Type":"application/json"
    }

    let response = await axios.put(`https://recipe-app-backend-orcin.vercel.app/recipe/updatelikes/${userId}/${recipeId}`, data, {headers});
    console.log(response.data);
    getRecipes();
  }



  return (
    <div className='mt-[5rem] w-[95%] sm:w-[80%] mx-auto'>
      <h3 className='text-[#674188] font-bold text-[2rem]'>Latest Recipes</h3>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[1.5rem] mt-[2rem] justify-items-center'>
        {recipes?.map((recipe, index) => (
          <div key={index} className='cursor-pointer flex flex-col gap-[0.6rem] w-[250px] bg-white p-[1rem] rounded shadow-lg shadow-indigo-500/40 '>
            <img onClick={()=> handleClick(recipe?._id)}  className='w-[250px] h-[250px] rounded' src={recipe.recipe_photo} alt='' />
            <p className='text-[#606060] font-medium text-[1.1rem]'>{recipe?.recipe_title}</p>
          <div className='flex justify-between'>
            <div>
           {
            recipe?.likes?.some((recipeObj)=> recipeObj.recipeId === recipe?._id && recipeObj.userId === user?._id && recipeObj.isLiked)?
            <svg onClick={()=> handleLiked(recipe?._id)} height="20px" width="20px" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xmlSpace="preserve">
      <path style={{ fill: '#FF6647' }} d="M474.655,74.503C449.169,45.72,413.943,29.87,375.467,29.87c-30.225,0-58.5,12.299-81.767,35.566
        c-15.522,15.523-28.33,35.26-37.699,57.931c-9.371-22.671-22.177-42.407-37.699-57.931c-23.267-23.267-51.542-35.566-81.767-35.566
        c-38.477,0-73.702,15.851-99.188,44.634C13.612,101.305,0,137.911,0,174.936c0,44.458,13.452,88.335,39.981,130.418
        c21.009,33.324,50.227,65.585,86.845,95.889c62.046,51.348,123.114,78.995,125.683,80.146c2.203,0.988,4.779,0.988,6.981,0
        c2.57-1.151,63.637-28.798,125.683-80.146c36.618-30.304,65.836-62.565,86.845-95.889C498.548,263.271,512,219.394,512,174.936
        C512,137.911,498.388,101.305,474.655,74.503z"></path>
      <path style={{ fill: '#E35336' }} d="M160.959,401.243c-36.618-30.304-65.836-62.565-86.845-95.889
        c-26.529-42.083-39.981-85.961-39.981-130.418c0-37.025,13.612-73.631,37.345-100.433c21.44-24.213,49.775-39.271,81.138-43.443
        c-5.286-0.786-10.653-1.189-16.082-1.189c-38.477,0-73.702,15.851-99.188,44.634C13.612,101.305,0,137.911,0,174.936
        c0,44.458,13.452,88.335,39.981,130.418c21.009,33.324,50.227,65.585,86.845,95.889c62.046,51.348,123.114,78.995,125.683,80.146
        c2.203,0.988,4.779,0.988,6.981,0c0.689-0.308,5.586-2.524,13.577-6.588C251.254,463.709,206.371,438.825,160.959,401.243z"></path>
    </svg> :
    <svg onClick={()=> handleLiked(recipe?._id)} fill="#FF0000" height="20px" width="20px" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 471.701 471.701" xmlSpace="preserve">
                        <g>
                          <path d="M433.601,67.001c-24.7-24.7-57.4-38.2-92.3-38.2s-67.7,13.6-92.4,38.3l-12.9,12.9l-13.1-13.1 c-24.7-24.7-57.6-38.4-92.5-38.4c-34.8,0-67.6,13.6-92.2,38.2c-24.7,24.7-38.3,57.5-38.2,92.4c0,34.9,13.7,67.6,38.4,92.3 l187.8,187.8c2.6,2.6,6.1,4,9.5,4c3.4,0,6.9-1.3,9.5-3.9l188.2-187.5c24.7-24.7,38.3-57.5,38.3-92.4 C471.801,124.501,458.301,91.701,433.601,67.001z M414.401,232.701l-178.7,178l-178.3-178.3 c-19.6-19.6-30.4-45.6-30.4-73.3s10.7-53.7,30.3-73.2c19.5-19.5,45.5-30.3,73.1-30.3c27.7,0,53.8,10.8,73.4,30.4l22.6,22.6 c5.3,5.3,13.8,5.3,19.1,0l22.4-22.4c19.6-19.6,45.7-30.4,73.3-30.4c27.6,0,53.6,10.8,73.2,30.3 c19.6,19.6,30.3,45.6,30.3,73.3 C444.801,187.101,434.001,213.101,414.401,232.701z"></path>
                        </g>
                    </svg>
           }
            </div>
            <p className='self-end text-[#909090] font-bold flex gap-[0.3rem] items-center'>
              <i className='fas fa-clock'></i>
              {recipe.prep_time}
            </p>
            </div>
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
