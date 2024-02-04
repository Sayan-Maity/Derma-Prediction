const { DiscussServiceClient } = require("@google-ai/generativelanguage");
const { GoogleAuth } = require("google-auth-library");

const PALM_API_KEY = process.env.PALM_KEY;
const MODEL_NAME = "models/chat-bison-001";

const client = new DiscussServiceClient({
  authClient: new GoogleAuth().fromAPIKey(PALM_API_KEY),
});

module.exports.educationPrompt = async (req, res) => {
  const { disease } = req.body;
  try {
    const result = await client.generateMessage({
      model: MODEL_NAME,
      temperature: 0.25,
      top_k: 40,
      top_p: 0.95,
      candidateCount: 1,
      prompt: {
        context: "",
        examples: [],
        messages: [
          {
            content: `I am sending you a skin disease name, upon that return me a json having the following fields:
            1.  Name (name of the disease)
            2. Description (a brief 200 words description about the disease)
            3. Symptoms (give atleast 10 symptoms of the disease)
            4. Causes (give atlease 5 causes of the disease)
            5. Prevention (give atleast 3 best possible way for the prevention of this disease)
            
            Disease name = ${disease}
            
            give me the output in json :{
              "name" : "",
              "description": "",
              "symptoms": ["", "", "", "", "", "", "", "", "", ""],
              "causes": ["", "", "", "", ""],
              "prevention": ["", "", ""]
            }`,
          },
        ],
      },
    });

    if (result && Array.isArray(result) && result.length > 0) {
      const firstCandidate = result[0].candidates[0];

      if (firstCandidate) {
        const content = firstCandidate.content;
        // console.log(content);
        return res.json({ content });
        // jsonParser(content);
      } else {
        console.log("No valid candidate found");
        res.status(500).json({ error: "Internal Server Error" });
      }
    } else {
      console.log("Invalid response format");
      res.status(500).json({ error: "Internal Server Error" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
