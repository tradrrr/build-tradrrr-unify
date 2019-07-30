export interface I_account {
    /**
     * Provider account id:
     * "71452118-efc7-4cc4-8780-a5e22d4baa53"
     */
    unique: string;
    /**
     * Default currency setting:
     * "btc"
     * "usdt"
     */
    default_currency: string;
    /**
     * Total funds in the account:
     * 1.0
     * 4.2
     */
    balance: number;
    /**
     * Funds on hold (not available for withdraw or trade)
     * 0.5
     * 1.2
     */
    unmovable: number;
    /**
     * Funds available to withdraw or trade
     * 0.5
     * 1.2
     */
    movable: number;
}
