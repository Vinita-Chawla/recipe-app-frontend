import React from 'react';
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
import 'react-awesome-slider/dist/custom-animations/cube-animation.css';
import './slider.css'; 



const Slider = () =>{


  return (
    <AwesomeSlider>
    
      <div className="slider-container" data-src="./images/sliderA_01.jpg">
        <div className="overlay">
          <div className="text">Mexican Grilled<br/>Corn Recipe</div>
        </div>
      </div>
      <div className="slider-container" data-src="./images/sliderA_02.jpg">
        <div className="overlay">
          <div className="text">Roast Chicken<br/>With Lemon Gravy</div>
        </div>
      </div>
      <div className="slider-container" data-src="./images/sliderA_03.jpg">
        <div className="overlay">
          <div className="text">Avocado Melon Salad<br/>With Lime Vinaigrette </div>
        </div>
      </div>
      <div className="slider-container" data-src="./images/sliderA_04.jpg">
        <div className="overlay">
          <div className="text">Chunky Beef Stew</div>
        </div>
      </div>
      <div className="slider-container" data-src="./images/sliderA_05.jpg">
        <div className="overlay">
          <div className="text">Farmhouse Vegetable<br/>And Barley Soup</div>
        </div>
      </div>
    </AwesomeSlider>
  );
}

export default Slider;
