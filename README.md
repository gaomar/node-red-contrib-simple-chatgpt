## Install

```
npm i node-red-contrib-chatgpt
```

## Usage

Set `msg.topic` to a string with the value of `completion`, `image`, or `edit`.

1. If `msg.topic` is set to `completion`:

   `msg.payload` should be a well-written prompt that provides enough information for the model to know what you want and how it should respond. Its success generally depends on the complexity of the task and quality of your prompt. A good rule of thumb is to think about how you would write a word problem for a middle schooler to solve.

2. If `msg.topic` is set to `image`:

   `msg.payload` should be a prompt of text description of the desired image.

3. If `msg.topic` is set to `edit`:

   `msg.payload` should be a prompt of text to use as a starting point for the edit.

## Links

* [NodeRED](https://flows.nodered.org/node/node-red-contrib-chatgpt)
* [Libraries.io](https://libraries.io/npm/node-red-contrib-chatgpt)
* [npm](https://www.npmjs.com/package/node-red-contrib-chatgpt)
