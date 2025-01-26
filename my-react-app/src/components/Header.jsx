import React from 'react';
import { useState, useEffect } from 'react';
import DropdownMenu from './DropdownMenu';
import { toast } from 'react-toastify';

import SummaryApi from '../common/apiConfig'; // Import the SummaryApi configuration
import { NavLink, Link } from 'react-router-dom';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Tracks menu state
  const [apiData, setApiData] = useState([""]); // State to store API data as string[]

  useEffect(() => {
    // Set the initial height of the menu to 0vh when the page loads
    const menu = document.getElementById('menu');
    if (menu) {
      menu.style.maxHeight = '0vh';
    }

    // Fetch data from API
    async function getData() {
      try {
        const response = await fetch(SummaryApi.category.url, {
          method: SummaryApi.category.method
        });
        const data = await response.json();
        if (Array.isArray(data.data)) {
          setApiData(data.data);
          toast.success("API data fetched successfully");
        } else {
          console.error("API data is not an array of strings:", data);
        }
        console.log("API data fetched successfully:", data.data);
      } catch (error) {
        console.error("Error fetching API data:", error);
      }
    }

    // Call the initialization functions
    getData();
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
          <li><Link to='/'>HOME</Link></li>
          <DropdownMenu
            title="ALL COLLECTIONS"
            items={apiData}
            endpoints={'collection'}
            renderItem={(item, index) => (
              <Link to="/collection" state={{ collectionName: item }}>
                {item}
              </Link>
            )}
          />
          <li><Link to={"Sales"}>SALE</Link></li>
          <li><a href="#custom">CUSTOMIZE DESIGN</a></li>
          <li><Link to='/cart'>CART</Link></li>
          <DropdownMenu
            title="ACCOUNT"
            items={accountItems}
            header="USERNAME"
            up="up"
            renderItem={(item, index) => (
              <Link
                to={{
                  pathname: '/account',
                  state: { accountItem: item }
                }}
                key={index}
              >
                {item}
              </Link>
            )}
          />
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
    </div >
  );
}

export default Header;
