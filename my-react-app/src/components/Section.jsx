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

export default Section;
