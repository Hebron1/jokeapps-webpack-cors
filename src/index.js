import React from 'react';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Register from './components/Register';
import { AuthProvider } from './context/AuthContext';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './components/Login';
import EditJoke from './components/EditJoke';
import { Toaster } from 'sonner';
import NotFound404 from './components/NotFound404';
import Dashboard from './components/Dashboard';
import AddJoke from './components/AddJoke';
import ScoreJoke from './components/ScoreJoke';

const router = createBrowserRouter([
    {path: '/*', element: <NotFound404 />},
    {path: '/', element: <Login />},
    {path: '/register', element: <Register />},
    {path: '/dashboard', element: <Dashboard />},
    {path: '/dashboard/score', element: <ScoreJoke />},
    {path: '/add-joke', element: <AddJoke />},
    {path: '/edit-joke/:id', element: <EditJoke />},
])

const App = () => {
    return (
        <>
        <Toaster position='top-center' />
        <AuthProvider>
        <RouterProvider router={router}>
            <Login />
        </RouterProvider>
        </AuthProvider>
        </>
    )
};
{/* <h1>Hello, React with Webpack and JSX!</h1> */}
const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
