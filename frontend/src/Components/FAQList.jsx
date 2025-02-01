import React, { useEffect, useState } from "react";
import axios from "axios";
import EditFAQ from "./EditFAQ";

const FaqList = () => {
  const [faqs, setFaqs] = useState([]);
  const [lang, setLang] = useState("en");
  const [selectedFaq, setSelectedFaq] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const api = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    axios.get(`${api}?lang=${lang}`).then((res) => {
      setFaqs(res.data);
    });
  }, [lang]);

  // Handle delete function
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this FAQ?")) return;

    try {
      const response = await axios.delete(`${api}/${id}`);
      if (response.status === 200) {
        setFaqs(faqs.filter((faq) => faq._id !== id));
      } else {
        console.error("Failed to delete FAQ");
      }
    } catch (error) {
      console.error("Error deleting FAQ:", error);
    }
  };

  // Open Edit Modal
  const handleEditClick = (faq) => {
    setSelectedFaq(faq);
    setIsModalOpen(true);
  };

  // Handle FAQ Update
  const handleUpdate = (updatedFaq) => {
    setFaqs((prevFaqs) =>
      prevFaqs.map((faq) => (faq._id === updatedFaq._id ? updatedFaq : faq))
    );
    setIsModalOpen(false);
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">FAQs</h2>
      <select
        onChange={(e) => setLang(e.target.value)}
        className="mb-4 p-2 border"
      >
        <option value="en">English</option>
        <option value="hi">Hindi</option>
        <option value="bn">Bengali</option>
        <option value="fr">French</option>
      </select>

      {faqs.length === 0 ? (
        <p className="text-gray-500">No FAQs available.</p>
      ) : (
        <ul className="space-y-4">
          {faqs.map((faq) => (
            <li key={faq._id} className="p-4 bg-white shadow-md rounded-lg">
              <h2 className="text-2xl font-bold text-gray-800">{faq.question}</h2>
              <p className="mt-4 text-gray-600">{faq.answer}</p>
              <div className="mt-4 flex space-x-4">
                <button
                  onClick={() => handleEditClick(faq)}
                  className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(faq._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Modal for Editing FAQ */}
      {isModalOpen && selectedFaq && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-4 text-gray-600"
            >
              ✕
            </button>
            <EditFAQ faq={selectedFaq} onUpdate={handleUpdate} />
          </div>
        </div>
      )}
    </div>
  );
};

export default FaqList;
