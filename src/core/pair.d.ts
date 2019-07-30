export interface I_pair {
    /**
     * Unique id for pairs: "BTC:USDT" | "LTC:BTC"
     *
     * Product ID will not change once assigned to a product
     */
    pair_id: string;
    /**
     * Base currency: "BTC" | "LTC"
     */
    base_currency: string;
    /**
     * Quote currency: "USDT" | "BTC"
     */
    quote_currency: string;
    /**
     * The base_min_size and base_max_size fields define the min and max order size:
     * 0.001
     */
    base_min_size: number;
    /**
     * The base_min_size and base_max_size fields define the min and max order size.
     * 10000.00
     */
    base_max_size: number;
    /**
     * The min order price as well as the price increment:
     * 0.01
     */
    quote_increment: number;
}
export declare class Pair {
}
