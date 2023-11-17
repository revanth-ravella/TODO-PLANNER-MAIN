// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Firstpage from "./screens/Firstpage";
import Todoplanner from "./screens/Todoplanner";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Firstpage />} />
        <Route path="/Todoplanner/:inputNumber" element={<Todoplanner />} />
      </Routes>
    </Router>
  );
}

export default App;