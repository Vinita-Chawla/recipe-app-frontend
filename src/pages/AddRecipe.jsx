import React, { useState } from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

const AddRecipe = ()=>{
    const [recipe_title,setTitle] = useState();
    const [recipe_category,setCategory] = useState();
    const [recipe_summary, setSummary] = useState();
    const [recipe_photo, setRecipePhoto]= useState();
    const [recipe_gradients, setInGradient] = useState([]);
    const [newInGradient, setNewInGradient] = useState("");
    const [prep_time, setPrepTime] = useState("");
    const [cooking_time, setCookingTime] = useState("");
    const [calories, setCalories] = useState("")

    const navigate = useNavigate();

    let auth = localStorage.getItem("user");
    let userId = JSON.parse(auth)?._id;

    const handleAddIngredient = ()=>{
      if(newInGradient !== ""){
        setInGradient([...recipe_gradients,newInGradient])
        setNewInGradient("")
      }
    }

   const submitRecipe = async()=>{
    let formData = new FormData();
    formData.append("userId", userId);
    formData.append("recipe_title", recipe_title);
    formData.append("recipe_category", recipe_category);
    formData.append("recipe_summary", recipe_summary);
    formData.append("recipe_photo", recipe_photo);
    formData.append("recipe_gradients", JSON.stringify(recipe_gradients));
    formData.append("prep_time", prep_time);
    formData.append("cooking_time", cooking_time);
    formData.append("calories", calories);

  

    let response = await axios.post("https://recipe-app-backend-orcin.vercel.app/recipe/addRecipe", formData,{
      headers: {
        "Authorization": `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        "Content-Type": "multipart/form-data"
      }
    });
    console.log(response.data)
    if(response.data){
      setTitle(""); setSummary(""); setCategory(""); setInGradient([]); setPrepTime(""); setCookingTime(""); setCalories("");
      navigate("/");
    }
   }


    return(
        <div className="mt-[8rem] w-[95%] sm:w-[90%] mx-auto">
        <h3 className='text-[#674188] font-bold text-[2rem]'>Submit Recipe</h3>
       <div className="flex flex-col gap-[2rem] mt-[2rem]">
       <input className="p-[0.8rem] border-solid border-black border-[1px]" type="text" placeholder="Recipe Title" onChange={(e)=> setTitle(e.target.value)} value={recipe_title}/>
        
        <select className="p-[0.8rem] border-solid border-black border-[1px]" name="category" onChange={(e)=> setCategory(e.target.value)} value={recipe_category}>
              <option value="select">Choose Category</option>
              <option value="Breakfast">Breakfast</option>
              <option value="Lunch">Lunch</option>
              <option value="Beverages">Beverages</option>
              <option value="Salads">Salads</option>
              <option value="Soups">Soups</option>
              <option value="Beef">Beef</option>
              <option value="Seafood">Seafood</option>
              <option value="Vegetarian">Vegetarian</option>
              <option value="Vegetables">Vegetables</option>
              <option value="Desserts">Desserts</option>
              <option value="Freezing">Freezing</option>
              <option value="Breads">Breads</option>
              <option value="Poultry">Poultry</option>
              <option value="Holidays">Holidays</option>
            </select>
         
          <textarea className="p-[0.8rem] border-solid border-black border-[1px]" rows={8} cols={3} placeholder="Short Summary" onChange={(e)=> setSummary(e.target.value)} value={recipe_summary}></textarea>

          <div className="flex gap-[0.6rem]">
        <label className="font-bold">Upload Recipe photo : </label> 
        <input type="file" name="recipe_photo" onChange={(e)=> setRecipePhoto(e.target.files[0])}/>
        </div>

        <div className="flex gap-[0.6rem]">
        <input type="text" placeholder="Add Ingredient" className="p-[0.8rem] border-solid border-black border-[1px] w-[85%]" onChange={(e)=> setNewInGradient(e.target.value)} value={newInGradient}/>
        <button className="rounded bg-[#674188] text-white px-[0.8rem] py-[0.5rem] w-fit shadow-md shadow-black-300/40 "
        onClick={handleAddIngredient}>Add New Ingredient</button>
        </div>

        <ul className="flex gap-[0.6rem] flex-wrap">
        {
          recipe_gradients?.map((ingradient,index)=>{
            return<li className="bg-[#d7d7d7] rounded px-[0.5rem] py-[0.5rem]" key={index}>{ingradient}</li>
          })
        }
        </ul>

        <h3>Additional Informations</h3>
        <div className="flex gap-[2rem] items-center"><label>Preparation Time</label><input className="p-[0.8rem] border-solid border-black border-[1px] w-[80%]" type="text" onChange={(e)=> setPrepTime(e.target.value)} value={prep_time}/></div>
        <div className="flex gap-[3.7rem] items-center"><label>Cooking Time</label><input className="p-[0.8rem] border-solid border-black border-[1px] w-[80%]" type="text" onChange={(e)=> setCookingTime(e.target.value)} value={cooking_time}/></div>

        <h3>Nutrition Facts</h3>
        <div className="flex gap-[6.5rem] items-center"><label>Calories</label><input className="p-[0.8rem] border-solid border-black border-[1px] w-[80%]" type="text" onChange={(e)=> setCalories(e.target.value)} value={calories}/></div>

        <button className="rounded bg-[#674188] text-white py-[0.5rem] w-fit px-[1rem] shadow-md shadow-black-300/40 " onClick={submitRecipe}>Submit Recipe</button>
        

       </div>
        </div>
    )
}

export default AddRecipe;

