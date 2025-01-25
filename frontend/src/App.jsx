import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Users from "./Users";
import UserDetails from "./UserDetails";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/admin" element={<Users />} />
        <Route path="/user/:userId" element={<UserDetails />} />
      </Routes>
    </Router>
  );
};

export default App;