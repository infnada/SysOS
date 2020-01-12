import {Pipe, PipeTransform} from '@angular/core';

const i18n = {
  MSG_TIME_UNIT_SECOND_LABEL: 'a second',
  MSG_TIME_UNIT_SECONDS_LABEL: 'seconds',
  MSG_TIME_UNIT_MINUTE_LABEL: 'a minute',
  MSG_TIME_UNIT_MINUTES_LABEL: 'minutes',
  MSG_TIME_UNIT_HOUR_LABEL: 'an hour',
  MSG_TIME_UNIT_HOURS_LABEL: 'hours',
  MSG_TIME_UNIT_DAY_LABEL: 'a day',
  MSG_TIME_UNIT_DAYS_LABEL: 'days',
  MSG_TIME_UNIT_MONTH_LABEL: 'a month',
  MSG_TIME_UNIT_MONTHS_LABEL: 'months',
  MSG_TIME_UNIT_YEAR_LABEL: 'a year',
  MSG_TIME_UNIT_YEARS_LABEL: 'years',
  MSG_TIME_NOT_YET_LABEL: `-`,
};

/**
 * Unit name constants (singular and plural form), that will be used by the filter.
 */
const units = {
  SECOND: [i18n.MSG_TIME_UNIT_SECOND_LABEL, i18n.MSG_TIME_UNIT_SECONDS_LABEL],
  MINUTE: [i18n.MSG_TIME_UNIT_MINUTE_LABEL, i18n.MSG_TIME_UNIT_MINUTES_LABEL],
  HOUR: [i18n.MSG_TIME_UNIT_HOUR_LABEL, i18n.MSG_TIME_UNIT_HOURS_LABEL],
  DAY: [i18n.MSG_TIME_UNIT_DAY_LABEL, i18n.MSG_TIME_UNIT_DAYS_LABEL],
  MONTH: [i18n.MSG_TIME_UNIT_MONTH_LABEL, i18n.MSG_TIME_UNIT_MONTHS_LABEL],
  YEAR: [i18n.MSG_TIME_UNIT_YEAR_LABEL, i18n.MSG_TIME_UNIT_YEARS_LABEL],
};

const unitConversions = {
  MILLISECONDS_PER_SECOND: 1000,
  SECONDS_PER_MINUTE: 60,
  MINUTES_PER_HOUR: 60,
  HOURS_PER_DAY: 24,
  DAYS_PER_MONTH: 30,
  DAYS_PER_YEAR: 365,
  MONTHS_PER_YEAR: 12,
};

const timeConstants = {
  NOT_YET: i18n.MSG_TIME_NOT_YET_LABEL,
};

@Pipe({
  name: 'relatimeTime'
})
export class RelatimeTimePipe implements PipeTransform {

  constructor() {
  }

  transform(value: string, serverTime?: Date): string {
    if (value == null) {
      return timeConstants.NOT_YET;
    }

    // Current and given times in miliseconds.
    const currentTime = this.getCurrentTime(serverTime);
    const givenTime = new Date(value).getTime();

    // Time differences between current time and given time in specific units.
    const diffInMilliseconds = currentTime - givenTime;
    const diffInSeconds = Math.floor(diffInMilliseconds / unitConversions.MILLISECONDS_PER_SECOND);
    const diffInMinutes = Math.floor(diffInSeconds / unitConversions.SECONDS_PER_MINUTE);
    const diffInHours = Math.floor(diffInMinutes / unitConversions.MINUTES_PER_HOUR);
    const diffInDays = Math.floor(diffInHours / unitConversions.HOURS_PER_DAY);
    const diffInMonths = Math.floor(diffInDays / unitConversions.DAYS_PER_MONTH);
    const diffInYears = Math.floor(diffInDays / unitConversions.DAYS_PER_YEAR);

    // Returns relative time value. Only biggest unit will be taken into consideration, so if time
    // difference is 2 days and 15 hours, only '2 days' string will be returned.
    if (diffInMilliseconds < -1000) {
      // Display NOT_YET only when diff is lower than -1000ms. To show NOW message for
      // times now() +- 1 second. This is because there may be a small desync in server time
      // computation.
      return timeConstants.NOT_YET;
    } else if (diffInSeconds < 1) {
      return this.formatOutputTimeString(0, units.SECOND);
    } else if (diffInMinutes < 1) {
      return this.formatOutputTimeString(diffInSeconds, units.SECOND);
    } else if (diffInHours < 1) {
      return this.formatOutputTimeString(diffInMinutes, units.MINUTE);
    } else if (diffInDays < 1) {
      return this.formatOutputTimeString(diffInHours, units.HOUR);
    } else if (diffInMonths < 1) {
      return this.formatOutputTimeString(diffInDays, units.DAY);
    } else if (diffInYears < 1) {
      return this.formatOutputTimeString(diffInMonths, units.MONTH);
    } else {
      return this.formatOutputTimeString(diffInYears, units.YEAR);
    }
  }

  /**
   * Returns current time. If serverTime is provided then it will be returned, otherwise
   * current client time will be used.
   */
  private getCurrentTime(serverTime: Date): number {
    return serverTime ? serverTime.getTime() : new Date().getTime();
  }

  /**
   * Formats relative time string. Sample results look following: 'a year', '2 days' or '14 hours'.
   */
  private formatOutputTimeString(timeValue: number, timeUnit: string[]): string {
    if (timeValue > 1 || timeValue === 0) {
      return `${timeValue} ${timeUnit[1]}`;
    } else {
      return timeUnit[0];
    }
  }

}
