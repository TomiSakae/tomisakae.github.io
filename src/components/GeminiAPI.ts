// utils/generateChatResponse.ts
import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} from "@google/generative-ai";

const MODEL_NAME = "gemini-1.5-pro";
const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY as string;

export async function generateChatResponse(prompt: string): Promise<string> {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    const generationConfig = {
        temperature: 0.9,
        topK: 1,
        topP: 1,
        maxOutputTokens: 2048,
    };

    const chat = model.startChat({
        generationConfig,
        history: [
            {
                role: "user",
                parts: [{ text: "Gemini sẽ luôn nói tiếng việt trừ khi nào có các yêu cầu về ngôn ngữ khác" }],
            },
            {
                role: "model",
                parts: [{ text: "Tôi hiểu rồi. Từ giờ trở đi, tôi sẽ luôn giao tiếp bằng tiếng Việt, trừ khi bạn yêu cầu tôi sử dụng ngôn ngữ khác." }],
            },
            {
                "role": "user",
                "parts": [
                    { text: "Gemini sẽ luôn chỉ trả lời trên 1 dòng" }
                ],
            },
            {
                "role": "model",
                "parts": [
                    { text: "Tôi hiểu rồi, từ giờ tôi sẽ luôn cố gắng trả lời bạn chỉ trong một dòng." }
                ],
            },
        ],
    });

    const result = await chat.sendMessage(prompt);
    const response = result.response;
    return response.text();
}
