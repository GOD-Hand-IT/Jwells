import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import './App.css';
import Context from './context/index.js';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <>
      <Context.Provider value={{

      }} />
      <ToastContainer />
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />


    </>
  );
};

export default App;
