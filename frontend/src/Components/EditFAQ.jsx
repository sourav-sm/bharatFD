import React, { useState } from "react";
import axios from "axios";

const EditFAQ = ({ faq, onUpdate }) => {
  const [question, setQuestion] = useState(faq.question);
  const [answer, setAnswer] = useState(faq.answer);

  const api = import.meta.env.VITE_API_BASE_URL;

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const updatedFaq = { ...faq, question, answer };
      await axios.put(`${api}/${faq._id}`, updatedFaq);
      alert("FAQ Updated!");
      onUpdate(updatedFaq);
    } catch (error) {
      console.error("Error updating FAQ:", error);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Edit FAQ</h1>
      <form onSubmit={handleUpdate} className="mt-4 space-y-4">
        <input
          className="border p-2 w-full"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <textarea
          className="border p-2 w-full"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-md w-full"
        >
          Update FAQ
        </button>
      </form>
    </div>
  );
};

export default EditFAQ;


