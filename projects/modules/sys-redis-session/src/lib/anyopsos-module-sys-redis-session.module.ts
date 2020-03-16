import {createClient, RedisClient, RetryStrategyOptions} from 'redis';
import {hostname} from 'os';

import {AOO_REDIS_HOST} from '@anyopsos/module-sys-constants';

const retryStrategy = (options: RetryStrategyOptions, type: 'client' | 'pub' | 'sub') => {
  console.log(hostname(), type, options.error);

  if (options.error && options.error.code === 'ECONNREFUSED') {
    // End reconnecting on a specific error and flush all commands with a individual error
    return new Error('The server refused the connection');
  }

  if (options.total_retry_time > 1000 * 60 * 60) {
    // End reconnecting after a specific timeout and flush all commands with a individual error
    return new Error('Retry time exhausted');
  }

  // reconnect after
  return Math.min(options.attempt * 100, 3000);
};

export class AnyOpsOSSysRedisSessionModule {

  Client: RedisClient = createClient({
    host: AOO_REDIS_HOST,
    retry_strategy: (options) => retryStrategy(options, 'client')
  })
  .on('ready', () => {
    this.Client.client('SETNAME', 'Main-' + hostname());
  })
  .on('error', (e: Error) => {
    console.log('error from main');
    console.log(e);
  });

  // Socket.io publisher
  Pub: RedisClient = createClient({
    host: AOO_REDIS_HOST,
    retry_strategy: (options) => retryStrategy(options, 'pub')
  })
  .on('ready', () => {
    this.Pub.client('SETNAME', 'Pub-' + hostname());
  })
  .on('error', (e: Error) => {
    console.log('error from pub');
    console.log(e);
  });

  // Socket.io subscriber
  Sub: RedisClient = createClient({
    host: AOO_REDIS_HOST,
    retry_strategy: (options) => retryStrategy(options, 'sub')
  })
  .on('ready', () => {
    //this.Sub.client('SETNAME', 'Sub-' + os.hostname());
  })
  .on('error', (e: Error) => {
    console.log('error from sub');
    console.log(e);
  });

  constructor() {
  }

}
