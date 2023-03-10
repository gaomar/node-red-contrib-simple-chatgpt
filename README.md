[![platform](https://img.shields.io/badge/platform-Node--RED-red)](https://nodered.org)
[![npm](https://img.shields.io/npm/v/node-red-contrib-custom-chatgpt.svg)](https://www.npmjs.com/package/node-red-contrib-custom-chatgpt)
[![downloads](https://img.shields.io/npm/dt/node-red-contrib-custom-chatgpt.svg)](https://www.npmjs.com/package/node-red-contrib-custom-chatgpt)
[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/HaroldPetersInskipp/node-red-contrib-chatgpt/blob/main/LICENSE)

## node-red-contrib-custom-chatgpt

A Node-RED node that interacts with OpenAI machine learning models like "ChatGPT".

### Quick Start

Install with the built in <b>Node-RED Palette manager</b> or using npm:
```
npm install node-red-contrib-custom-chatgpt
```

## Setup

When editing the nodes properties, to get your `OPENAI_API_KEY` log in to [ChatGPT](https://chat.openai.com/chat) and then visit https://platform.openai.com/account/api-keys click "+ Create new secret key" then copy and paste the "API key" into the nodes `API_KEY` property value.

To get your `Organization` visit https://platform.openai.com/account/org-settings then copy and paste the "OrganizationID" into the nodes `Organization` property value.

## Usage

### Set `msg.topic` to a string with the value of `completion`, `image`, `edit`, or `turbo`.

### 1. If `msg.topic` is set to `completion`:

[Required] `msg.payload` should be a well-written prompt that provides enough information for the model to know what you want and how it should respond.

Its success generally depends on the complexity of the task and quality of your prompt. A good rule of thumb is to think about how you would write a word problem for a middle schooler to solve.

### 2. If `msg.topic` is set to `image`:

[Required] `msg.payload` should be a prompt of text description of the desired image.

[Optional] `msg.size` should be a string of the desired image dimensions. [Default:"256x256"]

[Optional] `msg.format` should be a string of either "b64_json" or "url". [Default:"b64_json"]

### 3. If `msg.topic` is set to `edit`:

[Required] `msg.payload` should be a prompt of text to use as a starting point for the edit.

[Required] `msg.last` should be a string of text to use as the input to be edited.

### 4. If `msg.topic` is set to `turbo`:

[Required] `msg.payload` should be a well-written prompt that provides enough information for the model to know what you want and how it should respond.

Its success generally depends on the complexity of the task and quality of your prompt. A good rule of thumb is to think about how you would write a word problem for a middle schooler to solve.

[Optional] `msg.history` should be an array of objects containing the conversation history. [Default:[]]

### Examples

[Old screenshot] Basic usage for image, completion, and edit.
[<img src="/examples/example.png">](https://github.com/HaroldPetersInskipp/node-red-contrib-chatgpt/blob/main/examples/chatgpt.json)

[Old screenshot] More advanced usage with templates.
[<img src="/examples/example2.png">](https://github.com/HaroldPetersInskipp/node-red-contrib-chatgpt/blob/main/examples/chatgpt.json)

[New screenshot] Usage of model `gpt-3.5-turbo` and conversation history.
[<img src="/examples/example3.png">](https://github.com/HaroldPetersInskipp/node-red-contrib-chatgpt/blob/main/examples/chatgpt.json)

## Links

* [NodeRED](https://flows.nodered.org/node/node-red-contrib-custom-chatgpt)
* [Libraries.io](https://libraries.io/npm/node-red-contrib-custom-chatgpt)
* [npm](https://www.npmjs.com/package/node-red-contrib-custom-chatgpt)

### Bugs reports and feature requests

Please report any issues or feature requests at <a href="https://github.com/HaroldPetersInskipp/node-red-contrib-chatgpt/issues">GitHub</a>.

### Changelog

View the full list of [changes](https://github.com/HaroldPetersInskipp/node-red-contrib-chatgpt/blob/main/CHANGELOG.md).