import { useState } from 'react'
import { Section, InbetweenSection, CarouselSection } from '../components/section.jsx';
import BestOfHridhayamSection from '../components/BestOfHridhayamSection';
import bgImage from '../assets/frame-6.png';
import bgImage2 from '../assets/section-2.jpeg';
import bgImage3 from '../assets/section-4.jpeg';
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
            '/src/assets/rectangle.jpeg',
            '/src/assets/earrings.png',
            '/src/assets/neck.png',
            '/src/assets/necklace.jpeg',
            '/src/assets/ring.jpeg',
            '/src/assets/neck.png',
            '/src/assets/necklace.jpeg',
            '/src/assets/ring.jpeg',
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
            '/src/assets/rectangle.jpeg',
            '/src/assets/earrings.png',
            '/src/assets/neck.png',
            '/src/assets/necklace.jpeg'
          ]}
          link="https://www.google.com"
        />
      </div>
    </div>
  )
}

export default home;
