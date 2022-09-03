import moment from 'moment';
import { Map as IMap, List } from 'immutable';
import { BigNumber } from 'bignumber.js';

import { HackedStack } from './types';
import TaxLot from './taxLot';
import Disposal from './disposal';

export const lotSort = (lots: List<TaxLot>, costMethod: string): 