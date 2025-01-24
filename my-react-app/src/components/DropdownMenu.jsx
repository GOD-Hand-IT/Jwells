import React, { useEffect, useRef } from 'react';

const DropdownMenu = ({ title, items, header }) => {
  const menuRef = useRef(null);

  useEffect(() => {
    const menuElement = menuRef.current;

    const handleDropdownClick = (e) => {
      e.preventDefault();

      // Close other open dropdowns
      menuElement.querySelectorAll('.dropdown').forEach((dropdown) => {
        if (dropdown !== e.currentTarget.parentElement) {
          dropdown.classList.remove('active');
        }
      });

      // Toggle the active class on the current dropdown
      e.currentTarget.parentElement.classList.toggle('active');
    };

    const handleOutsideClick = (e) => {
      if (!e.target.closest('.dropdown')) {
        menuElement.querySelectorAll('.dropdown').forEach((dropdown) => {
          dropdown.classList.remove('active');
        });
      }
    };

    const manageHoverFunctionality = () => {
      const isMobile = window.innerWidth <= 768;

      // Dropdown toggles
      const dropdownToggles = menuElement.querySelectorAll('.dropdown-toggle');

      dropdownToggles.forEach((toggle) => {
        if (toggle.textContent === 'ALL COLLECTIONS') {
          // Disable hover functionality for "ALL COLLECTIONS"
          toggle.parentElement.classList.remove('hover-enabled');
        } else if (isMobile) {
          // Add click functionality
          toggle.addEventListener('click', handleDropdownClick);

          // Remove hover functionality
          toggle.parentElement.classList.remove('hover-enabled');
        } else {
          // Enable hover functionality for desktop
          toggle.parentElement.classList.add('hover-enabled');

          // Remove click functionality for hover-enabled dropdowns
          toggle.removeEventListener('click', handleDropdownClick);
        }
      });
    };

    // Add event listeners for resize and initial hover management
    window.addEventListener('resize', manageHoverFunctionality);
    document.addEventListener('click', handleOutsideClick);

    // Initial check for hover functionality
    manageHoverFunctionality();

    // Cleanup event listeners
    return () => {
      window.removeEventListener('resize', manageHoverFunctionality);
      document.removeEventListener('click', handleOutsideClick);

      // Remove all click handlers on unmount
      menuElement
        .querySelectorAll('.dropdown-toggle')
        .forEach((toggle) =>
          toggle.removeEventListener('click', handleDropdownClick)
        );
    };
  }, []);

  return (
    <li className="dropdown" ref={menuRef}>
      <a href="#" className="dropdown-toggle">{title}</a>
      <div className="dropdown-content">
        {header && <h3>{header}</h3>}
        {items.map((item, index) => (
          <a href="#" key={index}>{item}</a>
        ))}
      </div>
    </li>
  );
};

export default DropdownMenu;
