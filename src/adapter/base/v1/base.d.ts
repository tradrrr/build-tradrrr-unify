import { AxiosRequestConfig } from 'axios';
import { Pair_sequence_tracker } from '../../../lib/sequence_tracker/pair_sequence_tracker';
import { T_book_items } from '../../../type/common';
export declare type T_signal = 'ticker' | 'book';
export declare type T_signal_http = T_signal;
export declare type T_signal_ws = T_signal;
export interface T_args_ticker {
    pair_id?: string;
}
export interface T_args_book {
    pair_id?: string;
}
export interface T_config_common {
    base_url?: string;
}
export interface T_config_http extends T_config_common {
}
export interface T_config_ws extends T_config_common {
    /**
     * WebSocket constructor
     *
     * Most of the times it's WebSocket from DOM API
     */
    klass?: typeof WebSocket;
    /**
     * Channel name to signal map
     */
    signal_map?: {
        [raw: string]: T_signal;
    };
}
export interface T_config {
    http?: T_config_http;
    ws?: T_config_ws;
}
export interface T_http_opt {
    /**
     * http() will return response.data by default,
     * when raw is true, http() will return raw
     * response object
     */
    raw?: boolean;
}
export interface T_ws_opt {
    on_open?: (ev: Event) => any;
    on_close?: (ev: CloseEvent) => any;
    on_message?: (ev: MessageEvent) => any;
    on_error?: (ev: Event) => any;
    on_data?: (data: any) => any;
}
export interface T_reply_common {
    timestamp?: number;
    raw_sequence?: number;
    raw_trade_id?: number;
}
export interface T_reply_common_pair extends T_reply_common {
    pair_id?: string;
}
export interface T_reply_ticker extends T_reply_common_pair {
    price?: number;
    quantity?: number;
}
export interface T_reply_book extends T_reply_common_pair {
    bids?: T_book_items;
    asks?: T_book_items;
}
export declare abstract class Base {
    default_config: T_config;
    tracker: Pair_sequence_tracker;
    config: T_config;
    merge_config(config?: T_config): void;
    validate_sequence(data: any, by?: string): number | false;
    static validate_config(config: T_config): void;
    http(signal: T_signal_http, args?: any, opt?: T_http_opt): Promise<any>;
    ws(signal: T_signal_ws | string, args?: any, opt?: T_ws_opt | Function | any): WebSocket;
    abstract http_build_url(signal: T_signal | string, args?: any): string;
    abstract http_request_to_raw(signal: T_signal | string, args?: any): AxiosRequestConfig;
    abstract http_reply_from_raw(data: any, signal: T_signal | string, args: any): any;
    abstract ws_build_url(signal: T_signal | string, args?: any): string;
    abstract ws_request_to_raw(signal: T_signal | string, args?: any): any;
    abstract ws_reply_from_raw(data: any, signal: T_signal | string, args: any): any;
}
