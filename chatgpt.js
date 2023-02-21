module.exports = (RED) => {
  const { Configuration, OpenAIApi } = require("openai");
  const main = function(config) {
      const node = this;
      RED.nodes.createNode(node, config);
      const TOKEN = config.Token;
      const ORGANIZATION = config.Organization;

      const configuration = new Configuration({
        organization: ORGANIZATION,
        apiKey: TOKEN,
      });
      const openai = new OpenAIApi(configuration);

      node.on('input', async (msg) => {
        node.status({fill:"green",shape:"dot",text:"Processing..."});
        
        if ((msg.topic != "completion")&&(msg.topic != "image")&&(msg.topic != "edit")) {
            node.status({fill:"red",shape:"dot",text:"msg.topic is incorrect"});
            node.error("msg.topic must be 'completion', 'image', or 'edit'")
            node.send(msg)
        } else if (msg.topic === "image") {
            try {
                const response = await openai.createImage({
                  prompt: msg.payload,
                  n: msg.n || 1,
                  size: msg.size || "256x256",
                  response_format: msg.format || "b64_json",
                });
                if (msg.format === "url") {
                    msg.payload = response.data.data[0].url;
                } else {
                    msg.payload = response.data.data[0].b64_json;
                }
                
                msg.full = response;
                node.status({fill:"blue",shape:"dot",text:"Response complete"});
                node.send(msg)
            } catch (error) {
                node.status({fill:"red",shape:"dot",text:"Error"});
              if (error.response) {
                node.error(error.response.status);
                node.error(error.response.data);
              } else {
                node.error(error.message);
              }
            }
        } else if (msg.topic === "edit") {
            try {
                const response = await openai.createEdit({
                  model: "text-davinci-edit-001",
                  instruction: msg.payload,
                  n: msg.n || 1,
                  input: msg.last || "",
                });
                msg.payload = response.data.choices[0].text;
                msg.full = response;
                node.status({fill:"blue",shape:"dot",text:"Response complete"});
                node.send(msg)
            } catch (error) {
                node.status({fill:"red",shape:"dot",text:"Error"});
              if (error.response) {
                node.error(error.response.status);
                node.error(error.response.data);
              } else {
                node.error(error.message);
              }
            }
        } else {
            try {
                msg.topic = "completion";
                const response = await openai.createCompletion({
                  model: "text-davinci-003",
                  prompt: msg.payload,
                  max_tokens: 4000,
                });
                msg.payload = response.data.choices[0].text;
                msg.full = response;
                node.status({fill:"blue",shape:"dot",text:"Response complete"});
                node.send(msg)
            } catch (error) {
                node.status({fill:"red",shape:"dot",text:"Error"});
              if (error.response) {
                node.error(error.response.status);
                node.error(error.response.data);
              } else {
                node.error(error.message);
              }
            }
        }
      });
  }

  RED.nodes.registerType("chatgpt", main);
}