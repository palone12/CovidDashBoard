import React from 'react';
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import Home from './Pages/Home';
import './App.css';
import Charts from './Pages/Charts';
import Contact from './Pages/Contact';
import Layout from './Components/Layout';

const RouteProvider = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/contacts',
        element: <Contact />
      },
      {
        path: '/charts',
        element: <Charts />
      }
    ]
  },
]);

function App() {
  return (
    <RouterProvider router={RouteProvider} />
  );
}

export default App;