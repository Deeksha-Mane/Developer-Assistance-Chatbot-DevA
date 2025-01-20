import { createChatBotMessage } from "react-chatbot-kit";

const config = {
    botName: 'DevA: Developer Assistance Chatbot',
    initialMessages: [
        createChatBotMessage("Hello, I'm DevA, your personal Developer Assistant. How can I assist you today?")
    ],
};

export default config;