import React from 'react';

function Section({ className, title, image, link }) {
  return (
    <section className={`section ${className}`} style={{ backgroundImage: `url(${image})` }}>
      <div className="explore-close-center">
        <div className="home">{title}</div>
        <div className="flex">
          <div className="frame">
            <div className="text-wrapper"><a href={link}>EXPLORE</a></div>
          </div>
        </div>
      </div>
    </section>
  );
}
function InbetweenSection({ className, content }) {
  return (
    <section className={className}>
      <div className="home-9">{content}</div>
    </section>
  );
}

// CarouselSection Component
function CarouselSection({ className, title, images, description, buttonText }) {
  return (
    <section className={`section ${className}`}>
      {title && <div className="home-5">{title}</div>}
      <div className="carousel-wrapper">
        <div className="carousel">
          {images.map((image, index) => (
            <img key={index} src={image} alt={`Carousel ${index + 1}`} />
          ))}
        </div>
      </div>
      {description && <p>{description}</p>}
      {buttonText && (
        <div className="frame2">
          <div className="text-wrapper2">
            <a href="https://www.google.com" target="_blank" rel="noopener noreferrer">
              {buttonText}
            </a>
          </div>
        </div>
      )}
    </section>
  );
}

export { Section, InbetweenSection, CarouselSection };
