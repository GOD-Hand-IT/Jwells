import { useState } from 'react'
import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/home';
import Collection from './pages/collection.jsx'
import Product from './pages/product.jsx'
import './App.css'



const App = () => {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/collection' element={<Collection/>}/>
        <Route path='/product' element={<Product/>}/>
      </Routes>
      <Footer/>
    </div>
  )
}

export default App
