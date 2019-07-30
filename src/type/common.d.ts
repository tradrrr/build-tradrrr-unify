export declare type T_protocol = 'ws' | 'http';
export declare type T_pair = string;
export declare type T_side = 'buy' | 'sell';
export declare type T_price = number;
export declare type T_quantity = number;
export declare type T_order_count = number;
export declare type T_book_item = [T_price, T_quantity, T_order_count?];
export declare type T_book_items = T_book_item[];
export declare type T_platform = 'bitstamp' | 'coinbase_pro' | 'binance' | 'huobi_global' | 'okex';
export interface T_obj {
    [name: string]: any;
}
