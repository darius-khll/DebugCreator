#!/usr/bin/env node
'use strict';
const debugger_1 = require("./services/debugger");
let userArgs = process.argv.slice(2);
let givenArguments = {};
switch (userArgs.length) {
    case 0: throw Error('could not have any parameters!');
    case 1:
        if (userArgs[0].toLowerCase() == "--help") {
            console.log("help");
            break;
        }
        givenArguments.FileName = userArgs[0];
        break;
    case 2:
        givenArguments.FileName = userArgs[0];
        givenArguments.Type = userArgs[1];
        break;
    case 3:
        givenArguments.FileName = userArgs[0];
        givenArguments.Firstline = parseInt(userArgs[1]);
        givenArguments.LastLine = parseInt(userArgs[2]);
        break;
    case 4:
        givenArguments.FileName = userArgs[0];
        givenArguments.Firstline = parseInt(userArgs[1]);
        givenArguments.LastLine = parseInt(userArgs[2]);
        givenArguments.Type = userArgs[3];
        break;
}
if (userArgs[0].toLowerCase() != "--help")
    new debugger_1.Creator(givenArguments.FileName, givenArguments.Firstline, givenArguments.LastLine).debugCreator();
//# sourceMappingURL=index.js.map