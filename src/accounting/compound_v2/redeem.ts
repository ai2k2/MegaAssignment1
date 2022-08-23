import { Map as IMap, List } from 'immutable';

import { Price, PriceMethod, LocalCurrency, ImmutableMap, ITransaction } from '../../types';
import { lotsAndDisposalsFromTrade } from '../generic/trade';

export interface RedeemOptions {
  txId: string;
  pricesMap: ImmutableMap<{ string: List<Price> }>;
  transactionsMap: ImmutableMap<{ string: List<ITransaction> }>;
  priceMethod: PriceMethod;
  localCurrency: LocalCurrency;
}

/*
 * COMPOUND_REDEEM
 *
 * Creates Lots and Disposals associated with a compound REDEEM.
 */
export const lotsAndDisposalsFromCompoundRedeem = ({
  txId,
  transactionsMap,
  pricesMap,
  priceMethod,
  localCurrency
}: RedeemOptions) => {
  const redeem = transactionsMap.get(txId);
  const updatedTransactionsMap = transactionsMap.set(
    txId,
    IMap({
      tx_id: redeem.get('tx_id'),
      tx_type: 'TRADE',
      side: 'BUY',
      timestamp: redeem.get('timestamp'),