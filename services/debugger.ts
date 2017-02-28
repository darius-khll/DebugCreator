import { fileSystem } from "../services/fileSystem"

export class Creator {

    private _fileName;
    private _firstLine;
    private _lastLine;
    constructor(fileName, firstLine, lastLine)
    {
        this._fileName = fileName,
        this._firstLine = firstLine;
        this._lastLine = lastLine;
    }

    private splitType = "\n";
    public async debugCreator(): Promise<void> {

        let data = await fileSystem.readFile(this._fileName);
        var lines = data.split(this.splitType);

        let isInBracket: boolean = false;
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

        await fileSystem.writeFile(this._fileName, outPut);

    }
}