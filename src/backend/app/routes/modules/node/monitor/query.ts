import * as express from 'express';
import {Decimal} from 'decimal.js';

import {ApiGlobalsModule} from '../../../api/api-globals';
import {DatabaseMonitorModule, chartsDatabase} from './database';

export class QueryMonitorModule {

  dataDatabase = new DatabaseMonitorModule().getDataDatabase();
  chartsDatabase = chartsDatabase;

  chart: string = this.req.query.chart;
  dimensions: string[] = (this.req.query.dimensions !== undefined ? this.req.query.dimensions.split('|') : []);
  after: number = (this.req.query.after !== undefined ? parseInt(this.req.query.after) : -600);
  before: number = (this.req.query.before !== undefined ? parseInt(this.req.query.before) : 0);
  points: number = (this.req.query.points !== undefined ? parseInt(this.req.query.points) : 20);
  gtime: number = (this.req.query.gtime !== undefined ? parseInt(this.req.query.gtime) : 0);
  group: string = (this.req.query.group !== undefined ? this.req.query.group : 'average');
  format: string = (this.req.query.format !== undefined ? this.req.query.format : 'json');
  options: string[] = (this.req.query.options !== undefined ? this.req.query.options.split('|') : ['seconds', 'jsonwrap']);
  callback: string = this.req.query.callback;
  filename: string = this.req.query.filename;
  tqx: string = this.req.query.tqx;

  // Dimensions
  dimensionsNames = [];
  dimensionsIds = [];

  // Data used
  latestValues;
  dbData = [];
  dbMatchingData;

  // Calculate data
  currentIntervalMax;
  currentIntervalMin;
  currentValues = [];
  currentResult = [];
  intervalNotFound;
  firstEntryReturnedTimestamp;
  lastEntryReturnedTimestamp;

  // Returned values
  latestReturnedValues;
  min;
  max;

  constructor(private req: express.Request,
              private res: express.Response) {

    this.parseRequest();
  }

  private async parseRequest(): Promise<any> {
    const apiGlobals = new ApiGlobalsModule(this.req, this.res);

    let data = await this.generateResponse();
    return apiGlobals.responseJsonData(data);
  }

