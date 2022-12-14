import createReport from '../../src/index';
import { PriceMethod, CostBasisMethod, Price } from '../../src/types';
import {
  taxReportFactory,
  depositFactory,
  tradeFactory,
  withdrawalFactory
} from '../utils/factories';

describe('deposit assets', () => {
  describe('crypto/fiat short term gains - deposit BTC - null fees on deposit', () => {
    const deposit_1 = depositFactory({
      timestamp: '2018-01-01T01:00:00Z',
      deposit_amount: '1',
      deposit_code: 'BTC'
    });
    const deposit_2 = depositFactory({
      timestamp: '2018-01-02T01:00:00Z',
      deposit_amount: '1',
      deposit_code: 'BTC'
    });
    const deposit_3 = depositFactor