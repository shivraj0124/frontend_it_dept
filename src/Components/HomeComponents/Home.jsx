import React from 'react'
import Top from './Top'
import About from './About'
import ImageSlider from './ImageSlider'
import PhotoGallery from './PhotoGallery'
import Footer from './Footer'
import HODDesk from './HODDesk'
import Forum from './Forum'
function Home() {
  return (
    <div>
      <Top />
      <ImageSlider />
      <HODDesk />
      <About />
      <Forum />
      <PhotoGallery />
      <Footer />
    </div>
  )
}

export default Home
