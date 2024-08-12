import React from 'react'

const About = () => {
  return (
    <>
    <section className='mt-[10rem]'>
    <div className='about'>
      <h1 className="mainHeading">About</h1>
      <div className='about_below'>
      <h5>Proin eu ante vel mauris molestie dignissim non eget nunc. Integer ac massa orci. Suspendisse vulputate semper nunc eget rhoncus.</h5>
     <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eu ante vel mauris molestie dignissim non eget nunc. Integer ac massa orci. Suspendisse vulputate semper nunc eget rhoncus. Ut sit amet porta sem, interdum tincidunt libero. Nulla vel quam lobortis, varius est scelerisque, dapibus nisl.</p>
     </div>
     </div>
      </section> 



      <section className='container mt-[5rem]'>
    <div className='detailContainer'>
    <div className='productDetail detailpadding'>
    <h1 className="mainHeading">How it Started</h1>
      <h5>Proin eu ante vel mauris molestie dignissim non eget nunc. Integer ac massa orci. Suspendisse vulputate semper nunc eget rhoncus.</h5>
      <p>Praesent vel faucibus ligula. Sed sit amet ipsum eget velit aliquet faucibus. Maecenas et odio id turpis sollicitudin pulvinar sit amet vitae augue. Phasellus nec ultricies arcu. Quisque efficitur tellus sit amet bibendum molestie. Duis id egestas odio. Phasellus lacinia ex quis faucibus tempor. Sed feugia.</p>
    </div>
    <div className='productImg'>
      <img src="./images/started.png" alt=''/>
    </div>
    </div>
    </section>
    </>
  )
}

export default About
