const mongoose = require("mongoose");

const faqSchema = new mongoose.Schema({
    question: { type: String, required: true }, 
    answer: { type: String, required: true },
    
    question_hi: { type: String },
    question_bn: { type: String },
    question_fr: { type: String },
    
    answer_hi: { type: String },
    answer_bn: { type: String },
    answer_fr: { type: String }
});

const FAQ = mongoose.model("FAQ", faqSchema);
module.exports = FAQ;


