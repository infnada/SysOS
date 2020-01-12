import {Request, Response} from 'express';
import {Decimal} from 'decimal.js';
import {AnyOpsOSApiGlobalsModule} from '@anyopsos/module-api-globals';

import {AnyOpsOSMonitorModule} from './anyopsos-module-monitor.module';

export class QueryMonitorModule {

  dataDatabase = new AnyOpsOSMonitorModule().getDataDatabase();
  chartsDatabase = new AnyOpsOSMonitorModule().getCharts();

  chart: string = this.request.query.chart;
  dimensions: string[] = (this.request.query.dimensions !== undefined ? this.request.query.dimensions.split('|') : []);
  after: number = (this.request.query.after !== undefined ? parseInt(this.request.query.after, 10) : -600);
  before: number = (this.request.query.before !== undefined ? parseInt(this.request.query.before, 10) : 0);
  points: number = (this.request.query.points !== undefined ? parseInt(this.request.query.points, 10) : 20);
  gtime: number = (this.request.query.gtime !== undefined ? parseInt(this.request.query.gtime, 10) : 0);
  group: string = (this.request.query.group !== undefined ? this.request.query.group : 'average');
  format: string = (this.request.query.format !== undefined ? this.request.query.format : 'json');
  options: string[] = (this.request.query.options !== undefined ? this.request.query.options.split('|') : ['seconds', 'jsonwrap']);
  callback: string = this.request.query.callback;
  filename: string = this.request.query.filename;
  tqx: string = this.request.query.tqx;

  // Dimensions
  dimensionsNames: string[] = [];
  dimensionsIds: string[] = [];

  // Data used
  latestValues: { [key: string]: any };
  dbData: any[] = [];
  dbMatchingData: any[];

  // Calculate data
  currentIntervalMax: number;
  currentIntervalMin: number;
  currentValues: (Decimal | number)[][] = [];
  currentResult: (Decimal | number)[][] = [];
  intervalNotFound: boolean;
  firstEntryReturnedTimestamp: number;
  lastEntryReturnedTimestamp: number;

  // Returned values
  latestReturnedValues: any[];
  min: Decimal;
  max: Decimal;

  constructor(private request: Request,
              private response: Response) {

    this.parseRequest();
  }

  private async parseRequest(): Promise<any> {
    const data = await this.generateResponse();
    return new AnyOpsOSApiGlobalsModule(this.request, this.response).jsonDataResponse(data);
  }

  private deleteDimensionsSetPErcentage() {

    // Get latest_values based on current dimensions
    this.latestValues = JSON.parse(JSON.stringify(this.dbData[this.dbData.length - 1]));
    this.latestValues.shift(); // Remove timestamp from data

    if (this.dimensions.length !== 0 || this.options.includes('percentage')) {
      const dimensionsIndex: number[] = [];
      let currentTotal: number;

      // Some domensions specified could not be correct or not exist in this chart
      if (this.dimensions.length !== 0) {
        // Get dimensions index that we want to delete
        this.dimensionsNames.forEach((obj, i) => {
          if (!this.dimensions.includes(obj)) dimensionsIndex.push(i); // +1 because we need to pass the 'time' dimension
        });

        // Sort reverse to make sure all data is deleted in order
        dimensionsIndex.sort((a, b) => b - a);

        // Remove non wanted dimensions
        dimensionsIndex.forEach(idx => {
          this.dimensionsNames.splice(idx, 1);
          this.dimensionsIds.splice(idx, 1);
          this.latestValues.splice(idx, 1);
        });
      }

      // Delete data from based on dimension index and set percentage total
      this.dbMatchingData.forEach(obj => {

        // Used to calculate %
        if (this.options.includes('percentage')) {
          currentTotal = obj.reduce((previousValue: Decimal, currentValue: Decimal, index: number) => {
            if (index > 0) {
              return new Decimal(previousValue).plus(currentValue);
            } else {
              return 0;
            }
          }, 0);
        }

        if (dimensionsIndex.length !== 0) {
          dimensionsIndex.forEach(idx => {
            obj.splice(idx + 1, 1);  // +1 because we need to pass the 'time' dimension
          });
        }

        // Push total at start of the array
        if (this.options.includes('percentage')) {
          obj.unshift(currentTotal);
        }

      });
    }
  }

