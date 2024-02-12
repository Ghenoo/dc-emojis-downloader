const axios = require('axios');
const fs = require('fs');

const guildId = ''; // ID do seu servidor Discord
const token = ''; // Seu token
const headers = { 'Authorization': token };

axios.get(`https://discord.com/api/v9/guilds/${guildId}/emojis`, { headers })
  .then(response => {
    if (response.status !== 200) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }
    return response.data;
  })
  .then(emojis => {
    for (let i = 0; i < emojis.length; i++) {
      const emoji = emojis[i];
      const filename = `${emoji.name}.${emoji.animated ? 'gif' : 'png'}`; 
      const url = `https://cdn.discordapp.com/emojis/${emoji.id}.${emoji.animated ? 'gif' : 'png'}`; 
      axios.get(url, { responseType: 'stream' }).then(response => {
        const dest = fs.createWriteStream(filename); 
        response.data.pipe(dest); 
        console.log(`Emoji ${filename} baixado com sucesso`);
      }).catch(error => {
        console.error(`Erro ao baixar o emoji ${filename}: ${error}`);
      });
    }
  })
  .catch(error => {
    console.error(`Erro ao obter a lista de emojis: ${error}`);
  });