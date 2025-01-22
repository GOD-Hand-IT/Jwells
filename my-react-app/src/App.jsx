import { useState } from 'react'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Header/>
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
