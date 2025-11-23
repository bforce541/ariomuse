import { GoogleGenAI, Type } from "@google/genai";
import { CompositionSettings, GenerateMusicResponse } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateMusic = async (settings: CompositionSettings): Promise<GenerateMusicResponse> => {
  if (!process.env.API_KEY) {
    throw new Error("API Key is missing. Please check your environment variables.");
  }

  const model = "gemini-2.5-flash";
  
  // Advanced Prompt Engineering for Music Theory accuracy
  const systemPrompt = `
    You are ArioMuse, an expert composer and music theorist specializing in procedural music generation.
    
    Your goal is to compose a musically coherent, pleasing piece based on constraints.
    
    RULES FOR ABC NOTATION:
    1. Use standard ABC notation headers: X:1, T:Title, C:ArioMuse, M:Meter, L:Unit Length, Q:Tempo, K:Key.
    2. Ensure bar lines (|) are placed correctly according to the time signature.
    3. Use appropriate note ranges for the requested instrument (${settings.instrument}).
    4. Add dynamics (pp, mp, mf, f) and articulation (.staccato, -tenuto) where appropriate for musicality.
    5. For "Polyphonic" instruments like Piano/Guitar, use chords [CEG]. For Monophonic like Flute, single notes.
    6. Ensure the song lasts at least 8-16 bars.
    7. Use repeat signs (:| |:) if structure calls for it (AABB form etc).
    
    OUTPUT FORMAT:
    JSON object with "abc" (string), "commentary" (string), "title" (string).
  `;

  const userPrompt = `
    COMPOSE REQUEST:
    - Instrument: ${settings.instrument}
    - Key: ${settings.key}
    - Time Signature: ${settings.timeSignature}
    - Tempo: ${settings.tempo} BPM
    - Complexity: ${settings.complexity}
    - Mood: ${settings.mood}
    - Context/Prompt: "${settings.prompt}"
    
    Step-by-step reasoning:
    1. Determine chord progression based on Key and Mood.
    2. Construct melody based on Complexity.
    3. Generate valid ABC string.
  `;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: [
        { role: "user", parts: [{ text: systemPrompt + "\n\n" + userPrompt }] }
      ],
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            abc: { type: Type.STRING },
            commentary: { type: Type.STRING },
            title: { type: Type.STRING },
          },
          required: ["abc", "commentary", "title"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    
    return JSON.parse(text) as GenerateMusicResponse;

  } catch (error) {
    console.error("Gemini Generation Error:", error);
    throw error;
  }
};

export const generateIdea = async (): Promise<string> => {
  if (!process.env.API_KEY) return "A mysterious melody in the fog...";

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: "Give me a creative, sophisticated, short (1 sentence) music composition prompt describing a mood, instrument, and specific musical technique. Example: 'A baroque fugue in G minor featuring rapid harpsichord ornamentation.'",
    });
    return response.text || "A happy tune on a sunny day.";
  } catch (e) {
    return "A fast violin run in a minor key.";
  }
}