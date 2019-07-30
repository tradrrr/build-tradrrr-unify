import { Http_base } from '../adapter/base/v1_deprecated/http/adapter';
import { Ws_base } from '../adapter/base/v1_deprecated/ws/adapter';
import { T_protocol } from '../type/common';
export declare const platform$: {
    http: {
        coinbase_pro: any;
    };
    ws: {
        coinbase_pro: any;
    };
};
export declare function get_adapter(platform: string, protocol: T_protocol, config?: any): any;
/**
 * Use api the http
 * @param arg$
 */
export declare function http<T>(platform: string, config?: any): T & Http_base;
/**
 * Use api the http
 * @param arg$
 */
export declare function ws<T>(platform: string, config?: any): T & Ws_base;
