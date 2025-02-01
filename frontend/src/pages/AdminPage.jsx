import React from 'react';
import { useState} from "react";
import axios from "axios";

function AdminPage() {
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");

    const api=import.meta.env.VITE_API_BASE_URL;
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      await axios.post(api, { question, answer });
      setQuestion("");
      setAnswer("");
      alert("FAQ Added!");
    };
  
    return (
      <div className="p-6 max-w-xl mx-auto">
        <h1 className="text-2xl font-bold">Admin Panel</h1>
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <input className="border p-2 w-full" placeholder="Question" value={question} onChange={(e) => setQuestion(e.target.value)} />
          <textarea className="border p-2 w-full" placeholder="Answer" value={answer} onChange={(e) => setAnswer(e.target.value)} />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded-md w-full cursor-pointer">Add FAQ</button>
        </form>
      </div>
    );
  }

export default AdminPage;