import React from 'react';
import {Link} from "react-router-dom"


function Cancel() {
  return (
    <div class="sc-container">
    <h1>Something Went Wrong!</h1>
    <p>We apologize for the inconvenience, but an error occured while processing your order request.</p>
    <p>For Any Support Email: vinitachawla49@gmail.com</p>
    <img src="images/cancel.png" alt=""/>
    <Link to="/" class="sc-btn">Back To Homepage</Link>
</div>
  )
}

export default Cancel;
