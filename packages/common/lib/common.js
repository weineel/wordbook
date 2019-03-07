"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ErrorCode;
(function (ErrorCode) {
    ErrorCode[ErrorCode["Success"] = 200] = "Success";
    ErrorCode[ErrorCode["Failure"] = 500] = "Failure";
    // 单词已存在
    ErrorCode[ErrorCode["Exist"] = 550] = "Exist";
    ErrorCode[ErrorCode["NotExist"] = 551] = "NotExist";
})(ErrorCode = exports.ErrorCode || (exports.ErrorCode = {}));
var ResultError = /** @class */ (function (_super) {
    __extends(ResultError, _super);
    function ResultError(message, code) {
        var _this = _super.call(this, message) || this;
        _this.code = code;
        return _this;
    }
    return ResultError;
}(Error));
exports.ResultError = ResultError;
var Result = /** @class */ (function () {
    function Result(code, message, data) {
        this.code = code;
        this.message = message;
        this.data = data;
    }
    Result.success = function (message, data) {
        return new Result(ErrorCode.Success, message || 'success', data);
    };
    Result.failure = function (message, data) {
        return new Result(ErrorCode.Failure, message || 'failure', data);
    };
    Result.failureExist = function (word, data) {
        return new Result(ErrorCode.Exist, "\u3010\u5355\u8BCD " + word + "\u3011\u5DF2\u5B58\u5728", data);
    };
    Result.failureNotExist = function (word, data) {
        return new Result(ErrorCode.NotExist, "\u5355\u8BCD\u3010 " + word + "\u3011\u4E0D\u5B58\u5728", data);
    };
    Result.parse = function (result) {
        if (result.code === ErrorCode.Success) {
            return result.data;
        }
        else {
            throw new ResultError(result.message, result.code);
        }
    };
    return Result;
}());
exports.Result = Result;
//# sourceMappingURL=common.js.map