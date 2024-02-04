const { DiscussServiceClient } = require("@google-ai/generativelanguage");
const { GoogleAuth } = require("google-auth-library");

const PALM_API_KEY = process.env.PALM_KEY;
const MODEL_NAME = "models/chat-bison-001";

const client = new DiscussServiceClient({
  authClient: new GoogleAuth().fromAPIKey(PALM_API_KEY),
});

module.exports.recommendationPrompt = async (req, res) => {
  const { skinType, skinConcern } = req.body;
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
            content: `I am sending you my skin type and skin concerns, recommend me a skin care routine and return me a json having the following fields :
            1. Description (a brief and elaborative info about the skin type and skin concern user is facing)
            2. Specialized Treatment (give atleast 5 ways for the treatment)
            3. Daily Skin Care Routine (give atleast 5 skin care daily routine for the below skin type and skin concern)
            4. Weekly Skin Care Routine (give atleast 5 skin care weekly routine for the below skin type and skin concern)
            5. Hydration and Diet (give atleast 5 tips to remain hydrated and follow a proper diet)
            6. Advice (give some advices)
            
            Skin Type = ${skinType}
            Skin Concerns = ${skinConcern}
            
            give me the output in this json structure :{
              "skinType": "",
              "skinConcerns": "",
              "description": "",
              "specializedTreatment": ["", "", "", "", "", "", ""],
              "dailyRoutine": ["", "", "", "", ""],
              "weeklyRoutine": ["", "", "", "", ""],
              "hydrationAndDiet": ["", "", ""],
              "advice": ["", "", ""]
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
