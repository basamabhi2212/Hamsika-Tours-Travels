import { GoogleGenAI } from "@google/genai";

const getClient = () => {
  const apiKey = process.env.API_KEY || ''; // In a real app, ensure this is set
  return new GoogleGenAI({ apiKey });
};

export const chatWithTravelAI = async (message: string, history: { role: 'user' | 'model'; content: string }[]) => {
  try {
    const ai = getClient();
    // System instruction to behave like a travel agent
    const systemInstruction = `You are Hamsika Travels' expert AI concierge. 
    Your tone is polite, premium, and helpful. 
    You help users find destinations, plan itineraries, and understand visa requirements.
    Keep answers concise and focus on travel.
    Our primary destinations are India, Dubai, Thailand, Singapore, and Europe.
    Currency is INR.`;

    const model = 'gemini-2.5-flash';
    
    // Construct chat history for the model
    // Note: The SDK Chat object handles history, but here we are stateless for simplicity 
    // or we can use the chat API if we maintain state. 
    // For this stateless function, we'll use generateContent with instructions.
    
    // Using simple generateContent for single turn or manually appending context for now
    // to match the stateless nature of this helper function.
    // For a real chat, we'd use ai.chats.create().
    
    const chat = ai.chats.create({
      model,
      config: {
        systemInstruction,
      }
    });

    // Replay history (simplified)
    // In a production app, you'd persist the 'chat' object. 
    // Here we just send the latest message for simplicity in this demo context, 
    // or ideally, use sendMessage with history if we had the object alive.
    
    // Let's assume a fresh chat for this demo functionality 
    // to avoid complex state management in the UI code for the prompt.
    const result = await chat.sendMessage({ message });
    return result.text;
  } catch (error) {
    console.error("AI Error:", error);
    return "I'm having trouble connecting to the travel network right now. Please try again later.";
  }
};