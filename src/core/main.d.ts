import { Base, T_config } from '../adapter/base/v1/base';
import { Binance } from '../adapter/binance/v1/binance';
import { Bitstamp } from '../adapter/bitstamp/v2/bitstamp';
import { Coinbase_pro } from '../adapter/coinbase_pro/unknown/coinbase_pro';
import { T_platform } from '../type/common';
export declare const platform$: {
    coinbase_pro: typeof Coinbase_pro;
    bitstamp: typeof Bitstamp;
    binance: typeof Binance;
};
export declare function get_adapter(platform: string): any;
export declare function unify(platform: T_platform, config?: T_config): Base;
