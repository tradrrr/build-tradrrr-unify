import { Sequence_tracker } from './sequence_tracker';
export declare class Pair_sequence_tracker {
    private store;
    get(pair: string): number;
    set(pair: string, num: number): number | false;
    get_tracker(pair: string): Sequence_tracker;
}
