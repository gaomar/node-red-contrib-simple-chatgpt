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
        const response = await openai.createCompletion({
          model: "text-davinci-003",
          prompt: msg.payload,
          max_tokens: 4000,
        });
        msg.payload = response.data.choices[0].text;
        node.status({});
        node.send(msg)
      });
  }

  RED.nodes.registerType("simple-chatgpt", main);
}