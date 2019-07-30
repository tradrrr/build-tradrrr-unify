"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* global window self */
// @ts-ignore
var is_browser = typeof window !== 'undefined' && typeof window.document !== 'undefined';
exports.is_browser = is_browser;
// @ts-ignore
var is_webWorker = typeof self === 'object' &&
    self.constructor &&
    self.constructor.name === 'DedicatedWorkerGlobalScope';
exports.is_webWorker = is_webWorker;
// @ts-ignore
var is_node = typeof process !== 'undefined' &&
    process.versions != null &&
    process.versions.node != null;
exports.is_node = is_node;
//# sourceMappingURL=env.js.map