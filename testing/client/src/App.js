import React from 'react';
import { BrowserRouter, Route, Routes} from "react-router-dom";

import './App.css';

import Login from "./components/login";
import Home from "./components/home";
import Search from "./components/search";
import Stocklist from "./components/stocklist";
import Setting from "./components/setting";
import Contact from "./components/contact";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/stocklist" element={<Stocklist />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/settings" element={<Setting />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
export default App;