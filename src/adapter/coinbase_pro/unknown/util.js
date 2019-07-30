"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function pair_to_raw_coinbase_pro(name) {
    return name.replace('/', '-').toUpperCase();
}
exports.pair_to_raw_coinbase_pro = pair_to_raw_coinbase_pro;
function pair_from_raw_coinbase_pro(name) {
    return name.replace('-', '/').toLowerCase();
}
exports.pair_from_raw_coinbase_pro = pair_from_raw_coinbase_pro;
//# sourceMappingURL=util.js.map