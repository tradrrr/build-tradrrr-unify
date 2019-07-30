"use strict";
/*
 |--------------------------------------------------------------------------
 | Binance API adapter
 |--------------------------------------------------------------------------
 | TRAP:
 | Binance currently doesn't support CORS http API (Typical Binance)
 */
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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var invalid_signal_1 = require("../../../exception/invalid_signal");
var missing_arguments_1 = require("../../../exception/missing_arguments");
var common_1 = require("../../../util/common");
var base_1 = require("../../base/v1/base");
var util_1 = require("./util");
var Binance = /** @class */ (function (_super) {
    __extends(Binance, _super);
    function Binance(config) {
        var _this = _super.call(this) || this;
        _this.http_reply_from_raw = http_reply_from_raw_binance;
        _this.http_request_to_raw = http_request_to_raw_binance;
        _this.ws_request_to_raw = ws_request_to_raw_binance;
        _this.ws_reply_from_raw = ws_reply_from_raw_binance;
        config = __assign({
            ws: {
                base_url: 'wss://stream.binance.com:9443/',
            },
            http: { base_url: 'https://api.binance.com/' },
        }, config);
        _this.merge_config(config);
        return _this;
    }
    Binance.prototype.http_build_url = function () {
        return this.config.http.base_url;
    };
    Binance.prototype.ws_build_url = function (signal, args) {
        if (!args.pair_id) {
            throw new missing_arguments_1.Missing_arguments('pair_id');
        }
        var chan;
        switch (signal) {
            case 'book':
                chan = 'depth20';
                break;
            case 'ticker':
                chan = '24hrTicker';
                break;
        }
        return this.config.ws.base_url + 'ws/' + util_1.pair_to_raw_binance(args.pair_id).toLowerCase() + '@' + chan;
    };
    return Binance;
}(base_1.Base));
exports.Binance = Binance;
function http_request_to_raw_binance(signal, args) {
    if (args === void 0) { args = {}; }
    var r = {
        method: 'get',
        url: this.config.http.base_url,
    };
    if (args.pair_id) {
        args.pair_id = util_1.pair_to_raw_binance(args.pair_id);
    }
    switch (signal) {
        case 'ticker':
            if (!args.pair_id) {
                throw new missing_arguments_1.Missing_arguments('pair_id');
            }
            r.url += "api/v1/ticker/24hr";
            r.params = {
                symbol: args.pair_id,
            };
            break;
        case 'book':
            if (!args.pair_id) {
                throw new missing_arguments_1.Missing_arguments('pair_id');
            }
            r.url += "api/v1/depth";
            r.params = {
                symbol: args.pair_id,
            };
            break;
        default:
            throw new invalid_signal_1.Invalid_signal(signal);
    }
    return r;
}
exports.http_request_to_raw_binance = http_request_to_raw_binance;
function http_reply_from_raw_binance(data, signal, args) {
    if (args === void 0) { args = {}; }
    switch (signal) {
        case 'ticker':
            if (!args.pair_id) {
                throw new missing_arguments_1.Missing_arguments('pair_id');
            }
            return {
                timestamp: common_1.now(),
                pair_id: args.pair_id,
                price: common_1.n(data.lastPrice),
                quantity: common_1.n(data.lastQty),
            };
            break;
        case 'book':
            return {
                pair_id: args.pair_id,
                timestamp: common_1.now(),
                bids: data.bids.map(function (it) { return [common_1.n(it[0]), common_1.n(it[1])]; }),
                asks: data.asks.map(function (it) { return [common_1.n(it[0]), common_1.n(it[1])]; }),
            };
            break;
    }
}
exports.http_reply_from_raw_binance = http_reply_from_raw_binance;
function ws_request_to_raw_binance(signal, args) {
    var pair_id;
    if (args.pair_id) {
        pair_id = util_1.pair_to_raw_binance(args.pair_id);
    }
    var r = {
        stream: pair_id,
    };
    switch (signal) {
        case 'book':
            // if (!args.pair_id) {
            //   throw new Missing_arguments('pair_id')
            // }
            //
            // data.channel = `order_book_${pair_id}`
            break;
        case 'ticker':
            if (!args.pair_id) {
                throw new missing_arguments_1.Missing_arguments('pair_id');
            }
            r.stream += '@ticker';
            break;
    }
    return r;
}
exports.ws_request_to_raw_binance = ws_request_to_raw_binance;
function ws_reply_from_raw_binance(raw, signal, args) {
    var d = common_1.from_json(raw);
    var data = d.data;
    var is_ticker = d.e === '24hrTicker';
    var is_book = d.event === 'data' && d.channel.startsWith('order_book');
    if (is_ticker) {
        if (!args.pair_id) {
            throw new missing_arguments_1.Missing_arguments('pair_id');
        }
        return {
            timestamp: common_1.n(data.microtimestamp) / 1000,
            pair_id: args.pair_id,
            price: data.price,
            quantity: data.amount,
            raw_trade_id: data.buy_order_id,
        };
    }
    if (is_book) {
        return {
            timestamp: common_1.n(data.microtimestamp) / 1000,
            pair_id: args.pair_id,
            bids: data.bids.map(function (it) { return [common_1.n(it[0]), common_1.n(it[1])]; }),
            asks: data.asks.map(function (it) { return [common_1.n(it[0]), common_1.n(it[1])]; }),
        };
    }
}
exports.ws_reply_from_raw_binance = ws_reply_from_raw_binance;
//# sourceMappingURL=binance.js.map