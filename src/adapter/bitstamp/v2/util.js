"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function pair_to_raw_bitstamp(name) {
    return name.replace('/', '').toLowerCase();
}
exports.pair_to_raw_bitstamp = pair_to_raw_bitstamp;
function pair_from_raw_bitstamp(name) {
    var map = {
        btcusd: 'btc/usd',
        btceur: 'btc/eur',
        eurusd: 'eur/usd',
        xrpusd: 'xrp/usd',
        xrpeur: 'xrp/eur',
        xrpbtc: 'xrp/btc',
        ltcusd: 'ltc/usd',
        ltceur: 'ltc/eur',
        ltcbtc: 'ltc/btc',
        ethusd: 'eth/usd',
        etheur: 'eth/eur',
        ethbtc: 'eth/btc',
        bchusd: 'bch/usd',
        bcheur: 'bch/eur',
        bchbtc: 'bch/btc',
    };
    return map[name];
}
exports.pair_from_raw_bitstamp = pair_from_raw_bitstamp;
//# sourceMappingURL=util.js.map