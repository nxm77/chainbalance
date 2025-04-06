import axios from 'axios';

export async function setTelegramAlert(message: string) {
    const botToken = process.env.TGBOT_API_TOKEN;
    const chatId = process.env.TG_GROUP_ID;
    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
    try{
        const response = await axios.post(url, {
            chat_id: chatId,
            text: message
        });
        console.log('Message sent successfully:', response.data);
    }
    catch(error) {
        console.error('Error sending telegram message:', error);
    }   
}
