import React from 'react';
import './Header.css';

function Header() {
  const toggleMenu = () => {
    const menu = document.getElementById('menu');
    menu.style.maxHeight = menu.style.maxHeight === '0vh' ? '70vh' : '0vh';
  };

  return (
    <header>
      <div className="logo">HRIDHAYAM</div>
      <nav>
        <ul id="menu" className="nav-links">
          <li><a href="#home">HOME</a></li>
          <li className="dropdown">
            <a href="#" className="dropdown-toggle">ALL COLLECTIONS</a>
            <div className="dropdown-content">
              <a href="#">Uncut Polki</a>
              <a href="#">Antique Nakshi Kundan</a>
              <a href="#">Diamond Finish Jewellery</a>
              {/* Add more links here */}
            </div>
          </li>
          <li><a href="#sale">SALE</a></li>
          <li><a href="#custom">CUSTOMIZE DESIGN</a></li>
          <li><a href="#cart">CART</a></li>
          <li className="dropdown">
            <a className="dropdown-toggle" href="#">ACCOUNT</a>
            <div className="dropdown-content up">
              <h3>USERNAME</h3>
              <a href="#">Profile</a>
              <a href="#">Help</a>
              <a href="#">Logout</a>
            </div>
          </li>
        </ul>
      </nav>
      <div className="container" onClick={toggleMenu}>
        <div className="bar1"></div>
        <div className="bar2"></div>
        <div className="bar3"></div>
      </div>
    </header>
  );
}

export default Header;
