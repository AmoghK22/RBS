import React, { useState, useEffect } from "react";
import "./index.css";
import Menubar from "./components/Menubar/Menubar";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import Explore from "./pages/Explore/Explore";
import ManageCategories from "./pages/ManageCategories/ManageCategories";
import ManageItems from "./pages/ManageItems/ManageItems";
import ManageUsers from "./pages/ManageUsers/ManageUsers";
import Login from "./pages/Login/Login";
import { useUser } from "./UserContext.jsx";

function App(){
  const { user } = useUser();


  return(
    <div>
     <Menubar/>
      <div className="pt-16 px-4"></div>
   

    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="/explore" element={<Explore/>}/>
      <Route path="/login" element={<Login/>}/>


       {user?.role === "ADMIN" && (
        <>
      <Route path="/manageCategories" element={<ManageCategories/>}/>
      <Route path="/manageItems" element={<ManageItems/>}/>
      <Route path="/manageUsers" element={<ManageUsers/>}/>
      </>
       )}
      

    </Routes>
     </div>
  )
}

export default App;