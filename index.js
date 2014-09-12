var fs = require('fs'),
    path = require('path');

var plugins = [];
var commandHooks = {};
var messageHooks = [];

exports.initialize = function() {
    var files = fs.readdirSync(path.join(__dirname, 'plugins'));
    files.forEach(function(file) {
        if(file.length > 3 && file.substr(-3) == '.js') {
            var plugin = require(path.join(__dirname, 'plugins', file));
            if(plugin.commands && plugin.command) {
                plugin.commands.forEach(function(command) {
                    commandHooks[command.toLowerCase()] = plugin.command;
                });
            }
            if(plugin.message)
                messageHooks.push(plugin.message);
            plugins.push(plugin);
        }
    });
}

exports.message = function(uniqueId, username, message, callback) {
    if(callback == null)
    {
        callback = message;
        message = username;
        username = uniqueId;
    }
    messageHooks.forEach(function (hook) {
        hook(uniqueId, username, message, callback);
    });
}

exports.command = function(uniqueId, username, command, args, callback) {
    if(callback == null)
    {
        callback = args;
        args = command;
        command = username;
        username = uniqueId;
    }
    if (commandHooks[command.toLowerCase()])
        commandHooks[command.toLowerCase()](uniqueId, username, command, args, callback);
    else
        return callback('Command does not exist.', null);
}

exports.commandExists = function(command) {
    return commandHooks[command.trim().toLowerCase()] == null;
}