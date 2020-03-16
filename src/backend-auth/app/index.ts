'use strict';

process.env.AOO_ANYOPSOS_TYPE = 'auth';

import 'reflect-metadata';
const moduleAlias = require('module-alias');
moduleAlias.addAlias('@anyopsos', __dirname + '/../filesystem/bin/modules/');

import {Init} from './init';
import {App} from './app';

/**
 * Make initial checks
 */
new Init().initialize().then(() => {

  /**
   * Initialize App
   */
  new App().initializeApiServer();
});


