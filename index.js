#!/usr/bin/env node
'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const fileSystem_1 = require("./services/fileSystem");
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
class Creator {
    constructor() {
        this.splitType = "\n";
    }
    debugCreator() {
        return __awaiter(this, void 0, void 0, function* () {
            let data = yield fileSystem_1.fileSystem.readFile(givenArguments.FileName);
            var lines = data.split(this.splitType);
            let isInBracket = false;
            let outPut = "";
            let index = 1;
            for (let line of lines) {
                if (givenArguments.Firstline && givenArguments.Firstline > index) {
                    outPut += line + this.splitType;
                    continue;
                }
                if (givenArguments.LastLine && givenArguments.LastLine < index) {
                    outPut += line + this.splitType;
                    continue;
                }
                let hasStartedBracket = line.includes("{");
                if (hasStartedBracket)
                    isInBracket = true;
                let nextLine = lines[index];
                if (nextLine && nextLine.toString().includes("{")) {
                    isInBracket = false;
                }
                let hasFinishedBracket = line.includes("}");
                if (hasFinishedBracket)
                    isInBracket = false;
                if (lines[index - 1]) {
                    let beforeLine = lines[index - 1];
                    let hasFinishedBracketBefore = beforeLine.toString().includes("}");
                    if (hasFinishedBracketBefore && line != "")
                        isInBracket = true;
                }
                if (index == 22) {
                    let a = 1;
                }
                outPut += line + this.splitType;
                if (line == "")
                    continue;
                if (index % 2 == 0 && isInBracket) {
                    let upLineEmptyCharecterCount = 0;
                    let downLineEmptyCharecterCount = 0;
                    for (let item of line) {
                        if (item == " ")
                            upLineEmptyCharecterCount++;
                        else
                            break;
                    }
                    for (let item of nextLine) {
                        if (item == " ")
                            downLineEmptyCharecterCount++;
                        else
                            break;
                    }
                    for (let i = 0; i < (downLineEmptyCharecterCount < upLineEmptyCharecterCount ? upLineEmptyCharecterCount : downLineEmptyCharecterCount); i++) {
                        outPut += " ";
                    }
                    outPut += `debugger;${this.splitType}`;
                }
                index++;
            }
            yield fileSystem_1.fileSystem.writeFile(givenArguments.FileName, outPut);
        });
    }
}
if (userArgs[0].toLowerCase() != "--help")
    new Creator().debugCreator();
//# sourceMappingURL=index.js.map