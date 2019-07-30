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
var Invalid_signal = /** @class */ (function (_super) {
    __extends(Invalid_signal, _super);
    function Invalid_signal(action, supported) {
        return _super.call(this, "Invalid action " + action, "Supported channels: " + supported) || this;
    }
    return Invalid_signal;
}(invalid_argument_1.Invalid_argument));
exports.Invalid_signal = Invalid_signal;
//# sourceMappingURL=invalid_signal.js.map