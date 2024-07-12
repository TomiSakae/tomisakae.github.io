import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyC7suGvkLTcVUNihZI2Rf5j-Wa1Gf33MWY");
const model = genAI.getGenerativeModel({
    model: "gemini-1.5-pro",
});
const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
};

const Gemini = async ({ prompt }: { prompt: string }) => {
    const chatSession = model.startChat({
        generationConfig,
        history: [
            {
                role: "user",
                parts: [
                    { text: "Gemini sẽ nhận tên anime đầu vào và hãy giúp tôi biến chuỗi tên anime đó chỉ lấy tên chính không lấy phần phụ\n" },
                ],
            },
            {
                role: "model",
                parts: [
                    { text: "Tôi hiểu rồi!\n" },
                ],
            },
            {
                role: "user",
                parts: [
                    { text: "[Oshi no Ko] Season 2\n" },
                ],
            },
            {
                role: "model",
                parts: [
                    { text: "Tên chính của anime là: **Oshi no Ko** \n" },
                ],
            },
            {
                role: "user",
                parts: [
                    { text: "chỉ output là tên chính chứ không ghi gì thêm" },
                ],
            },
            {
                role: "model",
                parts: [
                    { text: "Oshi no Ko\n" },
                ],
            },
            {
                role: "user",
                parts: [
                    { text: "Mushoku Tensei II: Isekai Ittara Honki Dasu Part 2" },
                ],
            },
            {
                role: "model",
                parts: [
                    { text: "Mushoku Tensei II \n" },
                ],
            },
            {
                role: "user",
                parts: [
                    { text: "nếu anime có phần thì bỏ phần luôn\n" },
                ],
            },
            {
                role: "model",
                parts: [
                    { text: "Mushoku Tensei\n" },
                ],
            },
            {
                role: "user",
                parts: [
                    { text: "Kono Subarashii Sekai ni Shukufuku wo! 3" },
                ],
            },
            {
                role: "model",
                parts: [
                    { text: "Kono Subarashii Sekai ni Shukufuku wo! \n\n\n" },
                ],
            },
        ],
    });

    const result = await chatSession.sendMessage(prompt);
    return result.response.text();
}

export default Gemini;
