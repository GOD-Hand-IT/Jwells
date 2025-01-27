import { createBrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import Home from './pages/home';
import Collection from './pages/collection.jsx';
import Product from './pages/product.jsx';
import Cart from './pages/cart.jsx';
import FormPage from './pages/customizedesign.jsx';
import Login from './components/Login.jsx';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '',
                element: <Home />
            },
            {
                path: '/collection',
                element: <Collection />
            },
            {
                path: '/customize-design',
                element:<FormPage/>
            },
            {
                path: '/login',
                element:<Login/>
            }
        ]
    },
    {
        path: 'cart',
        element: <Cart />
    },
    {
        path: '/:name',
        element: <Product />
    }
]);
