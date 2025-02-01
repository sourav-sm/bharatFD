import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import FAQList from "./Components/FAQList";
import AdminPage from "./pages/AdminPage";
import './App.css'

function App() {
  return (
    <>
      <Router>
      <nav className="bg-gray-100 p-4 flex gap-4">
        <Link to="/" className="text-blue-500">Home</Link>
        <Link to="/admin" className="text-blue-500">Admin</Link>
      </nav>
      <Routes>
        <Route path="/" element={<FAQList />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </Router>
    </>
  )
}

export default App;



