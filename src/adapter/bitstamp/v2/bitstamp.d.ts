import { AxiosRequestConfig } from 'axios';
import { Base, T_args_book, T_args_ticker, T_config, T_reply_book, T_reply_ticker, T_signal } from '../../base/v1/base';
export declare class Bitstamp extends Base {
    constructor(config?: T_config);
    http_reply_from_raw: typeof http_reply_from_raw_bitstamp;
    http_request_to_raw: typeof http_request_to_raw_bitstamp;
    ws_request_to_raw: typeof ws_request_to_raw_bitstamp;
    ws_reply_from_raw: typeof ws_reply_from_raw_bitstamp;
    http_build_url(): string;
    ws_build_url(): string;
}
export declare function http_request_to_raw_bitstamp(signal: T_signal | string, args?: T_args_ticker | T_args_book): AxiosRequestConfig;
export declare function http_reply_from_raw_bitstamp(data: any, signal: T_signal | string, args?: any): T_reply_ticker | T_reply_book;
export declare function ws_request_to_raw_bitstamp(signal: T_signal | string, args?: any): any;
export declare function ws_reply_from_raw_bitstamp(raw: any, signal: T_signal | string, args: any): any;
