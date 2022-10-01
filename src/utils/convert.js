import { BigNumber } from 'bignumber.js';

// setup main method
export function bigNumberToString(obj, base, places = 2) {
  // setup base
  base = base || 10;

  // check if obj is type object, not an array and does not have BN properties
  if (typeof obj === 'object' && obj !== null && !Array.isArray(obj) && !('lessThan' in obj)) {
    // move through plain object
    Object.keys(obj).forEach(function(key) {
