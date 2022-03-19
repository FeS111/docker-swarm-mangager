"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dotEnv = exports.getSubdirNames = exports.readJsonDir = exports.readDir = exports.readJsonFile = exports.readFile = void 0;
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
function readFile(path, encoding) {
    if (encoding === void 0) { encoding = 'utf-8'; }
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    fs_1.default.readFile(path, { encoding: encoding }, function (err, data) {
                        if (err)
                            return reject(err);
                        try {
                            resolve(data.toString());
                        }
                        catch (e) {
                            reject(e);
                        }
                    });
                })];
        });
    });
}
exports.readFile = readFile;
function readJsonFile(path, encoding) {
    if (encoding === void 0) { encoding = 'utf-8'; }
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                    var _a, _b, _c, e_1;
                    return __generator(this, function (_d) {
                        switch (_d.label) {
                            case 0:
                                _d.trys.push([0, 2, , 3]);
                                _a = resolve;
                                _c = (_b = JSON).parse;
                                return [4 /*yield*/, readFile(path, encoding)];
                            case 1:
                                _a.apply(void 0, [_c.apply(_b, [_d.sent()])]);
                                return [3 /*break*/, 3];
                            case 2:
                                e_1 = _d.sent();
                                reject(e_1);
                                return [3 /*break*/, 3];
                            case 3: return [2 /*return*/];
                        }
                    });
                }); })];
        });
    });
}
exports.readJsonFile = readJsonFile;
function readDir(dir) {
    return new Promise(function (resolve, reject) {
        fs_1.default.readdir(dir, { withFileTypes: true }, function (err, list) {
            if (err)
                return reject(err);
            resolve(list);
        });
    });
}
exports.readDir = readDir;
function readJsonDir(dir, filenameProperty) {
    var _this = this;
    return new Promise(function (resolve, reject) {
        fs_1.default.readdir(dir, { withFileTypes: true }, function (err, list) { return __awaiter(_this, void 0, void 0, function () {
            var arr, _i, _a, e, json;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (err)
                            return [2 /*return*/, reject(err)];
                        arr = [];
                        _i = 0, _a = list.filter(function (e) { return e.isFile() && e.name.match(/\.json$/); });
                        _b.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 4];
                        e = _a[_i];
                        return [4 /*yield*/, readJsonFile(path_1.default.resolve(dir, e.name))];
                    case 2:
                        json = _b.sent();
                        if (typeof filenameProperty === 'string') {
                            json[filenameProperty] = e.name;
                        }
                        arr.push(json);
                        _b.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4:
                        resolve(arr);
                        return [2 /*return*/];
                }
            });
        }); });
    });
}
exports.readJsonDir = readJsonDir;
function getSubdirNames(dir) {
    var _this = this;
    return new Promise(function (resolve, reject) {
        fs_1.default.readdir(dir, { withFileTypes: true }, function (err, list) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (err)
                    return [2 /*return*/, reject(err)];
                resolve(list.filter(function (e) { return e.isDirectory(); }).map(function (e) { return e.name; }));
                return [2 /*return*/];
            });
        }); });
    });
}
exports.getSubdirNames = getSubdirNames;
function dotEnv(path) {
    return new Promise(function (resolve, reject) {
        fs_1.default.readFile(path, function (err, buf) {
            if (err)
                return reject(err);
            try {
                resolve(buf.toString()
                    .split(/\r?\n/)
                    .filter(function (v) { return v.trim().length !== 0; })
                    .reduce(function (result, current) {
                    var match = current.match(/^(export\s+)?([^=]+)=(.*)$/);
                    if (match)
                        result[match[2]] = match[3];
                    return result;
                }, {}));
            }
            catch (e) {
                reject(e);
            }
        });
    });
}
exports.dotEnv = dotEnv;
//# sourceMappingURL=index.js.map