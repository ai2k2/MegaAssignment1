import { Map as IMap, List } from 'immutable';

import { GenericTransformOptions } from '../../types';
import { lotsAndDisposalsFromWithdrawal } from '../generic/withdrawal';

/*
 * COMPOUND_LIQUIDATEBORROW_BORROWER
 *
 * Creates Disposals associated with a compound COMPOUND_LIQUIDATEBORROW_BORROWER.
 */
export const lotsAndDisposalsFromCompoundLiquidateBorrower = ({
  txId,
  transactionsMap,
  pricesMap,
  priceMethod,
  localCurrency
}: GenericTransformOptions) => {
  const transaction = transactionsMap.get(txId);
  const updatedTransaction