import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} from "@google/generative-ai";

const MODEL_NAME = "gemini-1.5-flash";
const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY as string || "AIzaSyCBJlfHz5S-Ny47JQO5djOBOk9VoppIoV8"; // Update with your API key

export async function generateChatResponse(prompt: string): Promise<string> {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const safetySettings = [
        {
            category: HarmCategory.HARM_CATEGORY_HARASSMENT,
            threshold: HarmBlockThreshold.BLOCK_NONE,
        },
        {
            category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
            threshold: HarmBlockThreshold.BLOCK_NONE,
        },
        {
            category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
            threshold: HarmBlockThreshold.BLOCK_NONE,
        },
        {
            category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
            threshold: HarmBlockThreshold.BLOCK_NONE,
        },
    ];
    const model = genAI.getGenerativeModel({ model: MODEL_NAME, safetySettings });

    const generationConfig = {
        temperature: 1,
        topP: 0.95,
        topK: 64,
        maxOutputTokens: 2048,
        responseMimeType: "application/json",
    };
    let chatHistory;
    if (window.localStorage.getItem('chatVNHistory')) {
        chatHistory = JSON.parse(window.localStorage.getItem('chatVNHistory') || '[]');
    } else {
        chatHistory = [
            {
                role: "user",
                parts: [
                    { text: "Gemini khi nhận input là \"new\" thì sẽ tự động tạo ra 1 chủ đề rồi dùng chủ đề đó tạo ra 1 câu hội thoại của Visual Novel. Nhận input tiếp là \",\" thì sẽ tạo tiếp câu hội thoại dựa trên câu hội thoại đã cho trước đó. Mỗi câu hội thoại có chiều dài như những hội thoại trong các visual novel khác, và khi tới lúc thích hợp thì xuất ra lựa chọn và phân thành id tương ứng (tối đa 3 lựa chọn). Nếu input nhận được là 1 trong 3 lựa chọn trước đó thì tiếp tục hội thoại." },
                ],
            },
            {
                role: "model",
                parts: [
                    { text: "{\"text\": \"Em mát xa rất giỏi đấy, chủ nhân cứ thư giãn nhé.\", \"options\": {\"1\": \"\\\"Ừm, ta tin tưởng em.\\\"\", \"2\": \"\\\"Nhẹ nhàng thôi đấy.\\\"\", \"3\": \"\\\"Lần trước em mát xa hơi đau đấy.\\\"\"}}\n\n" },
                ],
            },
            {
                role: "user",
                parts: [
                    { text: "khi nhận input là \"new\" thì tìm chủ đề mới với phong cách như trên nhưng đổi lại kiểu khác mà vẫn giữ phong cách Anime Visual Novel Bishōjo game" },
                ],
            },
            {
                role: "model",
                parts: [
                    { text: "{\"text\": \"Chủ nhân, chào mừng về nhà! Hôm nay chủ nhân muốn ăn gì ạ? Để em chuẩn bị nhé!\", \"options\": {\"1\": \"\\\"Hôm nay em muốn nấu gì cho ta ăn nào?\\\"\", \"2\": \"\\\"Làm món gì đơn giản thôi, ta hơi mệt.\\\"\", \"3\": \"\\\"Hãy cho ta một bất ngờ nho nhỏ đi.\\\"\"}}\n\n" },
                ],
            },
            {
                role: "user",
                parts: [
                    { text: "new" },
                ],
            },
            {
                role: "model",
                parts: [
                    { text: "{\"text\": \"Onii-chan, dậy đi mà! Trễ học rồi đó!!\", \"options\": {\"1\": \"\\\"Ưm... 5 phút nữa thôi...\\\"\", \"2\": \"\\\"Anh dậy ngay đây! Đừng lôi chăn nữa!\\\"\", \"3\": \"\\\"Im lặng nào, hôm nay anh được nghỉ mà... \\\"\"}}\n\n" },
                ],
            },
            {
                role: "user",
                parts: [
                    { text: "new" },
                ],
            },
            {
                role: "model",
                parts: [
                    { text: "{\"text\": \"Senpai... Senpai có muốn ăn thử kẹo bông gòn em mới mua không? Của senpai đây ạ~\", \"options\": {\"1\": \"\\\"Cảm ơn em, trông ngon quá!\\\"\", \"2\": \"\\\"Để đấy đi, anh đang bận.\\\"\", \"3\": \"\\\"Anh không thích đồ ngọt lắm, em ăn đi.\\\"\"}}\n\n" },
                ],
            },
        ]
    }

    // Assume the chat history is stored in localStorage

    // Kiểm tra nếu chatHistory vượt quá 100 phần tử
    const chat = model.startChat({
        generationConfig,

        history: chatHistory, // Load chat history from localStorage
    });

    const result = await chat.sendMessage(prompt);
    const response = result.response;

    // Update chat history
    chatHistory.push({
        role: "user",
        parts: [{ text: prompt }],
    });
    chatHistory.push({
        role: "model",
        parts: [{ text: response.text() }],
    });
    window.localStorage.setItem('chatVNHistory', JSON.stringify(chatHistory));

    // Đoạn code để xóa hai mảng cuối trong chatHistory
    chatHistory.splice(-2);

    // Lưu lại chatHistory đã được cập nhật sau khi xóa
    window.localStorage.setItem('chatVNHistory', JSON.stringify(chatHistory));
    return response.text();
}
