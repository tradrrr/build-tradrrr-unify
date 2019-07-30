"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function pair_to_raw_binance(name) {
    return name.replace('/', '').toUpperCase();
}
exports.pair_to_raw_binance = pair_to_raw_binance;
function pair_from_raw_binance(name) {
    var map = {
        btcusdt: 'btc/usdt',
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
exports.pair_from_raw_binance = pair_from_raw_binance;
//# sourceMappingURL=util.js.map