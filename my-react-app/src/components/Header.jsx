import React from 'react';
import DropdownMenu from './DropdownMenu';

function Header() {
  const toggleMenu = () => {
    const menu = document.getElementById('menu');
    if (menu) {
      menu.style.maxHeight = menu.style.maxHeight === '0vh' ? '70vh' : '0vh';
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
          <DropdownMenu title="ACCOUNT" items={accountItems} header="USERNAME" />
        </ul>
      </nav>
      <div className="container" onClick={(e) => { toggleMenu(); myFunction(e); }}>
        <div className="bar1"></div>
        <div className="bar2"></div>
        <div className="bar3"></div>
      </div>
    </div>
  );
}

export default Header;
