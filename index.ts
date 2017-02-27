#!/usr/bin/env node
//npm link => local

'use strict';

import * as fs from "fs";
import { fileSystem } from "./services/fileSystem"

let userArgs = process.argv.slice(2);
let givenArguments: { FileName: string, Type: string, Firstline: number, LastLine: number } = {} as any;

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
    private splitType = "\n";
    public async debugCreator(): Promise<void> {

        let data = await fileSystem.readFile(givenArguments.FileName);
        var lines = data.split(this.splitType);

        let isInBracket: boolean = false;
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

            let hasStartedBracket = (line as string).includes("{");
            if (hasStartedBracket)
                isInBracket = true;

            let nextLine = lines[index];
            if (nextLine && nextLine.toString().includes("{")) {
                isInBracket = false;
            }

            let hasFinishedBracket = (line as string).includes("}");
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

            if (line == "") continue;

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

        await fileSystem.writeFile(givenArguments.FileName, outPut);

    }
}

if (userArgs[0].toLowerCase() != "--help")
    new Creator().debugCreator();