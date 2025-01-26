import { createBrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import Home from './pages/home';
import Collection from './pages/collection.jsx';
import Product from './pages/product.jsx';
import Cart from './pages/cart.jsx';

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
