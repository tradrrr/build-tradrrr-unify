import { Invalid_argument } from '@bithana/general-exception/build/internal/caller_fault/invalid_argument';
export declare class Invalid_signal extends Invalid_argument {
    constructor(action: string, supported?: string[]);
}
