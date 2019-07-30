"use strict";
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
var Coinbase_pro = /** @class */ (function (_super) {
    __extends(Coinbase_pro, _super);
    function Coinbase_pro(config) {
        var _this = _super.call(this) || this;
        _this.http_reply_from_raw = http_reply_from_raw_coinbase_pro;
        _this.http_request_to_raw = http_request_to_raw_coinbase_pro;
        _this.ws_request_to_raw = ws_request_to_raw_coinbase_pro;
        _this.ws_reply_from_raw = ws_reply_from_raw_coinbase_pro;
        _this.ws_signal_from_raw = ws_signal_from_raw_coinbase_pro;
        config = __assign({
            ws: {
                base_url: 'wss://ws-feed.pro.coinbase.com/',
                signal_map: {
                    level2: 'book',
                    l2update: 'book',
                    ticker: 'ticker',
                },
            },
            http: { base_url: 'https://api.pro.coinbase.com/' },
        }, config);
        _this.merge_config(config);
        return _this;
    }
    Coinbase_pro.prototype.http_build_url = function () {
        return this.config.http.base_url;
    };
    Coinbase_pro.prototype.ws_build_url = function () {
        return this.config.ws.base_url;
    };
    return Coinbase_pro;
}(base_1.Base));
exports.Coinbase_pro = Coinbase_pro;
function http_reply_from_raw_coinbase_pro(data, signal, args) {
    if (args === void 0) { args = {}; }
    switch (signal) {
        case 'ticker':
            if (!args.pair_id) {
                throw new missing_arguments_1.Missing_arguments('pair_id');
            }
            return {
                timestamp: common_1.timestamp(data.time),
                pair_id: args.pair_id,
                price: common_1.n(data.price),
                quantity: data.size,
                raw_trade_id: data.trade_id,
            };
            break;
        case 'book':
            return {
                raw_sequence: data.sequence,
                pair_id: args.pair_id,
                timestamp: data.time ? common_1.timestamp(data.time) : common_1.now(),
                bids: data.bids.map(function (it) { return [common_1.n(it[0]), common_1.n(it[1]), common_1.n(it[2])]; }),
                asks: data.asks.map(function (it) { return [common_1.n(it[0]), common_1.n(it[1]), common_1.n(it[2])]; }),
            };
            break;
    }
}
exports.http_reply_from_raw_coinbase_pro = http_reply_from_raw_coinbase_pro;
function http_request_to_raw_coinbase_pro(signal, args) {
    if (args === void 0) { args = {}; }
    var r = {
        method: 'get',
        url: this.config.http.base_url,
    };
    if (args.pair_id) {
        args.pair_id = util_1.pair_to_raw_coinbase_pro(args.pair_id);
    }
    switch (signal) {
        case 'book':
            if (!args.pair_id) {
                throw new missing_arguments_1.Missing_arguments('pair_id');
            }
            r.url += "/products/" + args.pair_id + "/book";
            r.params = {
                level: 2,
            };
            break;
        case 'ticker':
            if (!args.pair_id) {
                throw new missing_arguments_1.Missing_arguments('pair_id');
            }
            r.url += "/products/" + args.pair_id + "/ticker";
            break;
        default:
            throw new invalid_signal_1.Invalid_signal(signal);
    }
    return r;
}
exports.http_request_to_raw_coinbase_pro = http_request_to_raw_coinbase_pro;
function ws_request_to_raw_coinbase_pro(signal, args) {
    var r = {
        type: 'subscribe',
        channels: [{}],
    };
    var row = r.channels[0];
    switch (signal) {
        case 'book':
            if (!args.pair_id) {
                throw new missing_arguments_1.Missing_arguments('pair_id');
            }
            row.name = 'level2';
            row.product_ids = [util_1.pair_to_raw_coinbase_pro(args.pair_id)];
            break;
        case 'ticker':
            if (!args.pair_id) {
                throw new missing_arguments_1.Missing_arguments('pair_id');
            }
            row.name = 'ticker';
            row.product_ids = [util_1.pair_to_raw_coinbase_pro(args.pair_id)];
            break;
    }
    return r;
}
exports.ws_request_to_raw_coinbase_pro = ws_request_to_raw_coinbase_pro;
function ws_reply_from_raw_coinbase_pro(raw, signal, args) {
    var data = common_1.from_json(raw);
    switch (this.ws_signal_from_raw(data.type)) {
        case 'ticker':
            if (!args.pair_id) {
                throw new missing_arguments_1.Missing_arguments('pair_id');
            }
            return {
                timestamp: common_1.timestamp(data.time),
                sequence: data.sequence,
                pair_id: util_1.pair_from_raw_coinbase_pro(data.product_id),
                price: common_1.n(data.price),
                quantity: common_1.n(data.last_size),
            };
            break;
        case 'book':
            var bids_1 = [];
            var asks_1 = [];
            data.changes.forEach(function (it) {
                var row = [common_1.n(it[1]), common_1.n(it[2])];
                if (it[0] === 'buy') {
                    asks_1.push(row);
                }
                else {
                    bids_1.push(row);
                }
            });
            return {
                timestamp: common_1.timestamp(data.time),
                pair_id: util_1.pair_from_raw_coinbase_pro(data.product_id),
                bids: bids_1,
                asks: asks_1,
            };
            break;
    }
}
exports.ws_reply_from_raw_coinbase_pro = ws_reply_from_raw_coinbase_pro;
function ws_signal_from_raw_coinbase_pro(name) {
    return this.config.ws.signal_map[name];
}
exports.ws_signal_from_raw_coinbase_pro = ws_signal_from_raw_coinbase_pro;
//# sourceMappingURL=coinbase_pro.js.map