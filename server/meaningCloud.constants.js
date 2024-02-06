"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScoreType = void 0;
var ScoreType;
(function (ScoreType) {
    ScoreType[ScoreType["P+"] = 2] = "P+";
    ScoreType[ScoreType["P"] = 1] = "P";
    ScoreType[ScoreType["NEU"] = 0] = "NEU";
    ScoreType[ScoreType["N"] = -1] = "N";
    ScoreType[ScoreType["N+"] = -2] = "N+";
    ScoreType[ScoreType["NONE"] = 0] = "NONE";
})(ScoreType || (exports.ScoreType = ScoreType = {}));