  private prepareCurrentValues() {
    const timeToReturn: number = (!this.options.includes('ms') && !this.options.includes('milliseconds') ? this.currentIntervalMax / 1000 : this.currentIntervalMax);

    if (this.options.includes('nonzero')) {
      // TODO delete dimensions that have all values to 0
      // If all dimensions values are 0, return all dimensions
    }
    if (this.options.includes('min2max')) {
      // TODO min2max ???????
    }
    if (this.options.includes('null2zero')) {
      // TODO null2zero ???????
    }
    if (this.options.includes('objectrows')) {
      // TODO
      /*
      {
         "labels": ["time", "guest_nice", "guest", "steal", "softirq", "irq", "user", "system", "nice", "iowait"],
         "data":[
          { "time": 1568301750, "guest_nice": 0, "guest": 0, "steal": 0.1538782, "softirq": 2.0604372, "irq": 0,
"user": 1.2238275, "system": 14.5363847, "nice": 39.161784, "iowait": 0},
          { "time": 1568301740, "guest_nice": 0, "guest": 0, "steal": 0.3002563, "softirq": 0.3041003, "irq": 0,
"user": 1.3573818, "system": 3.4644972, "nice": 47.999079, "iowait": 0.0502513}
         ]
       }
       */
    }
    if (this.options.includes('google_json')) {
      // TODO [ new Date(2019,8,12,16,23,40), 0, 0, 0.0507614, 0.0510204, 0, 1.3659877, 1.3149827, 0, 0],
    }
    // TODO test unaligned
    if (this.options.includes('match-ids')) {
      // TODO match-ids
    }
    if (this.options.includes('match-names')) {
      // TODO match-names
    }
    if (this.options.includes('showcustomvars')) {
      // TODO showcustomvars
    }

    /**
     * Set current interval found values
     */

    // If no value found, make sure there is at least one to do the calculations
    if (this.currentValues.length === 0) {
      let itemToAdd: number = 1; // timestamp dimension
      if (this.options.includes('percentage')) itemToAdd = 2; // sum for average & timestamp

      this.currentValues.push((Array(this.dimensionsNames.length + itemToAdd).fill(0)) as Decimal[]);
    }

    let res: Decimal[];

    // Calculate result based on group
    if (this.group === 'average') {
      // @ts-ignore
      res = this.currentValues.reduce((previousValue: Decimal[], currentValue: Decimal[]): Decimal[] => {
        // calculate average
        return previousValue.map((subAvg: Decimal, index: number) => new Decimal(previousValue[index]).plus(currentValue[index]).dividedBy(this.currentValues.length)) as Decimal[];
      });

      // Delete 1st element and get currentTotal = all dimensions sum
      let currentTotal: Decimal;
      if (this.options.includes('percentage')) currentTotal = (res as Decimal[]).shift();

      res.shift(); // Delete timestamp average

      // Set result as percentages
      if (this.options.includes('percentage')) {
        res.forEach((obj: Decimal, index: number, arr: Decimal[]) => {
          arr[index] = (currentTotal === new Decimal(0) ? new Decimal(0) : new Decimal(arr[index]).dividedBy(currentTotal).times(100));
        });
      }
    }

    // Set current value as latest value
    if (!this.latestReturnedValues) {
      this.latestReturnedValues = res.map((d) => new Decimal(d).toSignificantDigits(7).toNumber());
    }

    /**
     * output formats
     */
    if (this.format === 'array') {
      // @ts-ignore
      res = new Decimal(res.reduce((a, b) => new Decimal(a).plus(b))).toSignificantDigits(7);

      // Abs if needed
      // @ts-ignore
      if (this.options.includes('abs') || this.options.includes('absolute') || this.options.includes('absolute-sum')) res = Math.abs(res);

      this.currentResult.push(res);

      // @ts-ignore
      if (!this.max || this.max < res) this.max = parseFloat(res);
      // @ts-ignore
      if (!this.min || this.min > res) this.min = parseFloat(res);
    }

    if (this.format === 'json') {

      // Abs if needed
      // @ts-ignore
      if (this.options.includes('abs') || this.options.includes('absolute') || this.options.includes('absolute-sum')) res.map(Math.abs);

      res.map(obj => {
        return new Decimal(obj).toSignificantDigits(7);
      });
      this.currentResult.push([timeToReturn, ...res]);

      // @ts-ignore
      if (this.max < Decimal.max(...res)) this.max = Decimal.max(...res).toNumber();
      // @ts-ignore
      if (this.min > Decimal.min(...res)) this.min = Decimal.min(...res).toNumber();
    }

    if (!this.firstEntryReturnedTimestamp) this.firstEntryReturnedTimestamp = timeToReturn;
    this.lastEntryReturnedTimestamp = timeToReturn;

    // Set next interval and reset current values
    this.currentValues = [];
  }

