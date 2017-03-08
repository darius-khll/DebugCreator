#!/usr/bin/env node
//npm link => local

'use strict';

import { fileSystem } from "./services/fileSystem"
import { Creator } from "./services/debugger"

function initial() {

    let userArgs = process.argv.slice(2);
    //let userArgs = ["txt.txt"];

    let givenArguments: { FileName: string, Type: string, Firstline: number, LastLine: number } = {} as any;

    switch (userArgs.length) {
        case 0: throw Error('could not have any parameters!');
        case 1:
            if (userArgs[0].toLowerCase() == "--help") {
                console.log("help");
                break;
            }
            console.log(111);
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

    console.log(`File name is: ${userArgs[0]}`);

    if (userArgs[0].toLowerCase() != "--help") {
        let creator = new Creator(givenArguments.FileName, givenArguments.Firstline, givenArguments.LastLine);
        creator.debugCreator().then((data) => {
            console.log("finished...");
        });
    }

}

initial();