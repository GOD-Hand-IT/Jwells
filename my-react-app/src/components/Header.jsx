import React from 'react';
import { useState, useEffect } from 'react';
import DropdownMenu from './DropdownMenu';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Tracks menu state

  useEffect(() => {
    // Set the initial height of the menu to 0vh when the page loads
    const menu = document.getElementById('menu');
    if (menu) {
      menu.style.maxHeight = '0vh';
    }
  }, []);

  const toggleMenu = () => {
    const menu = document.getElementById('menu');
    if (menu.style.maxHeight === '70vh') {
      menu.style.maxHeight = '0vh';
      setIsMenuOpen(false); // Remove "change" class
    } else {
      menu.style.maxHeight = '70vh';
      setIsMenuOpen(true); // Add "change" class
    }
  };

  const allCollectionsItems = [
    "Uncut Polki", "Antique Nakshi Kundan", "Diamond Finish Jewellery",
    "Antique nakshi kundan", "Diamond finish jewellery", "Haaram",
    "Necklace", "Chokers", "Pendant sets", "Statement earrings",
    "Bangles", "Waistbelts"
  ];

  const accountItems = [
    "Profile", "Help", "Logout"
  ];

  return (
    <div className="Header">
      <div className="logo">HRIDHAYAM</div>
      <nav>
        <ul id="menu" className="nav-links">
          <li><a href="#home">HOME</a></li>
          <DropdownMenu title="ALL COLLECTIONS" items={allCollectionsItems} />
          <li><a href="#sale">SALE</a></li>
          <li><a href="#custom">CUSTOMIZE DESIGN</a></li>
          <li><a href="#cart">CART</a></li>
          <DropdownMenu title="ACCOUNT" items={accountItems} header="USERNAME" up="up"/>
        </ul>
      </nav>
      <div
        className={`container ${isMenuOpen ? "change" : ""}`}
        onClick={toggleMenu}
      >
        <div className="bar1"></div>
        <div className="bar2"></div>
        <div className="bar3"></div>
      </div>
    </div>
  );
}

export default Header;
