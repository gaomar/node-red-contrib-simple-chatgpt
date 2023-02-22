[![platform](https://img.shields.io/badge/platform-Node--RED-red)](https://nodered.org)
[![npm](https://img.shields.io/npm/v/node-red-contrib-custom-chatgpt.svg)](https://www.npmjs.com/package/node-red-contrib-custom-chatgpt)
[![downloads](https://img.shields.io/npm/dt/node-red-contrib-custom-chatgpt.svg)](https://www.npmjs.com/package/node-red-contrib-custom-chatgpt)
[![Apache License](https://img.shields.io/badge/license-Apache-blue.svg)](https://github.com/HaroldPetersInskipp/node-red-contrib-chatgpt/blob/main/LICENSE)

## node-red-contrib-chatgpt

A Node-RED node that interacts with OpenAI machine learning models like "ChatGPT".

### Quick Start

Install with the built in <b>Node-RED Palette manager</b> or using npm:
```
npm install node-red-contrib-custom-chatgpt
```

## Setup

When editing the nodes properties, to get your `Token` log in to [ChatGPT](https://chat.openai.com/chat) and then visit https://chat.openai.com/api/auth/session then copy and paste the "accessToken" into the nodes `Token` property value.

To get your `Organization` visit https://platform.openai.com/account/org-settings then copy and paste the "OrganizationID" into the nodes `Organization` property value.

## Usage

### Set `msg.topic` to a string with the value of `completion`, `image`, or `edit`.

### 1. If `msg.topic` is set to `completion`:

`msg.payload` should be a well-written prompt that provides enough information for the model to know what you want and how it should respond. Its success generally depends on the complexity of the task and quality of your prompt. A good rule of thumb is to think about how you would write a word problem for a middle schooler to solve.

### 2. If `msg.topic` is set to `image`:

`msg.payload` should be a prompt of text description of the desired image.

### 3. If `msg.topic` is set to `edit`:

`msg.payload` should be a prompt of text to use as a starting point for the edit.

### Example

None for now sorry, maybe submit a pull request with one.

## Links

* [NodeRED](https://flows.nodered.org/node/node-red-contrib-custom-chatgpt)
* [Libraries.io](https://libraries.io/npm/node-red-contrib-custom-chatgpt)
* [npm](https://www.npmjs.com/package/node-red-contrib-custom-chatgpt)

### Bugs reports and feature requests

Please report any issues or feature requests at <a href="https://github.com/HaroldPetersInskipp/node-red-contrib-chatgpt/issues">GitHub</a>.
