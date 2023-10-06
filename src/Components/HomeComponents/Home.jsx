import React from 'react'
import Navbar from '../Navbar'
import Top from './Top'
import About from './About'
import ImageSlider from './ImageSlider'
import PhotoGallery from './PhotoGallery'
import Footer from './Footer'
function Home() {
  return (
    <div>
      <Top/>
      <ImageSlider/>
      <About />
      <PhotoGallery />
      <Footer />
    </div>
  )
}

export default Home
