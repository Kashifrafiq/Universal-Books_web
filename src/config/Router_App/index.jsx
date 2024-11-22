import * as React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  createRoutesFromElements,
  Routes,
} from "react-router-dom";
import Home from "../../Pages/Home";
import Navbar from "../../component/Navbar";
import Login from "../../Pages/Login";
import Signup from "../../Pages/Signup";
import Dashboard from "../../Pages/Dashboard";
import AlbumDetails from "../../Pages/Album-Details/AlbumDetails";
import Subscription from "../../Pages/Subscription/Subscription";
import Albums from "../../Pages/Album-List/Album-list";



const router = createBrowserRouter(createRoutesFromElements(
  <Route element={<Navbar/>}>

    <Route path="/" element={< Home/>} />
    <Route path="/signup" element={<Signup/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/dashboard" element={<Dashboard/>}/>
    <Route path="/album-details" element={<AlbumDetails/>}/>
    <Route path="/account" element={<Subscription />}/>
    <Route path="/album-list" element={<Albums />}/>
  </Route>
))



const Router_App = () => {
  
    
  return(

    <RouterProvider router={router} />
  ) 
  
}

export default Router_App
