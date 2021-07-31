module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("immutable");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("bignumber.js");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("moment");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("core-js/modules/es6.array.sort");

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: external "immutable"
var external_immutable_ = __webpack_require__(0);

// EXTERNAL MODULE: external "bignumber.js"
var external_bignumber_js_ = __webpack_require__(1);

// EXTERNAL MODULE: external "core-js/modules/es6.array.sort"
var es6_array_sort_ = __webpack_require__(3);

// EXTERNAL MODULE: external "moment"
var external_moment_ = __webpack_require__(2);
var external_moment_default = /*#__PURE__*/__webpack_require__.n(external_moment_);

// CONCATENATED MODULE: ./src/matchLogic.ts




const lotSort = (lots, costMethod) => {
  const fifoComparator = (a, b) => a.unix - b.unix;

  const hifoComparator = (a, b) => b.pricePerUnit.minus(a.pricePerUnit).toNumber();

  const lifoComparator = (a, b) => b.unix - a.unix;

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
const unmatchedDisposal = (report, disposal, localCurrency) => {
  let reportToUpdate;
  const disposalMoment = external_moment_default.a.utc(disposal.unix, 'X');
  const disposalYear = disposalMoment.format('YYYY');
  const samedate = disposalMoment.format();
  const sale = Object(external_immutable_["Map"])({
    asset: disposal.assetCode,
    proceeds: disposal.proceedsAmount,
    date_sold: samedate,
    cost_basis: '0',
    asset_amount: disposal.assetAmount,
    date_acquired: samedate,
    tx_id_sale: disposal.transactionId
  });
  reportToUpdate = report.updateIn([disposalYear, 'unmatched'], list => list.push(sale));

  if (disposal.isLost) {
    reportToUpdate = reportToUpdate.updateIn([disposalYear, 'lost'], list => list.push(sale));
  } else if (disposal.isCompoundLiquidated) {
    reportToUpdate = reportToUpdate.updateIn([disposalYear, 'compound_liquidations_borrower'], (list = Object(external_immutable_["List"])()) => list.push(sale));
  } else {
    if (disposal.isBorrowRepay) {
      reportToUpdate = reportToUpdate.updateIn([disposalYear, 'borrow_repayments'], (list = Object(external_immutable_["List"])()) => list.push(sale));
    }

    if (disposal.assetCode !== localCurrency) {
      let reportCategory = 'short';

      if (disposal.gainsAsInterestIncome) {
        reportCategory = 'interest_income';
      }

      reportToUpdate = reportToUpdate.updateIn([disposalYear, reportCategory], list => list.push(sale));
    }
  }

  return Object(external_immutable_["Map"])({
    report: reportToUpdate,
    disposal: disposal.set('assetAmount', new external_bignumber_js_["BigNumber"](0)).set('proceedsAmount', new external_bignumber_js_["BigNumber"](0))
  });
};
const exhaustLot = (report, disposal, lotStack, localCurrency) => {
  let currentReport = report;
  const lotToDiminish = lotStack.first();
  const disposalMoment = external_moment_default.a.utc(disposal.unix, 'X');
  const timeDiff = disposalMoment.diff(external_moment_default.a.utc(lotToDiminish.unix, 'X'));
  const isShort = external_moment_default.a.duration(timeDiff).asYears() < 1;
  const shareSold = lotToDiminish.assetAmount.dividedBy(disposal.assetAmount);
  const saleProceeds = disposal.proceedsAmount.times(shareSold);
  const disposalYear = disposalMoment.format('YYYY');
  const sale = Object(external_immutable_["Map"])({
    asset: disposal.assetCode,
    proceeds: saleProceeds,
    date_sold: external_moment_default.a.utc(disposal.unix, 'X').format(),
    cost_basis: lotToDiminish.basisAmount,
    asset_amount: lotToDiminish.assetAmount,
    date_acquired: external_moment_default.a.utc(lotToDiminish.unix, 'X').format(),
    tx_id_lot: lotToDiminish.transactionId,
    tx_id_sale: disposal.transactionId
  });

  if (disposal.isLost) {
    currentReport = currentReport.updateIn([disposalYear, 'lost'], list => list.push(sale));
  } else if (disposal.isCompoundLiquidated) {
    currentReport = currentReport.updateIn([disposalYear, 'compound_liquidations_borrower'], (list = Object(external_immutable_["List"])()) => list.push(sale));
  } else if (disposal.assetCode !== localCurrency) {
    if (disposal.isBorrowRepay) {
      currentReport = currentReport.updateIn([disposalYear, 'borrow_repayments'], (list = Object(external_immutable_["List"])()) => list.push(sale));
    }

    let reportCategory = isShort ? 'short' : 'long';

    if (disposal.gainsAsInterestIncome) {
      reportCategory = 'interest_income';
    }

    currentReport = currentReport.updateIn([disposalYear, reportCategory], list => list.push(sale));
  }

  const currentDisposal = disposal.set('assetAmount', disposal.assetAmount.minus(lotToDiminish.assetAmount)).set('proceedsAmount', disposal.proceedsAmount.minus(saleProceeds));
  return Object(external_immutable_["Map"])({
    report: currentReport,
    disposal: currentDisposal,
    lotStack: lotStack.pop()
  });
};
const exhaustDisposal = (report, disposal, lotStack, localCurrency) => {
  let currentReport = report;
  const lotToDiminish = lotStack.first();
  const disposalMoment = external_moment_default.a.utc(disposal.unix, 'X');
  const timeDiff = disposalMoment.diff(external_moment_default.a.utc(lotToDiminish.unix, 'X'));
  const isShort = external_moment_default.a.duration(timeDiff).asYears() < 1;
  const shareLotSold = disposal.assetAmount.dividedBy(lotToDiminish.assetAmount);
  const costBasisSold = lotToDiminish.basisAmount.times(shareLotSold);
  const disposalYear = disposalMoment.format('YYYY');
  const sale = Object(external_immutable_["Map"])({
    asset: disposal.assetCode,
    proceeds: disposal.proceedsAmount,
    date_sold: external_moment_default.a.utc(disposal.unix, 'X').format(),
    cost_basis: costBasisSold,
    asset_amount: disposal.assetAmount,
    date_acquired: external_moment_default.a.utc(lotToDiminish.unix, 'X').format(),
    tx_id_lot: lotToDiminish.transactionId,
    tx_id_sale: disposal.transactionId
  });

  if (disposal.isLost) {
    currentReport = report.updateIn([disposalYear, 'lost'], list => list.push(sale));
  } else if (disposal.isCompoundLiquidated) {
    currentReport = currentReport.updateIn([disposalYear, 'compound_liquidations_borrower'], (list = Object(external_immutable_["List"])()) => list.push(sale));
  } else if (disposal.assetCode !== localCurrency) {
    if (disposal.isBorrowRepay) {
      currentReport = currentReport.updateIn([disposalYear, 'borrow_repayments'], (list = Object(external_immutable_["List"])()) => list.push(sale));
    }

    let reportCategory = isShort ? 'short' : 'long';

    if (disposal.gainsAsInterestIncome) {
      reportCategory = 'interest_income';
    }

    currentReport = currentReport.updateIn([disposalYear, reportCategory], list => list.push(sale));
  }

  const lotToPush = lotToDiminish.set('assetAmount', lotToDiminish.assetAmount.minus(disposal.assetAmount)).set('basisAmount', lotToDiminish.basisAmount.minus(costBasisSold));
  const currentDisposal = disposal.set('assetAmount', new external_bignumber_js_["BigNumber"](0)).set('proceedsAmount', new external_bignumber_js_["BigNumber"](0));
  return Object(external_immutable_["Map"])({
    report: currentReport,
    disposal: currentDisposal,
    lotStack: lotStack.pop().push(lotToPush)
  });
};
// CONCATENATED MODULE: ./src/reportHelpers.ts




const applyUnmatchedSales = report => {
  let currentReport = report;
  report.reduce((aggregatePriorSales, reportYear, year) => {
    const unmatched = reportYear.get('unmatched');

    if (unmatched.size > 0) {
      const currentAndPriorSales = unmatched.reduce((red, unmatchedSale) => {
        const existing = red.get(unmatchedSale.get('asset'), new external_bignumber_js_["BigNumber"](0));
        return red.set(unmatchedSale.get('asset'), external_bignumber_js_["BigNumber"].sum(existing, unmatchedSale.get('asset_amount')));
      }, aggregatePriorSales);
      currentAndPriorSales.map((amount, holdingAsset) => {
        const keypath = [year, 'assets', holdingAsset, 'holdings'];
        const existingHoldings = currentReport.getIn(keypath, new external_bignumber_js_["BigNumber"](0));
        currentReport = currentReport.setIn(keypath, existingHoldings.minus(amount));
      });
      return currentAndPriorSales;
    } else {
      aggregatePriorSales.map((amount, holdingAsset) => {
        const keypath = [year, 'assets', holdingAsset, 'holdings'];
        const existingHoldings = currentReport.getIn(keypath, new external_bignumber_js_["BigNumber"](0));
        currentReport = currentReport.setIn(keypath, existingHoldings.minus(amount));
      });
      return aggregatePriorSales;
    }
  }, Object(external_immutable_["Map"])({}));
  return currentReport;
};
const addIncomeToReport = (report, taxLot) => {
  let reportToUpdate = report;

  if (taxLot.get('isIncome')) {
    const incomeMoment = external_moment_default.a.utc(taxLot.unix, 'X');
    const incomeYear = incomeMoment.format('YYYY');
    const income = Object(external_immutable_["Map"])({
      asset: taxLot.assetCode,
      asset_amount: taxLot.assetAmount,
      date_acquired: incomeMoment.format(),
      basis_amount: taxLot.basisAmount,
      basis: taxLot.basisCode,
      tx_id_lot: taxLot.transactionId
    });
    reportToUpdate = report.updateIn([incomeYear, 'income'], list => list.push(income));
  }

  return Object(external_immutable_["Map"])({
    report: reportToUpdate,
    taxLot: taxLot
  });
};
const updateReportIncomeFromLots = (report, lots, year) => {
  const unixSOY = Number(external_moment_default.a.utc(year, 'YYYY').startOf('year').format('X'));
  const unixEOY = Number(external_moment_default.a.utc(year, 'YYYY').endOf('year').format('X'));
  lots.forEach(taxLots => {
    let reportWithIncome = report;
    reportWithIncome = taxLots.filter(lot => {
      return lot.unix >= unixSOY && lot.unix <= unixEOY;
    }).reduce((acc, lot) => {
      const res = addIncomeToReport(acc, lot);
      return res.get('report');
    }, reportWithIncome);
    report = report.set(year, reportWithIncome.get(year));
  });
  return report;
};
const setupAssetProperties = (year, report, yearDisposals, allLots) => {
  const unixSOY = Number(external_moment_default.a.utc(year, 'YYYY').startOf('year').format('X'));
  const unixEOY = Number(external_moment_default.a.utc(year, 'YYYY').endOf('year').format('X'));
  const reportWithIncrease = allLots.reduce((accReport, assetLots, assetKey) => {
    const assetLotsInYear = assetLots.filter(lot => {
      return lot.unix >= unixSOY && lot.unix <= unixEOY;
    });
    const assetReduction = assetLotsInYear.reduce((numReduction, lot) => {
      return external_bignumber_js_["BigNumber"].sum(lot.assetAmount, numReduction);
    }, new external_bignumber_js_["BigNumber"](0));
    const existingDecrease = accReport.getIn([year, 'assets', assetKey, 'increase'], new external_bignumber_js_["BigNumber"](0));
    const existingHoldings = accReport.getIn([year, 'assets', assetKey, 'holdings'], new external_bignumber_js_["BigNumber"](0));
    return accReport.setIn([year, 'assets', assetKey, 'increase'], assetReduction).setIn([year, 'assets', assetKey, 'decrease'], existingDecrease).setIn([year, 'assets', assetKey, 'holdings'], existingHoldings);
  }, report);
  const reportWithDecrease = yearDisposals.reduce((accReport, disposal) => {
    const keypathDecrease = [year, 'assets', disposal.assetCode, 'decrease'];
    const keypathIncrease = [year, 'assets', disposal.assetCode, 'increase'];
    const keypathHoldings = [year, 'assets', disposal.assetCode, 'holdings'];
    const existingDecrease = accReport.getIn(keypathDecrease, new external_bignumber_js_["BigNumber"](0));
    const existingIncrease = accReport.getIn(keypathIncrease, new external_bignumber_js_["BigNumber"](0));
    const existingHoldings = accReport.getIn(keypathHoldings, new external_bignumber_js_["BigNumber"](0));
    return accReport.setIn(keypathDecrease, external_bignumber_js_["BigNumber"].sum(existingDecrease, disposal.assetAmount)).setIn(keypathIncrease, existingIncrease).setIn(keypathHoldings, existingHoldings);
  }, reportWithIncrease);
  return reportWithDecrease;
};
const buildReportIterable = (sortedDisposals, yearList) => {
  return yearList.map(v => {
    const stringYear = String(v);
    return Object(external_immutable_["Map"])({
      year: stringYear,
      disposals: sortedDisposals.filter(disposal => external_moment_default.a.utc(disposal.unix, 'X').format('YYYY') === stringYear)
    });
  });
};
const updateReportHoldingsFromLots = (reportAndLots, year) => {
  const endOfYear = Number(external_moment_default.a.utc(year, 'YYYY').endOf('year').format('X'));
  let currentReport = reportAndLots.get('report');
  reportAndLots.get('lots').map((value, lotAsset) => {
    const assetLotsInYear = value.filter(lot => {
      return lot.unix < endOfYear;
    });

    if (assetLotsInYear.size > 0) {
      const assetHoldings = assetLotsInYear.reduce((acc, lot) => {
        return external_bignumber_js_["BigNumber"].sum(lot.assetAmount, acc);
      }, new external_bignumber_js_["BigNumber"](0));
      const keyPath = [year, 'assets', lotAsset, 'holdings'];
      const currentHoldings = currentReport.getIn(keyPath, new external_bignumber_js_["BigNumber"](0));
      currentReport = currentReport.setIn(keyPath, external_bignumber_js_["BigNumber"].sum(currentHoldings, assetHoldings));
    }
  });
  return currentReport;
};
const buildYearList = sorted => {
  const firstYear = 