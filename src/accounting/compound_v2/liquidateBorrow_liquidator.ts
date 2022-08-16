import { Map as IMap, List } from 'immutable';
import { BigNumber } from 'bignumber.js';

import TaxLot from '../../taxLot';
import Disposal from '../../disposal';
import { GenericTransformOptions } from '../../types';
import { transactionUnixNumber, getPriceBigNumber } from '../helpers';

/*
 * COMPOUND_LIQUIDATEBORROW_LIQUIDATOR
 *
 * Creates TaxLots and Dispos