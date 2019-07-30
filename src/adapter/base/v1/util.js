"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
var api_1 = require("../../../config/api");
var invalid_platform_1 = require("../../../exception/invalid_platform");
var util_1 = require("../../coinbase_pro/unknown/util");
function url(type, provider, seg) {
    var config = api_1.api_config[provider][type];
    return config.protocol + '://' + config.domain + '/' + lodash_1.trim(seg, '/');
}
exports.url = url;
function pair_to_raw(name, platform) {
    var r;
    switch (platform) {
        case 'coinbase_pro':
            r = util_1.pair_to_raw_coinbase_pro(name);
            break;
        default:
            throw new invalid_platform_1.Invalid_platform(platform);
    }
    return r;
}
exports.pair_to_raw = pair_to_raw;
function pair_from_raw(name, platform) {
    var r;
    switch (platform) {
        case 'coinbase_pro':
            r = util_1.pair_from_raw_coinbase_pro(name);
            break;
        default:
            throw new invalid_platform_1.Invalid_platform(platform);
    }
    return r;
}
exports.pair_from_raw = pair_from_raw;
//# sourceMappingURL=util.js.map