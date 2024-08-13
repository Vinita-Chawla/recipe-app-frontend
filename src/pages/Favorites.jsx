import React,{useState, useEffect} from 'react';
import axios from 'axios';

function Favorites() {
  const [recipes, setRecipes] = useState();

  let auth = localStorage.getItem("user");
  let user = JSON.parse(auth);
  
  useEffect(() => {
    getRecipes();
  }, []);

  const getRecipes = async () => {
    const headers = {
      "Authorization": `bearer ${JSON.parse(localStorage.getItem("auth"))}`,
      "Content-Type":"application/json"
  }
    let response = await axios.get('https://recipe-app-backend-orcin.vercel.app/recipe/getAllRecipes', {headers});
    setRecipes(response.data);
  };
  return (
    <div className='mt-[8rem] w-[95%] sm:w-[80%] mx-auto'>
     <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[1.5rem] mt-[2rem] justify-items-center'>
      {
        recipes?.map((recipe,index)=>{
        return  recipe?.likes?.some((recipeObj)=> recipeObj?.recipeId === recipe?._id && recipeObj?.userId === user?._id && recipeObj.isLiked)?
            <div key={index} className='cursor-pointer flex flex-col gap-[0.6rem] w-[250px] bg-white p-[1rem] rounded shadow-lg shadow-indigo-500/40 '>
            <img  className='w-[250px] h-[250px] rounded' src={recipe?.recipe_photo} alt='' />
            <p className='text-[#606060] font-medium text-[1.1rem]'>{recipe?.recipe_title}</p>
          <div className='flex justify-between'>
            <p className='self-end text-[#909090] font-bold flex gap-[0.3rem] items-center'>
              <i className='fas fa-clock'></i>
              {recipe?.prep_time}
            </p>
            </div>
          </div>
          
          :
        ""
        })
      }
      </div>
    </div>
  )
}

export default Favorites
