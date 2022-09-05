import moment from 'moment';
import { Map as IMap, List } from 'immutable';
import { BigNumber } from 'bignumber.js';

import { HackedStack } from './types';
import TaxLot from './taxLot';
import Disposal from './disposal';

export const lotSort = (lots: List<TaxLot>, costMethod: string): List<TaxLot> => {
  const fifoComparator = (a: TaxLot, b: TaxLot): number => a.unix - b.unix;
  const hifoComparator = (a: TaxLot, b: TaxLot): number =>
    b.pricePerUnit.minus(a.pricePerUnit).toNumber();
  const lifoComparator = (a: TaxLot, b: TaxLot): number => b.unix - a.unix;
  if (costMethod === 'FIFO') {
    return lots.sort(fifoComparator);
  } else if (costMethod === 'HIFO') {
    return lots.sort(hifoComparator);
  } else if (costMethod === 'LIFO') {
    return lots.sort(lifoComparator);
  } else {
    throw new Error('No cost basis method provided.');
  }
};

export const unmatchedDisposal = (
  report: IMap<any, any>,
  disposal: Disposal,
  localCurrency: string
): IMap<any, any> => {
  let reportToUpdate;
  const disposalMoment = moment.utc(disposal.unix, 'X');
  const disposalYear = disposalMoment.format('YYYY');
  const samedate = disposalMoment.format();
  const sale = IMap({
    asset: disposal.assetCode,
    proceeds: disposal.proceedsAmount,
    date_sold