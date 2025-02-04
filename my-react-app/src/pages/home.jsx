import { useState } from 'react'
import { Section, InbetweenSection, CarouselSection } from '../components/section.jsx';
import BestOfHridhayamSection from '../components/BestOfHridhayamSection';
import bgImage from '../assets/section-1.png';
import bgImage2 from '../assets/section-2.png';
import bgImage3 from '../assets/section-4.png';
import '../App.css'

const home = () => {
  const [count, setCount] = useState(0)

  return (
    <div>
      <div>
        {/* Section 1 */}
        <Section
          className="section1"
          title="SIMPLY STUNNING"
          link="https://www.google.com"
          image={bgImage}
        />

        {/* Section 2 - In-between */}
        <InbetweenSection
          className="inbetween"
          content="CRAFTING AT IT’S FINEST"
        />

        {/* Section 3 */}
        <Section
          className="section2"
          title="PREMIUM & ANTIQUE"
          link="https://www.google.com"
          image={bgImage2}
        />

        {/* Section 4 - Special Carousel */}
        <CarouselSection
          className="section3"
          title="SPECIAL COLLECTION"
          images={[
            '/src/assets/carousel-1.jpg',
            '/src/assets/carousel-2.jpg',
            '/src/assets/carousel-3.jpg',
            '/src/assets/carousel-4.jpg',
            '/src/assets/carousel-5.jpg',
            '/src/assets/carousel-6.jpg'
          ]}
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        />

        {/* Section 5 */}
        <Section
          className="section4"
          title="ART OF CRAFTMANSHIP"
          link="https://www.google.com"
          image={bgImage3}
        />

        {/* Section 6 - Best Collection */}
        <BestOfHridhayamSection
          className="section5"
          title="BEST OF HRIDHAYAM"
          images={[
            '/src/assets/best-1.jpg',
            '/src/assets/best-2.jpg',
            '/src/assets/best-3.jpg',
            '/src/assets/best-4.jpg'
          ]}
          link="https://www.google.com"
        />
      </div>
    </div>
  )
}

export default home;
