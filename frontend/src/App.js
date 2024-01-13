import React, { useContext } from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import "./style.scss";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Update from "./pages/Update";
import Footer from "./components/Footer";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";
import PaymentGateway from "./pages/PaymentGateway";
import Employ from "./pages/Employ";
import AddEmp from "./pages/AddEmp";
import NotFound from "./pages/NotFound";
import { AuthContext } from './context/AuthContext';

function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/user/update", element: <Update /> },
      { path: "/contact", element: <Contact /> },
      { path: "/about", element: <About /> },
      { path: "/donate", element: <PaymentGateway /> },
      { path: "/employ/edit/:id", element: <Employ /> },
      { path: "/employ/add", element: <AddEmp /> },  // Remove userId from here
      { path: "/*", element: <NotFound /> },
    ],
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/user/dashboard",
    element: <Dashboard />,
  },
]);

function App() {
  const { currentUser } = useContext(AuthContext); // Add this line
  return (
    <div className="app">
      <div className="container">
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
