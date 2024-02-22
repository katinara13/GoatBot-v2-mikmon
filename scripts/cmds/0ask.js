const axios = require('axios');

const fonts = {

    mathsans: {

};

const Prefixes = [
  'ae',
  'ai',
  'mitama',
  'ask',
  'mitantsoa', 
];

module.exports = {
  config: {
    name: "ask",
    version: 1.0,
    author: "OtinXSandip | Aesther",
    longDescription: "AI",
    category: "ai",
    guide: {
      en: "{p} questions",
    },
  },
  onStart: async function () {},
  onChat: async function ({ api, event, args, message }) {
    try {

      const prefix = Prefixes.find((p) => event.body && event.body.toLowerCase().startsWith(p));
      if (!prefix) {
        return; // Invalid prefix, ignore the command
      }
      const prompt = event.body.substring(prefix.length).trim();
      if (!prompt) {
        await message.reply("𝙎𝘼𝙉𝘾𝙃𝙊𝙆𝙐𝙄𝙉𝘷2🌸:\n\n[(=🝦 ༝ 🝦=)]....?");
        return;
      }
      const senderID = event.senderID;
      const senderInfo = await api.getUserInfo([senderID]);
      const senderName = senderInfo[senderID].name;
      const response = await axios.get(`https://sandipapi.onrender.com/gpt?prompt=${encodeURIComponent(prompt)}`);
      const answer = `𝙎𝘼𝙉𝘾𝙃𝙊𝙆𝙐𝙄𝙉𝘷2🌸:\n──────────── \n 💬~[${senderName}]\n${response.data.answer} 🌸`;

      //apply const font to each letter in the answer
      let formattedAnswer = "";
      for (let letter of answer) {
        formattedAnswer += letter in fonts.mathsans ? fonts.mathsans[letter] : letter;
      }

      await message.reply(formattedAnswer);

    } catch (error) {
      console.error("Error:", error.message);
    }
  }
};
