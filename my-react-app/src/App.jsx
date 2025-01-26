import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import './App.css';
import Context from './context/index.js';

const App = () => {
  return (
    <>
      <Context.Provider value={{

      }} />
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />

    </>
  );
};

export default App;
