import {
  GoogleGenAI,
} from '@google/genai';

async function AIChatSession(prompt) {
  const ai = new GoogleGenAI({
    apiKey: import.meta.env.VITE_GEMINI_API_KEY,
  });
  const config = {
    thinkingConfig: {
      thinkingBudget: -1,
    },
    responseMimeType: "application/json"
  };
  const model = 'gemini-2.5-flash';
  const contents = [
    {
      role: 'user',
      parts: [
        {
          text: prompt,
        },
      ],
    },
  ];

  const response = await ai.models.generateContentStream({
    model,
    config,
    contents,
  });

  let res = ""

  for await (const chunk of response) {
    res += chunk.text
    // console.log(chunk.text);
  }
  
  return res
}

export default AIChatSession
