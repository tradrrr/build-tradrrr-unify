"use strict";
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var invalid_argument_1 = require("@bithana/general-exception/build/internal/caller_fault/invalid_argument");
var axios_1 = require("axios");
var missing_arguments_1 = require("../../../exception/missing_arguments");
var pair_sequence_tracker_1 = require("../../../lib/sequence_tracker/pair_sequence_tracker");
var common_1 = require("../../../util/common");
var _ = require("lodash");
var Base = /** @class */ (function () {
    function Base() {
        this.default_config = {
            http: {},
            ws: {},
        };
        this.tracker = new pair_sequence_tracker_1.Pair_sequence_tracker;
        // abstract ws_signal_from_raw(name: string): T_signal & string
    }
    Base.prototype.merge_config = function (config) {
        var merged = __assign({}, this.default_config, config);
        Base.validate_config(merged);
        this.config = merged;
    };
    Base.prototype.validate_sequence = function (data, by) {
        if (by === void 0) { by = 'timestamp'; }
        var p = data.pair_id;
        var s = data[by];
        if (s && p) {
            var ahead = this.tracker.set(p, s);
            return ahead;
        }
    };
    Base.validate_config = function (config) {
        if (config.http.base_url) {
            if (!config.http.base_url.endsWith('/'))
                throw new invalid_argument_1.Invalid_argument('Invalid base_url, each base url should ends with a "/"', 'Invalid: "http://api.com", valid: "http://api.com/"');
        }
    };
    Base.prototype.http = function (signal, args, opt) {
        if (opt === void 0) { opt = { raw: false }; }
        return __awaiter(this, void 0, void 0, function () {
            var r, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios_1.default(this.http_request_to_raw(signal, _.clone(args)))];
                    case 1:
                        r = _a.sent();
                        if (opt.raw) {
                            return [2 /*return*/, r];
                        }
                        else {
                            data = r.data;
                            return [2 /*return*/, this.http_reply_from_raw(data, signal, _.clone(args))];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    Base.prototype.ws = function (signal, args, opt) {
        var _this = this;
        if (opt === void 0) { opt = {}; }
        var Ws = this.config.ws.klass || WebSocket;
        var client = new Ws(this.ws_build_url(signal, args));
        if (_.isFunction(opt)) {
            opt = { on_data: opt };
        }
        if (!opt.on_data) {
            throw new missing_arguments_1.Missing_arguments('opt.on_data', 'ws("ticker", fn) or ws("ticker", {on_data: fn})');
        }
        // Open
        client.addEventListener('open', function (e) {
            if (opt.on_open) {
                opt.on_open(e);
            }
            else {
                console.info('ws opened');
                client.send(common_1.to_json(_this.ws_request_to_raw(signal, _.clone(args))));
            }
        });
        // Message
        client.addEventListener('message', function (e) {
            if (opt.on_data) {
                var raw = e.data;
                try {
                    var data = _this.ws_reply_from_raw(raw, signal, _.clone(args));
                    if (data && _this.validate_sequence(data)) {
                        opt.on_data(data);
                    }
                }
                catch (e) {
                    console.log('[Error data]\n   Raw data:', raw);
                    console.log('   Event:', e);
                    throw e;
                }
            }
            opt.on_message && opt.on_message(e);
        });
        // Close
        client.addEventListener('close', function (e) {
            if (opt.on_close) {
                opt.on_close(e);
            }
            else {
                console.info('ws closed');
            }
        });
        return client;
    };
    return Base;
}());
exports.Base = Base;
//# sourceMappingURL=base.js.map