/* eslint-disable @typescript-eslint/no-empty-function */

const enabled = true;

export const log = enabled ? console.log : () => {};

export const info = enabled ? console.info : () => {};

export const warn = enabled ? console.warn : () => {};

export const debug = enabled ? console.debug : () => {};

export const error = enabled ? console.error : () => {};

