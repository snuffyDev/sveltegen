"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const chalk_1 = (0, tslib_1.__importDefault)(require("chalk"));
exports.default = {
    dim: (msg) => chalk_1.default.dim(msg),
    red: (msg) => chalk_1.default.redBright(msg)
};
//# sourceMappingURL=colors.js.map