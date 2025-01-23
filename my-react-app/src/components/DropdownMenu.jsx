import React, { useEffect, useRef } from 'react';

const DropdownMenu = ({ children }) => {
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

      if (isMobile) {
        // Add click functionality
        dropdownToggles.forEach((toggle) =>
          toggle.addEventListener('click', handleDropdownClick)
        );

        // Remove hover functionality
        dropdownToggles.forEach((toggle) =>
          toggle.parentElement.classList.remove('hover-enabled')
        );
      } else {
        // Enable hover functionality for desktop
        dropdownToggles.forEach((toggle) =>
          toggle.parentElement.classList.add('hover-enabled')
        );

        // Remove click functionality for hover-enabled dropdowns
        dropdownToggles.forEach((toggle) =>
          toggle.removeEventListener('click', handleDropdownClick)
        );
      }
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

  return <div ref={menuRef}>{children}</div>;
};

export default DropdownMenu;
