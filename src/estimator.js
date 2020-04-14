// funtion that estimate the infection By RequestedTime
const infections = (periodType, currentlyInfected, timeToElapse) => {
  let time = 0;
  let result = 0;
  switch (periodType) {
    case 'days':
      time = Math.trunc(timeToElapse / 3);
      break;
    case 'weeks':
      time = Math.trunc((timeToElapse * 7) / 3);
      break;
    case 'months':
      time = Math.trunc((timeToElapse * 30) / 3);
      break;
    default:
      time = 0;
      break;
  }
  const x = 2 ** time;
  result = Math.trunc(currentlyInfected * x);
  return result;
};

const covid19ImpactEstimator = (data) => {
  const input = data;
  const impact = {};
  const severeImpact = {};
  // starting challenge 1
  // estimation of currentlyInfected
  const ici = Math.trunc(input.reportedCases * 10);
  impact.currentlyInfected = ici;
  const sci = Math.trunc(input.reportedCases * 50);
  severeImpact.currentlyInfected = sci;

  // estimation of infectionsByRequestedTime
  // const { periodType, timeToElapse } = data;
  const time = timeToElapse;
  // const avgDailyIncomeP = input.region.avgDailyIncomePopulation;
  // const avgUsd = input.region.avgDailyIncomeInUSD;
  const infectionI = infections(data.periodType, ici, data.timeToElapse);
  impact.infectionsByRequestedTime = infectionI;
  const infectionS = infections(data.periodType, sci, data.timeToElapse);
  severeImpact.infectionsByRequestedTime = infectionS;

  // starting challenge 2
  // estimation of severeCasesByRequestedTime
  const scbrtI = Math.trunc(infectionI * 0.15);
  impact.severeCasesByRequestedTime = scbrtI;
  const scbrtS = Math.trunc(infectionS * 0.15);
  severeImpact.severeCasesByRequestedTime = scbrtS;

  return {
    input,
    impact,
    severeImpact
  };
};

export default covid19ImpactEstimator;
