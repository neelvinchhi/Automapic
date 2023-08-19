import { Configuration, OpenAIApi } from "openai";

export default async (req, res) => {
  if (req.method !== "POST") {
    return res.json({response: "Method not allowed."});
  }

  const prompt = `Give a detailed summary on the topic below. The nodeDataArray and linkDataArray variables should be in an array format. Each element in the array represents a node or a link in the mind map. Only the contents of the arrays should be provided.

  For the nodeDataArray, each node object should have the following properties:

  key: A unique identifier for the node.
  text: The text content of the node.
  color: The color of the node. It should never be black or very dark colour. 
  loc: The location coordinates of the node on the diagram.

  For the linkDataArray, each link object should have the following properties:
  key: A unique identifier for the link.
  from: The key of the source node.
  to: The key of the target node.

  The main topic should be in the centre with subtopics branching from it in all directions. Every single subtopic should have only one branch (which is attached to the main topic or it's parent topic). Nothing should overlap and links shouldn't intersect and must be under 30px in length. Make sure the topics are in chronological order and the mind map is easy to understand. 
  Give the output exclusively in the form of a json dictionary object which contains 'nodeDataArray' and 'linkDataArray' as keys and the corresponding arrays as values. Do not return anything that is invalid json.
  The topic is: 
  `+ req.body.prompt;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });  // Bad Request
  }
  const key = process.env.KEY
  const configuration = new Configuration({apiKey: key});
  const openai = new OpenAIApi(configuration);

  try {
    const messages = [{ role: "system", content: "You are a helpful assistant." }, { role: "user", content: prompt }];

    const gptResponse = await openai.createChatCompletion({
      model: "gpt-3.5-turbo", // Use the latest model recommended for chat applications
      messages: messages,
    });

    if (gptResponse.data.choices && gptResponse.data.choices.length > 0) {
      const text = gptResponse.data.choices[0].message.content.trim();
      res.json({ response: JSON.parse(text) });
    } else {
      res.status(500).json({ error: "Failed to get a response from ChatGPT" });
    }
  } catch (error) {
    console.error("OpenAI Error:", error);
    res.status(500).json({ error: "An error occurred while communicating with ChatGPT" });
  }
};
