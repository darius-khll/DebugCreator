#!/usr/bin/env node
//npm link => local

'use strict';

import * as fs from "fs";
import { fileSystem } from "./services/fileSystem"

// let userArgs = process.argv.slice(2);
// let givenArguments: { Type: string } = {} as any;
// switch (userArgs.length) {
//     case 0: throw Error('err1');
//     case 1:
//         givenArguments.Type = userArgs[0];
//         break;
// }

class Creator {
    public async debugCreator(): Promise<void> {
        let data = await fileSystem.readFile("txt.txt");
        var lines = data.split("\r\n");
        console.log(lines[0] + " - " + lines[1]);
    }
}

new Creator().debugCreator();