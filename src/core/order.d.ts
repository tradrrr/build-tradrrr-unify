export declare type Side = 'buy' | 'sell';
export interface I_order {
    /**
     * Provider order id:
     * "71452118-efc7-4cc4-8780-a5e22d4baa53"
     */
    unique: string;
    price: number;
    size: number;
    pair_id: string;
    side: Side;
}
