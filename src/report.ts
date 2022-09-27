
import { Map as IMap, List, fromJS } from 'immutable';
import { BigNumber } from 'bignumber.js';

import {
  LocalCurrency,
  CostBasisMethod,
  TaxReportOutput,
  TaxReport,
  TaxReportOptions,
  ImmutableMap,
  TaxReportYear,
  BuildReportYearOptions,
  HackedStack,
  Price
} from './types';
import TaxLot from './taxLot';
import Disposal from './disposal';
import { unmatchedDisposal, exhaustLot, exhaustDisposal, lotSort } from './matchLogic';
import {
  buildReportIterable,
  updateReportHoldingsFromLots,
  buildYearList,
  sortAccountingRecords,