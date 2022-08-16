import { Map as IMap, List } from 'immutable';
import { BigNumber } from 'bignumber.js';

import TaxLot from '../../taxLot';
import Disposal from '../../disposal';
import { GenericTransformOptions } from '../../types';
import { transactionUnixNumber, getPriceBigNumber } from '../helpers';

/*
 * COMPOUND_LIQUIDATEBORROW_LIQUIDATOR
 *
 * Creates TaxLots and Disposals associated with a compound COMPOUND_LIQUIDATEBORROW_LIQUIDATOR.
 * Liquidating someone results in:
 * - spending (the amount used to repay another users position)
 * - deposit (the cTokens transferred to the liquidator)
 *
 * Notes:
 * base asset: the asset used for repayment of another user's position
 * quote asset: the cTokens transferred to the liquidator
 */
export const lotsAndDisposalsFromCompoundLiquid