module.exports = (RED) => {
  const { Configuration, OpenAIApi } = require("openai");
  const main = function(config) {
      const node = this;
      RED.nodes.createNode(node, config);
      const TOKEN = config.Token;

      const configuration = new Configuration({
        apiKey: TOKEN,
      });
      const openai = new OpenAIApi(configuration);

      node.on('input', async (msg) => {
        node.status({fill:"green",shape:"dot",text:"処理中..."});
        if (typeof msg.pastMessages === "undefined") msg.pastMessages = [];
        if (msg.pastMessages.length == 0 && config.SystemSetting.length != 0) {
          const system = {"role": "system", "content": config.SystemSetting};
          msg.pastMessages.push(system);
        }
        const newMessage = {"role": "user", "content": msg.payload};
        msg.pastMessages.push(newMessage);
        const response = await openai.createChatCompletion({
          model: 'gpt-3.5-turbo',
          messages: msg.pastMessages
        });
        const responseMessage = {"role": "assistant", "content": response.data.choices[0].message.content};
        msg.pastMessages.push(responseMessage);
        msg.payload = response.data.choices[0].message.content;
        node.status({});
        node.send(msg)
      });
  }

  RED.nodes.registerType("simple-chatgpt", main);
}