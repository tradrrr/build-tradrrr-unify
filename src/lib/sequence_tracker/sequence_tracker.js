"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Sequence_tracker = /** @class */ (function () {
    function Sequence_tracker() {
        this.max = 0;
    }
    Sequence_tracker.prototype.set = function (num) {
        var ahead = num - this.max;
        if (ahead <= 0) {
            return false;
        }
        this.max = num;
        return ahead;
    };
    Sequence_tracker.prototype.get = function () {
        return this.max;
    };
    return Sequence_tracker;
}());
exports.Sequence_tracker = Sequence_tracker;
//# sourceMappingURL=sequence_tracker.js.map