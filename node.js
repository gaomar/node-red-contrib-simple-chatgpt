module.exports = (RED) => {
  const { Configuration, OpenAIApi } = require("openai");
  const main = function (config) {
    RED.nodes.createNode(this, config);
    this.functions = config.functions || [];
    this.functionsType = config.functionsType || "str";
    this.function_call = config.function_call || "auto";
    this.function_callType = config.function_callType || "str";
    this.Token = config.Token || "";
    const node = this;

    const configuration = new Configuration({
      apiKey: node.Token,
    });
    const openai = new OpenAIApi(configuration);

    node.on("input", async (msg) => {
      node.status({ fill: "green", shape: "dot", text: "処理中..." });
      if (typeof msg.pastMessages === "undefined") msg.pastMessages = [];
      if (msg.pastMessages.length == 0 && config.SystemSetting.length != 0) {
        const system = { role: "system", content: config.SystemSetting };
        msg.pastMessages.push(system);
      }
      const newMessage = { role: "user", content: msg.payload };
      msg.pastMessages.push(newMessage);

      var functions;
      var function_call;
      RED.util.evaluateNodeProperty(
        node.functions,
        node.functionsType,
        node,
        msg,
        (err, value) => {
          if (err) {
            return;
          } else {
            functions = value;
          }
        }
      );
      RED.util.evaluateNodeProperty(
        node.function_call,
        node.function_callType,
        node,
        msg,
        (err, value) => {
          if (err) {
            return;
          } else {
            function_call = value;
          }
        }
      );

      const params = {
        model: config.Model.length == 0 ? "gpt-3.5-turbo" : config.Model,
        messages: msg.pastMessages,
        functions,
        function_call,
      };
      if (params.functions.length == 0) {
        delete params.functions;
        delete params.function_call;
      }
      try {
        const response = await openai.createChatCompletion(params);
        const responseMessage = {
          role: "assistant",
          content: response.data.choices[0].message.content,
        };
        msg.pastMessages.push(responseMessage);
        msg.payload = response.data.choices[0].message.content;
        if (response.data.choices[0].message?.function_call) {
          const functionData = response.data.choices[0].message.function_call;
          msg.payloadFunction = {
            name: functionData.name,
            function_call: JSON.parse(functionData.arguments),
          };
        }
        node.status({});
      } catch (error) {
        if (error.response) {
          node.status({
            fill: "red",
            shape: "dot",
            text: `${error.response.status}, ${JSON.stringify(
              error.response.data.error.message
            )}`,
          });
          msg.payload = `${error.response.status}, ${JSON.stringify(
            error.response.data.error.message
          )}`;
        } else {
          node.status({
            fill: "red",
            shape: "dot",
            text: `${error.type}, ${error.message}`,
          });
          msg.payload = `${error.type}, ${error.message}`;
        }
      }
      node.send(msg);
    });
  };

  RED.nodes.registerType("simple-chatgpt", main);
};
