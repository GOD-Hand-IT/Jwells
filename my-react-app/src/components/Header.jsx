import React, { useRef } from 'react';
import { useState, useEffect } from 'react';
import DropdownMenu from './DropdownMenu';
import { toast } from 'react-toastify';
import SummaryApi from '../common/apiConfig';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AlertDialog from './AlertDialog';

function Header() {
  const { isAuthenticated, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [apiData, setApiData] = useState([""]);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();
  const profileDropdownRef = useRef(null);

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

  useEffect(() => {
    function handleClickOutside(event) {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
        setShowProfileDropdown(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    setShowProfileDropdown(false);
    setShowAlert(true);
  };

  const handleConfirmLogout = async () => {
    try {
      const response = await fetch(SummaryApi.logout.url, {
        method: SummaryApi.logout.method,
        credentials: 'include',
      });

      if (response.ok) {
        logout(); // Use context logout
        setShowProfileDropdown(false);
        toast.success('Logged out successfully');
      } else {
        toast.error('Logout failed');
      }
    } catch (error) {
      toast.error('Error during logout');
    }
    setShowAlert(false);
  };

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
    <>
      <AlertDialog
        isOpen={showAlert}
        message="Are you sure you want to logout?"
        onConfirm={handleConfirmLogout}
        onCancel={() => setShowAlert(false)}
      />

      <div className="flex flex-col text-center justify-evenly shadow-lg h-[150px]">
        <div className="font-[cinzel] font-thin text-black text-[36px]">HRIDHAYAM</div>
        <nav>
          <ul id="menu" className="inline-block justify-center mt-[30px] list-none nav-links">
            <li className="inline block relative text-[#41444B] hover:text-[#FFD700] font-[cinzel] font-medium text-[12px]" ><Link to='/'>HOME</Link></li>
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
            <li className="inline block relative text-[#41444B] hover:text-[#FFD700] font-[cinzel] font-medium text-[12px]"><Link to={"/our-story"}>OUR STORY</Link></li>
            <li className="inline block relative text-[#41444B] hover:text-[#FFD700] font-[cinzel] font-medium text-[12px]"><Link to='/customize-design'>CUSTOMIZE DESIGN</Link></li>
            <li className="inline block relative text-[#41444B] hover:text-[#FFD700] font-[cinzel] font-medium text-[12px]" ><Link to='/contact' >CONTACT</Link></li>
            {/* Desktop profile icon */}
            
          </ul>
          <div className="inline block absolute text-[#41444B] top-[103px] right-[100px] hover:text-[#FFD700] font-[cinzel] font-medium text-[12px]"><Link to='/cart'><svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
      width="20"
      height="20"
    >
      <circle cx="9" cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2 12h13l2-7H5" />
    </svg></Link></div>
          <div className=" absolute top-[100px] right-[10px] inline-block ">
              {isAuthenticated ? (
                <div className="relative" ref={profileDropdownRef}>
                  <Link
                    to="/profile"
                    className="inline-block p-2q rounded"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#41444B] hover:text-[#FFD700]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </Link>
                  <button
                    onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                    className="ml-1 p-1 rounded-full "
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#41444B] hover:text-[#FFD700]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {showProfileDropdown && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 z-50 border border-gray-100">
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#B4975A]"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link to="/login" className="flex items-center space-x-2 text-[#B4975A] hover:text-[#8B7355]">
                  Login
                </Link>
              )}
            </div>
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
    </>
  );
}

export default Header;
