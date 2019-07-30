/**
 * [price, size, order_id]
 */
export declare type I_bid = [number, number, string];
export declare type I_ask = I_bid;
export interface T_order_book {
    sequence?: string;
    bid$: I_bid[];
    ask$: I_ask[];
}
export declare class Book {
    static find({ pair_id: string }: {
        pair_id: any;
    }): void;
}
