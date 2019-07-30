"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var invalid_argument_1 = require("@bithana/general-exception/build/external/caller_fault/invalid_argument");
var adapter_1 = require("../adapter/coinbase_pro/latest_deprecated/http/adapter");
var adapter_2 = require("../adapter/coinbase_pro/latest_deprecated/ws/adapter");
var lodash_1 = require("lodash");
exports.platform$ = {
    http: {
        coinbase_pro: adapter_1.Coinbase_pro_http_adapter,
    },
    ws: {
        coinbase_pro: adapter_2.Ws_coinbase_pro,
    },
};
function get_adapter(platform, protocol, config) {
    var Klass = lodash_1.get(exports.platform$, [protocol, platform]);
    if (!Klass) {
        throw new invalid_argument_1.Invalid_argument("Invalid provider \"" + platform + "\"", "Supported platforms: " + Object.keys(exports.platform$));
    }
    return Klass;
}
exports.get_adapter = get_adapter;
/**
 * Use api the http
 * @param arg$
 */
function http(platform, config) {
    var Klass = get_adapter(platform, 'http', config);
    return new Klass(config);
}
exports.http = http;
/**
 * Use api the http
 * @param arg$
 */
function ws(platform, config) {
    var Klass = get_adapter(platform, 'ws', config);
    return new Klass(config);
}
exports.ws = ws;
//# sourceMappingURL=main_deprecated.js.map