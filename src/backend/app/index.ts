'use strict';

// TODO (SECURITY)
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

import 'reflect-metadata';
const moduleAlias = require('module-alias');
moduleAlias.addAlias('@anyopsos', __dirname + '/filesystem/bin/modules/');

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