  // @ts-ignore
  private async getDatabaseMatchingData(updateEvery, firstEntryT, lastEntryT, absolutePeriodRequested): Promise<any[]> {
    if (!this.dbData || this.dbData.length === 0) return null;

    let pointsRequested = this.points;
    let afterRequested = this.after;
    let beforeRequested = this.before;
    const resamplingTimeRequested = this.gtime;

    const aligned = !(this.options.includes('unaligned'));

    if (!absolutePeriodRequested) {
      if (beforeRequested % updateEvery) {

        // make sure it is multiple of updateEvery
        if (beforeRequested > 0) beforeRequested = beforeRequested - updateEvery + beforeRequested % updateEvery;
      }

      if (afterRequested % updateEvery) {

        // make sure it is multiple of updateEvery
        if (afterRequested < 0) afterRequested = afterRequested - updateEvery + afterRequested % updateEvery;
      }
      if (afterRequested === beforeRequested) afterRequested -= updateEvery;
    }

    // the duration of the chart
    let duration = beforeRequested - afterRequested;
    let availablePoints = duration / updateEvery;

    if (duration <= 0 || availablePoints <= 0) return null;

    // check the number of wanted points in the result
    if (pointsRequested < 0) pointsRequested = -pointsRequested;
    if (pointsRequested > availablePoints) pointsRequested = availablePoints;
    if (pointsRequested === 0) pointsRequested = availablePoints;

    // calculate the desired grouping of source data points
    let group = availablePoints / pointsRequested;
    if (group <= 0) group = 1;
    if (availablePoints % pointsRequested > pointsRequested / 2) group = Math.round(group); // rounding to the closest integer

    // resamplingTimeRequested enforces a certain grouping multiple
    let resamplingDivisor = 1.0;
    let resamplingGroup = 1;
    if (resamplingTimeRequested > updateEvery) {
      if (resamplingTimeRequested > duration) {
        // group_time is above the available duration
        afterRequested = beforeRequested - resamplingTimeRequested;
        duration = beforeRequested - afterRequested;
        availablePoints = duration / updateEvery;
        group = availablePoints / pointsRequested;
      }

      // if the duration is not aligned to resampling time
      // extend the duration to the past, to avoid a gap at the chart
      // only when the missing duration is above 1/10th of a point
      if (duration % resamplingTimeRequested) {
        const delta = duration % resamplingTimeRequested;
        if (delta > resamplingTimeRequested / 10) {
          afterRequested -= resamplingTimeRequested - delta;
          duration = beforeRequested - afterRequested;
          availablePoints = duration / updateEvery;
          group = availablePoints / pointsRequested;
        }
      }

      // the points we should group to satisfy gtime
      resamplingGroup = resamplingTimeRequested / updateEvery;
      if (resamplingTimeRequested % updateEvery) {
        resamplingGroup++;
      }

      // adapt group according to resamplingGroup
      if (group < resamplingGroup) group = resamplingGroup; // do not allow grouping below the desired one
      if (group % resamplingGroup) group += resamplingGroup - (group % resamplingGroup); // make sure group is multiple of resamplingGroup

      // resamplingDivisor = group / resamplingGroup;
      resamplingDivisor = (group * updateEvery) / resamplingTimeRequested;
    }

    // now that we have group,
    // align the requested timeframe to fit it.

    if (aligned) {
      // alignement has been requested, so align the values
      beforeRequested -= beforeRequested % (group * updateEvery);
      afterRequested -= afterRequested % (group * updateEvery);
    }

    // we align the request on requested_before
    let beforeWanted = beforeRequested;
    if (beforeWanted > lastEntryT) {
      beforeWanted = lastEntryT - (lastEntryT % (((aligned) ? group : 1) * updateEvery));
    }

    // we need to estimate the number of points, for having an integer number of values per point
    let pointsWanted = (beforeWanted - afterRequested) / (updateEvery * group);

    let afterWanted = beforeWanted - (pointsWanted * group * updateEvery) + updateEvery;
    if (afterWanted < firstEntryT) {
      // hm... we go to the past, calculate again pointsWanted using all the db from beforeWanted to the beginning
      pointsWanted = (beforeWanted - firstEntryT) / group;

      // recalculate after wanted with the new number of points
      afterWanted = beforeWanted - (pointsWanted * group * updateEvery) + updateEvery;

      if (afterWanted < firstEntryT) {
        afterWanted = firstEntryT - (firstEntryT % (((aligned) ? group : 1) * updateEvery)) + (((aligned) ? group : 1) * updateEvery);
      }
    }

    // check if they are reversed
    if (afterWanted > beforeWanted) {
      const tmp = beforeWanted;
      beforeWanted = afterWanted;
      afterWanted = tmp;
    }

    // recalculate pointsWanted using the final time-frame
    pointsWanted = (beforeWanted - afterWanted) / updateEvery / group + 1;
    if (pointsWanted < 0) {
      pointsWanted = 0;
    }

    // -------------------------------------------------------------------------
    // initialize our result set

    if (!pointsWanted) return null;

    // -------------------------------------------------------------------------
    // initialize RRDR

    const r = {
      group,
      updateEvery: group * updateEvery,
      before: Math.floor(beforeWanted * 1000),
      after: Math.floor(afterWanted * 1000),
      pointsWanted: Math.floor(pointsWanted),
      internal: {
        resamplingGroup,
        resamplingDivisor
      }
    };

    // Get matching monitor data of dbData based on after & before
    // deep copy and order data from newer to older
    this.dbMatchingData = JSON.parse(JSON.stringify(this.dbData));
    this.dbMatchingData = this.dbMatchingData.reverse().filter(obj => {
      return obj[0] >= r.after && obj[0] <= r.before;
    });

    this.deleteDimensionsSetPErcentage();

    // Set results
    this.currentIntervalMax = r.before;
    this.currentIntervalMin = Math.round(r.before - group * 1000);

    const BreakException = {};
    try {
      this.dbMatchingData.forEach((obj) => {
        this.intervalNotFound = true;

        // Finish forEach if we already have all points wanted
        if (this.currentResult.length >= r.pointsWanted) throw BreakException;

        // Keep the loop till the obj matches the interval
        while (this.intervalNotFound) {
          // safe exit
          if (this.currentIntervalMin < r.after) return this.intervalNotFound = false;

          // Get all objects inside current interval
          const timestampIndex = (this.options.includes('percentage') ? 1 : 0);
          if (obj[timestampIndex] <= this.currentIntervalMax && obj[timestampIndex] > this.currentIntervalMin && this.currentValues.length <= r.group) {
            this.currentValues.push(obj);
            this.intervalNotFound = false;
          } else {
            this.prepareCurrentValues();

            this.currentIntervalMax = this.currentIntervalMin;
            this.currentIntervalMin -= Math.round((r.updateEvery / r.group) * 1000);
          }
        }

      });
    } catch (e) {
      if (e !== BreakException) throw e;
    }

    this.prepareCurrentValues();

    return this.currentResult;
  }

