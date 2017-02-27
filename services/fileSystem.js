"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const fs = require("fs");
class fileSystem {
    static readFile(fileName, encoding = "utf8") {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((res, rej) => {
                fs.readFile(fileName, encoding, (err, data) => {
                    if (err) {
                        return console.error(err);
                    }
                    return res(data);
                });
            });
        });
    }
    static open(fileName, flag) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((res, rej) => {
                fs.open(fileName, flag, (err, fd) => {
                    if (err) {
                        return console.error(err);
                    }
                    console.log("File opened successfully!");
                    res();
                });
            });
        });
    }
    static close(fd) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((res, rej) => {
                fs.close(fd, (err) => {
                    if (err) {
                        console.log(err);
                    }
                    console.log("File closed successfully.");
                });
            });
        });
    }
    static stat(fileName) {
        return new Promise((res, rej) => {
            fs.stat(fileName, (err, stats) => {
                if (err) {
                    return console.error(err);
                }
                return res(stats);
            });
        });
    }
    static writeFile(fileName, text) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((res, rej) => {
                fs.writeFile(fileName, text, (err) => {
                    if (err) {
                        return console.error(err);
                    }
                });
            });
        });
    }
    static unlink(fileName) {
        return __awaiter(this, void 0, void 0, function* () {
            fs.unlink(fileName, (err) => {
                if (err) {
                    return console.error(err);
                }
                console.log("File deleted successfully!");
            });
        });
    }
    static mkdir(fileName) {
        return __awaiter(this, void 0, void 0, function* () {
            fs.mkdir(fileName, (err) => {
                if (err) {
                    return console.error(err);
                }
                console.log("Directory created successfully!");
            });
        });
    }
    static readdir(path) {
        return __awaiter(this, void 0, void 0, function* () {
            fs.readdir(path, (err, files) => {
                if (err) {
                    return console.error(err);
                }
                files.forEach(function (file) {
                    console.log(file);
                });
            });
        });
    }
    static rmdir(path) {
        return __awaiter(this, void 0, void 0, function* () {
            fs.rmdir(path, (err) => {
                if (err) {
                    return console.error(err);
                }
            });
        });
    }
}
exports.fileSystem = fileSystem;
//# sourceMappingURL=fileSystem.js.map