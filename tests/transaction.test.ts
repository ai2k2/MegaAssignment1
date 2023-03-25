
import { Map as IMap, List } from 'immutable';
import { BigNumber } from 'bignumber.js';

import TaxLot from '../src/taxLot';
import Disposal from '../src/disposal';
import { makeLotsAndDisposals } from '../src/accounting';
import {
  depositFactory,
  withdrawalFactory,
  lostFactory,
  incomeFactory,
  tradeFactory
} from './utils/factories';
import { ITransaction } from '../src/types';

/*
  Every TRADE transaction scenario to base future tests on.

  TRADE.
    fiat/crypto
        Taxed currency and fiat trade portion are equal (USD)
            Note:
                Test BOTH crypto/fiat and fiat/crypto trades.
                Test both BASE & QUOTE price method in every test, since they should be equal.
            BTC/USD (crypto/fiat)
                side buy
                  no fee (test base & quote price method)
                  with fee fiat (test base & quote price method)
                  with fee crypto (test base & quote price method)
                  with foreign fee crypto (test base & quote price method)
                side sell
                  no fee (test base & quote price method)
                  with fee fiat (test base & quote price method)
                  with fee crypto (test base & quote price method)
                  with foreign fee crypto (test base & quote price method)
            USD/BTC (fiat/crypto)
                side buy
                  no fee (test base & quote price method)
                  with fee fiat (test base & quote price method)
                  with fee crypto (test base & quote price method)
                  with foreign fee crypto (test base & quote price method)
                side sell
                  no fee (test base & quote price method)
                  with fee fiat (test base & quote price method)
                  with fee crypto (test base & quote price method)
                  with foreign fee crypto (test base & quote price method)
        FUTURE: Taxed currency and fiat trade portion are unequal (Example: GBP & USD)
    crypto/crypto
        use BASE prices
            side buy
              no fee
              with fee fiat
              with fee crypto
              with foreign fee crypto
            side sell
              no fee
              with fee fiat
              with fee crypto
              with foreign fee crypto
        use QUOTE prices
            side buy
              no fee
              with fee fiat
              with fee crypto
              with foreign fee crypto
            side sell
              no fee
              with fee fiat
              with fee crypto
              with foreign fee crypto
 */

/*
  Currently tested scenarios:
  TRADE type
    side buy
      no fee (test base & quote price method)
      with fee fiat (test base & quote price method)
      with fee crypto (test base & quote price method)
      with foreign fee crypto (test base & quote price method)
    side sell
      no fee (test base & quote price method)
      with fee fiat (test base & quote price method)
      with fee crypto (test base & quote price method)
      with foreign fee crypto (test base & quote price method)
 */

