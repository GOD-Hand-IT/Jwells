import React from 'react';
import DropdownMenu from './DropdownMenu';

function Header() {
  const toggleMenu = () => {
    const menu = document.getElementById('menu');
    menu.style.maxHeight = menu.style.maxHeight === '0vh' ? '70vh' : '0vh';
  };

  return (
    <div className="Header">
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
              <a href="#">Antique nakshi kundan</a>
              <a href="#">Diamond finish jewellery</a>
              <a href="#">Haaram</a>
              <a href="#">Necklace</a>
              <a href="#">Chokers</a>
              <a href="#">Pendant sets</a>
              <a href="#">Statement earrings</a>
              <a href="#">Bangles</a>
              <a href="#">Waistbelts</a>
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
    </div>
  );
}

export default Header;
