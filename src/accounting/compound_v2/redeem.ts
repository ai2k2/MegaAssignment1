import { Map as IMap, List } from 'immutable';

import { Price, PriceMethod, LocalCurrency, ImmutableMap, ITransaction } from '../../types';
import { lotsAndDisposalsFromTrade } from '../generic/trade';

export interface RedeemOptions {
  txId: string;
  pricesMap: ImmutableMap<{ string: List<Price> }>;
  transactionsMap: ImmutableMap<{ string: 