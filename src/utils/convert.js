import { BigNumber } from 'bignumber.js';

// setup main method
export function bigNumberToString(obj, base, places = 2) {
  // setup base
  base = base || 10;

  // check if obj is type object, not an array and does not have BN 