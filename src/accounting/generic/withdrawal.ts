import { Map as IMap, List } from 'immutable';
import { BigNumber } from 'bignumber.js';

import { Price, LocalCurrency, ImmutableMap, ITransaction, PriceMethod } from '../../types';
import Disposal from '../../disposal';
import { transactionUnixNumber, getPriceBigNumber } from '../helpers';
import { getFeeAmount } from '../fee';

/*
 * WITHDRAWAL
 *
 * Creates a single Disposal (unless there are fees of other asset types).
 * Creates a taxable event (if it is a captial asset).
 *
 * USE CASES:
 * Fiat: withdraw cash cash from portfolio.
 * Captial asset: spe