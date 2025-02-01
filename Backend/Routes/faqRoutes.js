const express=require("express");
const router=express.Router();
const faqController=require('../controllers/faqControllers');

router.post("/", faqController.createFAQ);
router.get("/", faqController.getFAQs);
router.get("/:id", faqController.getFaqById);
router.put("/:id", faqController.updateFaq); 
router.delete("/:id", faqController.deleteFaq);

module.exports=router;