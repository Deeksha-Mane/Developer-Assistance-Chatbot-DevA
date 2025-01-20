import OpenAI from "openai";
import { createChatBotMessage, createClientMessage, createCustomMessage } from "react-chatbot-kit";
const openai=new OpenAI({
    apiKey:'a3bb9472ef8a460a8db2dc77479899b3',
    baseURL: 'https://api.aimlapi.com',
    dangerouslyAllowBrowser: true
})

class ActionProvider{
    createChatBotMessage
    setStateFunc
    createClientMessage
    stateRef
    createCustomMessage

    constructor(
        createChatBotMessage,
        setStateFunc,
        createClientMessage,
        stateRef,
        createCustomMessage,
        ...rest
    ) {
        this.createChatBotMessage = createChatBotMessage;
        this.setState = setStateFunc;
        this.createClientMessage= createClientMessage;
        this.stateRef=stateRef;
        this.createCustomMessage=createCustomMessage;
    }

    callGenAI = async (prompt) =>{
        const chatCompletion = await openai.chat.completions.create(
            {
                model: 'gpt-3.5-turbo',
                messages: [
                    {role: "system", content: "You are a Developer Assistance Chatbot"},
                    {role: 'user', content: prompt}
                ],
                temperature:0.5,
                max_tokens: 200
            }
        ); 
        return chatCompletion.choices[0].message.content;
    }

    timer = ms => new Promise(res=> setTimeout(res,ms));

    // generateResponseMessage = async(userMessage) => {
    //     const responseFromGPT = await this.callGenAI(userMessage);
    //     let message;
    //     let numberNoLines = responseFromGPT.split('\n').length;
    //     for (let i = 0; i < numberNoLines; i++) {
    //         const msg = responseFromGPT.split('\n')[i];
    //         if (msg.length) {
    //             message=this.createChatBotMessage(msg);
    //             this.updateChatBotMessage(message);
    //         }
    //         await this.timer(1000);
    //     }
    // }

    generateResponseMessage = async (userMessage) => {
        const responseFromOpenAI = await this.callOpenAI(userMessage);

        const message = this.createChatBotMessage(responseFromOpenAI);

        this.updateChatBotState(message);
    };

    respond = (message)=>{
        this.generateResponseMessage(message);
    }

    updateChatBotMessage = (message) =>{
        this.setState(prevState => ({
            ...prevState,messages:[...prevState.messages,message]
        }))
    }
}

export default ActionProvider;