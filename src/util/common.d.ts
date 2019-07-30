import BigNumber from 'bignumber.js';
export declare function to_json(data: any): string;
export declare function from_json(json: string): any;
/**
 * Parse time to timestamp
 *
 * @param time : "2017-09-02T17:05:49.250000Z"
 * @return : 1504371949250
 */
export declare function timestamp(time: string): number;
/**
 * Timestamp for now
 */
export declare function now(): number;
/**
 * BigNumber factory
 * @param arg$
 */
export declare function big(value: BigNumber.Value, base?: number): BigNumber;
export declare function n(value: BigNumber.Value, base?: number): number;
