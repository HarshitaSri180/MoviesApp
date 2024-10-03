import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./components/Homepage/index"; 
import MyList from "./components/myList"; 
import Logout from "./components/logout";

export default function App() {
  const [myList, setMyList] = useState([]); 

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/logout" element={<Logout />} />
        <Route exact path="/myList" element={<MyList myList={myList} />} />
        <Route exact path="/" element={<Homepage setMyList={setMyList} />} />
      </Routes>
    </BrowserRouter>
  );
}
