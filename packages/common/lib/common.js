"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Result = /** @class */ (function () {
    function Result(code, message, data) {
        this.code = code;
        this.message = message;
        this.data = data;
    }
    Result.success = function (message, data) {
        return new Result(200, message || 'success', data);
    };
    Result.failure = function (message, data) {
        return new Result(500, message || 'failure', data);
    };
    Result.parse = function (result) {
        if (result.code === 200) {
            return result.data;
        }
        else {
            throw new Error(result.message);
        }
    };
    return Result;
}());
exports.Result = Result;
//# sourceMappingURL=common.js.map