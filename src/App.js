import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import About from './components/About/About';
import Orders from './components/Orders/Orders';
import Shop from './components/Shop/Shop';
import Inventory from './inventory/Inventory';
import Main from './layout/Main';
import { ProductAndCardDLoader } from './loaders/ProductAndCardLoader';

function App() {
  const router = createBrowserRouter([
    {
      path: '/', 
      element: <Main></Main>,
      children: [
        {
          path: '/',
          loader: () => fetch('products.json'),
          element: <Shop></Shop>
        },
        {
          path: 'orders',
          loader: ProductAndCardDLoader,
          element: <Orders></Orders>
        },
        {
          path: 'inventory',
          element: <Inventory></Inventory>
        },
        {
          path: 'about', 
          element: <About></About>
        }
      ]
    },
    {
      path: '*',
      element: <div>plz Not Found : 404</div>
    }
  ])
  return (
    <div>
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
