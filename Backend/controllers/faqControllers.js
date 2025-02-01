const FAQ = require("../models/faqModel");
const redis = require("redis");
const { translateText } = require("../utils/translateService");

// Redis Client Setup
const client = redis.createClient({
  socket: {
    host: process.env.REDIS_HOST || "127.0.0.1",
    port: process.env.REDIS_PORT || 6379
  }
});

client.on("error", (err) => {
  console.error("Redis Error:", err);
});

(async () => {
  await client.connect();
  console.log("Connected to Redis ✅");
})();

//Fetch FAQs with Caching
exports.getFAQs = async (req, res) => {
  try {
    const lang = req.query.lang || "en";
    const cacheKey = `faqs_${lang}`;


    const cachedData = await client.get(cacheKey);
    if (cachedData) {
      console.log("Cache Hit ✅");
      return res.json(JSON.parse(cachedData));
    }

    console.log("Cache Miss ❌ - Fetching from DB...");
    
    const faqs = await FAQ.find();

    // Process Response (Fetch Correct Language or Default to English)
    const response = faqs.map(faq => ({
      _id:faq._id,
      question: faq[`question_${lang}`] || faq.question, // Fetch translated question or default
      answer: faq[`answer_${lang}`] || faq.answer // Fetch translated answer or default
    }));

    //Redis Cache for 1 Hour
    await client.set(cacheKey, JSON.stringify(response), { EX: 3600 });

    res.json(response);
  } catch (error) {
    console.error("Error fetching FAQs:", error);
    res.status(500).json({ error: "Server error" });
  }
};

//  Fetch Single FAQ by ID
exports.getFaqById=async (req,res)=>{
    try{
       const {id}=req.params;
       const lang=req.query.lang || "en";

       const faq=await FAQ.findById(id);
       if(!faq){
         return res.status(404).json({ error: "FAQ not found" });
       }
       
       res.json({
        _id: faq._id,
        question: faq[`question_${lang}`] || faq.question,
        answer: faq[`answer_${lang}`] || faq.answer,
      });
    }catch(error){
        console.error("Error fetching FAQ:", error);
        res.status(500).json({ error: "Server error" }); 
    }
}


// Create FAQ with Auto-Translation
exports.createFAQ = async (req, res) => {
  try {
    const { question, answer } = req.body;

    //Translate the Question and Answer into Different Languages
    const translations = {
      question_hi: await translateText(question, "hi"),
      question_bn: await translateText(question, "bn"),
      question_fr: await translateText(question, "fr"),
      answer_hi: await translateText(answer, "hi"),
      answer_bn: await translateText(answer, "bn"),
      answer_fr: await translateText(answer, "fr"),
    };

    //Create and Save New FAQ
    const faq = new FAQ({
      question, 
      answer,
      ...translations
    });

    await faq.save();

    //Clear All Cached Languages After Insert
    const cacheKeys = ["faqs_en", "faqs_hi", "faqs_bn", "faqs_fr"];
    for (let key of cacheKeys) {
      await client.del(key);
    }

    res.status(201).json(faq);
  } catch (error) {
    console.error("Error creating FAQ:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// ✅ Update FAQ
exports.updateFaq = async (req, res) => {
    try {
      const { id } = req.params;
      const { question, answer } = req.body;
  
      const faq = await FAQ.findById(id);
      if (!faq) {
        return res.status(404).json({ error: "FAQ not found" });
      }
  
      // If question/answer is updated, translate again
      let translations = {};
      if (question) {
        translations.question_hi = await translateText(question, "hi");
        translations.question_bn = await translateText(question, "bn");
        translations.question_fr = await translateText(question, "fr");
      }
      if (answer) {
        translations.answer_hi = await translateText(answer, "hi");
        translations.answer_bn = await translateText(answer, "bn");
        translations.answer_fr = await translateText(answer, "fr");
      }
  
      // Update FAQ in DB
      const updatedFaq = await FAQ.findByIdAndUpdate(
        id,
        { question, answer, ...translations },
        { new: true }
      );
  
      // Clear Cache
      const cacheKeys = ["faqs_en", "faqs_hi", "faqs_bn", "faqs_fr"];
      for (let key of cacheKeys) {
        await client.del(key);
      }
  
      res.json(updatedFaq);
    } catch (error) {
      console.error("Error updating FAQ:", error);
      res.status(500).json({ error: "Server error" });
    }
  };


// ✅ Delete FAQ
exports.deleteFaq = async (req, res) => {
    try {
      const { id } = req.params;
      const faq = await FAQ.findByIdAndDelete(id);
  
      if (!faq) {
        return res.status(404).json({ error: "FAQ not found" });
      }
  
      // Clear Cache
      const cacheKeys = ["faqs_en", "faqs_hi", "faqs_bn", "faqs_fr"];
      for (let key of cacheKeys) {
        await client.del(key);
      }
  
      res.json({ message: "FAQ deleted successfully" });
    } catch (error) {
      console.error("Error deleting FAQ:", error);
      res.status(500).json({ error: "Server error" });
    }
  };