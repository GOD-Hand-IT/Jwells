import { useState, useEffect } from 'react';
import { Section, InbetweenSection, CarouselSection } from '../components/Section.jsx';
import BestOfHridhayamSection from '../components/BestOfHridhayamSection';
import bgImage from '../assets/section-1.png';
import bgImage2 from '../assets/section-2.png';
import bgImage3 from '../assets/section-4.png';
import video from '../assets/WEBSITE.mp4';

// Import carousel images
import carousel1 from '../assets/carousel-1.png';
import carousel2 from '../assets/carousel-2.png';
import carousel3 from '../assets/carousel-3.png';
import carousel4 from '../assets/carousel-4.png';
import carousel5 from '../assets/carousel-5.png';
import carousel6 from '../assets/carousel-6.png';

// Import best collection images
import best1 from '../assets/best-1.jpg';
import best2 from '../assets/best-2.jpg';
import best3 from '../assets/best-3.jpg';
import best4 from '../assets/best-4.jpg';

import '../App.css';

const Home = () => {
  const [apiData, setApiData] = useState([]);

  useEffect(() => {
    async function getData() {
      try {
        const response = await fetch(SummaryApi.category.url, {
          method: SummaryApi.category.method,
        });
        const data = await response.json();
        if (Array.isArray(data.data)) {
          setApiData(data.data);
        } else {
          console.error('API data is not an array:', data);
        }
      } catch (error) {
        console.error('Error fetching API data:', error);
      }
    }
    getData();
  }, []);

  const getRandomCollectionLink = () => {
    if (apiData.length === 0) return '#';
    const randomCollection = apiData.find((collection) => collection.id === 12) || apiData[Math.floor(Math.random() * apiData.length)];
    return `/collections/${randomCollection.id}`;
  };

  return (
    <div>
      {/* Section 1 */}
      <Section className="section1" title="SIMPLY STUNNING" link={getRandomCollectionLink()} image={bgImage} />

      {/* Section 2 - In-between */}
      <InbetweenSection className="inbetween" content="CRAFTING AT IT’S FINEST" />

      {/* Section 3 */}
      <Section className="section2" title="PREMIUM & ANTIQUE" link="https://www.google.com" video={video} />

      {/* Section 4 - Special Carousel */}
      <CarouselSection
        className="section3"
        title="SPECIAL COLLECTION"
        images={[carousel1, carousel2, carousel3, carousel4, carousel5, carousel6]}
        description="Discover Hridhayam’s exquisite craftsmanship—timeless elegance, intricate designs, and pure sophistication. Elevate your style with our exclusive jewelry, crafted to shine as bright as you!"
      />

      {/* Section 5 */}
      <Section className="section4" title="ART OF CRAFTMANSHIP" link="https://www.google.com" image={bgImage3} />

      {/* Section 6 - Best Collection */}
      <BestOfHridhayamSection className="section5" title="BEST OF HRIDHAYAM" images={[bgImage, best2, best3, best4]} link="https://www.google.com" />
    </div>
  );
};

export default Home;
