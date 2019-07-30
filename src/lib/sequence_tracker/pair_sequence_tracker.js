"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sequence_tracker_1 = require("./sequence_tracker");
var Pair_sequence_tracker = /** @class */ (function () {
    function Pair_sequence_tracker() {
        this.store = {};
    }
    Pair_sequence_tracker.prototype.get = function (pair) {
        var tracker = this.get_tracker(pair);
        if (!tracker) {
            return null;
        }
        return tracker.get();
    };
    Pair_sequence_tracker.prototype.set = function (pair, num) {
        var s = this.store;
        var tracker = s[pair] = s[pair] || new sequence_tracker_1.Sequence_tracker();
        return tracker.set(num);
    };
    Pair_sequence_tracker.prototype.get_tracker = function (pair) {
        return this.store[pair];
    };
    return Pair_sequence_tracker;
}());
exports.Pair_sequence_tracker = Pair_sequence_tracker;
//# sourceMappingURL=pair_sequence_tracker.js.map