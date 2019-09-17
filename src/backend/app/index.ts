import {Init} from './app';

// Initialize App
const app = new Init().getApp();
export {app};

// Initialize other modules
import {DatabaseMonitorModule} from './routes/modules/node/monitor/database';
new DatabaseMonitorModule().initChartsDatabase();
