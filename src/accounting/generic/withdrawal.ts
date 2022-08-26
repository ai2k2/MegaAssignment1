import { Map as IMap, List } from 'immutable';
import { BigNumber } from 'bignumber.js';

import { Price, LocalCurrency, ImmutableMap, ITransaction, PriceMethod } from '../../types';
import Disposal from '../../disposal';
import { transactionUnixNumber, getPriceBigNumber } from '../helpers';
import { getFeeAmount } from '../fee';

/*
 * WITHDRAWAL
 *
 * Creates a single Disposal (unl