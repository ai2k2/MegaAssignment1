
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
    };
    const cDAIprice = impliedPrice({
      amountPriced: tx.supplied_amount,
      amountUnpriced: tx.c_token_amount,
      price: daiPriceRecord.price
    });
    const prices = [
      daiPriceRecord,
      {
        tx_id: tx.tx_id,
        timestamp: tx.timestamp,
        base_code: 'CDAI',
        quote_code: 'USD',
        price: cDAIprice
      }
    ];
    const transactions = [tx];
    const received = createReport({
      transactions,
      prices,
      config: {
        local_currency: 'USD',
        price_method: 'BASE',
        cost_basis_method: 'FIFO',
        decimal_places: 2
      }
    });
    const expected = taxReportFactory({
      report: {
        2019: {
          assets: {
            CDAI: {
              holdings: '4270.51788924',
              increase: '4270.51788924',
              decrease: '0'
            },
            DAI: {
              holdings: '-89.90136056219178411',
              increase: '0',
              decrease: '89.90136056219178411'
            }
          },
          short: [
            {
              asset: 'DAI',
              asset_amount: '89.90136056219178411',
              cost_basis: '0',
              date_acquired: '2019-01-01T01:00:00Z',
              date_sold: '2019-01-01T01:00:00Z',
              proceeds: '179.8',
              tx_id_sale: tx.tx_id
            }
          ],
          unmatched: [
            {
              asset: 'DAI',
              asset_amount: '89.90136056219178411',
              cost_basis: '0',
              date_acquired: '2019-01-01T01:00:00Z',
              date_sold: '2019-01-01T01:00:00Z',
              proceeds: '179.8',
              tx_id_sale: tx.tx_id
            }
          ]
        }
      },
      config: {
        local_currency: 'USD',
        price_method: 'BASE',
        cost_basis_method: 'FIFO',
        decimal_places: 2,
        allow_lot_overlap: true
      }
    });
    expect(received).toEqual(expected);
  });
  test('Lend and Redeem DAI', () => {
    const mintTx = mintFactory({
      timestamp: '2019-01-01T01:00:00Z',
      c_token_amount: '4270.51788924',
      c_token_code: 'CDAI',
      supplied_amount: '89.90136056219178411',
      supplied_code: 'DAI'
    });
    const redeemTx = redeemFactory({
      tx_id: 'dec961d7-0765-42af-bf57-a88d5356faf7',
      timestamp: '2019-01-02T01:00:00Z',
      redeem_amount: '89.902620769167106564',
      redeem_code: 'DAI',
      c_token_amount: '4270.51788924',
      c_token_code: 'CDAI'
    });
    // In this example, DAI has broken it's peg. It's 2 USD per DAI.
    const daiPriceRecordMint = {
      tx_id: mintTx.tx_id,
      timestamp: '2019-01-01T01:00:00Z',
      base_code: 'DAI',
      quote_code: 'USD',
      price: '2'
    };
    const daiPriceRecordRedeem = {
      tx_id: 'dec961d7-0765-42af-bf57-a88d5356faf7',
      timestamp: '2019-01-02T01:00:00Z',
      base_code: 'DAI',
      quote_code: 'USD',
      price: '2'
    };
    const cDAIpriceMint = impliedPrice({
      amountPriced: mintTx.supplied_amount,
      amountUnpriced: mintTx.c_token_amount,
      price: daiPriceRecordMint.price
    });
    const cDAIpriceRedeem = impliedPrice({
      amountPriced: redeemTx.c_token_amount,
      amountUnpriced: redeemTx.redeem_amount,
      price: daiPriceRecordRedeem.price
    });
    const prices = [
      daiPriceRecordMint,
      {
        tx_id: mintTx.tx_id,
        timestamp: '2019-01-01T01:00:00Z',
        base_code: 'CDAI',
        quote_code: 'USD',
        price: cDAIpriceMint
      },
      daiPriceRecordRedeem,
      {
        tx_id: 'dec961d7-0765-42af-bf57-a88d5356faf7',
        timestamp: '2019-01-02T01:00:00Z',
        base_code: 'CDAI',
        quote_code: 'USD',
        price: cDAIpriceRedeem
      }
    ];
    const transactions = [mintTx, redeemTx];
    const received = createReport({
      transactions,
      prices,
      config: {
        local_currency: 'USD',
        price_method: 'BASE',
        cost_basis_method: 'FIFO',
        decimal_places: 2
      }
    });
    const expected = taxReportFactory({
      report: {
        2019: {
          assets: {
            CDAI: {
              holdings: '0',
              increase: '4270.51788924',
              decrease: '4270.51788924'
            },
            DAI: {
              holdings: '0.001260206975322454',
              increase: '89.902620769167106564',
              decrease: '89.90136056219178411'
            }
          },
          short: [
            {
              asset: 'DAI',
              asset_amount: '89.90136056219178411',
              cost_basis: '0',
              date_acquired: '2019-01-01T01:00:00Z',
              date_sold: '2019-01-01T01:00:00Z',
              proceeds: '179.8',
              tx_id_sale: mintTx.tx_id
            }
          ],
          unmatched: [
            {
              asset: 'DAI',
              asset_amount: '89.90136056219178411',
              cost_basis: '0',
              date_acquired: '2019-01-01T01:00:00Z',
              date_sold: '2019-01-01T01:00:00Z',
              proceeds: '179.8',
              tx_id_sale: mintTx.tx_id
            }
          ],
          // In this example, there is 1 USD cent of interest income.
          interest_income: [
            {
              asset: 'CDAI',
              asset_amount: '4270.51788924',
              cost_basis: '179.8',
              date_acquired: '2019-01-01T01:00:00Z',
              date_sold: '2019-01-02T01:00:00Z',
              proceeds: '179.81',
              tx_id_sale: redeemTx.tx_id,
              tx_id_lot: mintTx.tx_id
            }
          ]
        }
      },
      config: {
        local_currency: 'USD',
        price_method: 'BASE',
        cost_basis_method: 'FIFO',
        decimal_places: 2,
        allow_lot_overlap: true
      }
    });
    expect(received).toEqual(expected);
  });
  test('Lend with partial redemption, followed by lending with full redemption', () => {
    // Initial DAI deposit
    const deposit = depositFactory({
      timestamp: '2019-01-01T00:10:00Z',
      deposit_amount: '1',
      deposit_code: 'DAI'
    });

    // Lend DAI
    const mintTx1 = mintFactory({
      timestamp: '2019-01-01T01:00:00Z',
      c_token_amount: '10',
      c_token_code: 'CDAI',
      supplied_amount: '1',
      supplied_code: 'DAI'
    });
    const mintPriceDai1 = {
      tx_id: mintTx1.tx_id,
      timestamp: mintTx1.timestamp,
      base_code: 'DAI',
      quote_code: 'USD',
      price: '1'
    };
    const mintPriceCdai1 = impliedPrice({
      amountPriced: mintTx1.supplied_amount,
      amountUnpriced: mintTx1.c_token_amount,
      price: mintPriceDai1.price
    });

    // Redeem DAI
    const redeemTx1 = redeemFactory({
      tx_id: 'dec961d7-0765-42af-bf57-a88d5356faf7',
      timestamp: '2019-01-02T01:00:00Z',
      redeem_amount: '1',
      redeem_code: 'DAI',
      c_token_amount: '5',
      c_token_code: 'CDAI'
    });
    const redeemPriceDai1 = {
      tx_id: redeemTx1.tx_id,
      timestamp: redeemTx1.timestamp,
      base_code: 'DAI',
      quote_code: 'USD',
      price: '1'
    };
    const redeemPriceCdai1 = impliedPrice({
      amountPriced: redeemTx1.c_token_amount,
      amountUnpriced: redeemTx1.redeem_amount,
      price: redeemPriceDai1.price
    });

    // Lend DAI again
    const mintTx2 = mintFactory({
      timestamp: '2019-01-03T01:00:00Z',
      // time has passed, exchange rate increase by 100 factor
      c_token_amount: '1000',
      c_token_code: 'CDAI',
      supplied_amount: '1',
      supplied_code: 'DAI'
    });
    const mintPriceDai2 = {
      tx_id: mintTx2.tx_id,
      timestamp: mintTx2.timestamp,
      base_code: 'DAI',
      quote_code: 'USD',
      price: '1'
    };
    const mintPriceCdai2 = impliedPrice({
      amountPriced: mintTx2.supplied_amount,
      amountUnpriced: mintTx2.c_token_amount,
      price: mintPriceDai2.price
    });

    // Redeem DAI in FULL
    const redeemTx2 = redeemFactory({
      tx_id: 'yyc961d7-0765-42af-bf57-a88d5356faf7',
      timestamp: '2019-01-04T01:00:00Z',
      redeem_amount: '3',
      redeem_code: 'DAI',
      c_token_amount: '1005',
      c_token_code: 'CDAI'
    });
    const redeemPriceDai2 = {
      tx_id: redeemTx2.tx_id,
      timestamp: redeemTx2.timestamp,
      base_code: 'DAI',
      quote_code: 'USD',
      price: '1'
    };
    const redeemPriceCdai2 = impliedPrice({
      amountPriced: redeemTx2.c_token_amount,
      amountUnpriced: redeemTx2.redeem_amount,
      price: redeemPriceDai2.price
    });

    const prices = [
      // deposit price
      {
        tx_id: deposit.tx_id,
        timestamp: deposit.timestamp,
        base_code: 'DAI',
        quote_code: 'USD',
        price: '1'
      },
      // first mint prices
      mintPriceDai1,
      {
        tx_id: mintTx1.tx_id,
        timestamp: mintTx1.timestamp,
        base_code: 'CDAI',
        quote_code: 'USD',
        price: mintPriceCdai1
      },
      // first redeem prices
      redeemPriceDai1,
      {
        tx_id: redeemTx1.tx_id,
        timestamp: redeemTx1.timestamp,
        base_code: 'CDAI',
        quote_code: 'USD',
        price: redeemPriceCdai1
      },
      // second mint prices
      mintPriceDai2,
      {
        tx_id: mintTx2.tx_id,
        timestamp: mintTx2.timestamp,
        base_code: 'CDAI',
        quote_code: 'USD',
        price: mintPriceCdai2
      },
      // second redeem prices
      redeemPriceDai2,
      {
        tx_id: redeemTx2.tx_id,
        timestamp: redeemTx2.timestamp,
        base_code: 'CDAI',
        quote_code: 'USD',
        price: redeemPriceCdai2
      }
    ];
    const transactions = [deposit, mintTx1, redeemTx1, mintTx2, redeemTx2];
    const received = createReport({
      transactions,
      prices,
      config: {
        local_currency: 'USD',
        price_method: 'BASE',
        cost_basis_method: 'FIFO',
        decimal_places: 2
      }
    });
    const expected = taxReportFactory({
      report: {
        2019: {
          assets: {
            CDAI: {
              holdings: '0',
              increase: '1010',
              decrease: '1010'
            },
            DAI: {
              holdings: '3',
              increase: '5',
              decrease: '2'
            }
          },
          short: [
            {
              asset: 'DAI',
              asset_amount: '1',
              cost_basis: '1',
              date_acquired: '2019-01-01T00:10:00Z',
              date_sold: '2019-01-01T01:00:00Z',
              proceeds: '1',
              tx_id_sale: mintTx1.tx_id,
              tx_id_lot: deposit.tx_id