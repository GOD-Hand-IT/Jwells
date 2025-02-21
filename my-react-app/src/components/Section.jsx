import React from 'react';

function Section({ className, title, image, link }) {
  return (
    <section className={`section w-full relative bg-cover h-[100vh] ${className}`} style={{ backgroundImage: `url(${image})` }}>
      <div className="m-[0px]">
        <div className="font-[lato] font-medium text-white flex-nowrap tracking-[12px] pb-[30px] sm:text-[20px] sm:tracking-[6px] lg:text-[40px] lg:tracking-[12px]">{title}</div>
        <div className="flex">
          
        </div>
      </div>
    </section>
  );
}
function InbetweenSection({content }) {
  return (
    <section className="flex justify-center items-center h-[30vh]">
      <div className="flex justify-center items-center relative font-[lato] text-black text-[20px] tracking-[6px]">{content}</div>
    </section>
  );
}

// CarouselSection Component
function CarouselSection({ className, title, images, description, buttonText }) {
  return (
    <section className={`section ${className}`}>
      {title && <div className="font-[lato] font-medium text-black flex-nowrap tracking-[12px] pb-[30px] sm:text-[20px] sm:tracking-[6px] lg:text-[40px] lg:tracking-[12px]">{title}</div>}
      <div className="absoulte w-[90%] h-[200px] justify-start overflow-x-scroll snap-x snap-mandatory [&::-webkit-scrollbar]:hidden">
        <div className="flex gap-[60px] sm:gap-[90px] relative w-fit items-center pl-350 ">
          {images.map((image, index) => (
            <img className="w-[100px] h-[100px] sm:w-[200px] sm:h-[200px] aspect-square object-cover rounded-full snap-start" key={index} src={image} alt={`Carousel ${index + 1}`} />
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
