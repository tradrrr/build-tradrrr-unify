import { Invalid_argument } from '@bithana/general-exception/build/internal/caller_fault/invalid_argument';
export declare class Missing_arguments extends Invalid_argument {
    constructor(args: string | string[], solution?: string);
}