  // @ts-ignore
  private convertBeforeAfterToAbsolute(firstEntryTimestamp, lastEntryTimestamp): 1 | 0 {
    let beforeRequested = this.before;
    let afterRequested = this.after;
    let absolutePeriodRequested: 1 | 0;

    if (beforeRequested === 0 && afterRequested === 0) {
      // dump the all the data
      beforeRequested = lastEntryTimestamp;
      afterRequested = firstEntryTimestamp;
      absolutePeriodRequested = 0;
    }

    // allow relative for before (smaller than API_RELATIVE_TIME_MAX)
    if (Math.abs(beforeRequested) <= (3 * 365 * 86400)) {
      if (beforeRequested > 0) {
        beforeRequested = firstEntryTimestamp + beforeRequested;
      } else {
        beforeRequested = lastEntryTimestamp + beforeRequested; // lastEntryT is not really now_t
      }
      // TODO: fix beforeRequested to be relative to now_t
      absolutePeriodRequested = 0;
    }

    // allow relative for after (smaller than API_RELATIVE_TIME_MAX)
    if (Math.abs(afterRequested) <= (3 * 365 * 86400)) {
      afterRequested = beforeRequested + afterRequested;
      absolutePeriodRequested = 0;
    }

    // @ts-ignore
    if (absolutePeriodRequested === -1) absolutePeriodRequested = 1;

    // make sure they are within our timeframe
    if (beforeRequested > lastEntryTimestamp) beforeRequested = lastEntryTimestamp;
    if (beforeRequested < firstEntryTimestamp) beforeRequested = firstEntryTimestamp;

    if (afterRequested > lastEntryTimestamp) afterRequested = lastEntryTimestamp;
    if (afterRequested < firstEntryTimestamp) afterRequested = firstEntryTimestamp;

    // check if they are reversed
    if (afterRequested > beforeRequested) {
      const tmp = beforeRequested;
      beforeRequested = afterRequested;
      afterRequested = tmp;
    }

    this.before = beforeRequested;
    this.after = afterRequested;

    return absolutePeriodRequested;
  }

