
import createReport from '../src/index';
import {
  repayBorrowFactory,
  borrowFactory,
  redeemFactory,
  mintFactory,
  depositFactory,
  taxReportFactory,
  liqBorrow_BorrowerFactory,
  liqBorrow_LiquidatorFactory
} from './utils/factories';
import { impliedPrice } from './utils/price';

describe('Compound Lending', () => {
  test('Lend DAI', () => {
    const tx = mintFactory({
      timestamp: '2019-01-01T01:00:00Z',
      c_token_amount: '4270.51788924',
      c_token_code: 'CDAI',
      supplied_amount: '89.90136056219178411',
      supplied_code: 'DAI'
    });
    // In this example, DAI has broken it's peg. It's 2 USD per DAI.
    const daiPriceRecord = {
      tx_id: tx.tx_id,
      timestamp: tx.timestamp,
      base_code: 'DAI',
      quote_code: 'USD',
      price: '2'