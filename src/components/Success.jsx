import React from 'react';
import {Link} from "react-router-dom"


function Success() {
  
  return (
    <div class="sc-container">
    <h1>Payment Successful!</h1>
    <p>Your order will arrive in 2 bussiness days.</p>
    <img src="images/success.png" alt="" />
    <Link to="/" class="sc-btn" id="back_to_home">Back To Homepage</Link>
    </div>
  )
}

export default Success
