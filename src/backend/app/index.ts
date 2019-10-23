'use strict';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

import {Init} from './init';
import {App} from './app';

/**
 * Make initial checks
 */
new Init().initialize().then(() => {

  /**
   * Initialize App
   */
  new App().getApp();
});