  private async generateResponse() {

    // TODO tqx
    // parse Google Visualization API options
    // https://developers.google.com/chart/interactive/docs/dev/implementing_data_source

    if (!this.chart) throw new Error('No chart id is given at the request.');

    // Get chartInfo by cart id
    const chartInfo = this.chartsDatabase.charts[this.chart];
    if (!chartInfo) throw new Error('Chart is not found: ' + this.chart);

    // Get all data by cart id
    this.dbData = this.dataDatabase[this.chart];

    const firstEntryTimestamp = this.dbData[0][0] / 1000;
    const lastEntryTimestamp = this.dbData[this.dbData.length - 1][0] / 1000;

    /**
     * before & after to absolute
     */
    const absolutePeriodRequested = this.convertBeforeAfterToAbsolute(firstEntryTimestamp, lastEntryTimestamp);

    /**
     * Get matching data
     */
    Object.keys(chartInfo.dimensions).forEach(d => {
      this.dimensionsIds.push(d);
      // @ts-ignore
      this.dimensionsNames.push(chartInfo.dimensions[d].name);
    });

    await this.getDatabaseMatchingData(chartInfo.update_every, firstEntryTimestamp, lastEntryTimestamp, absolutePeriodRequested);

    // Create labels
    let resultLabels;
    if (this.dimensions.length === 0) {
      resultLabels = ['time', ...this.dimensionsNames];
    } else {
      resultLabels = ['time', ...this.dimensions];
    }

    // Always return it in seconds
    if (this.options.includes('ms') || this.options.includes('milliseconds')) this.firstEntryReturnedTimestamp /= 1000;
    if (this.options.includes('ms') || this.options.includes('milliseconds')) this.lastEntryReturnedTimestamp /= 1000;

    if (this.options.includes('flip')) this.currentResult.reverse();

    let resultData;
    if (this.format === 'array') {
      resultData = this.currentResult;
    } else {
      resultData = {
        labels: resultLabels,
        data: this.currentResult
      };
    }

    if (this.options.includes('jsonwrap')) {
      return {
        api: 1, // 'The API version this conforms to, currently 1'
        id: this.chart, // 'The unique id of the chart'
        name: chartInfo.name, // 'The name of the chart'
        view_updateEvery: chartInfo.update_every, // TODO 'The current view appropriate update frequency of this chart, in seconds.
        // There is no point to request chart refreshes, using the same settings, more frequently than this.'
        updateEvery: chartInfo.update_every, // 'The update frequency of this chart, in seconds.
        // One value every this amount of time is kept in the round robin database (indepedently of the current view).'
        first_entry: firstEntryTimestamp, // The UNIX timestamp of the first entry (the oldest) in the round robin database.
        last_entry: lastEntryTimestamp, // The UNIX timestamp of the latest entry in the round robin database.
        before: this.firstEntryReturnedTimestamp, // 'The UNIX timestamp of the first entry (the oldest) returned in this response.'
        after: this.lastEntryReturnedTimestamp, // 'The UNIX timestamp of the latest entry returned in this response.'
        dimension_names: this.dimensionsNames, // 'The dimension names of the chart as returned in the current view.'
        dimension_ids: this.dimensionsIds, // 'The dimension IDs of the chart as returned in the current view.'
        latest_values: this.latestValues, // 'The latest values collected for the chart (indepedently of the current view).'
        view_latest_values: this.latestReturnedValues, // 'The latest values returned with this response.'
        dimensions: this.dimensionsIds.length, // 'The number of dimensions returned.'
        points: this.currentResult.length, // 'The number of rows / points returned.'
        format: this.format, // 'The format of the result returned.'
        result: resultData, // 'The result requested, in the format requested.'
        min: this.min, // min in all dimensions 'The minimum value returned in the current view. This can be used to size the y-series of the chart.'
        max: this.max // max in all dimensions 'The maximum value returned in the current view. This can be used to size the y-series of the chart.'
      };
    } else {
      return {
        labels: resultLabels,
        data: this.currentResult
      };
    }

  }
}
