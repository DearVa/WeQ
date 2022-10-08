/* eslint-disable @typescript-eslint/no-empty-function */

const isDebug = true;

export const log = isDebug ? console.log : () => {};

export const info = isDebug ? console.info : () => {};

export const warn = isDebug ? console.warn : () => {};

export const debug = isDebug ? console.debug : () => {};

export const error = isDebug ? console.error : () => {};