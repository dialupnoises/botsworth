# Botsworth

It's a headless chat bot written in node.js. Pluginable.

## Wait, what?

I got tired of rewriting the same code for different chat services. Instead of writing a bot that was compatible with many chat services at the same time, I wrote this, instead. It's just a simple node.js API that takes messages and returns responses. Nothing complicated. It can't really be called a chat bot.

## How do I use it?

You can get it on NPM:
```
npm install botsworth
```

The usage is pretty simple:

```js
var botsworth = require('botsworth');
botsworth.initialize();

// when a message is received
botsworth.message("uniqueId", "username", "message", function(err, msg) {
    console.log(err || msg);
});

// when a message is received with a command
botsworth.command("uniqueId", "username", "command", "args", function(err, msg) {
    console.log(err || msg);
});
```
The basic idea is that you call `botsworth.message` or `botsworth.command` when a message is received. `#message` will run a message hook on any plugin that has one, and will call the callback for every plugin that returns a message. `#command` will run the command callback only on plugins that have registered that command. It's your job to parse messages to figure out which ones are commands, and to figure out which part is the name and which part is the args. For example:
```
!math 1 + 1
```
You could parse this as a command, if you wanted to, where "math" would be the command and the string "1 + 1" would be the args. 

For each function, you also have to provide a unique ID and a username. This is for plugins that need to have a permanent record of what user did what. If you're on a service where a username is a permanent characteristic of someone, you can use that (in that case, just leave out the uniqueId portion). Otherwise, you could provide something like Steam ID or IP.

## License

The MIT License (MIT)

Copyright (c) 2014 Andrew Rogers

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.