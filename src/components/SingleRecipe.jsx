import React, { useEffect, useState } from 'react';
import {useSearchParams} from "react-router-dom";
import axios from "axios";

const SingleRecipe = ()=>{
  const [recipe, setRecipe] = useState();

  const [searchParams] = useSearchParams();
  let id = searchParams.get("id");
 
  useEffect(()=>{
    getRecipe();
  },[])

  const getRecipe=async()=>{
    const headers = {
      "Authorization": `bearer ${JSON.parse(localStorage.getItem("auth"))}`,
      "Content-Type":"application/json"
  }
    let response = await axios.get(`https://recipe-app-backend-orcin.vercel.app/recipe/singleRecipe/${id}`, {headers});
    setRecipe(response.data);
  }



  return (
    <div className='mt-[8rem]'>
       <div class="wrapper">
      <header class="header">
        <h1 class="header__title">{recipe?.recipe_title}</h1>
        <div class="header__description">
          <img
            src="./images/6dots.svg"
            alt=""
            class="header__description--icon"
          />
          <p class="header__description--text">
            Look no further for a creamy and ultra smooth classic cheesecake
            recipe! Paired with a buttery graham cracker crust, no one can deny
            its simple decadence. For the best results, bake in a water bath.
          </p>
        </div>
      </header>
      <section class="hero">
        <img className='shadow-md shadow-black-300/40' src={recipe?.recipe_photo} alt="Cheesecake" srcset="" />
      </section>
      <section class="time">
        <div class="servings">
          <div class="servings__icon">
            <img
              src="./images/local_dining-black-18dp.svg"
              alt=""
              srcset=""
            />
          </div>
          <div class="servings__text">
            <span class="servings__title">Yields</span>
            <span class="servings__count">12 servings</span>
          </div>
        </div>
        <div class="preparation">
          <div class="preparation__card">
            <div class="preparation__card_icon">
              <img
                src="./images/access_time-black-18dp.svg"
                alt=""
                srcset=""
              />
            </div>
            <div class="preparation__card_text">
              <span class="preparation__card_text--label">Prep Time</span>
              <span class="preparation__card_text--time">{recipe?.prep_time}</span>
            </div>
          </div>

          <div class="preparation__card">
            <div class="preparation__card_icon">
              <img
                src="./images/access_time-black-18dp.svg"
                alt=""
                srcset=""
              />
            </div>
            <div class="preparation__card_text">
              <span class="preparation__card_text--label">Cook Time</span>
              <span class="preparation__card_text--time">{recipe?.cooking_time}</span>
            </div>
          </div>

          <div class="preparation__card">
            <div class="preparation__card_icon">
              <img
                src="./images/access_time-black-18dp.svg"
                alt=""
                srcset=""
              />
            </div>
            <div class="preparation__card_text">
              <span class="preparation__card_text--label">Calories</span>
              <span class="preparation__card_text--time">{recipe?.calories}</span>
            </div>
          </div>
        </div>
      </section>
      <section class="ingredients">
        <h2 class="ingredients__title">Ingredients</h2>
        <div class="item">
         
        {
          recipe?.recipe_gradients?.map((ingradient, index)=>{
            return(
              <div key={index} class="item__ingredients">
            <input
              type="checkbox"
              name="item1-1"
              id="item1-1"
              class="item__checkbox"
            />
            <label for="item1-1">{ingradient}</label>
          </div>
       
              
            )
          })
        }
          
         
         
        </div>
      
      </section>
      <section class="instructions">
        <h2 class="instructions__title">Instructions</h2>
        <ol class="instructions__list">
          <li class="instructions__element">
            Adjust the oven rack to the lower-middle position and preheat oven
            to 350°F (177°C).
          </li>
          <li class="instructions__element">
            <strong>Make the crust:</strong> Using a food processor, pulse the
            graham crackers into crumbs. Pour into a medium bowl and stir in
            sugar and melted butter until combined. (You can also pulse it all
            together in the food processor.) Mixture will be sandy. Press firmly
            into the bottom and slightly up the sides of a 9-inch or 10-inch
            springform pan. No need to grease the pan first. I use the bottom of
            a measuring cup to pack the crust down tightly. Pre-bake for 8
            minutes. Remove from the oven and place the hot pan on a large piece
            of aluminum foil. The foil will wrap around the pan for the water
            bath in step 4. Allow crust to slightly cool as you prepare the
            filling.
          </li>
          <li class="instructions__element">
            <strong>Make the filling:</strong> Using a handheld or stand mixer
            fitted with a paddle attachment, beat the cream cheese and
            granulated sugar together on medium-high speed in a large bowl until
            the mixture is smooth and creamy, about 2 minutes. Add the sour
            cream, vanilla extract, and lemon juice then beat until fully
            combined. On medium speed, add the eggs one at a time, beating after
            each addition until just blended. After the final egg is
            incorporated into the batter, stop mixing. To help prevent the
            cheesecake from deflating and cracking as it cools, avoid
            over-mixing the batter as best you can.
          </li>
          <li class="instructions__element">
            <strong>Prepare the simple water bath (see note)</strong> Boil a pot
            of water. You need 1 inch of water in your roasting pan for the
            water bath, so make sure you boil enough. I use an entire kettle of
            hot water. As the water is heating up, wrap the aluminum foil around
            the springform pan. Pour the cheesecake batter on top of the crust.
            Use a rubber spatula or spoon to smooth it into an even layer. Place
            the pan inside of a large roasting pan. Carefully pour the hot water
            inside of the pan and place in the oven. (Or you can place the
            roasting pan in the oven first, then pour the hot water in.
            Whichever is easier for you.)
          </li>
          <li class="instructions__element">
            Bake cheesecake for 55-70 minutes or until the center is almost set.
            When it’s done, the center of the cheesecake will slightly wobble if
            you gently shake the pan. Turn the oven off and open the oven door
            slightly. Let the cheesecake sit in the oven in the water bath as it
            cools down for 1 hour. Remove from the oven and water bath, then
            cool cheesecake completely at room temperature. Then refrigerate the
            cheesecake for at least 4 hours or overnight.
          </li>
          <li class="instructions__element">
            Use a knife to loosen the chilled cheesecake from the rim of the
            springform pan, then remove the rim. Using a clean sharp knife, cut
            into slices for serving. For neat slices, wipe the knife clean and
            dip into warm water between each slice.
          </li>
          <li class="instructions__element">
            Serve cheesecake with desired toppings. Cover and store leftover
            cheesecake in the refrigerator for up to 5 days.
          </li>
        </ol>
      </section>
    </div>
    </div>
  )
}

export default SingleRecipe;
