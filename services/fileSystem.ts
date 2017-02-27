
import * as fs from "fs";

export class fileSystem {
    public static async readFile(fileName: string, encoding: string = "utf8"): Promise<any> {
        return new Promise<any>((res, rej) => {
            fs.readFile(fileName, encoding, (err, data) => {
                if (err) {
                    return console.error(err);
                }
                return res(data);
            })
        });
    }

    public static async open(fileName: string, flag: 'r' | 'r+' | 'rs' | 'rs+' | 'w' | 'w+' | 'wx' | 'wx+' | 'a' | 'ax' | 'a+' | 'ax+'): Promise<void> {
        return new Promise<void>((res, rej) => {
            fs.open(fileName, flag, (err, fd) => {
                if (err) {
                    return console.error(err);
                }
                console.log("File opened successfully!");
                res();
            })
        });
    }

    public static async close(fd: any): Promise<void> {
        return new Promise<void>((res, rej) => {
            fs.close(fd, (err) => {
                if (err) {
                    console.log(err);
                }
                console.log("File closed successfully.");
            })
        });
    }

    public static stat(fileName: string): Promise<fs.Stats> {
        return new Promise<fs.Stats>((res, rej) => {
            fs.stat(fileName, (err, stats) => {
                if (err) {
                    return console.error(err);
                }
                return res(stats);
            });
        });
    }

    public static async writeFile(fileName: string, text: string): Promise<void> {
        return new Promise<void>((res, rej) => {
            fs.writeFile(fileName, text, (err) => {
                if (err) {
                    return console.error(err);
                }
            })
        });
    }

    public static async unlink(fileName: string): Promise<void> {
        fs.unlink(fileName, (err) => {
            if (err) {
                return console.error(err);
            }
            console.log("File deleted successfully!");
        });
    }

    public static async mkdir(fileName: string): Promise<void> {
        fs.mkdir(fileName, (err) => {
            if (err) {
                return console.error(err);
            }
            console.log("Directory created successfully!");
        });
    }

    public static async readdir(path: string): Promise<void> {
        fs.readdir(path, (err, files) => {
            if (err) {
                return console.error(err);
            }
            files.forEach(function (file) {
                console.log(file);
            });
        });
    }

    public static async rmdir(path: string): Promise<void> {
        fs.rmdir(path, (err) => {
            if (err) {
                return console.error(err);
            }
        });
    }
}