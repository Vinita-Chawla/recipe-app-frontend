import React from 'react'
import {Link} from "react-router-dom"

const Footer = ()=> {
  return (
    <footer className='mt-[5rem]'>
    <div class="top">
      <div class="pages">
        <ul>
          <h3>Brand Name</h3>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/favorites">Favorites</Link></li>
          <li><Link to="/submit-recipe">Submit Recipe</Link></li>
          <li><Link to="/">Contact</Link></li>
        </ul>

        <ul>
          <h3>Careers</h3>
          <li><Link>Apply Online</Link></li>
          <li><Link>Available Positions</Link></li>
        </ul>

        <ul>
          <h3>About Us</h3>
          <li><Link>Meet Our Team</Link></li>
          <li><Link>Our Responsibilities</Link></li>
          <li><Link>Our Codes</Link></li>
          <li><Link>Our Values</Link></li>
        </ul>
      </div>
      <div class="newsletter">
        <h3>Stay in Touch</h3>
        <form  action="https://formspree.io/f/movawyvn" method="POST">
         
        <label for="newsletter_email">Your Email</label> 
        <input
            type="email"
            name="newsletter_email"
            id="newsletter_email"
            placeholder="Email"
          />
          <input type="button" value="Submit" className='submit'/>
        </form>
      </div>
    </div>
    <div class="social">
      <i class="fab fa-linkedin"></i>
      <i class="fab fa-github"></i>
      <i class="fab fa-facebook"></i>
      <i class="fab fa-instagram"></i>
      <i class="fab fa-twitter"></i>
      <i class="fab fa-youtube"></i>
    </div>
    <div class="info">
      <div class="copyright">2024 Copyright &copy; Vanita Chawla</div>
    </div>
  </footer>
  )
}

export default Footer
