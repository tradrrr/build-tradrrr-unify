export interface I_hold {
    unique: string;
    account_unique: string;
    time_create: string;
    time_update: string;
    /**
     * Value of this hold:
     * 3.1
     */
    amount: number;
    /**
     * The type of the hold will indicate why the hold exists:
     * "order"
     */
    type: string;
    /**
     * ID for hold, depend on what `this.type` is, if `this.type`
     * is "order", then `this.ref` should be order id
     */
    ref: string;
}
