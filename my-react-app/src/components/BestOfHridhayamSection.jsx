import React, { useRef } from 'react';

function BestOfHridhayamSection({ className, title, images, link }) {
  const carouselRef = useRef(null);

  return (
    <section className={`section ${className}`}>
      <div className="home-5">{title}</div>
      <div className="best-carousal-wrapper">
        <div className="best-carousal" ref={carouselRef}>
          {images.map((image, index) => (
            <img key={index} src={image} alt={`Best Carousel ${index + 1}`} />
          ))}
        </div>
      </div>
      <div className="frame2">
        <div className="text-wrapper2">
          <a href={link} target="_blank" rel="noopener noreferrer">
            EXPLORE
          </a>
        </div>
      </div>
    </section>
  );
}

export default BestOfHridhayamSection;
