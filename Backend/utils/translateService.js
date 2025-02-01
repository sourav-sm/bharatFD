const { Translate } = require("@google-cloud/translate").v2;

const translate = new Translate({
  key: process.env.GOOGLE_APPLICATION_CREDENTIALS, 
});

exports.translateText = async (text, targetLang) => {
  try {
    if (!text) {
      throw new Error("No text provided for translation");
    }
    if (!targetLang) {
      throw new Error("No target language specified");
    }

    const [translatedText] = await translate.translate(text, targetLang);
    
    console.log(`✅ Translated to [${targetLang}]:`, translatedText); 

    return translatedText;
  } catch (error) {
    console.error("❌ Translation Error:", error);
    return text;
  }
};