describe('TRADE transaction', () => {
  /*
   * The function we are testing does not differentiate
   * between crypto/crypto trades and crypto/fiat trades.
   * We test crypto/fiat but it does not matter.
   */
  describe('crypto base / fiat quote', () => {
    describe('BUY trade', () => {
      test('type: TRADE, assets: crypto/fiat, side: BUY, fee: none, price method: BASE & QUOTE', () => {
        const trade: ITransaction = tradeFactory({
          tx_id: '1',
          timestamp: '2018-01-01T09:30:00Z',
          side: 'BUY',
          base_amount: '1',
          base_code: 'BTC',
          quote_amount: '100',
          quote_code: 'USD'
        });
        const transactions = List([IMap(trade)]);
        const prices = List([
          IMap({
            tx_id: '1',
            base_code: 'BTC',
            quote_code: 'USD',
            price: '100'
          }),
          IMap({
            tx_id: '1',
            base_code: 'USD',
            quote_code: 'USD',
            price: '1'
          })
        ]);
        const actualBaseMethod = makeLotsAndDisposals({
          prices,
          transactions,
          priceMethod: 'BASE',
          localCurrency: 'USD'
        });
        const actualQuoteMethod = makeLotsAndDisposals({
          prices,
          transactions,
          priceMethod: 'QUOTE',
          localCurrency: 'USD'
        });
        const expected = IMap({
          taxLotList: List([
            new TaxLot({
              unix: 1514799000,
              assetCode: 'BTC',
              assetAmount: new BigNumber('1'),
              basisCode: 'USD',
              basisAmount: new BigNumber('100'),
              transactionId: '1',
              isIncome: false
            })
          ]),
          disposalList: List([
            new Disposal({
              unix: 1514799000,
              assetCode: 'USD',
              assetAmount: new BigNumber('100'),
              proceedsCode: 'USD',
              proceedsAmount: new BigNumber('100'),
              transactionId: '1'
            })
          ])
        });
        expect(actualBaseMethod.equals(expected)).toEqual(true);
        expect(actualQuoteMethod.equals(expected)).toEqual(true);

        expect(actualBaseMethod.getIn(['taxLotList', 0]).pricePerUnit).toEqual(
          new BigNumber('100')
        );
        expect(actualQuoteMethod.getIn(['taxLotList', 0]).pricePerUnit).toEqual(
          new BigNumber('100')
        );
      });
      test('type: TRADE, assets: crypto/fiat, side: BUY | NONE, fee: fiat, price method: BASE & QUOTE', () => {
        const transactions: List<ITransaction> = List([
          IMap(
            tradeFactory({
              timestamp: '2018-01-01T09:30:00Z',
              tx_id: '1',
              side: 'NONE',
              base_amount: '1',
              base_code: 'BTC',
              quote_amount: '100',
              quote_code: 'USD',
              fee_tx_ids: ['2']
            })
          ),
          IMap(
            withdrawalFactory({
              timestamp: '2018-01-01T09:30:00Z',
              tx_id: '2',
              withdrawal_amount: '5',
              withdrawal_code: 'USD'
            })
          )
        ]);
        const prices = List([
          IMap({
            base_code: 'BTC',
            quote_code: 'USD',
            price: '100',
            tx_id: '1'
          }),
          IMap({
            base_code: 'USD',
            quote_code: 'USD',
            price: '1',
            tx_id: '1'
          })
        ]);
        const actualBaseMethod = makeLotsAndDisposals({
          transactions,
          prices,
          priceMethod: 'BASE',
          localCurrency: 'USD'
        });
        const actualQuoteMethod = makeLotsAndDisposals({
          transactions,
          prices,
          priceMethod: 'QUOTE',
          localCurrency: 'USD'
        });
        const expected = IMap({
          taxLotList: List([
            new TaxLot({
              unix: 1514799000,
              assetCode: 'BTC',
              assetAmount: new BigNumber('1'),
              basisCode: 'USD',
              basisAmount: new BigNumber('105'),
              transactionId: '1',
              isIncome: false
            })
          ]),
          disposalList: List([
            new Disposal({
              unix: 1514799000,
              assetCode: 'USD',
              assetAmount: new BigNumber('100'),
              proceedsCode: 'USD',
              proceedsAmount: new BigNumber('100'),
              transactionId: '1'
            }),
            new Disposal({
              unix: 1514799000,
              assetCode: 'USD',
              assetAmount: new BigNumber('5'),
              proceedsCode: 'USD',
              proceedsAmount: new BigNumber('5'),
              transactionId: '2'
            })
          ])
        });

        expect(actualBaseMethod.equals(expected)).toEqual(true);
        expect(actualQuoteMethod.equals(expected)).toEqual(true);

        expect(actualBaseMethod.getIn(['taxLotList', 0]).pricePerUnit).toEqual(
          new BigNumber('105')
        );
        expect(actualQuoteMethod.getIn(['taxLotList', 0]).pricePerUnit).toEqual(
          new BigNumber('105')
        );
      });
    });
    describe('SELL trade', () => {
      test('type: TRADE, assets: crypto/fiat, side: SELL, fee: crypto, price method: BASE & QUOTE', () => {
        const transactions: List<ITransaction> = List([
          IMap(
            tradeFactory({
              timestamp: '2018-01-01T09:30:00Z',
              tx_id: '1',
              side: 'SELL',
              base_amount: '1',
              base_code: 'BTC',
              quote_amount: '100',
              quote_code: 'USD',
              fee_tx_ids: ['2']
            })
          ),
          IMap(
            withdrawalFactory({
              tx_id: '2',
              timestamp: '2018-01-01T09:30:00Z',
              withdrawal_amount: '0.1',
              withdrawal_code: 'BTC'
            })
          )
        ]);
        const prices = List([
          IMap({
            base_code: 'BTC',
            quote_code: 'USD',
            price: '100',
            tx_id: '1'
          }),
          IMap({
            base_code: 'BTC',
            quote_code: 'USD',
            price: '100',
            tx_id: '2'
          })
        ]);
        const actualBaseMethod = makeLotsAndDisposals({
          transactions,
          prices,
          priceMethod: 'BASE',
          localCurrency: 'USD'
        });
        const actualQuoteMethod = makeLotsAndDisposals({
          transactions,
          prices,
          priceMethod: 'QUOTE',
          localCurrency: 'USD'
        });
        const expected = IMap({
          taxLotList: List([
            new TaxLot({
              unix: 1514799000,
              assetCode: 'USD',
              assetAmount: new BigNumber('100'),
              basisCode: 'USD',
              basisAmount: new BigNumber('100'),
              transactionId: '1',
              isIncome: false
            })
          ]),
          disposalList: List([
            new Disposal({
              unix: 1514799000,
              assetCode: 'BTC',
              assetAmount: new BigNumber('1'),
              proceedsCode: 'USD',
              // sell fee reduce proceeds
              proceedsAmount: new BigNumber('90'),
              transactionId: '1'
            }),
            new Disposal({
              unix: 1514799000,
              assetCode: 'BTC',
              assetAmount: new BigNumber('0.1'),
              proceedsCode: 'USD',
              proceedsAmount: new BigNumber('10'),
              transactionId: '2'
            })
          ])
        });
        expect(actualBaseMethod.toJS()).toEqual(expected.toJS());
        expect(actualQuoteMethod.toJS()).toEqual(expected.toJS());
        expect(actualBaseMethod.getIn(['taxLotList', 0]).pricePerUnit).toEqual(new BigNumber('1'));
        expect(actualQuoteMethod.getIn(['taxLotList', 0]).pricePerUnit).toEqual(new BigNumber('1'));
      });
      test('type: TRADE, assets: crypto/fiat, side: BUY, fee: foreign crypto, price method: BASE & QUOTE', () => {
        const transactions: List<ITransaction> = List([
          IMap(
            tradeFactory({
              timestamp: '2018-01-01T09:30:00Z',
              tx_id: '1',
              side: 'SELL',
              base_amount: '1',
              base_code: 'BTC',
              quote_amount: '100',