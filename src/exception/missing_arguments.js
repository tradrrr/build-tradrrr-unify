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
var invalid_argument_1 = require("@bithana/general-exception/build/internal/caller_fault/invalid_argument");
var Missing_arguments = /** @class */ (function (_super) {
    __extends(Missing_arguments, _super);
    function Missing_arguments(args, solution) {
        var _this = this;
        if (typeof args === 'string') {
            args = [args];
        }
        var braces = args.map(function (it) { return '{' + it + '}'; });
        var str = "" + braces.join(',');
        _this = _super.call(this, "Missing arguments: " + str, solution) || this;
        return _this;
    }
    return Missing_arguments;
}(invalid_argument_1.Invalid_argument));
exports.Missing_arguments = Missing_arguments;
//# sourceMappingURL=missing_arguments.js.map