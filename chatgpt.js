module.exports = (RED) => {
  const { Configuration, OpenAIApi } = require("openai");
  const main = function(config) {
      const node = this;
      RED.nodes.createNode(node, config);
      const API_KEY = config.API_KEY;
      const ORGANIZATION = config.Organization;

      const configuration = new Configuration({
        organization: ORGANIZATION,
        apiKey: API_KEY,
      });
      const openai = new OpenAIApi(configuration);

      node.on('input', async (msg) => {
        node.status({fill:"green",shape:"dot",text:"Processing..."});
        
        if ((msg.topic != "completion")&&(msg.topic != "image")&&(msg.topic != "edit")&&(msg.topic != "turbo")) {
            node.status({fill:"red",shape:"dot",text:"msg.topic is incorrect"});
            node.error("msg.topic must be 'completion', 'image', 'edit', or 'turbo'")
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
        } else if (msg.topic === "turbo") {
            try {
                if (typeof msg.history === "undefined") msg.history = [];
                msg.topic = "turbo";
                const input = {"role": "user", "content": msg.payload};
                msg.history.push(input);
                const response = await openai.createChatCompletion({
                    model: "gpt-3.5-turbo",
                    messages: msg.history
                });
                const result = {"role": "assistant", "content": response.data.choices[0].message.content};
                msg.history.push(result);
                msg.payload = response.data.choices[0].message.content;
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