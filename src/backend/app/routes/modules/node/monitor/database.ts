import * as request from 'request';

export class DatabaseMonitorModule {

  private chartsDatabase: {
    charts: {
      [key: string]: {
        alarms: {};
        chart_type: string;
        context: string;
        data_url: string;
        dimensions: {

        };
        duration: number;
        enabled: boolean;
        family: string;
        first_entry: number;
        green: number;
        id: string;
        last_entry: number;
        module: string;
        name: string;
        plugin: string;
        priority: number;
        red: number;
        title: string;
        type: string;
        units: string;
        update_every: number;
      };
    };
    custom_info: string;
    history: number;
    hostname: string;
    os: string;
    release_channel: string;
    timezone: string;
    update_every: number;
    version: string;
    charts_count: number;
    dimensions_count: number;
    alarms_count: number;
  };
  private dataDatabase: number[][] = [];

  constructor() {
  }

  initChartsDatabase() {
    setInterval(() => {
      request({
        url: 'https://frankfurt.my-netdata.io/api/v1/allmetrics?format=json&help=no&types=no&timestamps=yes&names=no&oldunits=no&hideunits=yes&data=as-collected',
        json: true,
      }, (error, response, body) => {
        Object.keys(body).forEach(obj => {
          if (!this.dataDatabase[obj]) this.dataDatabase[obj] = [];

          const alreadyExist = this.dataDatabase[obj].find(e => {
            return e[0] === body[obj].last_updated * 1000;
          });

          if (alreadyExist) return;

          const dataToPush = [];
          dataToPush.push(body[obj].last_updated * 1000);
          Object.keys(body[obj].dimensions).forEach(d => {
            dataToPush.push(body[obj].dimensions[d].value);
          });

          if (obj === 'system.cpu') dataToPush.pop(); // remove idle dimension

          this.dataDatabase[obj].push(dataToPush);
        });
      });
    }, 1000);
  }

  getDataDatabase() {
    return this.dataDatabase;
  }

  getCharts() {
    if (!this.chartsDatabase) {
      request({
        url: 'https://frankfurt.my-netdata.io/api/v1/charts',
        json: true,
      }, (error, response, body) => {
        this.chartsDatabase = body;
      });
    }

    return this.chartsDatabase;
  }

}
