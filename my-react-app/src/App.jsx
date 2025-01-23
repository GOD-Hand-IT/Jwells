import { useState } from 'react'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Section from './components/section.jsx'
import './App.css'

function App() {
    const sections = [
        {
          className: 'section1',
          title: 'SIMPLY STUNNING',
          image: 'https://c4.wallpaperflare.com/wallpaper/338/279/754/models-model-brown-eyes-earrings-girl-hd-wallpaper-thumb.jpg',
          link: 'https://example.com/section-one',
        },
        {
          className: 'section2',
          title: 'Section Two',
          image: 'https://via.placeholder.com/300',
          link: 'https://example.com/section-two',
        },
        {
          className: 'section4',
          title: 'Section Three',
          image: 'https://via.placeholder.com/300',
          link: 'https://example.com/section-three',
        },
      ];

  return (
    <div>
      <Header/>
      <div>
      {/* Dynamically render the Section components */}
      {sections.map((section, index) => (
        <Section
          key={index} // Use a unique key for each child
          className={section.className}
          title={section.title}
          image={section.image}
          link={section.link}
        />
      ))}
    </div>
      <div>
        <section class="section section1">
            <div class="explore-close-center">
                <div class="home">SIMPLY STUNNING</div>
                <div class="flex">
                    <div class="frame">
                        <div class="text-wrapper"><a href="www.google.com">EXPLORE</a></div>
                    </div>
                </div>
            </div>
        </section>
        <section class="inbetween">
            <div class="home-9">CRAFTING AT IT’S FINEST</div>
        </section>
        <section class="section section2">
            <div class="explore-close-center">
                <div class="home">PREMIUM & ANTIQUE</div>
                <div class="flex">
                    <div class="frame">
                        <div class="text-wrapper"><a href="www.google.com">EXPLORE</a></div>
                    </div>
                </div>
            </div>
        </section>
        <div class="section section3">
            <div class="home-3">SPECIAL COLLECTION</div>
            <div class="carousel-wrapper">
                <div class="carousel">
                    <img src="assets/rectangle.jpeg"/>
                    <img src="assets/earrings.png"/>
                    <img src="assets/neck.png"/>
                    <img src="assets/necklace.jpeg"/>
                    <img src="assets/ring.jpeg"/>
                    <img src="assets/neck.png"/>
                    <img src="assets/necklace.jpeg"/>
                    <img src="images/ring.jpeg"/>
                </div>
            </div>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          </div>
    
        <div class="section section4">
            <div class="explore-close-center">
                <div class="home">ART OF CRAFTMANSHIP</div>
                <div class="flex">
                    <div class="frame">
                        <div class="text-wrapper"><a href="www.google.com">EXPLORE</a></div>
                    </div>
                </div>
            </div>
        </div>
    
        <div class="section section5">
            <div class="home-5">BEST OF HRIDHAYAM</div>
              <div class="best-carousal-wrapper">
                <div class="best-carousal">
                  <img src="images/rectangle.jpeg"/>
                  <img src="images/earrings.png"/>
                  <img src="images/neck.png"/>
                  <img src="images/necklace.jpeg"/>
                </div>
              </div>
              <div class="frame2">
                  <div class="text-wrapper2"><a href="www.google.com">EXPLORE</a></div>
              </div>
          </div>
        </div>
      <Footer/>
    </div>
  )
}

export default App
