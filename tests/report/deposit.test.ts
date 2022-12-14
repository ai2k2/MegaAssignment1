import createReport from '../../src/index';
import { PriceMethod, CostBasisMethod, Price } from '../../src/types';
import {
  taxReportFactory,
  depositFactory,
  tradeFactory,
  withdrawalFactory
} from '../utils/factories';

describe('deposit assets', () => {
  describe(