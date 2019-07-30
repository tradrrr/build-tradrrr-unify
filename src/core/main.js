"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var invalid_argument_1 = require("@bithana/general-exception/build/external/caller_fault/invalid_argument");
var binance_1 = require("../adapter/binance/v1/binance");
var bitstamp_1 = require("../adapter/bitstamp/v2/bitstamp");
var coinbase_pro_1 = require("../adapter/coinbase_pro/unknown/coinbase_pro");
exports.platform$ = {
    coinbase_pro: coinbase_pro_1.Coinbase_pro,
    bitstamp: bitstamp_1.Bitstamp,
    binance: binance_1.Binance,
};
function get_adapter(platform) {
    var Klass = exports.platform$[platform];
    if (!Klass) {
        throw new invalid_argument_1.Invalid_argument("Invalid provider \"" + platform + "\"", "Supported platforms: " + Object.keys(exports.platform$));
    }
    return Klass;
}
exports.get_adapter = get_adapter;
function unify(platform, config) {
    if (config === void 0) { config = {}; }
    var Klass = get_adapter(platform);
    return new Klass(config);
}
exports.unify = unify;
//# sourceMappingURL=main.js.map