  private deleteDimensionsSetPErcentage() {

    // Get latest_values based on current dimensions
    this.latestValues = JSON.parse(JSON.stringify(this.dbData[this.dbData.length - 1]));
    this.latestValues.shift(); // Remove timestamp from data

    if (this.dimensions.length !== 0 || this.options.includes('percentage')) {
      let dimensions_index = [];
      let currentTotal;

      // Some domensions specified could not be correct or not exist in this chart
      if (this.dimensions.length !== 0) {
        // Get dimensions index that we want to delete
        this.dimensionsNames.forEach((obj, i) => {
          if (!this.dimensions.includes(obj)) dimensions_index.push(i); // +1 because we need to pass the 'time' dimension
        });

        // Sort reverse to make sure all data is deleted in order
        dimensions_index.sort(function(a, b){return b-a});

        // Remove non wanted dimensions
        dimensions_index.forEach(idx => {
          this.dimensionsNames.splice(idx, 1);
          this.dimensionsIds.splice(idx, 1);
          this.latestValues.splice(idx, 1);
        });
      }

      // Delete data from based on dimension index and set percentage total
      this.dbMatchingData.forEach(obj => {

        // Used to calculate %
        if (this.options.includes('percentage')) {
          currentTotal = obj.reduce((a, b, i) => {
            if (i > 0) {
              return new Decimal(a).plus(b);
            } else {
              return 0;
            }
          }, 0);
        }

        if (dimensions_index.length !== 0) {
          dimensions_index.forEach(idx => {
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
    let res;
    let timeToReturn = (!this.options.includes('ms') && !this.options.includes('milliseconds') ? this.currentIntervalMax / 1000 : this.currentIntervalMax);

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
          { "time": 1568301750, "guest_nice": 0, "guest": 0, "steal": 0.1538782, "softirq": 2.0604372, "irq": 0, "user": 1.2238275, "system": 14.5363847, "nice": 39.161784, "iowait": 0},
          { "time": 1568301740, "guest_nice": 0, "guest": 0, "steal": 0.3002563, "softirq": 0.3041003, "irq": 0, "user": 1.3573818, "system": 3.4644972, "nice": 47.999079, "iowait": 0.0502513}
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
      let itemToAdd = 1; // timestamp dimension
      if (this.options.includes('percentage')) itemToAdd = 2; // sum for average & timestamp

      this.currentValues.push(Array(this.dimensionsNames.length + itemToAdd).fill(0));
    }

    // Calculate result based on group
    if (this.group === 'average') {
      res = this.currentValues.reduce((a, b) => {
        // calculate average
        return a.map((suba, i) => new Decimal(a[i]).plus(b[i]).dividedBy(this.currentValues.length));
      });

      // Delete 1st element and get currentTotal = all dimensions sum
      let currentTotal;
      if (this.options.includes('percentage')) currentTotal = res.shift();

      res.shift(); // Delete timestamp average

      // Set result as percentages
      if (this.options.includes('percentage')) {
        res.forEach((o, i, a) => {
          a[i] = (currentTotal === 0 ? 0 : new Decimal(a[i]).dividedBy(currentTotal).times(100));
        });
      }
    }

    // Set current value as latest value
    if (!this.latestReturnedValues) {
      this.latestReturnedValues = res.map((d) => { return new Decimal(d).toSignificantDigits(7).toNumber(); });
    }

    /**
     * output formats
     */
    if (this.format === 'array') {
      res = new Decimal(res.reduce((a, b) => new Decimal(a).plus(b))).toSignificantDigits(7);

      // Abs if needed
      if (this.options.includes('abs') || this.options.includes('absolute') || this.options.includes('absolute-sum')) res = Math.abs(res);

      this.currentResult.push(res);

      if (!this.max || this.max < res) this.max = parseFloat(res);
      if (!this.min || this.min > res) this.min = parseFloat(res);
    }

    if (this.format === 'json') {

      // Abs if needed
      if (this.options.includes('abs') || this.options.includes('absolute') || this.options.includes('absolute-sum')) res.map(Math.abs);

      res.map(obj => {
        return new Decimal(obj).toSignificantDigits(7);
      });
      this.currentResult.push([timeToReturn, ...res]);

      if (this.max < Decimal.max(...res)) this.max = Decimal.max(...res).toNumber();
      if (this.min > Decimal.min(...res)) this.min = Decimal.min(...res).toNumber();
    }

    if (!this.firstEntryReturnedTimestamp) this.firstEntryReturnedTimestamp = timeToReturn;
    this.lastEntryReturnedTimestamp = timeToReturn;

    // Set next interval and reset current values
    this.currentValues = [];
  };

  private async getDatabaseMatchingData(update_every, first_entry_t, last_entry_t, absolute_period_requested): Promise<any[]> {
    if (!this.dbData || this.dbData.length === 0) return null;

    let points_requested = this.points;
    let after_requested = this.after;
    let before_requested = this.before;
    const resampling_time_requested = this.gtime;

    const aligned = !(this.options.includes('unaligned'));

    if (!absolute_period_requested) {
      if (before_requested % update_every) {

        // make sure it is multiple of update_every
        if (before_requested > 0) before_requested = before_requested - update_every + before_requested % update_every;
      }

      if (after_requested % update_every) {

        // make sure it is multiple of update_every
        if (after_requested < 0) after_requested = after_requested - update_every + after_requested % update_every;
      }
      if (after_requested === before_requested) after_requested -= update_every;
    }

    // the duration of the chart
    let duration = before_requested - after_requested;
    let available_points = duration / update_every;

    if (duration <= 0 || available_points <= 0) return null;

    // check the number of wanted points in the result
    if (points_requested < 0) points_requested = -points_requested;
    if (points_requested > available_points) points_requested = available_points;
    if (points_requested === 0) points_requested = available_points;

    // calculate the desired grouping of source data points
    let group = available_points / points_requested;
    if (group <= 0) group = 1;
    if (available_points % points_requested > points_requested / 2) group = Math.round(group); // rounding to the closest integer

    // resampling_time_requested enforces a certain grouping multiple
    let resampling_divisor = 1.0;
    let resampling_group = 1;
    if (resampling_time_requested > update_every) {
      if (resampling_time_requested > duration) {
        // group_time is above the available duration
        after_requested = before_requested - resampling_time_requested;
        duration = before_requested - after_requested;
        available_points = duration / update_every;
        group = available_points / points_requested;
      }

      // if the duration is not aligned to resampling time
      // extend the duration to the past, to avoid a gap at the chart
      // only when the missing duration is above 1/10th of a point
      if (duration % resampling_time_requested) {
        const delta = duration % resampling_time_requested;
        if (delta > resampling_time_requested / 10) {
          after_requested -= resampling_time_requested - delta;
          duration = before_requested - after_requested;
          available_points = duration / update_every;
          group = available_points / points_requested;
        }
      }

      // the points we should group to satisfy gtime
      resampling_group = resampling_time_requested / update_every;
      if (resampling_time_requested % update_every) {
        resampling_group++;
      }

      // adapt group according to resampling_group
      if (group < resampling_group) group = resampling_group; // do not allow grouping below the desired one
      if (group % resampling_group) group += resampling_group - (group % resampling_group); // make sure group is multiple of resampling_group

      // resampling_divisor = group / resampling_group;
      resampling_divisor = (group * update_every) / resampling_time_requested;
    }

    // now that we have group,
    // align the requested timeframe to fit it.

    if (aligned) {
      // alignement has been requested, so align the values
      before_requested -= before_requested % (group * update_every);
      after_requested -= after_requested % (group * update_every);
    }

    // we align the request on requested_before
    let before_wanted = before_requested;
    if (before_wanted > last_entry_t) {
      before_wanted = last_entry_t - (last_entry_t % (((aligned) ? group : 1) * update_every));
    }

    // we need to estimate the number of points, for having an integer number of values per point
    let points_wanted = (before_wanted - after_requested) / (update_every * group);

    let after_wanted = before_wanted - (points_wanted * group * update_every) + update_every;
    if (after_wanted < first_entry_t) {
      // hm... we go to the past, calculate again points_wanted using all the db from before_wanted to the beginning
      points_wanted = (before_wanted - first_entry_t) / group;

      // recalculate after wanted with the new number of points
      after_wanted = before_wanted - (points_wanted * group * update_every) + update_every;

      if (after_wanted < first_entry_t) {
        after_wanted = first_entry_t - (first_entry_t % (((aligned) ? group : 1) * update_every)) + (((aligned) ? group : 1) * update_every);
      }
    }

    // check if they are reversed
    if (after_wanted > before_wanted) {
      const tmp = before_wanted;
      before_wanted = after_wanted;
      after_wanted = tmp;
    }

    // recalculate points_wanted using the final time-frame
    points_wanted = (before_wanted - after_wanted) / update_every / group + 1;
    if (points_wanted < 0) {
      points_wanted = 0;
    }

    // -------------------------------------------------------------------------
    // initialize our result set

    if (!points_wanted) return null;

    // -------------------------------------------------------------------------
    // initialize RRDR

    const r = {
      group: group,
      update_every: group * update_every,
      before: Math.floor(before_wanted * 1000),
      after: Math.floor(after_wanted * 1000),
      points_wanted: Math.floor(points_wanted),
      internal: {
        resampling_group: resampling_group,
        resampling_divisor: resampling_divisor
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

    let BreakException = {};
    try {
      this.dbMatchingData.forEach((obj) => {
        this.intervalNotFound = true;

        // Finish forEach if we already have all points wanted
        if (this.currentResult.length >= r.points_wanted) throw BreakException;

        // Keep the loop till the obj matches the interval
        while(this.intervalNotFound) {
          // safe exit
          if (this.currentIntervalMin < r.after) return this.intervalNotFound = false;

          // Get all objects inside current interval
          let timestampIndex = (this.options.includes('percentage') ? 1 : 0);
          if (obj[timestampIndex] <= this.currentIntervalMax && obj[timestampIndex] > this.currentIntervalMin && this.currentValues.length <= r.group) {
            this.currentValues.push(obj);
            this.intervalNotFound = false;
          } else {
            this.prepareCurrentValues();

            this.currentIntervalMax = this.currentIntervalMin;
            this.currentIntervalMin -= Math.round((r.update_every / r.group) * 1000);
          }
        }

      });
    } catch (e) {
      if (e !== BreakException) throw e;
    }

    this.prepareCurrentValues();

    return this.currentResult;
  }

  private convertBeforeAfterToAbsolute(firstEntryTimestamp, lastEntryTimestamp): 1 | 0 {
    let before_requested = this.before;
    let after_requested = this.after;
    let absolute_period_requested;

    if (before_requested === 0 && after_requested === 0) {
      // dump the all the data
      before_requested = lastEntryTimestamp;
      after_requested = firstEntryTimestamp;
      absolute_period_requested = 0;
    }

    // allow relative for before (smaller than API_RELATIVE_TIME_MAX)
    if (Math.abs(before_requested) <= (3 * 365 * 86400)) {
      if (before_requested > 0) {
        before_requested = firstEntryTimestamp + before_requested;
      } else {
        before_requested = lastEntryTimestamp + before_requested; // last_entry_t is not really now_t
      }
      // TODO: fix before_requested to be relative to now_t
      absolute_period_requested = 0;
    }

    // allow relative for after (smaller than API_RELATIVE_TIME_MAX)
    if (Math.abs(after_requested) <= (3 * 365 * 86400)) {
      after_requested = before_requested + after_requested;
      absolute_period_requested = 0;
    }

    if (absolute_period_requested === -1) absolute_period_requested = 1;

    // make sure they are within our timeframe
    if (before_requested > lastEntryTimestamp) before_requested = lastEntryTimestamp;
    if (before_requested < firstEntryTimestamp) before_requested = firstEntryTimestamp;

    if (after_requested > lastEntryTimestamp) after_requested = lastEntryTimestamp;
    if (after_requested < firstEntryTimestamp) after_requested = firstEntryTimestamp;

    // check if they are reversed
    if (after_requested > before_requested) {
      const tmp = before_requested;
      before_requested = after_requested;
      after_requested = tmp;
    }

    this.before = before_requested;
    this.after = after_requested;

    return absolute_period_requested;
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
    const absolute_period_requested = this.convertBeforeAfterToAbsolute(firstEntryTimestamp, lastEntryTimestamp);

    /**
     * Get matching data
     */
    Object.keys(chartInfo.dimensions).forEach(d => {
      this.dimensionsIds.push(d);
      this.dimensionsNames.push(chartInfo.dimensions[d].name);
    });

    let data = await this.getDatabaseMatchingData(chartInfo.update_every, firstEntryTimestamp, lastEntryTimestamp, absolute_period_requested);

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
        }
    }

    if (this.options.includes('jsonwrap')) {
      return {
        api: 1, // 'The API version this conforms to, currently 1'
        id: this.chart, // 'The unique id of the chart'
        name: chartInfo.name, // 'The name of the chart'
        view_update_every: chartInfo.update_every, // TODO 'The current view appropriate update frequency of this chart, in seconds.
        // There is no point to request chart refreshes, using the same settings, more frequently than this.'
        update_every: chartInfo.update_every, // 'The update frequency of this chart, in seconds.
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
