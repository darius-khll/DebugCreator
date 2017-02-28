"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const fileSystem_1 = require("../services/fileSystem");
class Creator {
    constructor(fileName, firstLine, lastLine) {
        this.splitType = "\n";
        this._fileName = fileName,
            this._firstLine = firstLine;
        this._lastLine = lastLine;
    }
    debugCreator() {
        return __awaiter(this, void 0, void 0, function* () {
            let data = yield fileSystem_1.fileSystem.readFile(this._fileName);
            var lines = data.split(this.splitType);
            let isInBracket = false;
            let outPut = "";
            let index = 1;
            for (let line of lines) {
                if (this._firstLine && this._firstLine > index) {
                    outPut += line + this.splitType;
                    continue;
                }
                if (this._lastLine && this._lastLine < index) {
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
            yield fileSystem_1.fileSystem.writeFile(this._fileName, outPut);
        });
    }
}
exports.Creator = Creator;
//# sourceMappingURL=debugger.js.map