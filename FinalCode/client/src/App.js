import React from 'react';
import { BrowserRouter, Route, Routes} from "react-router-dom";

import './App.css';

import Login from "./components/login";
import ForgetPwd from "./components/forgetpwd";
import Signup from "./components/signup";
import Home from "./components/home";
import Search from "./components/search";
import Stocklist from "./components/stocklist";
import Setting from "./components/setting";
import Contact from "./components/contact";
import Search_main from "./components/search_main"
import Verify from "./components/verify";
import ResetPwd from "./components/restpwd";
import Userlist from "./components/userlist";
import Home_pop from "./components/home_pop";

function App() {

  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/verify/:username/:id" element={<Verify />}/>
          <Route path="/resetpwd/:username/:id" element={<ResetPwd />}/>
          <Route path="/signup" element={<Signup />} />
          <Route path="/findaccount" element={<ForgetPwd />} />
          <Route path="/home/:username" element={<Home />} />
          <Route path="/search/:username/:stock" element={<Search />} />
          <Route path="/stocklist/" element={<Stocklist />} />
          <Route path="/stocklist/:username" element={<Stocklist />} />
          <Route path="/contact/" element={<Contact />} />
          <Route path="/contact/:username" element={<Contact />} />
          <Route path="/settings/:username" element={<Setting />} />
          <Route path="/search_main/" element={<Search_main/>}/>
          <Route path="/search_main/:username" element={<Search_main/>}/>
          <Route path="/userlist/:username" element={<Userlist />}/>
          <Route path="/search/:stock" element={<Search />} />
          <Route path="/home/:username/popular" element={<Home_pop />} />
          <Route path="/home/popular" element={<Home_pop />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
export default App;