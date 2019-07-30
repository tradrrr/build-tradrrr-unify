"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bignumber_js_1 = require("bignumber.js");
function to_json(data) {
    return JSON.stringify(data);
}
exports.to_json = to_json;
function from_json(json) {
    return JSON.parse(json);
}
exports.from_json = from_json;
/**
 * Parse time to timestamp
 *
 * @param time : "2017-09-02T17:05:49.250000Z"
 * @return : 1504371949250
 */
function timestamp(time) {
    return new Date(time).getTime();
}
exports.timestamp = timestamp;
/**
 * Timestamp for now
 */
function now() {
    return new Date().getTime();
}
exports.now = now;
/**
 * BigNumber factory
 * @param arg$
 */
function big(value, base) {
    return new bignumber_js_1.default(value, base);
}
exports.big = big;
function n(value, base) {
    return big(value, base).toNumber();
}
exports.n = n;
//# sourceMappingURL=common.js.map