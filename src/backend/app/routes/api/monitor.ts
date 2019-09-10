import {Router} from 'express';
import {getLogger} from 'log4js';
import * as express from 'express';

import {ApiGlobalsModule} from './api-globals';

const logger = getLogger('mainlog');
const router = Router();

/**
 * getCharts
 */
router.get('/charts', (req: express.Request, res: express.Response) => {
  logger.info(`[API Monitor] -> getCharts -> connectionUuid []`);

  const apiGlobals = new ApiGlobalsModule(req, res);

  return apiGlobals.responseJsonData({
      hostname: 'netdata-master-0',
      version: 'v1.13.0',
      release_channel: 'nightly',
      os: 'linux',
      timezone: 'UTC',
      update_every: 1,
      history: 3996,
      custom_info: '',
      charts: {
        'ip.tcpreorders': 		{
          id: 'ip.tcpreorders',
          name: 'ip.tcpreorders',
          type: 'ip',
          family: 'tcp',
          context: 'ip.tcpreorders',
          title: 'TCP Reordered Packets by Detection Method (ip.tcpreorders)',
          priority: 4220,
          plugin: 'proc.plugin',
          module: '/proc/net/netstat',
          enabled: true,
          units: 'packets/s',
          data_url: '/api/monitor/data?chart=ip.tcpreorders',
          chart_type: 'line',
          duration: 3996,
          first_entry: 1568002947,
          last_entry: 1568006943,
          update_every: 1,
          dimensions: {
            TCPTSReorder: { name: 'timestamp' },
            TCPSACKReorder: { name: 'sack' },
            TCPFACKReorder: { name: 'fack' },
            TCPRenoReorder: { name: 'reno' }
          },
          green: null,
          red: null,
          alarms: {

          }
        },
        'ip.tcpofo': 		{
          id: 'ip.tcpofo',
          name: 'ip.tcpofo',
          type: 'ip',
          family: 'tcp',
          context: 'ip.tcpofo',
          title: 'TCP Out-Of-Order Queue (ip.tcpofo)',
          priority: 4250,
          plugin: 'proc.plugin',
          module: '/proc/net/netstat',
          enabled: true,
          units: 'packets/s',
          data_url: '/api/monitor/data?chart=ip.tcpofo',
          chart_type: 'line',
          duration: 3996,
          first_entry: 1568002947,
          last_entry: 1568006943,
          update_every: 1,
          dimensions: {
            TCPOFOQueue: { name: 'inqueue' },
            TCPOFODrop: { name: 'dropped' },
            TCPOFOMerge: { name: 'merged' },
            OfoPruned: { name: 'pruned' }
          },
          green: null,
          red: null,
          alarms: {

          }
        },
        'ipv4.tcperrors': 		{
          id: 'ipv4.tcperrors',
          name: 'ipv4.tcperrors',
          type: 'ipv4',
          family: 'tcp',
          context: 'ipv4.tcperrors',
          title: 'IPv4 TCP Errors (ipv4.tcperrors)',
          priority: 5220,
          plugin: 'proc.plugin',
          module: '/proc/net/snmp',
          enabled: true,
          units: 'packets/s',
          data_url: '/api/monitor/data?chart=ipv4.tcperrors',
          chart_type: 'line',
          duration: 3996,
          first_entry: 1568002947,
          last_entry: 1568006943,
          update_every: 1,
          dimensions: {
            InErrs: { name: 'InErrs' },
            InCsumErrors: { name: 'InCsumErrors' },
            RetransSegs: { name: 'RetransSegs' }
          },
          green: null,
          red: null,
          alarms: {

          }
        },
        'netdata.db_points': 		{
          id: 'netdata.db_points',
          name: 'netdata.db_points',
          type: 'netdata',
          family: 'queries',
          context: 'netdata.db_points',
          title: 'NetData API Points (netdata.db_points)',
          priority: 130501,
          plugin: 'netdata',
          module: 'stats',
          enabled: true,
          units: 'points/s',
          data_url: '/api/monitor/data?chart=netdata.db_points',
          chart_type: 'area',
          duration: 3996,
          first_entry: 1568002947,
          last_entry: 1568006943,
          update_every: 1,
          dimensions: {
            read: { name: 'read' },
            generated: { name: 'generated' }
          },
          green: null,
          red: null,
          alarms: {

          }
        },
        'netdata.queries': 		{
          id: 'netdata.queries',
          name: 'netdata.queries',
          type: 'netdata',
          family: 'queries',
          context: 'netdata.queries',
          title: 'NetData API Queries (netdata.queries)',
          priority: 130500,
          plugin: 'netdata',
          module: 'stats',
          enabled: true,
          units: 'queries/s',
          data_url: '/api/monitor/data?chart=netdata.queries',
          chart_type: 'line',
          duration: 3996,
          first_entry: 1568002947,
          last_entry: 1568006943,
          update_every: 1,
          dimensions: {
            queries: { name: 'queries' }
          },
          green: null,
          red: null,
          alarms: {

          }
        },
        'ipv4.tcpsock': 		{
          id: 'ipv4.tcpsock',
          name: 'ipv4.tcpsock',
          type: 'ipv4',
          family: 'tcp',
          context: 'ipv4.tcpsock',
          title: 'IPv4 TCP Connections (ipv4.tcpsock)',
          priority: 5200,
          plugin: 'proc.plugin',
          module: '/proc/net/snmp',
          enabled: true,
          units: 'active connections',
          data_url: '/api/monitor/data?chart=ipv4.tcpsock',
          chart_type: 'line',
          duration: 3996,
          first_entry: 1568002947,
          last_entry: 1568006943,
          update_every: 1,
          dimensions: {
            CurrEstab: { name: 'connections' }
          },
          green: null,
          red: null,
          alarms: {
            tcp_connections: {
              id: 1555111264,
              status: 'CLEAR',
              units: '%',
              update_every: 10
            }
          }
        },
        'groups.pipes': 		{
          id: 'groups.pipes',
          name: 'groups.pipes',
          type: 'groups',
          family: 'processes',
          context: 'groups.pipes',
          title: 'User Groups Pipes (groups.pipes)',
          priority: 20053,
          plugin: 'apps.plugin',
          module: '',
          enabled: true,
          units: 'open pipes',
          data_url: '/api/monitor/data?chart=groups.pipes',
          chart_type: 'stacked',
          duration: 3996,
          first_entry: 1568002947,
          last_entry: 1568006943,
          update_every: 1,
          dimensions: {
            netdata: { name: 'netdata' }
          },
          green: null,
          red: null,
          alarms: {

          }
        },
        'groups.sockets': 		{
          id: 'groups.sockets',
          name: 'groups.sockets',
          type: 'groups',
          family: 'net',
          context: 'groups.sockets',
          title: 'User Groups Open Sockets (groups.sockets)',
          priority: 20051,
          plugin: 'apps.plugin',
          module: '',
          enabled: true,
          units: 'open sockets',
          data_url: '/api/monitor/data?chart=groups.sockets',
          chart_type: 'stacked',
          duration: 3996,
          first_entry: 1568002947,
          last_entry: 1568006943,
          update_every: 1,
          dimensions: {
            netdata: { name: 'netdata' }
          },
          green: null,
          red: null,
          alarms: {

          }
        },
        'groups.files': 		{
          id: 'groups.files',
          name: 'groups.files',
          type: 'groups',
          family: 'disk',
          context: 'groups.files',
          title: 'User Groups Open Files (groups.files)',
          priority: 20050,
          plugin: 'apps.plugin',
          module: '',
          enabled: true,
          units: 'open files',
          data_url: '/api/monitor/data?chart=groups.files',
          chart_type: 'stacked',
          duration: 3996,
          first_entry: 1568002947,
          last_entry: 1568006943,
          update_every: 1,
          dimensions: {
            netdata: { name: 'netdata' }
          },
          green: null,
          red: null,
          alarms: {

          }
        },
        'groups.lwrites': 		{
          id: 'groups.lwrites',
          name: 'groups.lwrites',
          type: 'groups',
          family: 'disk',
          context: 'groups.lwrites',
          title: 'User Groups I/O Logical Writes (groups.lwrites)',
          priority: 20042,
          plugin: 'apps.plugin',
          module: '',
          enabled: true,
          units: 'KiB/s',
          data_url: '/api/monitor/data?chart=groups.lwrites',
          chart_type: 'stacked',
          duration: 3996,
          first_entry: 1568002947,
          last_entry: 1568006943,
          update_every: 1,
          dimensions: {
            netdata: { name: 'netdata' }
          },
          green: null,
          red: null,
          alarms: {

          }
        },
        'groups.lreads': 		{
          id: 'groups.lreads',
          name: 'groups.lreads',
          type: 'groups',
          family: 'disk',
          context: 'groups.lreads',
          title: 'User Groups Disk Logical Reads (groups.lreads)',
          priority: 20042,
          plugin: 'apps.plugin',
          module: '',
          enabled: true,
          units: 'KiB/s',
          data_url: '/api/monitor/data?chart=groups.lreads',
          chart_type: 'stacked',
          duration: 3996,
          first_entry: 1568002947,
          last_entry: 1568006943,
          update_every: 1,
          dimensions: {
            netdata: { name: 'netdata' }
          },
          green: null,
          red: null,
          alarms: {

          }
        },
        'groups.pwrites': 		{
          id: 'groups.pwrites',
          name: 'groups.pwrites',
          type: 'groups',
          family: 'disk',
          context: 'groups.pwrites',
          title: 'User Groups Disk Writes (groups.pwrites)',
          priority: 20002,
          plugin: 'apps.plugin',
          module: '',
          enabled: true,
          units: 'KiB/s',
          data_url: '/api/monitor/data?chart=groups.pwrites',
          chart_type: 'stacked',
          duration: 3996,
          first_entry: 1568002947,
          last_entry: 1568006943,
          update_every: 1,
          dimensions: {
            netdata: { name: 'netdata' }
          },
          green: null,
          red: null,
          alarms: {

          }
        },
        'groups.preads': 		{
          id: 'groups.preads',
          name: 'groups.preads',
          type: 'groups',
          family: 'disk',
          context: 'groups.preads',
          title: 'User Groups Disk Reads (groups.preads)',
          priority: 20002,
          plugin: 'apps.plugin',
          module: '',
          enabled: true,
          units: 'KiB/s',
          data_url: '/api/monitor/data?chart=groups.preads',
          chart_type: 'stacked',
          duration: 3996,
          first_entry: 1568002947,
          last_entry: 1568006943,
          update_every: 1,
          dimensions: {
            netdata: { name: 'netdata' }
          },
          green: null,
          red: null,
          alarms: {

          }
        },
        'groups.minor_faults': 		{
          id: 'groups.minor_faults',
          name: 'groups.minor_faults',
          type: 'groups',
          family: 'mem',
          context: 'groups.minor_faults',
          title: 'User Groups Minor Page Faults (groups.minor_faults)',
          priority: 20011,
          plugin: 'apps.plugin',
          module: '',
          enabled: true,
          units: 'page faults/s',
          data_url: '/api/monitor/data?chart=groups.minor_faults',
          chart_type: 'stacked',
          duration: 3996,
          first_entry: 1568002947,
          last_entry: 1568006943,
          update_every: 1,
          dimensions: {
            netdata: { name: 'netdata' }
          },
          green: null,
          red: null,
          alarms: {

          }
        },
        'groups.major_faults': 		{
          id: 'groups.major_faults',
          name: 'groups.major_faults',
          type: 'groups',
          family: 'swap',
          context: 'groups.major_faults',
          title: 'User Groups Major Page Faults (swap read) (groups.major_faults)',
          priority: 20012,
          plugin: 'apps.plugin',
          module: '',
          enabled: true,
          units: 'page faults/s',
          data_url: '/api/monitor/data?chart=groups.major_faults',
          chart_type: 'stacked',
          duration: 3996,
          first_entry: 1568002947,
          last_entry: 1568006943,
          update_every: 1,
          dimensions: {
            netdata: { name: 'netdata' }
          },
          green: null,
          red: null,
          alarms: {

          }
        },
        'groups.swap': 		{
          id: 'groups.swap',
          name: 'groups.swap',
          type: 'groups',
          family: 'swap',
          context: 'groups.swap',
          title: 'User Groups Swap Memory (groups.swap)',
          priority: 20011,
          plugin: 'apps.plugin',
          module: '',
          enabled: true,
          units: 'MiB',
          data_url: '/api/monitor/data?chart=groups.swap',
          chart_type: 'stacked',
          duration: 3996,
          first_entry: 1568002947,
          last_entry: 1568006943,
          update_every: 1,
          dimensions: {
            netdata: { name: 'netdata' }
          },
          green: null,
          red: null,
          alarms: {

          }
        },
        'groups.cpu_system': 		{
          id: 'groups.cpu_system',
          name: 'groups.cpu_system',
          type: 'groups',
          family: 'cpu',
          context: 'groups.cpu_system',
          title: 'User Groups CPU System Time (200% = 2 cores) (groups.cpu_system)',
          priority: 20021,
          plugin: 'apps.plugin',
          module: '',
          enabled: true,
          units: 'percentage',
          data_url: '/api/monitor/data?chart=groups.cpu_system',
          chart_type: 'stacked',
          duration: 3996,
          first_entry: 1568002947,
          last_entry: 1568006943,
          update_every: 1,
          dimensions: {
            netdata: { name: 'netdata' }
          },
          green: null,
          red: null,
          alarms: {

          }
        },
        'groups.cpu_user': 		{
          id: 'groups.cpu_user',
          name: 'groups.cpu_user',
          type: 'groups',
          family: 'cpu',
          context: 'groups.cpu_user',
          title: 'User Groups CPU User Time (200% = 2 cores) (groups.cpu_user)',
          priority: 20020,
          plugin: 'apps.plugin',
          module: '',
          enabled: true,
          units: 'percentage',
          data_url: '/api/monitor/data?chart=groups.cpu_user',
          chart_type: 'stacked',
          duration: 3996,
          first_entry: 1568002947,
          last_entry: 1568006943,
          update_every: 1,
          dimensions: {
            netdata: { name: 'netdata' }
          },
          green: null,
          red: null,
          alarms: {

          }
        },
        'groups.processes': 		{
          id: 'groups.processes',
          name: 'groups.processes',
          type: 'groups',
          family: 'processes',
          context: 'groups.processes',
          title: 'User Groups Processes (groups.processes)',
          priority: 20007,
          plugin: 'apps.plugin',
          module: '',
          enabled: true,
          units: 'processes',
          data_url: '/api/monitor/data?chart=groups.processes',
          chart_type: 'stacked',
          duration: 3996,
          first_entry: 1568002947,
          last_entry: 1568006943,
          update_every: 1,
          dimensions: {
            netdata: { name: 'netdata' }
          },
          green: null,
          red: null,
          alarms: {

          }
        },
        'groups.threads': 		{
          id: 'groups.threads',
          name: 'groups.threads',
          type: 'groups',
          family: 'processes',
          context: 'groups.threads',
          title: 'User Groups Threads (groups.threads)',
          priority: 20006,
          plugin: 'apps.plugin',
          module: '',
          enabled: true,
          units: 'threads',
          data_url: '/api/monitor/data?chart=groups.threads',
          chart_type: 'stacked',
          duration: 3996,
          first_entry: 1568002947,
          last_entry: 1568006943,
          update_every: 1,
          dimensions: {
            netdata: { name: 'netdata' }
          },
          green: null,
          red: null,
          alarms: {

          }
        },
        'groups.vmem': 		{
          id: 'groups.vmem',
          name: 'groups.vmem',
          type: 'groups',
          family: 'mem',
          context: 'groups.vmem',
          title: 'User Groups Virtual Memory Size (groups.vmem)',
          priority: 20005,
          plugin: 'apps.plugin',
          module: '',
          enabled: true,
          units: 'MiB',
          data_url: '/api/monitor/data?chart=groups.vmem',
          chart_type: 'stacked',
          duration: 3996,
          first_entry: 1568002947,
          last_entry: 1568006943,
          update_every: 1,
          dimensions: {
            netdata: { name: 'netdata' }
          },
          green: null,
          red: null,
          alarms: {

          }
        },
        'groups.mem': 		{
          id: 'groups.mem',
          name: 'groups.mem',
          type: 'groups',
          family: 'mem',
          context: 'groups.mem',
          title: 'User Groups Real Memory (w/o shared) (groups.mem)',
          priority: 20003,
          plugin: 'apps.plugin',
          module: '',
          enabled: true,
          units: 'MiB',
          data_url: '/api/monitor/data?chart=groups.mem',
          chart_type: 'stacked',
          duration: 3996,
          first_entry: 1568002947,
          last_entry: 1568006943,
          update_every: 1,
          dimensions: {
            netdata: { name: 'netdata' }
          },
          green: null,
          red: null,
          alarms: {

          }
        },
        'groups.cpu': 		{
          id: 'groups.cpu',
          name: 'groups.cpu',
          type: 'groups',
          family: 'cpu',
          context: 'groups.cpu',
          title: 'User Groups CPU Time (200% = 2 cores) (groups.cpu)',
          priority: 20001,
          plugin: 'apps.plugin',
          module: '',
          enabled: true,
          units: 'percentage',
          data_url: '/api/monitor/data?chart=groups.cpu',
          chart_type: 'stacked',
          duration: 3996,
          first_entry: 1568002947,
          last_entry: 1568006943,
          update_every: 1,
          dimensions: {
            netdata: { name: 'netdata' }
          },
          green: null,
          red: null,
          alarms: {

          }
        },
        'users.pipes': 		{
          id: 'users.pipes',
          name: 'users.pipes',
          type: 'users',
          family: 'processes',
          context: 'users.pipes',
          title: 'Users Pipes (users.pipes)',
          priority: 20053,
          plugin: 'apps.plugin',
          module: '',
          enabled: true,
          units: 'open pipes',
          data_url: '/api/monitor/data?chart=users.pipes',
          chart_type: 'stacked',
          duration: 3996,
          first_entry: 1568002947,
          last_entry: 1568006943,
          update_every: 1,
          dimensions: {
            netdata: { name: 'netdata' },
            root: { name: 'root' }
          },
          green: null,
          red: null,
          alarms: {

          }
        },
        'users.sockets': 		{
          id: 'users.sockets',
          name: 'users.sockets',
          type: 'users',
          family: 'net',
          context: 'users.sockets',
          title: 'Users Open Sockets (users.sockets)',
          priority: 20051,
          plugin: 'apps.plugin',
          module: '',
          enabled: true,
          units: 'open sockets',
          data_url: '/api/monitor/data?chart=users.sockets',
          chart_type: 'stacked',
          duration: 3996,
          first_entry: 1568002947,
          last_entry: 1568006943,
          update_every: 1,
          dimensions: {
            netdata: { name: 'netdata' },
            root: { name: 'root' }
          },
          green: null,
          red: null,
          alarms: {

          }
        },
        'users.files': 		{
          id: 'users.files',
          name: 'users.files',
          type: 'users',
          family: 'disk',
          context: 'users.files',
          title: 'Users Open Files (users.files)',
          priority: 20050,
          plugin: 'apps.plugin',
          module: '',
          enabled: true,
          units: 'open files',
          data_url: '/api/monitor/data?chart=users.files',
          chart_type: 'stacked',
          duration: 3996,
          first_entry: 1568002947,
          last_entry: 1568006943,
          update_every: 1,
          dimensions: {
            netdata: { name: 'netdata' },
            root: { name: 'root' }
          },
          green: null,
          red: null,
          alarms: {

          }
        },
        'users.lwrites': 		{
          id: 'users.lwrites',
          name: 'users.lwrites',
          type: 'users',
          family: 'disk',
          context: 'users.lwrites',
          title: 'Users I/O Logical Writes (users.lwrites)',
          priority: 20042,
          plugin: 'apps.plugin',
          module: '',
          enabled: true,
          units: 'KiB/s',
          data_url: '/api/monitor/data?chart=users.lwrites',
          chart_type: 'stacked',
          duration: 3996,
          first_entry: 1568002947,
          last_entry: 1568006943,
          update_every: 1,
          dimensions: {
            netdata: { name: 'netdata' },
            root: { name: 'root' }
          },
          green: null,
          red: null,
          alarms: {

          }
        },
        'users.lreads': 		{
          id: 'users.lreads',
          name: 'users.lreads',
          type: 'users',
          family: 'disk',
          context: 'users.lreads',
          title: 'Users Disk Logical Reads (users.lreads)',
          priority: 20042,
          plugin: 'apps.plugin',
          module: '',
          enabled: true,
          units: 'KiB/s',
          data_url: '/api/monitor/data?chart=users.lreads',
          chart_type: 'stacked',
          duration: 3996,
          first_entry: 1568002947,
          last_entry: 1568006943,
          update_every: 1,
          dimensions: {
            netdata: { name: 'netdata' },
            root: { name: 'root' }
          },
          green: null,
          red: null,
          alarms: {

          }
        },
        'users.pwrites': 		{
          id: 'users.pwrites',
          name: 'users.pwrites',
          type: 'users',
          family: 'disk',
          context: 'users.pwrites',
          title: 'Users Disk Writes (users.pwrites)',
          priority: 20002,
          plugin: 'apps.plugin',
          module: '',
          enabled: true,
          units: 'KiB/s',
          data_url: '/api/monitor/data?chart=users.pwrites',
          chart_type: 'stacked',
          duration: 3996,
          first_entry: 1568002947,
          last_entry: 1568006943,
          update_every: 1,
          dimensions: {
            netdata: { name: 'netdata' },
            root: { name: 'root' }
          },
          green: null,
          red: null,
          alarms: {

          }
        },
        'users.preads': 		{
          id: 'users.preads',
          name: 'users.preads',
          type: 'users',
          family: 'disk',
          context: 'users.preads',
          title: 'Users Disk Reads (users.preads)',
          priority: 20002,
          plugin: 'apps.plugin',
          module: '',
          enabled: true,
          units: 'KiB/s',
          data_url: '/api/monitor/data?chart=users.preads',
          chart_type: 'stacked',
          duration: 3996,
          first_entry: 1568002947,
          last_entry: 1568006943,
          update_every: 1,
          dimensions: {
            netdata: { name: 'netdata' },
            root: { name: 'root' }
          },
          green: null,
          red: null,
          alarms: {

          }
        },
        'users.minor_faults': 		{
          id: 'users.minor_faults',
          name: 'users.minor_faults',
          type: 'users',
          family: 'mem',
          context: 'users.minor_faults',
          title: 'Users Minor Page Faults (users.minor_faults)',
          priority: 20011,
          plugin: 'apps.plugin',
          module: '',
          enabled: true,
          units: 'page faults/s',
          data_url: '/api/monitor/data?chart=users.minor_faults',
          chart_type: 'stacked',
          duration: 3996,
          first_entry: 1568002947,
          last_entry: 1568006943,
          update_every: 1,
          dimensions: {
            netdata: { name: 'netdata' },
            root: { name: 'root' }
          },
          green: null,
          red: null,
          alarms: {

          }
        },
        'users.major_faults': 		{
          id: 'users.major_faults',
          name: 'users.major_faults',
          type: 'users',
          family: 'swap',
          context: 'users.major_faults',
          title: 'Users Major Page Faults (swap read) (users.major_faults)',
          priority: 20012,
          plugin: 'apps.plugin',
          module: '',
          enabled: true,
          units: 'page faults/s',
          data_url: '/api/monitor/data?chart=users.major_faults',
          chart_type: 'stacked',
          duration: 3996,
          first_entry: 1568002947,
          last_entry: 1568006943,
          update_every: 1,
          dimensions: {
            netdata: { name: 'netdata' },
            root: { name: 'root' }
          },
          green: null,
          red: null,
          alarms: {

          }
        },
        'users.swap': 		{
          id: 'users.swap',
          name: 'users.swap',
          type: 'users',
          family: 'swap',
          context: 'users.swap',
          title: 'Users Swap Memory (users.swap)',
          priority: 20011,
          plugin: 'apps.plugin',
          module: '',
          enabled: true,
          units: 'MiB',
          data_url: '/api/monitor/data?chart=users.swap',
          chart_type: 'stacked',
          duration: 3996,
          first_entry: 1568002947,
          last_entry: 1568006943,
          update_every: 1,
          dimensions: {
            netdata: { name: 'netdata' },
            root: { name: 'root' }
          },
          green: null,
          red: null,
          alarms: {

          }
        },
        'users.cpu_system': 		{
          id: 'users.cpu_system',
          name: 'users.cpu_system',
          type: 'users',
          family: 'cpu',
          context: 'users.cpu_system',
          title: 'Users CPU System Time (200% = 2 cores) (users.cpu_system)',
          priority: 20021,
          plugin: 'apps.plugin',
          module: '',
          enabled: true,
          units: 'percentage',
          data_url: '/api/monitor/data?chart=users.cpu_system',
          chart_type: 'stacked',
          duration: 3996,
          first_entry: 1568002947,
          last_entry: 1568006943,
          update_every: 1,
          dimensions: {
            netdata: { name: 'netdata' },
            root: { name: 'root' }
          },
          green: null,
          red: null,
          alarms: {

          }
        },
        'users.cpu_user': 		{
          id: 'users.cpu_user',
          name: 'users.cpu_user',
          type: 'users',
          family: 'cpu',
          context: 'users.cpu_user',
          title: 'Users CPU User Time (200% = 2 cores) (users.cpu_user)',
          priority: 20020,
          plugin: 'apps.plugin',
          module: '',
          enabled: true,
          units: 'percentage',
          data_url: '/api/monitor/data?chart=users.cpu_user',
          chart_type: 'stacked',
          duration: 3996,
          first_entry: 1568002947,
          last_entry: 1568006943,
          update_every: 1,
          dimensions: {
            netdata: { name: 'netdata' },
            root: { name: 'root' }
          },
          green: null,
          red: null,
          alarms: {

          }
        },
        'users.processes': 		{
          id: 'users.processes',
          name: 'users.processes',
          type: 'users',
          family: 'processes',
          context: 'users.processes',
          title: 'Users Processes (users.processes)',
          priority: 20007,
          plugin: 'apps.plugin',
          module: '',
          enabled: true,
          units: 'processes',
          data_url: '/api/monitor/data?chart=users.processes',
          chart_type: 'stacked',
          duration: 3996,
          first_entry: 1568002947,
          last_entry: 1568006943,
          update_every: 1,
          dimensions: {
            netdata: { name: 'netdata' },
            root: { name: 'root' }
          },
          green: null,
          red: null,
          alarms: {

          }
        },
        'users.threads': 		{
          id: 'users.threads',
          name: 'users.threads',
          type: 'users',
          family: 'processes',
          context: 'users.threads',
          title: 'Users Threads (users.threads)',
          priority: 20006,
          plugin: 'apps.plugin',
          module: '',
          enabled: true,
          units: 'threads',
          data_url: '/api/monitor/data?chart=users.threads',
          chart_type: 'stacked',
          duration: 3996,
          first_entry: 1568002947,
          last_entry: 1568006943,
          update_every: 1,
          dimensions: {
            netdata: { name: 'netdata' },
            root: { name: 'root' }
          },
          green: null,
          red: null,
          alarms: {

          }
        },
        'users.vmem': 		{
          id: 'users.vmem',
          name: 'users.vmem',
          type: 'users',
          family: 'mem',
          context: 'users.vmem',
          title: 'Users Virtual Memory Size (users.vmem)',
          priority: 20005,
          plugin: 'apps.plugin',
          module: '',
          enabled: true,
          units: 'MiB',
          data_url: '/api/monitor/data?chart=users.vmem',
          chart_type: 'stacked',
          duration: 3996,
          first_entry: 1568002947,
          last_entry: 1568006943,
          update_every: 1,
          dimensions: {
            netdata: { name: 'netdata' },
            root: { name: 'root' }
          },
          green: null,
          red: null,
          alarms: {

          }
        },
        'users.mem': 		{
          id: 'users.mem',
          name: 'users.mem',
          type: 'users',
          family: 'mem',
          context: 'users.mem',
          title: 'Users Real Memory (w/o shared) (users.mem)',
          priority: 20003,
          plugin: 'apps.plugin',
          module: '',
          enabled: true,
          units: 'MiB',
          data_url: '/api/monitor/data?chart=users.mem',
          chart_type: 'stacked',
          duration: 3996,
          first_entry: 1568002947,
          last_entry: 1568006943,
          update_every: 1,
          dimensions: {
            netdata: { name: 'netdata' },
            root: { name: 'root' }
          },
          green: null,
          red: null,
          alarms: {

          }
        },
        'users.cpu': 		{
          id: 'users.cpu',
          name: 'users.cpu',
          type: 'users',
          family: 'cpu',
          context: 'users.cpu',
          title: 'Users CPU Time (200% = 2 cores) (users.cpu)',
          priority: 20001,
          plugin: 'apps.plugin',
          module: '',
          enabled: true,
          units: 'percentage',
          data_url: '/api/monitor/data?chart=users.cpu',
          chart_type: 'stacked',
          duration: 3996,
          first_entry: 1568002947,
          last_entry: 1568006943,
          update_every: 1,
          dimensions: {
            netdata: { name: 'netdata' },
            root: { name: 'root' }
          },
          green: null,
          red: null,
          alarms: {

          }
        },
        'apps.pipes': 		{
          id: 'apps.pipes',
          name: 'apps.pipes',
          type: 'apps',
          family: 'processes',
          context: 'apps.pipes',
          title: 'Apps Pipes (apps.pipes)',
          priority: 20053,
          plugin: 'apps.plugin',
          module: '',
          enabled: true,
          units: 'open pipes',
          data_url: '/api/monitor/data?chart=apps.pipes',
          chart_type: 'stacked',
          duration: 3996,
          first_entry: 1568002947,
          last_entry: 1568006943,
          update_every: 1,
          dimensions: {
            'apps.plugin': { name: 'apps.plugin' },
            other: { name: 'other' },
            netdata: { name: 'netdata' }
          },
          green: null,
          red: null,
          alarms: {

          }
        },
        'apps.sockets': 		{
          id: 'apps.sockets',
          name: 'apps.sockets',
          type: 'apps',
          family: 'net',
          context: 'apps.sockets',
          title: 'Apps Open Sockets (apps.sockets)',
          priority: 20051,
          plugin: 'apps.plugin',
          module: '',
          enabled: true,
          units: 'open sockets',
          data_url: '/api/monitor/data?chart=apps.sockets',
          chart_type: 'stacked',
          duration: 3996,
          first_entry: 1568002947,
          last_entry: 1568006943,
          update_every: 1,
          dimensions: {
            'apps.plugin': { name: 'apps.plugin' },
            other: { name: 'other' },
            netdata: { name: 'netdata' }
          },
          green: null,
          red: null,
          alarms: {

          }
        },
        'apps.files': 		{
          id: 'apps.files',
          name: 'apps.files',
          type: 'apps',
          family: 'disk',
          context: 'apps.files',
          title: 'Apps Open Files (apps.files)',
          priority: 20050,
          plugin: 'apps.plugin',
          module: '',
          enabled: true,
          units: 'open files',
          data_url: '/api/monitor/data?chart=apps.files',
          chart_type: 'stacked',
          duration: 3996,
          first_entry: 1568002947,
          last_entry: 1568006943,
          update_every: 1,
          dimensions: {
            'apps.plugin': { name: 'apps.plugin' },
            other: { name: 'other' },
            netdata: { name: 'netdata' }
          },
          green: null,
          red: null,
          alarms: {

          }
        },
        'apps.lwrites': 		{
          id: 'apps.lwrites',
          name: 'apps.lwrites',
          type: 'apps',
          family: 'disk',
          context: 'apps.lwrites',
          title: 'Apps I/O Logical Writes (apps.lwrites)',
          priority: 20042,
          plugin: 'apps.plugin',
          module: '',
          enabled: true,
          units: 'KiB/s',
          data_url: '/api/monitor/data?chart=apps.lwrites',
          chart_type: 'stacked',
          duration: 3996,
          first_entry: 1568002947,
          last_entry: 1568006943,
          update_every: 1,
          dimensions: {
            'apps.plugin': { name: 'apps.plugin' },
            other: { name: 'other' },
            netdata: { name: 'netdata' }
          },
          green: null,
          red: null,
          alarms: {

          }
        },
        'apps.lreads': 		{
          id: 'apps.lreads',
          name: 'apps.lreads',
          type: 'apps',
          family: 'disk',
          context: 'apps.lreads',
          title: 'Apps Disk Logical Reads (apps.lreads)',
          priority: 20042,
          plugin: 'apps.plugin',
          module: '',
          enabled: true,
          units: 'KiB/s',
          data_url: '/api/monitor/data?chart=apps.lreads',
          chart_type: 'stacked',
          duration: 3996,
          first_entry: 1568002947,
          last_entry: 1568006943,
          update_every: 1,
          dimensions: {
            'apps.plugin': { name: 'apps.plugin' },
            other: { name: 'other' },
            netdata: { name: 'netdata' }
          },
          green: null,
          red: null,
          alarms: {

          }
        },
        'apps.pwrites': 		{
          id: 'apps.pwrites',
          name: 'apps.pwrites',
          type: 'apps',
          family: 'disk',
          context: 'apps.pwrites',
          title: 'Apps Disk Writes (apps.pwrites)',
          priority: 20002,
          plugin: 'apps.plugin',
          module: '',
          enabled: true,
          units: 'KiB/s',
          data_url: '/api/monitor/data?chart=apps.pwrites',
          chart_type: 'stacked',
          duration: 3996,
          first_entry: 1568002947,
          last_entry: 1568006943,
          update_every: 1,
          dimensions: {
            'apps.plugin': { name: 'apps.plugin' },
            other: { name: 'other' },
            netdata: { name: 'netdata' }
          },
          green: null,
          red: null,
          alarms: {

          }
        },
        'apps.preads': 		{
          id: 'apps.preads',
          name: 'apps.preads',
          type: 'apps',
          family: 'disk',
          context: 'apps.preads',
          title: 'Apps Disk Reads (apps.preads)',
          priority: 20002,
          plugin: 'apps.plugin',
          module: '',
          enabled: true,
          units: 'KiB/s',
          data_url: '/api/monitor/data?chart=apps.preads',
          chart_type: 'stacked',
          duration: 3996,
          first_entry: 1568002947,
          last_entry: 1568006943,
          update_every: 1,
          dimensions: {
            'apps.plugin': { name: 'apps.plugin' },
            other: { name: 'other' },
            netdata: { name: 'netdata' }
          },
          green: null,
          red: null,
          alarms: {

          }
        },
        'apps.minor_faults': 		{
          id: 'apps.minor_faults',
          name: 'apps.minor_faults',
          type: 'apps',
          family: 'mem',
          context: 'apps.minor_faults',
          title: 'Apps Minor Page Faults (apps.minor_faults)',
          priority: 20011,
          plugin: 'apps.plugin',
          module: '',
          enabled: true,
          units: 'page faults/s',
          data_url: '/api/monitor/data?chart=apps.minor_faults',
          chart_type: 'stacked',
          duration: 3996,
          first_entry: 1568002947,
          last_entry: 1568006943,
          update_every: 1,
          dimensions: {
            'apps.plugin': { name: 'apps.plugin' },
            other: { name: 'other' },
            netdata: { name: 'netdata' }
          },
          green: null,
          red: null,
          alarms: {

          }
        },
        'apps.major_faults': 		{
          id: 'apps.major_faults',
          name: 'apps.major_faults',
          type: 'apps',
          family: 'swap',
          context: 'apps.major_faults',
          title: 'Apps Major Page Faults (swap read) (apps.major_faults)',
          priority: 20012,
          plugin: 'apps.plugin',
          module: '',
          enabled: true,
          units: 'page faults/s',
          data_url: '/api/monitor/data?chart=apps.major_faults',
          chart_type: 'stacked',
          duration: 3996,
          first_entry: 1568002947,
          last_entry: 1568006943,
          update_every: 1,
          dimensions: {
            'apps.plugin': { name: 'apps.plugin' },
            other: { name: 'other' },
            netdata: { name: 'netdata' }
          },
          green: null,
          red: null,
          alarms: {

          }
        },
        'apps.swap': 		{
          id: 'apps.swap',
          name: 'apps.swap',
          type: 'apps',
          family: 'swap',
          context: 'apps.swap',
          title: 'Apps Swap Memory (apps.swap)',
          priority: 20011,
          plugin: 'apps.plugin',
          module: '',
          enabled: true,
          units: 'MiB',
          data_url: '/api/monitor/data?chart=apps.swap',
          chart_type: 'stacked',
          duration: 3996,
          first_entry: 1568002947,
          last_entry: 1568006943,
          update_every: 1,
          dimensions: {
            'apps.plugin': { name: 'apps.plugin' },
            other: { name: 'other' },
            netdata: { name: 'netdata' }
          },
          green: null,
          red: null,
          alarms: {

          }
        },
        'apps.cpu_system': 		{
          id: 'apps.cpu_system',
          name: 'apps.cpu_system',
          type: 'apps',
          family: 'cpu',
          context: 'apps.cpu_system',
          title: 'Apps CPU System Time (200% = 2 cores) (apps.cpu_system)',
          priority: 20021,
          plugin: 'apps.plugin',
          module: '',
          enabled: true,
          units: 'percentage',
          data_url: '/api/monitor/data?chart=apps.cpu_system',
          chart_type: 'stacked',
          duration: 3996,
          first_entry: 1568002947,
          last_entry: 1568006943,
          update_every: 1,
          dimensions: {
            'apps.plugin': { name: 'apps.plugin' },
            other: { name: 'other' },
            netdata: { name: 'netdata' }
          },
          green: null,
          red: null,
          alarms: {

          }
        },
        'apps.cpu_user': 		{
          id: 'apps.cpu_user',
          name: 'apps.cpu_user',
          type: 'apps',
          family: 'cpu',
          context: 'apps.cpu_user',
          title: 'Apps CPU User Time (200% = 2 cores) (apps.cpu_user)',
          priority: 20020,
          plugin: 'apps.plugin',
          module: '',
          enabled: true,
          units: 'percentage',
          data_url: '/api/monitor/data?chart=apps.cpu_user',
          chart_type: 'stacked',
          duration: 3996,
          first_entry: 1568002947,
          last_entry: 1568006943,
          update_every: 1,
          dimensions: {
            'apps.plugin': { name: 'apps.plugin' },
            other: { name: 'other' },
            netdata: { name: 'netdata' }
          },
          green: null,
          red: null,
          alarms: {

          }
        },
        'apps.processes': 		{
          id: 'apps.processes',
          name: 'apps.processes',
          type: 'apps',
          family: 'processes',
          context: 'apps.processes',
          title: 'Apps Processes (apps.processes)',
          priority: 20007,
          plugin: 'apps.plugin',
          module: '',
          enabled: true,
          units: 'processes',
          data_url: '/api/monitor/data?chart=apps.processes',
          chart_type: 'stacked',
          duration: 3996,
          first_entry: 1568002947,
          last_entry: 1568006943,
          update_every: 1,
          dimensions: {
            'apps.plugin': { name: 'apps.plugin' },
            other: { name: 'other' },
            netdata: { name: 'netdata' }
          },
          green: null,
          red: null,
          alarms: {

          }
        },
        'apps.threads': 		{
          id: 'apps.threads',
          name: 'apps.threads',
          type: 'apps',
          family: 'processes',
          context: 'apps.threads',
          title: 'Apps Threads (apps.threads)',
          priority: 20006,
          plugin: 'apps.plugin',
          module: '',
          enabled: true,
          units: 'threads',
          data_url: '/api/monitor/data?chart=apps.threads',
          chart_type: 'stacked',
          duration: 3996,
          first_entry: 1568002947,
          last_entry: 1568006943,
          update_every: 1,
          dimensions: {
            'apps.plugin': { name: 'apps.plugin' },
            other: { name: 'other' },
            netdata: { name: 'netdata' }
          },
          green: null,
          red: null,
          alarms: {

          }
        },
        'apps.vmem': 		{
          id: 'apps.vmem',
          name: 'apps.vmem',
          type: 'apps',
          family: 'mem',
          context: 'apps.vmem',
          title: 'Apps Virtual Memory Size (apps.vmem)',
          priority: 20005,
          plugin: 'apps.plugin',
          module: '',
          enabled: true,
          units: 'MiB',
          data_url: '/api/monitor/data?chart=apps.vmem',
          chart_type: 'stacked',
          duration: 3996,
          first_entry: 1568002947,
          last_entry: 1568006943,
          update_every: 1,
          dimensions: {
            'apps.plugin': { name: 'apps.plugin' },
            other: { name: 'other' },
            netdata: { name: 'netdata' }
          },
          green: null,
          red: null,
          alarms: {

          }
        },
        'apps.mem': 		{
          id: 'apps.mem',
          name: 'apps.mem',
          type: 'apps',
          family: 'mem',
          context: 'apps.mem',
          title: 'Apps Real Memory (w/o shared) (apps.mem)',
          priority: 20003,
          plugin: 'apps.plugin',
          module: '',
          enabled: true,
          units: 'MiB',
          data_url: '/api/monitor/data?chart=apps.mem',
          chart_type: 'stacked',
          duration: 3996,
          first_entry: 1568002947,
          last_entry: 1568006943,
          update_every: 1,
          dimensions: {
            'apps.plugin': { name: 'apps.plugin' },
            other: { name: 'other' },
            netdata: { name: 'netdata' }
          },
          green: null,
          red: null,
          alarms: {

          }
        },
        'apps.cpu': 		{
          id: 'apps.cpu',
          name: 'apps.cpu',
          type: 'apps',
          family: 'cpu',
          context: 'apps.cpu',
          title: 'Apps CPU Time (200% = 2 cores) (apps.cpu)',
          priority: 20001,
          plugin: 'apps.plugin',
          module: '',
          enabled: true,
          units: 'percentage',
          data_url: '/api/monitor/data?chart=apps.cpu',
          chart_type: 'stacked',
          duration: 3996,
          first_entry: 1568002947,
          last_entry: 1568006943,
          update_every: 1,
          dimensions: {
            'apps.plugin': { name: 'apps.plugin' },
            other: { name: 'other' },
            netdata: { name: 'netdata' }
          },
          green: null,
          red: null,
          alarms: {

          }
        },
        'netdata.apps_children_fix': 		{
          id: 'netdata.apps_children_fix',
          name: 'netdata.apps_children_fix',
          type: 'netdata',
          family: 'apps.plugin',
          context: 'netdata.apps_children_fix',
          title: 'Apps Plugin Exited Children Normalization Ratios (netdata.apps_children_fix)',
          priority: 140003,
          plugin: 'apps.plugin',
          module: '',
          enabled: true,
          units: 'percentage',
          data_url: '/api/monitor/data?chart=netdata.apps_children_fix',
          chart_type: 'line',
          duration: 3996,
          first_entry: 1568002947,
          last_entry: 1568006943,
          update_every: 1,
          dimensions: {
            cutime: { name: 'cutime' },
            cstime: { name: 'cstime' },
            cgtime: { name: 'cgtime' },
            cminflt: { name: 'cminflt' },
            cmajflt: { name: 'cmajflt' }
          },
          green: null,
          red: null,
          alarms: {

          }
        },
        'netdata.apps_fix': 		{
          id: 'netdata.apps_fix',
          name: 'netdata.apps_fix',
          type: 'netdata',
          family: 'apps.plugin',
          context: 'netdata.apps_fix',
          title: 'Apps Plugin Normalization Ratios (netdata.apps_fix)',
          priority: 140002,
          plugin: 'apps.plugin',
          module: '',
          enabled: true,
          units: 'percentage',
          data_url: '/api/monitor/data?chart=netdata.apps_fix',
          chart_type: 'line',
          duration: 3996,
          first_entry: 1568002947,
          last_entry: 1568006943,
          update_every: 1,
          dimensions: {
            utime: { name: 'utime' },
            stime: { name: 'stime' },
            gtime: { name: 'gtime' },
            minflt: { name: 'minflt' },
            majflt: { name: 'majflt' }
          },
          green: null,
          red: null,
          alarms: {

          }
        },
        'disk_svctm.vdb': 		{
          id: 'disk_svctm.vdb',
          name: 'disk_svctm.vdb',
          type: 'disk_svctm',
          family: 'vdb',
          context: 'disk.svctm',
          title: 'Average Service Time (disk_svctm.vdb)',
          priority: 2007,
          plugin: 'proc.plugin',
          module: '/proc/diskstats',
          enabled: true,
          units: 'milliseconds/operation',
          data_url: '/api/monitor/data?chart=disk_svctm.vdb',
          chart_type: 'line',
          duration: 3996,
          first_entry: 1568002947,
          last_entry: 1568006943,
          update_every: 1,
          dimensions: {
            svctm: { name: 'svctm' }
          },
          green: null,
          red: null,
          alarms: {

          }
        },
        'disk_avgsz.vdb': 		{
          id: 'disk_avgsz.vdb',
          name: 'disk_avgsz.vdb',
          type: 'disk_avgsz',
          family: 'vdb',
          context: 'disk.avgsz',
          title: 'Average Completed I/O Operation Bandwidth (disk_avgsz.vdb)',
          priority: 2006,
          plugin: 'proc.plugin',
          module: '/proc/diskstats',
          enabled: true,
          units: 'KiB/operation',
          data_url: '/api/monitor/data?chart=disk_avgsz.vdb',
          chart_type: 'area',
          duration: 3996,
          first_entry: 1568002947,
          last_entry: 1568006943,
          update_every: 1,
          dimensions: {
            reads: { name: 'reads' },
            writes: { name: 'writes' }
          },
          green: null,
          red: null,
          alarms: {

          }
        },
        'disk_await.vdb': 		{
          id: 'disk_await.vdb',
          name: 'disk_await.vdb',
          type: 'disk_await',
          family: 'vdb',
          context: 'disk.await',
          title: 'Average Completed I/O Operation Time (disk_await.vdb)',
          priority: 2005,
          plugin: 'proc.plugin',
          module: '/proc/diskstats',
          enabled: true,
          units: 'milliseconds/operation',
          data_url: '/api/monitor/data?chart=disk_await.vdb',
          chart_type: 'line',
          duration: 3996,
          first_entry: 1568002947,
          last_entry: 1568006943,
          update_every: 1,
          dimensions: {
            reads: { name: 'reads' },
            writes: { name: 'writes' }
          },
          green: null,
          red: null,
          alarms: {

          }
        },
        'disk_svctm.vda': 		{
          id: 'disk_svctm.vda',
          name: 'disk_svctm.vda',
          type: 'disk_svctm',
          family: 'vda',
          context: 'disk.svctm',
          title: 'Average Service Time (disk_svctm.vda)',
          priority: 2007,
          plugin: 'proc.plugin',
          module: '/proc/diskstats',
          enabled: true,
          units: 'milliseconds/operation',
          data_url: '/api/monitor/data?chart=disk_svctm.vda',
          chart_type: 'line',
          duration: 3996,
          first_entry: 1568002947,
          last_entry: 1568006943,
          update_every: 1,
          dimensions: {
            svctm: { name: 'svctm' }
          },
          green: null,
          red: null,
          alarms: {

          }
        },
        'disk_avgsz.vda': 		{
          id: 'disk_avgsz.vda',
          name: 'disk_avgsz.vda',
          type: 'disk_avgsz',
          family: 'vda',
          context: 'disk.avgsz',
          title: 'Average Completed I/O Operation Bandwidth (disk_avgsz.vda)',
          priority: 2006,
          plugin: 'proc.plugin',
          module: '/proc/diskstats',
          enabled: true,
          units: 'KiB/operation',
          data_url: '/api/monitor/data?chart=disk_avgsz.vda',
          chart_type: 'area',
          duration: 3996,
          first_entry: 1568002947,
          last_entry: 1568006943,
          update_every: 1,
          dimensions: {
            reads: { name: 'reads' },
            writes: { name: 'writes' }
          },
          green: null,
          red: null,
          alarms: {

          }
        },
        'netdata.apps_sizes': 		{
          id: 'netdata.apps_sizes',
          name: 'netdata.apps_sizes',
          type: 'netdata',
          family: 'apps.plugin',
          context: 'netdata.apps_sizes',
          title: 'Apps Plugin Files (netdata.apps_sizes)',
          priority: 140001,
          plugin: 'apps.plugin',
          module: '',
          enabled: true,
          units: 'files/s',
          data_url: '/api/monitor/data?chart=netdata.apps_sizes',
          chart_type: 'line',
          duration: 3996,
          first_entry: 1568002947,
          last_entry: 1568006943,
          update_every: 1,
          dimensions: {
            calls: { name: 'calls' },
            files: { name: 'files' },
            filenames: { name: 'filenames' },
            inode_changes: { name: 'inode_changes' },
            link_changes: { name: 'link_changes' },
            pids: { name: 'pids' },
            fds: { name: 'fds' },
            targets: { name: 'targets' },
            new_pids: { name: 'new pids' }
          },
          green: null,
          red: null,
          alarms: {

          }
        },
        'disk_await.vda': 		{
          id: 'disk_await.vda',
          name: 'disk_await.vda',
          type: 'disk_await',
          family: 'vda',
          context: 'disk.await',
          title: 'Average Completed I/O Operation Time (disk_await.vda)',
          priority: 2005,
          plugin: 'proc.plugin',
          module: '/proc/diskstats',
          enabled: true,
          units: 'milliseconds/operation',
          data_url: '/api/monitor/data?chart=disk_await.vda',
          chart_type: 'line',
          duration: 3996,
          first_entry: 1568002947,
          last_entry: 1568006943,
          update_every: 1,
          dimensions: {
            reads: { name: 'reads' },
            writes: { name: 'writes' }
          },
          green: null,
          red: null,
          alarms: {

          }
        },
        'netdata.apps_cpu': 		{
          id: 'netdata.apps_cpu',
          name: 'netdata.apps_cpu',
          type: 'netdata',
          family: 'apps.plugin',
          context: 'netdata.apps_cpu',
          title: 'Apps Plugin CPU (netdata.apps_cpu)',
          priority: 140000,
          plugin: 'apps.plugin',
          module: '',
          enabled: true,
          units: 'milliseconds/s',
          data_url: '/api/monitor/data?chart=netdata.apps_cpu',
          chart_type: 'stacked',
          duration: 3996,
          first_entry: 1568002947,
          last_entry: 1568006943,
          update_every: 1,
          dimensions: {
            user: { name: 'user' },
            system: { name: 'system' }
          },
          green: null,
          red: null,
          alarms: {

          }
        },
        'netdata.web_thread2_cpu': 		{
          id: 'netdata.web_thread2_cpu',
          name: 'netdata.web_thread2_cpu',
          type: 'netdata',
          family: 'web',
          context: 'netdata.web_cpu',
          title: 'NetData web server thread No 2 CPU usage (netdata.web_thread2_cpu)',
          priority: 132001,
          plugin: 'web',
          module: 'stats',
          enabled: true,
          units: 'milliseconds/s',
          data_url: '/api/monitor/data?chart=netdata.web_thread2_cpu',
          chart_type: 'stacked',
          duration: 3996,
          first_entry: 1568002948,
          last_entry: 1568006944,
          update_every: 1,
          dimensions: {
            user: { name: 'user' },
            system: { name: 'system' }
          },
          green: null,
          red: null,
          alarms: {

          }
        },
        'netdata.web_thread1_cpu': 		{
          id: 'netdata.web_thread1_cpu',
          name: 'netdata.web_thread1_cpu',
          type: 'netdata',
          family: 'web',
          context: 'netdata.web_cpu',
          title: 'NetData web server thread No 1 CPU usage (netdata.web_thread1_cpu)',
          priority: 132000,
          plugin: 'web',
          module: 'stats',
          enabled: true,
          units: 'milliseconds/s',
          data_url: '/api/monitor/data?chart=netdata.web_thread1_cpu',
          chart_type: 'stacked',
          duration: 3996,
          first_entry: 1568002948,
          last_entry: 1568006944,
          update_every: 1,
          dimensions: {
            user: { name: 'user' },
            system: { name: 'system' }
          },
          green: null,
          red: null,
          alarms: {

          }
        },
        'netdata.compression_ratio': 		{
          id: 'netdata.compression_ratio',
          name: 'netdata.compression_ratio',
          type: 'netdata',
          family: 'netdata',
          context: 'netdata.compression_ratio',
          title: 'NetData API Responses Compression Savings Ratio (netdata.compression_ratio)',
          priority: 130500,
          plugin: 'netdata',
          module: 'stats',
          enabled: true,
          units: 'percentage',
          data_url: '/api/monitor/data?chart=netdata.compression_ratio',
          chart_type: 'line',
          duration: 3996,
          first_entry: 1568002947,
          last_entry: 1568006943,
          update_every: 1,
          dimensions: {
            savings: { name: 'savings' }
          },
          green: null,
          red: null,
          alarms: {

          }
        },
        'netdata.response_time': 		{
          id: 'netdata.response_time',
          name: 'netdata.response_time',
          type: 'netdata',
          family: 'netdata',
          context: 'netdata.response_time',
          title: 'NetData API Response Time (netdata.response_time)',
          priority: 130400,
          plugin: 'netdata',
          module: 'stats',
          enabled: true,
          units: 'milliseconds/request',
          data_url: '/api/monitor/data?chart=netdata.response_time',
          chart_type: 'line',
          duration: 3996,
          first_entry: 1568002947,
          last_entry: 1568006943,
          update_every: 1,
          dimensions: {
            average: { name: 'average' },
            max: { name: 'max' }
          },
          green: null,
          red: null,
          alarms: {

          }
        },
        'netdata.net': 		{
          id: 'netdata.net',
          name: 'netdata.net',
          type: 'netdata',
          family: 'netdata',
          context: 'netdata.net',
          title: 'NetData Network Traffic (netdata.net)',
          priority: 130000,
          plugin: 'netdata',
          module: 'stats',
          enabled: true,
          units: 'kilobits/s',
          data_url: '/api/monitor/data?chart=netdata.net',
          chart_type: 'area',
          duration: 3996,
          first_entry: 1568002947,
          last_entry: 1568006943,
          update_every: 1,
          dimensions: {
            in: { name: 'in' },
            out: { name: 'out' }
          },
          green: null,
          red: null,
          alarms: {

          }
        },
        'netdata.requests': 		{
          id: 'netdata.requests',
          name: 'netdata.requests',
          type: 'netdata',
          family: 'netdata',
          context: 'netdata.requests',
          title: 'NetData Web Requests (netdata.requests)',
          priority: 130300,
          plugin: 'netdata',
          module: 'stats',
          enabled: true,
          units: 'requests/s',
          data_url: '/api/monitor/data?chart=netdata.requests',
          chart_type: 'line',
          duration: 3996,
          first_entry: 1568002947,
          last_entry: 1568006943,
          update_every: 1,
          dimensions: {
            requests: { name: 'requests' }
          },
          green: null,
          red: null,
          alarms: {

          }
        },
        'netdata.clients': 		{
          id: 'netdata.clients',
          name: 'netdata.clients',
          type: 'netdata',
          family: 'netdata',
          context: 'netdata.clients',
          title: 'NetData Web Clients (netdata.clients)',
          priority: 130200,
          plugin: 'netdata',
          module: 'stats',
          enabled: true,
          units: 'connected clients',
          data_url: '/api/monitor/data?chart=netdata.clients',
          chart_type: 'line',
          duration: 3996,
          first_entry: 1568002947,
          last_entry: 1568006943,
          update_every: 1,
          dimensions: {
            clients: { name: 'clients' }
          },
          green: null,
          red: null,
          alarms: {

          }
        },
        'netdata.server_cpu': 		{
          id: 'netdata.server_cpu',
          name: 'netdata.server_cpu',
          type: 'netdata',
          family: 'netdata',
          context: 'netdata.server_cpu',
          title: 'NetData CPU usage (netdata.server_cpu)',
          priority: 130000,
          plugin: 'netdata',
          module: 'stats',
          enabled: true,
          units: 'milliseconds/s',
          data_url: '/api/monitor/data?chart=netdata.server_cpu',
          chart_type: 'stacked',
          duration: 3996,
          first_entry: 1568002947,
          last_entry: 1568006943,
          update_every: 1,
          dimensions: {
            user: { name: 'user' },
            system: { name: 'system' }
          },
          green: null,
          red: null,
          alarms: {

          }
        },
        'netdata.plugin_proc_cpu': 		{
          id: 'netdata.plugin_proc_cpu',
          name: 'netdata.plugin_proc_cpu',
          type: 'netdata',
          family: 'proc',
          context: 'netdata.plugin_proc_cpu',
          title: 'NetData Proc Plugin CPU usage (netdata.plugin_proc_cpu)',
          priority: 132000,
          plugin: 'netdata',
          module: 'stats',
          enabled: true,
          units: 'milliseconds/s',
          data_url: '/api/monitor/data?chart=netdata.plugin_proc_cpu',
          chart_type: 'stacked',
          duration: 3996,
          first_entry: 1568002947,
          last_entry: 1568006943,
          update_every: 1,
          dimensions: {
            user: { name: 'user' },
            system: { name: 'system' }
          },
          green: null,
          red: null,
          alarms: {

          }
        },
        'netdata.plugin_proc_modules': 		{
          id: 'netdata.plugin_proc_modules',
          name: 'netdata.plugin_proc_modules',
          type: 'netdata',
          family: 'proc',
          context: 'netdata.plugin_proc_modules',
          title: 'NetData Proc Plugin Modules Durations (netdata.plugin_proc_modules)',
          priority: 132001,
          plugin: 'netdata',
          module: 'stats',
          enabled: true,
          units: 'milliseconds/run',
          data_url: '/api/monitor/data?chart=netdata.plugin_proc_modules',
          chart_type: 'stacked',
          duration: 3996,
          first_entry: 1568002947,
          last_entry: 1568006943,
          update_every: 1,
          dimensions: {
            stat: { name: 'stat' },
            uptime: { name: 'uptime' },
            loadavg: { name: 'loadavg' },
            entropy: { name: 'entropy' },
            interrupts: { name: 'interrupts' },
            softirqs: { name: 'softirqs' },
            vmstat: { name: 'vmstat' },
            meminfo: { name: 'meminfo' },
            ksm: { name: 'ksm' },
            numa: { name: 'numa' },
            netdev: { name: 'netdev' },
            sockstat: { name: 'sockstat' },
            sockstat6: { name: 'sockstat6' },
            netstat: { name: 'netstat' },
            snmp: { name: 'snmp' },
            snmp6: { name: 'snmp6' },
            softnet: { name: 'softnet' },
            conntrack: { name: 'conntrack' },
            diskstats: { name: 'diskstats' },
            btrfs: { name: 'btrfs' },
            ipc: { name: 'ipc' },
            power_supply: { name: 'power_supply' }
          },
          green: null,
          red: null,
          alarms: {

          }
        },
        'system.shared_memory_bytes': 		{
          id: 'system.shared_memory_bytes',
          name: 'system.shared_memory_bytes',
          type: 'system',
          family: 'ipc shared memory',
          context: 'system.shared_memory_bytes',
          title: 'IPC Shared Memory Used Bytes (system.shared_memory_bytes)',
          priority: 1206,
          plugin: 'proc.plugin',
          module: 'ipc',
          enabled: true,
          units: 'bytes',
          data_url: '/api/monitor/data?chart=system.shared_memory_bytes',
          chart_type: 'stacked',
          duration: 3996,
          first_entry: 1568002947,
          last_entry: 1568006943,
          update_every: 1,
          dimensions: {
            bytes: { name: 'bytes' }
          },
          green: null,
          red: null,
          alarms: {

          }
        },
        'system.shared_memory_segments': 		{
          id: 'system.shared_memory_segments',
          name: 'system.shared_memory_segments',
          type: 'system',
          family: 'ipc shared memory',
          context: 'system.shared_memory_segments',
          title: 'IPC Shared Memory Number of Segments (system.shared_memory_segments)',
          priority: 1205,
          plugin: 'proc.plugin',
          module: 'ipc',
          enabled: true,
          units: 'segments',
          data_url: '/api/monitor/data?chart=system.shared_memory_segments',
          chart_type: 'stacked',
          duration: 3996,
          first_entry: 1568002947,
          last_entry: 1568006943,
          update_every: 1,
          dimensions: {
            segments: { name: 'segments' }
          },
          green: null,
          red: null,
          alarms: {

          }
        },
        'system.ipc_semaphore_arrays': 		{
          id: 'system.ipc_semaphore_arrays',
          name: 'system.ipc_semaphore_arrays',
          type: 'system',
          family: 'ipc semaphores',
          context: 'system.ipc_semaphore_arrays',
          title: 'IPC Semaphore Arrays (system.ipc_semaphore_arrays)',
          priority: 1204,
          plugin: 'proc.plugin',
          module: 'ipc',
          enabled: true,
          units: 'arrays',
          data_url: '/api/monitor/data?chart=system.ipc_semaphore_arrays',
          chart_type: 'area',
          duration: 3996,
          first_entry: 1568002947,
          last_entry: 1568006943,
          update_every: 1,
          dimensions: {
            arrays: { name: 'arrays' }
          },
          green: null,
          red: 32000,
          alarms: {
            semaphore_arrays_used: {
              id: 1555111233,
              status: 'CLEAR',
              units: '%',
              update_every: 10
            }
          }
        },
        'system.ipc_semaphores': 		{
          id: 'system.ipc_semaphores',
          name: 'system.ipc_semaphores',
          type: 'system',
          family: 'ipc semaphores',
          context: 'system.ipc_semaphores',
          title: 'IPC Semaphores (system.ipc_semaphores)',
          priority: 1203,
          plugin: 'proc.plugin',
          module: 'ipc',
          enabled: true,
          units: 'semaphores',
          data_url: '/api/monitor/data?chart=system.ipc_semaphores',
          chart_type: 'area',
          duration: 3996,
          first_entry: 1568002947,
          last_entry: 1568006943,
          update_every: 1,
          dimensions: {
            semaphores: { name: 'semaphores' }
          },
          green: null,
          red: 1024000000,
          alarms: {
            semaphores_used: {
              id: 1555111232,
              status: 'CLEAR',
              units: '%',
              update_every: 10
            }
          }
        },
        'system.io': 		{
          id: 'system.io',
          name: 'system.io',
          type: 'system',
          family: 'disk',
          context: 'system.io',
          title: 'Disk I/O (system.io)',
          priority: 150,
          plugin: 'proc.plugin',
          module: '/proc/diskstats',
          enabled: true,
          units: 'KiB/s',
          data_url: '/api/monitor/data?chart=system.io',
          chart_type: 'area',
          duration: 3996,
          first_entry: 1568002947,
          last_entry: 1568006943,
          update_every: 1,
          dimensions: {
            in: { name: 'in' },
            out: { name: 'out' }
          },
          green: null,
          red: null,
          alarms: {

          }
        },
        'disk_iotime.vdb': 		{
          id: 'disk_iotime.vdb',
          name: 'disk_iotime.vdb',
          type: 'disk_iotime',
          family: 'vdb',
          context: 'disk.iotime',
          title: 'Disk Total I/O Time (disk_iotime.vdb)',
          priority: 2022,
          plugin: 'proc.plugin',
          module: '/proc/diskstats',
          enabled: true,
          units: 'milliseconds/s',
          data_url: '/api/monitor/data?chart=disk_iotime.vdb',
          chart_type: 'line',
          duration: 3996,
          first_entry: 1568002947,
          last_entry: 1568006943,
          update_every: 1,
          dimensions: {
            reads: { name: 'reads' },
            writes: { name: 'writes' }
          },
          green: null,
          red: null,
          alarms: {

          }
        },
        'disk_util.vdb': 		{
          id: 'disk_util.vdb',
          name: 'disk_util.vdb',
          type: 'disk_util',
          family: 'vdb',
          context: 'disk.util',
          title: 'Disk Utilization Time (disk_util.vdb)',
          priority: 2004,
          plugin: 'proc.plugin',
          module: '/proc/diskstats',
          enabled: true,
          units: '% of time working',
          data_url: '/api/monitor/data?chart=disk_util.vdb',
          chart_type: 'area',
          duration: 3996,
          first_entry: 1568002947,
          last_entry: 1568006943,
          update_every: 1,
          dimensions: {
            utilization: { name: 'utilization' }
          },
          green: 90,
          red: 98,
          alarms: {
            '10min_disk_utilization': {
              id: 1555111308,
              status: 'CLEAR',
              units: '%',
              update_every: 60
            }
          }
        },
        'disk_backlog.vdb': 		{
          id: 'disk_backlog.vdb',
          name: 'disk_backlog.vdb',
          type: 'disk_backlog',
          family: 'vdb',
          context: 'disk.backlog',
          title: 'Disk Backlog (disk_backlog.vdb)',
          priority: 2003,
          plugin: 'proc.plugin',
          module: '/proc/diskstats',
          enabled: true,
          units: 'milliseconds',
          data_url: '/api/monitor/data?chart=disk_backlog.vdb',
          chart_type: 'area',
          duration: 3996,
          first_entry: 1568002947,
          last_entry: 1568006943,
          update_every: 1,
          dimensions: {
            backlog: { name: 'backlog' }
          },
          green: 2000,
          red: 5000,
          alarms: {
            '10min_disk_backlog': {
              id: 1555111307,
              status: 'CLEAR',
              units: 'ms',
              update_every: 60
            }
          }
        },
        'disk_ops.vdb': 		{
          id: 'disk_ops.vdb',
          name: 'disk_ops.vdb',
          type: 'disk_ops',
          family: 'vdb',
          context: 'disk.ops',
          title: 'Disk Completed I/O Operations (disk_ops.vdb)',
          priority: 2001,
          plugin: 'proc.plugin',
          module: '/proc/diskstats',
          enabled: true,
          units: 'operations/s',
          data_url: '/api/monitor/data?chart=disk_ops.vdb',
          chart_type: 'line',
          duration: 3996,
          first_entry: 1568002947,
          last_entry: 1568006943,
          update_every: 1,
          dimensions: {
            reads: { name: 'reads' },
            writes: { name: 'writes' }
          },
          green: null,
          red: null,
          alarms: {

          }
        },
        'disk.vdb': 		{
          id: 'disk.vdb',
          name: 'disk.vdb',
          type: 'disk',
          family: 'vdb',
          context: 'disk.io',
          title: 'Disk I/O Bandwidth (disk.vdb)',
          priority: 2000,
          plugin: 'proc.plugin',
          module: '/proc/diskstats',
          enabled: true,
          units: 'KiB/s',
          data_url: '/api/monitor/data?chart=disk.vdb',
          chart_type: 'area',
          duration: 3996,
          first_entry: 1568002947,
          last_entry: 1568006943,
          update_every: 1,
          dimensions: {
            reads: { name: 'reads' },
            writes: { name: 'writes' }
          },
          green: null,
          red: null,
          alarms: {

          }
        },
        'disk_iotime.vda': 		{
          id: 'disk_iotime.vda',
          name: 'disk_iotime.vda',
          type: 'disk_iotime',
          family: 'vda',
          context: 'disk.iotime',
          title: 'Disk Total I/O Time (disk_iotime.vda)',
          priority: 2022,
          plugin: 'proc.plugin',
          module: '/proc/diskstats',
          enabled: true,
          units: 'milliseconds/s',
          data_url: '/api/monitor/data?chart=disk_iotime.vda',
          chart_type: 'line',
          duration: 3996,
          first_entry: 1568002947,
          last_entry: 1568006943,
          update_every: 1,
          dimensions: {
            reads: { name: 'reads' },
            writes: { name: 'writes' }
          },
          green: null,
          red: null,
          alarms: {

          }
        },
        'disk_mops.vda': 		{
          id: 'disk_mops.vda',
          name: 'disk_mops.vda',
          type: 'disk_mops',
          family: 'vda',
          context: 'disk.mops',
          title: 'Disk Merged Operations (disk_mops.vda)',
          priority: 2021,
          plugin: 'proc.plugin',
          module: '/proc/diskstats',
          enabled: true,
          units: 'merged operations/s',
          data_url: '/api/monitor/data?chart=disk_mops.vda',
          chart_type: 'line',
          duration: 3996,
          first_entry: 1568002947,
          last_entry: 1568006943,
          update_every: 1,
          dimensions: {
            reads: { name: 'reads' },
            writes: { name: 'writes' }
          },
          green: null,
          red: null,
          alarms: {

          }
        },
        'disk_util.vda': 		{
          id: 'disk_util.vda',
          name: 'disk_util.vda',
          type: 'disk_util',
          family: 'vda',
          context: 'disk.util',
          title: 'Disk Utilization Time (disk_util.vda)',
          priority: 2004,
          plugin: 'proc.plugin',
          module: '/proc/diskstats',
          enabled: true,
          units: '% of time working',
          data_url: '/api/monitor/data?chart=disk_util.vda',
          chart_type: 'area',
          duration: 3996,
          first_entry: 1568002947,
          last_entry: 1568006943,
          update_every: 1,
          dimensions: {
            utilization: { name: 'utilization' }
          },
          green: 90,
          red: 98,
          alarms: {
            '10min_disk_utilization': {
              id: 1555111306,
              status: 'CLEAR',
              units: '%',
              update_every: 60
            }
          }
        },
        'disk_backlog.vda': 		{
          id: 'disk_backlog.vda',
          name: 'disk_backlog.vda',
          type: 'disk_backlog',
          family: 'vda',
          context: 'disk.backlog',
          title: 'Disk Backlog (disk_backlog.vda)',
          priority: 2003,
          plugin: 'proc.plugin',
          module: '/proc/diskstats',
          enabled: true,
          units: 'milliseconds',
          data_url: '/api/monitor/data?chart=disk_backlog.vda',
          chart_type: 'area',
          duration: 3996,
          first_entry: 1568002947,
          last_entry: 1568006943,
          update_every: 1,
          dimensions: {
            backlog: { name: 'backlog' }
          },
          green: 2000,
          red: 5000,
          alarms: {
            '10min_disk_backlog': {
              id: 1555111305,
              status: 'CLEAR',
              units: 'ms',
              update_every: 60
            }
          }
        },
        'disk_ops.vda': 		{
          id: 'disk_ops.vda',
          name: 'disk_ops.vda',
          type: 'disk_ops',
          family: 'vda',
          context: 'disk.ops',
          title: 'Disk Completed I/O Operations (disk_ops.vda)',
          priority: 2001,
          plugin: 'proc.plugin',
          module: '/proc/diskstats',
          enabled: true,
          units: 'operations/s',
          data_url: '/api/monitor/data?chart=disk_ops.vda',
          chart_type: 'line',
          duration: 3996,
          first_entry: 1568002947,
          last_entry: 1568006943,
          update_every: 1,
          dimensions: {
            reads: { name: 'reads' },
            writes: { name: 'writes' }
          },
          green: null,
          red: null,
          alarms: {

          }
        },
        'disk.vda': 		{
          id: 'disk.vda',
          name: 'disk.vda',
          type: 'disk',
          family: 'vda',
          context: 'disk.io',
          title: 'Disk I/O Bandwidth (disk.vda)',
          priority: 2000,
          plugin: 'proc.plugin',
          module: '/proc/diskstats',
          enabled: true,
          units: 'KiB/s',
          data_url: '/api/monitor/data?chart=disk.vda',
          chart_type: 'area',
          duration: 3996,
          first_entry: 1568002947,
          last_entry: 1568006943,
          update_every: 1,
          dimensions: {
            reads: { name: 'reads' },
            writes: { name: 'writes' }
          },
          green: null,
          red: null,
          alarms: {

          }
        },
        'netfilter.conntrack_errors': 		{
          id: 'netfilter.conntrack_errors',
          name: 'netfilter.conntrack_errors',
          type: 'netfilter',
          family: 'conntrack',
          context: 'netfilter.conntrack_errors',
          title: 'Connection Tracker Errors (netfilter.conntrack_errors)',
          priority: 8705,
          plugin: 'proc.plugin',
          module: '/proc/net/stat/nf_conntrack',
          enabled: true,
          units: 'events/s',
          data_url: '/api/monitor/data?chart=netfilter.conntrack_errors',
          chart_type: 'line',
          duration: 3996,
          first_entry: 1568002947,
          last_entry: 1568006943,
          update_every: 1,
          dimensions: {
            icmp_error: { name: 'icmp_error' },
            insert_failed: { name: 'insert_failed' },
            drop: { name: 'drop' },
            early_drop: { name: 'early_drop' }
          },
          green: null,
          red: null,
          alarms: {

          }
        },
        'netfilter.conntrack_search': 		{
          id: 'netfilter.conntrack_search',
          name: 'netfilter.conntrack_search',
          type: 'netfilter',
          family: 'conntrack',
          context: 'netfilter.conntrack_search',
          title: 'Connection Tracker Searches (netfilter.conntrack_search)',
          priority: 8710,
          plugin: 'proc.plugin',
          module: '/proc/net/stat/nf_conntrack',
          enabled: true,
          units: 'searches/s',
          data_url: '/api/monitor/data?chart=netfilter.conntrack_search',
          chart_type: 'line',
          duration: 3996,
          first_entry: 1568002947,
          last_entry: 1568006943,
          update_every: 1,
          dimensions: {
            searched: { name: 'searched' },
            restarted: { name: 'restarted' },
            found: { name: 'found' }
          },
          green: null,
          red: null,
          alarms: {

          }
        },
        'netfilter.conntrack_expect': 		{
          id: 'netfilter.conntrack_expect',
          name: 'netfilter.conntrack_expect',
          type: 'netfilter',
          family: 'conntrack',
          context: 'netfilter.conntrack_expect',
          title: 'Connection Tracker Expectations (netfilter.conntrack_expect)',
          priority: 8703,
          plugin: 'proc.plugin',
          module: '/proc/net/stat/nf_conntrack',
          enabled: true,
          units: 'expectations/s',
          data_url: '/api/monitor/data?chart=netfilter.conntrack_expect',
          chart_type: 'line',
          duration: 3996,
          first_entry: 1568002947,
          last_entry: 1568006943,
          update_every: 1,
          dimensions: {
            created: { name: 'created' },
            deleted: { name: 'deleted' },
            new: { name: 'new' }
          },
          green: null,
          red: null,
          alarms: {

          }
        },
        'netfilter.conntrack_changes': 		{
          id: 'netfilter.conntrack_changes',
          name: 'netfilter.conntrack_changes',
          type: 'netfilter',
          family: 'conntrack',
          context: 'netfilter.conntrack_changes',
          title: 'Connection Tracker Changes (netfilter.conntrack_changes)',
          priority: 8702,
          plugin: 'proc.plugin',
          module: '/proc/net/stat/nf_conntrack',
          enabled: true,
          units: 'changes/s',
          data_url: '/api/monitor/data?chart=netfilter.conntrack_changes',
          chart_type: 'line',
          duration: 3996,
          first_entry: 1568002947,
          last_entry: 1568006943,
          update_every: 1,
          dimensions: {
            inserted: { name: 'inserted' },
            deleted: { name: 'deleted' },
            delete_list: { name: 'delete_list' }
          },
          green: null,
          red: null,
          alarms: {

          }
        },
        'netfilter.conntrack_new': 		{
          id: 'netfilter.conntrack_new',
          name: 'netfilter.conntrack_new',
          type: 'netfilter',
          family: 'conntrack',
          context: 'netfilter.conntrack_new',
          title: 'Connection Tracker New Connections (netfilter.conntrack_new)',
          priority: 8701,
          plugin: 'proc.plugin',
          module: '/proc/net/stat/nf_conntrack',
          enabled: true,
          units: 'connections/s',
          data_url: '/api/monitor/data?chart=netfilter.conntrack_new',
          chart_type: 'line',
          duration: 3996,
          first_entry: 1568002947,
          last_entry: 1568006943,
          update_every: 1,
          dimensions: {
            new: { name: 'new' },
            ignore: { name: 'ignore' },
            invalid: { name: 'invalid' }
          },
          green: null,
          red: null,
          alarms: {

          }
        },
        'netfilter.conntrack_sockets': 		{
          id: 'netfilter.conntrack_sockets',
          name: 'netfilter.conntrack_sockets',
          type: 'netfilter',
          family: 'conntrack',
          context: 'netfilter.conntrack_sockets',
          title: 'Connection Tracker Connections (netfilter.conntrack_sockets)',
          priority: 8700,
          plugin: 'proc.plugin',
          module: '/proc/net/stat/nf_conntrack',
          enabled: true,
          units: 'active connections',
          data_url: '/api/monitor/data?chart=netfilter.conntrack_sockets',
          chart_type: 'line',
          duration: 3996,
          first_entry: 1568002947,
          last_entry: 1568006943,
          update_every: 1,
          dimensions: {
            connections: { name: 'connections' }
          },
          green: null,
          red: null,
          alarms: {
            netfilter_conntrack_full: {
              id: 1555111235,
              status: 'CLEAR',
              units: '%',
              update_every: 10
            },
            netfilter_last_collected_secs: {
              id: 1555111234,
              status: 'CLEAR',
              units: 'seconds ago',
              update_every: 10
            }
          }
        },
        'cpu.cpu1_softnet_stat': 		{
          id: 'cpu.cpu1_softnet_stat',
          name: 'cpu.cpu1_softnet_stat',
          type: 'cpu',
          family: 'softnet_stat',
          context: 'cpu.softnet_stat',
          title: 'CPU1 softnet_stat (cpu.cpu1_softnet_stat)',
          priority: 4102,
          plugin: 'proc.plugin',
          module: '/proc/net/softnet_stat',
          enabled: true,
          units: 'events/s',
          data_url: '/api/monitor/data?chart=cpu.cpu1_softnet_stat',
          chart_type: 'line',
          duration: 3996,
          first_entry: 1568002947,
          last_entry: 1568006943,
          update_every: 1,
          dimensions: {
            processed: { name: 'processed' },
            dropped: { name: 'dropped' },
            squeezed: { name: 'squeezed' },
            received_rps: { name: 'received_rps' },
            flow_limit_count: { name: 'flow_limit_count' }
          },
          green: null,
          red: null,
          alarms: {

          }
        },
        'cpu.cpu0_softnet_stat': 		{
          id: 'cpu.cpu0_softnet_stat',
          name: 'cpu.cpu0_softnet_stat',
          type: 'cpu',
          family: 'softnet_stat',
          context: 'cpu.softnet_stat',
          title: 'CPU0 softnet_stat (cpu.cpu0_softnet_stat)',
          priority: 4101,
          plugin: 'proc.plugin',
          module: '/proc/net/softnet_stat',
          enabled: true,
          units: 'events/s',
          data_url: '/api/monitor/data?chart=cpu.cpu0_softnet_stat',
          chart_type: 'line',
          duration: 3996,
          first_entry: 1568002947,
          last_entry: 1568006943,
          update_every: 1,
          dimensions: {
            processed: { name: 'processed' },
            dropped: { name: 'dropped' },
            squeezed: { name: 'squeezed' },
            received_rps: { name: 'received_rps' },
            flow_limit_count: { name: 'flow_limit_count' }
          },
          green: null,
          red: null,
          alarms: {

          }
        },
        'system.softnet_stat': 		{
          id: 'system.softnet_stat',
          name: 'system.softnet_stat',
          type: 'system',
          family: 'softnet_stat',
          context: 'system.softnet_stat',
          title: 'System softnet_stat (system.softnet_stat)',
          priority: 955,
          plugin: 'proc.plugin',
          module: '/proc/net/softnet_stat',
          enabled: true,
          units: 'events/s',
          data_url: '/api/monitor/data?chart=system.softnet_stat',
          chart_type: 'line',
          duration: 3996,
          first_entry: 1568002947,
          last_entry: 1568006943,
          update_every: 1,
          dimensions: {
            processed: { name: 'processed' },
            dropped: { name: 'dropped' },
            squeezed: { name: 'squeezed' },
            received_rps: { name: 'received_rps' },
            flow_limit_count: { name: 'flow_limit_count' }
          },
          green: null,
          red: null,
          alarms: {
            '10min_netdev_budget_ran_outs': {
              id: 1555111231,
              status: 'WARNING',
              units: 'events',
              update_every: 60
            },
            '10min_netdev_backlog_exceeded': {
              id: 1555111230,
              status: 'CLEAR',
              units: 'packets',
              update_every: 60
            }
          }
        },
        'ipv6.ect': 		{
          id: 'ipv6.ect',
          name: 'ipv6.ect',
          type: 'ipv6',
          family: 'packets',
          context: 'ipv6.ect',
          title: 'IPv6 ECT Packets (ipv6.ect)',
          priority: 6210,
          plugin: 'proc.plugin',
          module: '/proc/net/snmp6',
          enabled: true,
          units: 'packets/s',
          data_url: '/api/monitor/data?chart=ipv6.ect',
          chart_type: 'line',
          duration: 3996,
          first_entry: 1568002947,
          last_entry: 1568006943,
          update_every: 1,
          dimensions: {
            InNoECTPkts: { name: 'InNoECTPkts' },
            InECT1Pkts: { name: 'InECT1Pkts' },
            InECT0Pkts: { name: 'InECT0Pkts' },
            InCEPkts: { name: 'InCEPkts' }
          },
          green: null,
          red: null,
          alarms: {

          }
        },
        'ipv6.icmptypes': 		{
          id: 'ipv6.icmptypes',
          name: 'ipv6.icmptypes',
          type: 'ipv6',
          family: 'icmp6',
          context: 'ipv6.icmptypes',
          title: 'IPv6 ICMP Types (ipv6.icmptypes)',
          priority: 6980,
          plugin: 'proc.plugin',
          module: '/proc/net/snmp6',
          enabled: true,
          units: 'messages/s',
          data_url: '/api/monitor/data?chart=ipv6.icmptypes',
          chart_type: 'line',
          duration: 3996,
          first_entry: 1568002947,
          last_entry: 1568006943,
          update_every: 1,
          dimensions: {
            InType1: { name: 'InType1' },
            InType128: { name: 'InType128' },
            InType129: { name: 'InType129' },
            InType136: { name: 'InType136' },
            OutType1: { name: 'OutType1' },
            OutType128: { name: 'OutType128' },
            OutType129: { name: 'OutType129' },
            OutType133: { name: 'OutType133' },
            OutType135: { name: 'OutType135' },
            OutType143: { name: 'OutType143' }
          },
          green: null,
          red: null,
          alarms: {

          }
        },
        'ipv6.icmpmldv2': 		{
          id: 'ipv6.icmpmldv2',
          name: 'ipv6.icmpmldv2',
          type: 'ipv6',
          family: 'icmp6',
          context: 'ipv6.icmpmldv2',
          title: 'IPv6 ICMP MLDv2 Reports (ipv6.icmpmldv2)',
          priority: 6970,
          plugin: 'proc.plugin',
          module: '/proc/net/snmp6',
          enabled: true,
          units: 'reports/s',
          data_url: '/api/monitor/data?chart=ipv6.icmpmldv2',
          chart_type: 'line',
          duration: 3996,
          first_entry: 1568002947,
          last_entry: 1568006943,
          update_every: 1,
          dimensions: {
            InMLDv2Reports: { name: 'received' },
            OutMLDv2Reports: { name: 'sent' }
          },
          green: null,
          red: null,
          alarms: {

          }
        },
        'ipv6.icmpneighbor': 		{
          id: 'ipv6.icmpneighbor',
          name: 'ipv6.icmpneighbor',
          type: 'ipv6',
          family: 'icmp6',
          context: 'ipv6.icmpneighbor',
          title: 'IPv6 Neighbor Messages (ipv6.icmpneighbor)',
          priority: 6960,
          plugin: 'proc.plugin',
          module: '/proc/net/snmp6',
          enabled: true,
          units: 'messages/s',
          data_url: '/api/monitor/data?chart=ipv6.icmpneighbor',
          chart_type: 'line',
          duration: 3996,
          first_entry: 1568002947,
          last_entry: 1568006943,
          update_every: 1,
          dimensions: {
            InSolicits: { name: 'InSolicits' },
            OutSolicits: { name: 'OutSolicits' },
            InAdvertisements: { name: 'InAdvertisements' },
            OutAdvertisements: { name: 'OutAdvertisements' }
          },
          green: null,
          red: null,
          alarms: {

          }
        },
        'ipv6.icmprouter': 		{
          id: 'ipv6.icmprouter',
          name: 'ipv6.icmprouter',
          type: 'ipv6',
          family: 'icmp6',
          context: 'ipv6.icmprouter',
          title: 'IPv6 Router Messages (ipv6.icmprouter)',
          priority: 6950,
          plugin: 'proc.plugin',
          module: '/proc/net/snmp6',
          enabled: true,
          units: 'messages/s',
          data_url: '/api/monitor/data?chart=ipv6.icmprouter',
          chart_type: 'line',
          duration: 3996,
          first_entry: 1568002947,
          last_entry: 1568006943,
          update_every: 1,
          dimensions: {
            InSolicits: { name: 'InSolicits' },
            OutSolicits: { name: 'OutSolicits' },
            InAdvertisements: { name: 'InAdvertisements' },
            OutAdvertisements: { name: 'OutAdvertisements' }
          },
          green: null,
          red: null,
          alarms: {

          }
        },
        'ipv6.icmp': 		{
          id: 'ipv6.icmp',
          name: 'ipv6.icmp',
          type: 'ipv6',
          family: 'icmp6',
          context: 'ipv6.icmp',
          title: 'IPv6 ICMP Messages (ipv6.icmp)',
          priority: 6900,
          plugin: 'proc.plugin',
          module: '/proc/net/snmp6',
          enabled: true,
          units: 'messages/s',
          data_url: '/api/monitor/data?chart=ipv6.icmp',
          chart_type: 'line',
          duration: 3996,
          first_entry: 1568002947,
          last_entry: 1568006943,
          update_every: 1,
          dimensions: {
            InMsgs: { name: 'received' },
            OutMsgs: { name: 'sent' }
          },
          green: null,
          red: null,
          alarms: {

          }
        },
        'ipv6.mcastpkts': 		{
          id: 'ipv6.mcastpkts',
          name: 'ipv6.mcastpkts',
          type: 'ipv6',
          family: 'multicast6',
          context: 'ipv6.mcastpkts',
          title: 'IPv6 Multicast Packets (ipv6.mcastpkts)',
          priority: 6851,
          plugin: 'proc.plugin',
          module: '/proc/net/snmp6',
          enabled: true,
          units: 'packets/s',
          data_url: '/api/monitor/data?chart=ipv6.mcastpkts',
          chart_type: 'line',
          duration: 3996,
          first_entry: 1568002947,
          last_entry: 1568006943,
          update_every: 1,
          dimensions: {
            InMcastPkts: { name: 'received' },
            OutMcastPkts: { name: 'sent' }
          },
          green: null,
          red: null,
          alarms: {

          }
        },
        'ipv6.mcast': 		{
          id: 'ipv6.mcast',
          name: 'ipv6.mcast',
          type: 'ipv6',
          family: 'multicast6',
          context: 'ipv6.mcast',
          title: 'IPv6 Multicast Bandwidth (ipv6.mcast)',
          priority: 6850,
          plugin: 'proc.plugin',
          module: '/proc/net/snmp6',
          enabled: true,
          units: 'kilobits/s',
          data_url: '/api/monitor/data?chart=ipv6.mcast',
          chart_type: 'area',
          duration: 3996,
          first_entry: 1568002947,
          last_entry: 1568006943,
          update_every: 1,
          dimensions: {
            InMcastOctets: { name: 'received' },
            OutMcastOctets: { name: 'sent' }
          },
          green: null,
          red: null,
          alarms: {

          }
        },
        'ipv6.packets': 		{
          id: 'ipv6.packets',
          name: 'ipv6.packets',
          type: 'ipv6',
          family: 'packets',
          context: 'ipv6.packets',
          title: 'IPv6 Packets (ipv6.packets)',
          priority: 6200,
          plugin: 'proc.plugin',
          module: '/proc/net/snmp6',
          enabled: true,
          units: 'packets/s',
          data_url: '/api/monitor/data?chart=ipv6.packets',
          chart_type: 'line',
          duration: 3996,
          first_entry: 1568002947,
          last_entry: 1568006943,
          update_every: 1,
          dimensions: {
            InReceives: { name: 'received' },
            OutRequests: { name: 'sent' },
            OutForwDatagrams: { name: 'forwarded' },
            InDelivers: { name: 'delivers' }
          },
          green: null,
          red: null,
          alarms: {

          }
        },
        'system.ipv6': 		{
          id: 'system.ipv6',
          name: 'system.ipv6',
          type: 'system',
          family: 'network',
          context: 'system.ipv6',
          title: 'IPv6 Bandwidth (system.ipv6)',
          priority: 502,
          plugin: 'proc.plugin',
          module: '/proc/net/snmp6',
          enabled: true,
          units: 'kilobits/s',
          data_url: '/api/monitor/data?chart=system.ipv6',
          chart_type: 'area',
          duration: 3996,
          first_entry: 1568002947,
          last_entry: 1568006943,
          update_every: 1,
          dimensions: {
            InOctets: { name: 'received' },
            OutOctets: { name: 'sent' }
          },
          green: null,
          red: null,
          alarms: {

          }
        },
        'ipv4.udppackets': 		{
          id: 'ipv4.udppackets',
          name: 'ipv4.udppackets',
          type: 'ipv4',
          family: 'udp',
          context: 'ipv4.udppackets',
          title: 'IPv4 UDP Packets (ipv4.udppackets)',
          priority: 5300,
          plugin: 'proc.plugin',
          module: '/proc/net/snmp',
          enabled: true,
          units: 'packets/s',
          data_url: '/api/monitor/data?chart=ipv4.udppackets',
          chart_type: 'line',
          duration: 3996,
          first_entry: 1568002947,
          last_entry: 1568006943,
          update_every: 1,
          dimensions: {
            InDatagrams: { name: 'received' },
            OutDatagrams: { name: 'sent' }
          },
          green: null,
          red: null,
          alarms: {

          }
        },
        'ipv4.tcphandshake': 		{
          id: 'ipv4.tcphandshake',
          name: 'ipv4.tcphandshake',
          type: 'ipv4',
          family: 'tcp',
          context: 'ipv4.tcphandshake',
          title: 'IPv4 TCP Handshake Issues (ipv4.tcphandshake)',
          priority: 5230,
          plugin: 'proc.plugin',
          module: '/proc/net/snmp',
          enabled: true,
          units: 'events/s',
          data_url: '/api/monitor/data?chart=ipv4.tcphandshake',
          chart_type: 'line',
          duration: 3996,
          first_entry: 1568002947,
          last_entry: 1568006943,
          update_every: 1,
          dimensions: {
            EstabResets: { name: 'EstabResets' },
            OutRsts: { name: 'OutRsts' },
            AttemptFails: { name: 'AttemptFails' },
            TCPSynRetrans: { name: 'SynRetrans' }
          },
          green: null,
          red: null,
          alarms: {
            '10s_ipv4_tcp_resets_received': {
              id: 1555111229,
              status: 'CLEAR',
              units: 'tcp resets/s',
              update_every: 10
            },
            '1m_ipv4_tcp_resets_received': {
              id: 1555111228,
              status: 'UNDEFINED',
              units: 'tcp resets/s',
              update_every: 10
            },
            '10s_ipv4_tcp_resets_sent': {
              id: 1555111227,
              status: 'CLEAR',
              units: 'tcp resets/s',
              update_every: 10
            },
            '1m_ipv4_tcp_resets_sent': {
              id: 1555111226,
              status: 'UNDEFINED',
              units: 'tcp resets/s',
              update_every: 10
            },
            ipv4_tcphandshake_last_collected_secs: {
              id: 1555111225,
              status: 'CLEAR',
              units: 'seconds ago',
              update_every: 10
            }
          }
        },
        'ipv4.tcpopens': 		{
          id: 'ipv4.tcpopens',
          name: 'ipv4.tcpopens',
          type: 'ipv4',
          family: 'tcp',
          context: 'ipv4.tcpopens',
          title: 'IPv4 TCP Opens (ipv4.tcpopens)',
          priority: 5205,
          plugin: 'proc.plugin',
          module: '/proc/net/snmp',
          enabled: true,
          units: 'connections/s',
          data_url: '/api/monitor/data?chart=ipv4.tcpopens',
          chart_type: 'line',
          duration: 3996,
          first_entry: 1568002947,
          last_entry: 1568006943,
          update_every: 1,
          dimensions: {
            ActiveOpens: { name: 'active' },
            PassiveOpens: { name: 'passive' }
          },
          green: null,
          red: null,
          alarms: {

          }
        },
        'ipv4.tcppackets': 		{
          id: 'ipv4.tcppackets',
          name: 'ipv4.tcppackets',
          type: 'ipv4',
          family: 'tcp',
          context: 'ipv4.tcppackets',
          title: 'IPv4 TCP Packets (ipv4.tcppackets)',
          priority: 5204,
          plugin: 'proc.plugin',
          module: '/proc/net/snmp',
          enabled: true,
          units: 'packets/s',
          data_url: '/api/monitor/data?chart=ipv4.tcppackets',
          chart_type: 'line',
          duration: 3996,
          first_entry: 1568002947,
          last_entry: 1568006943,
          update_every: 1,
          dimensions: {
            InSegs: { name: 'received' },
            OutSegs: { name: 'sent' }
          },
          green: null,
          red: null,
          alarms: {

          }
        },
        'ipv4.packets': 		{
          id: 'ipv4.packets',
          name: 'ipv4.packets',
          type: 'ipv4',
          family: 'packets',
          context: 'ipv4.packets',
          title: 'IPv4 Packets (ipv4.packets)',
          priority: 5130,
          plugin: 'proc.plugin',
          module: '/proc/net/snmp',
          enabled: true,
          units: 'packets/s',
          data_url: '/api/monitor/data?chart=ipv4.packets',
          chart_type: 'line',
          duration: 3996,
          first_entry: 1568002947,
          last_entry: 1568006943,
          update_every: 1,
          dimensions: {
            InReceives: { name: 'received' },
            OutRequests: { name: 'sent' },
            ForwDatagrams: { name: 'forwarded' },
            InDelivers: { name: 'delivered' }
          },
          green: null,
          red: null,
          alarms: {

          }
        },
        'ip.ecnpkts': 		{
          id: 'ip.ecnpkts',
          name: 'ip.ecnpkts',
          type: 'ip',
          family: 'ecn',
          context: 'ip.ecnpkts',
          title: 'IP ECN Statistics (ip.ecnpkts)',
          priority: 4700,
          plugin: 'proc.plugin',
          module: '/proc/net/netstat',
          enabled: true,
          units: 'packets/s',
          data_url: '/api/monitor/data?chart=ip.ecnpkts',
          chart_type: 'line',
          duration: 3996,
          first_entry: 1568002947,
          last_entry: 1568006943,
          update_every: 1,
          dimensions: {
            InCEPkts: { name: 'CEP' },
            InNoECTPkts: { name: 'NoECTP' },
            InECT0Pkts: { name: 'ECTP0' },
            InECT1Pkts: { name: 'ECTP1' }
          },
          green: null,
          red: null,
          alarms: {

          }
        },
        'system.ip': 		{
          id: 'system.ip',
          name: 'system.ip',
          type: 'system',
          family: 'network',
          context: 'system.ip',
          title: 'IP Bandwidth (system.ip)',
          priority: 501,
          plugin: 'proc.plugin',
          module: '/proc/net/netstat',
          enabled: true,
          units: 'kilobits/s',
          data_url: '/api/monitor/data?chart=system.ip',
          chart_type: 'area',
          duration: 3996,
          first_entry: 1568002947,
          last_entry: 1568006943,
          update_every: 1,
          dimensions: {
            InOctets: { name: 'received' },
            OutOctets: { name: 'sent' }
          },
          green: null,
          red: null,
          alarms: {

          }
        },
        'ip.tcpconnaborts': 		{
          id: 'ip.tcpconnaborts',
          name: 'ip.tcpconnaborts',
          type: 'ip',
          family: 'tcp',
          context: 'ip.tcpconnaborts',
          title: 'TCP Connection Aborts (ip.tcpconnaborts)',
          priority: 4210,
          plugin: 'proc.plugin',
          module: '/proc/net/netstat',
          enabled: true,
          units: 'connections/s',
          data_url: '/api/monitor/data?chart=ip.tcpconnaborts',
          chart_type: 'line',
          duration: 3996,
          first_entry: 1568002947,
          last_entry: 1568006943,
          update_every: 1,
          dimensions: {
            TCPAbortOnData: { name: 'baddata' },
            TCPAbortOnClose: { name: 'userclosed' },
            TCPAbortOnMemory: { name: 'nomemory' },
            TCPAbortOnTimeout: { name: 'timeout' },
            TCPAbortOnLinger: { name: 'linger' },
            TCPAbortFailed: { name: 'failed' }
          },
          green: null,
          red: null,
          alarms: {

          }
        },
        'ipv6.sockstat6_udp_sockets': 		{
          id: 'ipv6.sockstat6_udp_sockets',
          name: 'ipv6.sockstat6_udp_sockets',
          type: 'ipv6',
          family: 'udp6',
          context: 'ipv6.sockstat6_udp_sockets',
          title: 'IPv6 UDP Sockets (ipv6.sockstat6_udp_sockets)',
          priority: 6600,
          plugin: 'proc.plugin',
          module: '/proc/net/sockstat6',
          enabled: true,
          units: 'sockets',
          data_url: '/api/monitor/data?chart=ipv6.sockstat6_udp_sockets',
          chart_type: 'line',
          duration: 3996,
          first_entry: 1568002947,
          last_entry: 1568006943,
          update_every: 1,
          dimensions: {
            inuse: { name: 'inuse' }
          },
          green: null,
          red: null,
          alarms: {

          }
        },
        'ipv6.sockstat6_tcp_sockets': 		{
          id: 'ipv6.sockstat6_tcp_sockets',
          name: 'ipv6.sockstat6_tcp_sockets',
          type: 'ipv6',
          family: 'tcp6',
          context: 'ipv6.sockstat6_tcp_sockets',
          title: 'IPv6 TCP Sockets (ipv6.sockstat6_tcp_sockets)',
          priority: 6500,
          plugin: 'proc.plugin',
          module: '/proc/net/sockstat6',
          enabled: true,
          units: 'sockets',
          data_url: '/api/monitor/data?chart=ipv6.sockstat6_tcp_sockets',
          chart_type: 'line',
          duration: 3996,
          first_entry: 1568002947,
          last_entry: 1568006943,
          update_every: 1,
          dimensions: {
            inuse: { name: 'inuse' }
          },
          green: null,
          red: null,
          alarms: {

          }
        },
        'ipv4.sockstat_udp_mem': 		{
          id: 'ipv4.sockstat_udp_mem',
          name: 'ipv4.sockstat_udp_mem',
          type: 'ipv4',
          family: 'udp',
          context: 'ipv4.sockstat_udp_mem',
          title: 'IPv4 UDP Sockets Memory (ipv4.sockstat_udp_mem)',
          priority: 5390,
          plugin: 'proc.plugin',
          module: '/proc/net/sockstat',
          enabled: true,
          units: 'KiB',
          data_url: '/api/monitor/data?chart=ipv4.sockstat_udp_mem',
          chart_type: 'area',
          duration: 3996,
          first_entry: 1568002947,
          last_entry: 1568006943,
          update_every: 1,
          dimensions: {
            mem: { name: 'mem' }
          },
          green: null,
          red: null,
          alarms: {

          }
        },
        'ipv4.sockstat_udp_sockets': 		{
          id: 'ipv4.sockstat_udp_sockets',
          name: 'ipv4.sockstat_udp_sockets',
          type: 'ipv4',
          family: 'udp',
          context: 'ipv4.sockstat_udp_sockets',
          title: 'IPv4 UDP Sockets (ipv4.sockstat_udp_sockets)',
          priority: 5300,
          plugin: 'proc.plugin',
          module: '/proc/net/sockstat',
          enabled: true,
          units: 'sockets',
          data_url: '/api/monitor/data?chart=ipv4.sockstat_udp_sockets',
          chart_type: 'line',
          duration: 3996,
          first_entry: 1568002947,
          last_entry: 1568006943,
          update_every: 1,
          dimensions: {
            inuse: { name: 'inuse' }
          },
          green: null,
          red: null,
          alarms: {

          }
        },
        'ipv4.sockstat_tcp_mem': 		{
          id: 'ipv4.sockstat_tcp_mem',
          name: 'ipv4.sockstat_tcp_mem',
          type: 'ipv4',
          family: 'tcp',
          context: 'ipv4.sockstat_tcp_mem',
          title: 'IPv4 TCP Sockets Memory (ipv4.sockstat_tcp_mem)',
          priority: 5290,
          plugin: 'proc.plugin',
          module: '/proc/net/sockstat',
          enabled: true,
          units: 'KiB',
          data_url: '/api/monitor/data?chart=ipv4.sockstat_tcp_mem',
          chart_type: 'area',
          duration: 3996,
          first_entry: 1568002947,
          last_entry: 1568006943,
          update_every: 1,
          dimensions: {
            mem: { name: 'mem' }
          },
          green: null,
          red: null,
          alarms: {
            tcp_memory: {
              id: 1555111263,
              status: 'CLEAR',
              units: '%',
              update_every: 10
            }
          }
        },
        'ipv4.sockstat_tcp_sockets': 		{
          id: 'ipv4.sockstat_tcp_sockets',
          name: 'ipv4.sockstat_tcp_sockets',
          type: 'ipv4',
          family: 'tcp',
          context: 'ipv4.sockstat_tcp_sockets',
          title: 'IPv4 TCP Sockets (ipv4.sockstat_tcp_sockets)',
          priority: 5201,
          plugin: 'proc.plugin',
          module: '/proc/net/sockstat',
          enabled: true,
          units: 'sockets',
          data_url: '/api/monitor/data?chart=ipv4.sockstat_tcp_sockets',
          chart_type: 'line',
          duration: 3996,
          first_entry: 1568002947,
          last_entry: 1568006943,
          update_every: 1,
          dimensions: {
            alloc: { name: 'alloc' },
            orphan: { name: 'orphan' },
            inuse: { name: 'inuse' },
            timewait: { name: 'timewait' }
          },
          green: null,
          red: null,
          alarms: {
            tcp_orphans: {
              id: 1555111249,
              status: 'CLEAR',
              units: '%',
              update_every: 10
            }
          }
        },
        'ipv4.sockstat_sockets': 		{
          id: 'ipv4.sockstat_sockets',
          name: 'ipv4.sockstat_sockets',
          type: 'ipv4',
          family: 'sockets',
          context: 'ipv4.sockstat_sockets',
          title: 'IPv4 Sockets Used (ipv4.sockstat_sockets)',
          priority: 5100,
          plugin: 'proc.plugin',
          module: '/proc/net/sockstat',
          enabled: true,
          units: 'sockets',
          data_url: '/api/monitor/data?chart=ipv4.sockstat_sockets',
          chart_type: 'line',
          duration: 3996,
          first_entry: 1568002947,
          last_entry: 1568006943,
          update_every: 1,
          dimensions: {
            used: { name: 'used' }
          },
          green: null,
          red: null,
          alarms: {

          }
        },
        'net_packets.eth0': 		{
          id: 'net_packets.eth0',
          name: 'net_packets.eth0',
          type: 'net_packets',
          family: 'eth0',
          context: 'net.packets',
          title: 'Packets (net_packets.eth0)',
          priority: 7001,
          plugin: 'proc.plugin',
          module: '/proc/net/dev',
          enabled: true,
          units: 'packets/s',
          data_url: '/api/monitor/data?chart=net_packets.eth0',
          chart_type: 'line',
          duration: 3996,
          first_entry: 1568002947,
          last_entry: 1568006943,
          update_every: 1,
          dimensions: {
            received: { name: 'received' },
            sent: { name: 'sent' },
            multicast: { name: 'multicast' }
          },
          green: null,
          red: null,
          alarms: {
            '10s_received_packets_storm': {
              id: 1555111304,
              status: 'CLEAR',
              units: '%',
              update_every: 10
            },
            '1m_received_packets_rate': {
              id: 1555111303,
              status: 'UNDEFINED',
              units: 'packets',
              update_every: 10
            },
            outbound_packets_dropped_ratio: {
              id: 1555111302,
              status: 'CLEAR',
              units: '%',
              update_every: 60
            },
            inbound_packets_dropped_ratio: {
              id: 1555111301,
              status: 'CLEAR',
              units: '%',
              update_every: 60
            }
          }
        },
        'net.eth0': 		{
          id: 'net.eth0',
          name: 'net.eth0',
          type: 'net',
          family: 'eth0',
          context: 'net.net',
          title: 'Bandwidth (net.eth0)',
          priority: 7000,
          plugin: 'proc.plugin',
          module: '/proc/net/dev',
          enabled: true,
          units: 'kilobits/s',
          data_url: '/api/monitor/data?chart=net.eth0',
          chart_type: 'area',
          duration: 3996,
          first_entry: 1568002947,
          last_entry: 1568006943,
          update_every: 1,
          dimensions: {
            received: { name: 'received' },
            sent: { name: 'sent' }
          },
          green: null,
          red: null,
          alarms: {
            '1m_sent_traffic_overflow': {
              id: 1555111300,
              status: 'CLEAR',
              units: '%',
              update_every: 10
            },
            '1m_received_traffic_overflow': {
              id: 1555111299,
              status: 'CLEAR',
              units: '%',
              update_every: 10
            },
            interface_speed: {
              id: 1555111298,
              status: 'UNDEFINED',
              units: 'Mbit',
              update_every: 10
            }
          }
        },
        'mem.transparent_hugepages': 		{
          id: 'mem.transparent_hugepages',
          name: 'mem.transparent_hugepages',
          type: 'mem',
          family: 'hugepages',
          context: 'mem.transparent_hugepages',
          title: 'Transparent HugePages Memory (mem.transparent_hugepages)',
          priority: 1250,
          plugin: 'proc.plugin',
          module: '/proc/meminfo',
          enabled: true,
          units: 'MiB',
          data_url: '/api/monitor/data?chart=mem.transparent_hugepages',
          chart_type: 'stacked',
          duration: 3996,
          first_entry: 1568002947,
          last_entry: 1568006943,
          update_every: 1,
          dimensions: {
            anonymous: { name: 'anonymous' },
            shmem: { name: 'shmem' }
          },
          green: null,
          red: null,
          alarms: {

          }
        },
        'mem.slab': 		{
          id: 'mem.slab',
          name: 'mem.slab',
          type: 'mem',
          family: 'slab',
          context: 'mem.slab',
          title: 'Reclaimable Kernel Memory (mem.slab)',
          priority: 1200,
          plugin: 'proc.plugin',
          module: '/proc/meminfo',
          enabled: true,
          units: 'MiB',
          data_url: '/api/monitor/data?chart=mem.slab',
          chart_type: 'stacked',
          duration: 3996,
          first_entry: 1568002947,
          last_entry: 1568006943,
          update_every: 1,
          dimensions: {
            reclaimable: { name: 'reclaimable' },
            unreclaimable: { name: 'unreclaimable' }
          },
          green: null,
          red: null,
          alarms: {

          }
        },
        'mem.kernel': 		{
          id: 'mem.kernel',
          name: 'mem.kernel',
          type: 'mem',
          family: 'kernel',
          context: 'mem.kernel',
          title: 'Memory Used by Kernel (mem.kernel)',
          priority: 1101,
          plugin: 'proc.plugin',
          module: '/proc/meminfo',
          enabled: true,
          units: 'MiB',
          data_url: '/api/monitor/data?chart=mem.kernel',
          chart_type: 'stacked',
          duration: 3996,
          first_entry: 1568002947,
          last_entry: 1568006943,
          update_every: 1,
          dimensions: {
            Slab: { name: 'Slab' },
            KernelStack: { name: 'KernelStack' },
            PageTables: { name: 'PageTables' },
            VmallocUsed: { name: 'VmallocUsed' }
          },
          green: null,
          red: null,
          alarms: {

          }
        },
        'mem.writeback': 		{
          id: 'mem.writeback',
          name: 'mem.writeback',
          type: 'mem',
          family: 'kernel',
          context: 'mem.writeback',
          title: 'Writeback Memory (mem.writeback)',
          priority: 1100,
          plugin: 'proc.plugin',
          module: '/proc/meminfo',
          enabled: true,
          units: 'MiB',
          data_url: '/api/monitor/data?chart=mem.writeback',
          chart_type: 'line',
          duration: 3996,
          first_entry: 1568002947,
          last_entry: 1568006943,
          update_every: 1,
          dimensions: {
            Dirty: { name: 'Dirty' },
            Writeback: { name: 'Writeback' },
            FuseWriteback: { name: 'FuseWriteback' },
            NfsWriteback: { name: 'NfsWriteback' },
            Bounce: { name: 'Bounce' }
          },
          green: null,
          red: null,
          alarms: {

          }
        },
        'mem.committed': 		{
          id: 'mem.committed',
          name: 'mem.committed',
          type: 'mem',
          family: 'system',
          context: 'mem.committed',
          title: 'Committed (Allocated) Memory (mem.committed)',
          priority: 1020,
          plugin: 'proc.plugin',
          module: '/proc/meminfo',
          enabled: true,
          units: 'MiB',
          data_url: '/api/monitor/data?chart=mem.committed',
          chart_type: 'area',
          duration: 3996,
          first_entry: 1568002947,
          last_entry: 1568006943,
          update_every: 1,
          dimensions: {
            Committed_AS: { name: 'Committed_AS' }
          },
          green: null,
          red: null,
          alarms: {

          }
        },
        'mem.available': 		{
          id: 'mem.available',
          name: 'mem.available',
          type: 'mem',
          family: 'system',
          context: 'mem.available',
          title: 'Available RAM for applications (mem.available)',
          priority: 1010,
          plugin: 'proc.plugin',
          module: '/proc/meminfo',
          enabled: true,
          units: 'MiB',
          data_url: '/api/monitor/data?chart=mem.available',
          chart_type: 'area',
          duration: 3996,
          first_entry: 1568002947,
          last_entry: 1568006943,
          update_every: 1,
          dimensions: {
            MemAvailable: { name: 'avail' }
          },
          green: null,
          red: null,
          alarms: {
            ram_available: {
              id: 1555111257,
              status: 'CLEAR',
              units: '%',
              update_every: 10
            }
          }
        },
        'system.ram': 		{
          id: 'system.ram',
          name: 'system.ram',
          type: 'system',
          family: 'ram',
          context: 'system.ram',
          title: 'System RAM (system.ram)',
          priority: 200,
          plugin: 'proc.plugin',
          module: '/proc/meminfo',
          enabled: true,
          units: 'MiB',
          data_url: '/api/monitor/data?chart=system.ram',
          chart_type: 'stacked',
          duration: 3996,
          first_entry: 1568002947,
          last_entry: 1568006943,
          update_every: 1,
          dimensions: {
            free: { name: 'free' },
            used: { name: 'used' },
            cached: { name: 'cached' },
            buffers: { name: 'buffers' }
          },
          green: null,
          red: null,
          alarms: {
            ram_in_use: {
              id: 1555111256,
              status: 'CLEAR',
              units: '%',
              update_every: 10
            },
            used_ram_to_ignore: {
              id: 1555111255,
              status: 'UNDEFINED',
              units: 'MiB',
              update_every: 10
            }
          }
        },
        'mem.pgfaults': 		{
          id: 'mem.pgfaults',
          name: 'mem.pgfaults',
          type: 'mem',
          family: 'system',
          context: 'mem.pgfaults',
          title: 'Memory Page Faults (mem.pgfaults)',
          priority: 1030,
          plugin: 'proc.plugin',
          module: '/proc/vmstat',
          enabled: true,
          units: 'faults/s',
          data_url: '/api/monitor/data?chart=mem.pgfaults',
          chart_type: 'line',
          duration: 3996,
          first_entry: 1568002947,
          last_entry: 1568006943,
          update_every: 1,
          dimensions: {
            minor: { name: 'minor' },
            major: { name: 'major' }
          },
          green: null,
          red: null,
          alarms: {

          }
        },
        'system.pgpgio': 		{
          id: 'system.pgpgio',
          name: 'system.pgpgio',
          type: 'system',
          family: 'disk',
          context: 'system.pgpgio',
          title: 'Memory Paged from/to disk (system.pgpgio)',
          priority: 151,
          plugin: 'proc.plugin',
          module: '/proc/vmstat',
          enabled: true,
          units: 'KiB/s',
          data_url: '/api/monitor/data?chart=system.pgpgio',
          chart_type: 'area',
          duration: 3996,
          first_entry: 1568002947,
          last_entry: 1568006943,
          update_every: 1,
          dimensions: {
            in: { name: 'in' },
            out: { name: 'out' }
          },
          green: null,
          red: null,
          alarms: {

          }
        },
        'cpu.cpu1_softirqs': 		{
          id: 'cpu.cpu1_softirqs',
          name: 'cpu.cpu1_softirqs',
          type: 'cpu',
          family: 'softirqs',
          context: 'cpu.softirqs',
          title: 'CPU1 softirqs (cpu.cpu1_softirqs)',
          priority: 3001,
          plugin: 'proc.plugin',
          module: '/proc/softirqs',
          enabled: true,
          units: 'softirqs/s',
          data_url: '/api/monitor/data?chart=cpu.cpu1_softirqs',
          chart_type: 'stacked',
          duration: 3996,
          first_entry: 1568002947,
          last_entry: 1568006943,
          update_every: 1,
          dimensions: {
            HI: { name: 'HI' },
            TIMER: { name: 'TIMER' },
            NET_TX: { name: 'NET_TX' },
            NET_RX: { name: 'NET_RX' },
            TASKLET: { name: 'TASKLET' },
            SCHED: { name: 'SCHED' },
            HRTIMER: { name: 'HRTIMER' },
            RCU: { name: 'RCU' }
          },
          green: null,
          red: null,
          alarms: {

          }
        },
        'cpu.cpu0_softirqs': 		{
          id: 'cpu.cpu0_softirqs',
          name: 'cpu.cpu0_softirqs',
          type: 'cpu',
          family: 'softirqs',
          context: 'cpu.softirqs',
          title: 'CPU0 softirqs (cpu.cpu0_softirqs)',
          priority: 3000,
          plugin: 'proc.plugin',
          module: '/proc/softirqs',
          enabled: true,
          units: 'softirqs/s',
          data_url: '/api/monitor/data?chart=cpu.cpu0_softirqs',
          chart_type: 'stacked',
          duration: 3996,
          first_entry: 1568002947,
          last_entry: 1568006943,
          update_every: 1,
          dimensions: {
            TIMER: { name: 'TIMER' },
            NET_TX: { name: 'NET_TX' },
            NET_RX: { name: 'NET_RX' },
            TASKLET: { name: 'TASKLET' },
            SCHED: { name: 'SCHED' },
            HRTIMER: { name: 'HRTIMER' },
            RCU: { name: 'RCU' }
          },
          green: null,
          red: null,
          alarms: {

          }
        },
        'system.softirqs': 		{
          id: 'system.softirqs',
          name: 'system.softirqs',
          type: 'system',
          family: 'softirqs',
          context: 'system.softirqs',
          title: 'System softirqs (system.softirqs)',
          priority: 950,
          plugin: 'proc.plugin',
          module: '/proc/softirqs',
          enabled: true,
          units: 'softirqs/s',
          data_url: '/api/monitor/data?chart=system.softirqs',
          chart_type: 'stacked',
          duration: 3996,
          first_entry: 1568002947,
          last_entry: 1568006943,
          update_every: 1,
          dimensions: {
            HI: { name: 'HI' },
            TIMER: { name: 'TIMER' },
            NET_TX: { name: 'NET_TX' },
            NET_RX: { name: 'NET_RX' },
            TASKLET: { name: 'TASKLET' },
            SCHED: { name: 'SCHED' },
            HRTIMER: { name: 'HRTIMER' },
            RCU: { name: 'RCU' }
          },
          green: null,
          red: null,
          alarms: {

          }
        },
        'cpu.cpu1_interrupts': 		{
          id: 'cpu.cpu1_interrupts',
          name: 'cpu.cpu1_interrupts',
          type: 'cpu',
          family: 'interrupts',
          context: 'cpu.interrupts',
          title: 'CPU1 Interrupts (cpu.cpu1_interrupts)',
          priority: 1101,
          plugin: 'proc.plugin',
          module: '/proc/interrupts',
          enabled: true,
          units: 'interrupts/s',
          data_url: '/api/monitor/data?chart=cpu.cpu1_interrupts',
          chart_type: 'stacked',
          duration: 3996,
          first_entry: 1568002947,
          last_entry: 1568006943,
          update_every: 1,
          dimensions: {
            1: { name: 'i8042_1' },
            4: { name: 'ttyS0_4' },
            11: { name: 'qxl_11' },
            12: { name: 'i8042_12' },
            25: { name: 'virtio0-input.0_25' },
            26: { name: 'virtio0-output.0_26' },
            28: { name: 'virtio1-input.0_28' },
            29: { name: 'virtio1-output.0_29' },
            LOC: { name: 'LOC' },
            RES: { name: 'RES' },
            CAL: { name: 'CAL' },
            TLB: { name: 'TLB' },
            MCP: { name: 'MCP' },
            39: { name: 'virtio6-virtqueues_39' }
          },
          green: null,
          red: null,
          alarms: {

          }
        },
        'cpu.cpu0_interrupts': 		{
          id: 'cpu.cpu0_interrupts',
          name: 'cpu.cpu0_interrupts',
          type: 'cpu',
          family: 'interrupts',
          context: 'cpu.interrupts',
          title: 'CPU0 Interrupts (cpu.cpu0_interrupts)',
          priority: 1100,
          plugin: 'proc.plugin',
          module: '/proc/interrupts',
          enabled: true,
          units: 'interrupts/s',
          data_url: '/api/monitor/data?chart=cpu.cpu0_interrupts',
          chart_type: 'stacked',
          duration: 3996,
          first_entry: 1568002947,
          last_entry: 1568006943,
          update_every: 1,
          dimensions: {
            0: { name: 'timer_0' },
            6: { name: 'floppy_6' },
            8: { name: 'rtc0_8' },
            12: { name: 'i8042_12' },
            25: { name: 'virtio0-input.0_25' },
            29: { name: 'virtio1-output.0_29' },
            32: { name: 'virtio2-event_32' },
            33: { name: 'virtio2-request_33' },
            35: { name: 'virtio3-req.0_35' },
            37: { name: 'virtio4-req.0_37' },
            LOC: { name: 'LOC' },
            IWI: { name: 'IWI' },
            RES: { name: 'RES' },
            CAL: { name: 'CAL' },
            TLB: { name: 'TLB' },
            MCP: { name: 'MCP' }
          },
          green: null,
          red: null,
          alarms: {

          }
        },
        'system.interrupts': 		{
          id: 'system.interrupts',
          name: 'system.interrupts',
          type: 'system',
          family: 'interrupts',
          context: 'system.interrupts',
          title: 'System interrupts (system.interrupts)',
          priority: 1000,
          plugin: 'proc.plugin',
          module: '/proc/interrupts',
          enabled: true,
          units: 'interrupts/s',
          data_url: '/api/monitor/data?chart=system.interrupts',
          chart_type: 'stacked',
          duration: 3996,
          first_entry: 1568002947,
          last_entry: 1568006943,
          update_every: 1,
          dimensions: {
            0: { name: 'timer_0' },
            1: { name: 'i8042_1' },
            4: { name: 'ttyS0_4' },
            6: { name: 'floppy_6' },
            8: { name: 'rtc0_8' },
            11: { name: 'qxl_11' },
            12: { name: 'i8042_12' },
            25: { name: 'virtio0-input.0_25' },
            26: { name: 'virtio0-output.0_26' },
            28: { name: 'virtio1-input.0_28' },
            29: { name: 'virtio1-output.0_29' },
            32: { name: 'virtio2-event_32' },
            33: { name: 'virtio2-request_33' },
            35: { name: 'virtio3-req.0_35' },
            37: { name: 'virtio4-req.0_37' },
            LOC: { name: 'LOC' },
            IWI: { name: 'IWI' },
            RES: { name: 'RES' },
            CAL: { name: 'CAL' },
            TLB: { name: 'TLB' },
            MCP: { name: 'MCP' },
            39: { name: 'virtio6-virtqueues_39' }
          },
          green: null,
          red: null,
          alarms: {

          }
        },
        'system.entropy': 		{
          id: 'system.entropy',
          name: 'system.entropy',
          type: 'system',
          family: 'entropy',
          context: 'system.entropy',
          title: 'Available Entropy (system.entropy)',
          priority: 1000,
          plugin: 'proc.plugin',
          module: '/proc/sys/kernel/random/entropy_avail',
          enabled: true,
          units: 'entropy',
          data_url: '/api/monitor/data?chart=system.entropy',
          chart_type: 'line',
          duration: 3996,
          first_entry: 1568002947,
          last_entry: 1568006943,
          update_every: 1,
          dimensions: {
            entropy: { name: 'entropy' }
          },
          green: null,
          red: null,
          alarms: {
            lowest_entropy: {
              id: 1555111258,
              status: 'CLEAR',
              units: 'entries',
              update_every: 300
            }
          }
        },
        'system.active_processes': 		{
          id: 'system.active_processes',
          name: 'system.active_processes',
          type: 'system',
          family: 'processes',
          context: 'system.active_processes',
          title: 'System Active Processes (system.active_processes)',
          priority: 750,
          plugin: 'proc.plugin',
          module: '/proc/loadavg',
          enabled: true,
          units: 'processes',
          data_url: '/api/monitor/data?chart=system.active_processes',
          chart_type: 'line',
          duration: 3996,
          first_entry: 1568002947,
          last_entry: 1568006943,
          update_every: 1,
          dimensions: {
            active: { name: 'active' }
          },
          green: null,
          red: null,
          alarms: {

          }
        },
        'netdata.plugin_diskspace_dt': 		{
          id: 'netdata.plugin_diskspace_dt',
          name: 'netdata.plugin_diskspace_dt',
          type: 'netdata',
          family: 'diskspace',
          context: 'netdata.plugin_diskspace_dt',
          title: 'NetData Disk Space Plugin Duration (netdata.plugin_diskspace_dt)',
          priority: 132021,
          plugin: 'diskspace.plugin',
          module: '',
          enabled: true,
          units: 'milliseconds/run',
          data_url: '/api/monitor/data?chart=netdata.plugin_diskspace_dt',
          chart_type: 'area',
          duration: 3996,
          first_entry: 1568002947,
          last_entry: 1568006943,
          update_every: 1,
          dimensions: {
            duration: { name: 'duration' }
          },
          green: null,
          red: null,
          alarms: {

          }
        },
        'system.load': 		{
          id: 'system.load',
          name: 'system.load',
          type: 'system',
          family: 'load',
          context: 'system.load',
          title: 'System Load Average (system.load)',
          priority: 100,
          plugin: 'proc.plugin',
          module: '/proc/loadavg',
          enabled: true,
          units: 'load',
          data_url: '/api/monitor/data?chart=system.load',
          chart_type: 'line',
          duration: 19980,
          first_entry: 1567986960,
          last_entry: 1568006940,
          update_every: 5,
          dimensions: {
            load1: { name: 'load1' },
            load5: { name: 'load5' },
            load15: { name: 'load15' }
          },
          green: null,
          red: null,
          alarms: {
            load_average_1: {
              id: 1555111245,
              status: 'CLEAR',
              units: 'load',
              update_every: 60
            },
            load_average_5: {
              id: 1555111244,
              status: 'CLEAR',
              units: 'load',
              update_every: 60
            },
            load_average_15: {
              id: 1555111243,
              status: 'CLEAR',
              units: 'load',
              update_every: 60
            },
            load_trigger: {
              id: 1555111242,
              status: 'UNDEFINED',
              units: 'cpus',
              update_every: 60
            }
          }
        },
        'netdata.plugin_diskspace': 		{
          id: 'netdata.plugin_diskspace',
          name: 'netdata.plugin_diskspace',
          type: 'netdata',
          family: 'diskspace',
          context: 'netdata.plugin_diskspace',
          title: 'NetData Disk Space Plugin CPU usage (netdata.plugin_diskspace)',
          priority: 132020,
          plugin: 'diskspace.plugin',
          module: '',
          enabled: true,
          units: 'milliseconds/s',
          data_url: '/api/monitor/data?chart=netdata.plugin_diskspace',
          chart_type: 'stacked',
          duration: 3996,
          first_entry: 1568002947,
          last_entry: 1568006943,
          update_every: 1,
          dimensions: {
            user: { name: 'user' },
            system: { name: 'system' }
          },
          green: null,
          red: null,
          alarms: {

          }
        },
        'system.uptime': 		{
          id: 'system.uptime',
          name: 'system.uptime',
          type: 'system',
          family: 'uptime',
          context: 'system.uptime',
          title: 'System Uptime (system.uptime)',
          priority: 1000,
          plugin: 'proc.plugin',
          module: '/proc/uptime',
          enabled: true,
          units: 'seconds',
          data_url: '/api/monitor/data?chart=system.uptime',
          chart_type: 'line',
          duration: 3996,
          first_entry: 1568002947,
          last_entry: 1568006943,
          update_every: 1,
          dimensions: {
            uptime: { name: 'uptime' }
          },
          green: null,
          red: null,
          alarms: {

          }
        },
        'cpu.cpu1_cpuidle': 		{
          id: 'cpu.cpu1_cpuidle',
          name: 'cpu.cpu1_cpuidle',
          type: 'cpu',
          family: 'cpuidle',
          context: 'cpuidle.cpuidle',
          title: 'C-state residency time (cpu.cpu1_cpuidle)',
          priority: 6001,
          plugin: 'proc.plugin',
          module: '/proc/stat',
          enabled: true,
          units: 'percentage',
          data_url: '/api/monitor/data?chart=cpu.cpu1_cpuidle',
          chart_type: 'stacked',
          duration: 3996,
          first_entry: 1568002947,
          last_entry: 1568006943,
          update_every: 1,
          dimensions: {
            cpu1_active_time: { name: 'C0 (active)' }
          },
          green: null,
          red: null,
          alarms: {

          }
        },
        'disk_inodes._var_lib_netdata': 		{
          id: 'disk_inodes._var_lib_netdata',
          name: 'disk_inodes._var_lib_netdata',
          type: 'disk_inodes',
          family: '/var/lib/netdata',
          context: 'disk.inodes',
          title: 'Disk Files (inodes) Usage for /var/lib/netdata [/dev/vda1] (disk_inodes._var_lib_netdata)',
          priority: 2024,
          plugin: 'diskspace.plugin',
          module: '',
          enabled: true,
          units: 'inodes',
          data_url: '/api/monitor/data?chart=disk_inodes._var_lib_netdata',
          chart_type: 'stacked',
          duration: 3996,
          first_entry: 1568002947,
          last_entry: 1568006943,
          update_every: 1,
          dimensions: {
            avail: { name: 'avail' },
            used: { name: 'used' },
            reserved_for_root: { name: 'reserved for root' }
          },
          green: null,
          red: null,
          alarms: {
            out_of_disk_inodes_time: {
              id: 1555111291,
              status: 'CLEAR',
              units: 'hours',
              update_every: 10
            },
            disk_inode_rate: {
              id: 1555111290,
              status: 'UNDEFINED',
              units: 'inodes/hour',
              update_every: 60
            },
            disk_inode_usage: {
              id: 1555111289,
              status: 'CLEAR',
              units: '%',
              update_every: 60
            }
          }
        },
        'cpu.cpu0_cpuidle': 		{
          id: 'cpu.cpu0_cpuidle',
          name: 'cpu.cpu0_cpuidle',
          type: 'cpu',
          family: 'cpuidle',
          context: 'cpuidle.cpuidle',
          title: 'C-state residency time (cpu.cpu0_cpuidle)',
          priority: 6000,
          plugin: 'proc.plugin',
          module: '/proc/stat',
          enabled: true,
          units: 'percentage',
          data_url: '/api/monitor/data?chart=cpu.cpu0_cpuidle',
          chart_type: 'stacked',
          duration: 3996,
          first_entry: 1568002947,
          last_entry: 1568006943,
          update_every: 1,
          dimensions: {
            cpu0_active_time: { name: 'C0 (active)' }
          },
          green: null,
          red: null,
          alarms: {

          }
        },
        'system.processes': 		{
          id: 'system.processes',
          name: 'system.processes',
          type: 'system',
          family: 'processes',
          context: 'system.processes',
          title: 'System Processes (system.processes)',
          priority: 600,
          plugin: 'proc.plugin',
          module: '/proc/stat',
          enabled: true,
          units: 'processes',
          data_url: '/api/monitor/data?chart=system.processes',
          chart_type: 'line',
          duration: 3996,
          first_entry: 1568002947,
          last_entry: 1568006943,
          update_every: 1,
          dimensions: {
            running: { name: 'running' },
            blocked: { name: 'blocked' }
          },
          green: null,
          red: null,
          alarms: {

          }
        },
        'disk_space._var_lib_netdata': 		{
          id: 'disk_space._var_lib_netdata',
          name: 'disk_space._var_lib_netdata',
          type: 'disk_space',
          family: '/var/lib/netdata',
          context: 'disk.space',
          title: 'Disk Space Usage for /var/lib/netdata [/dev/vda1] (disk_space._var_lib_netdata)',
          priority: 2023,
          plugin: 'diskspace.plugin',
          module: '',
          enabled: true,
          units: 'GiB',
          data_url: '/api/monitor/data?chart=disk_space._var_lib_netdata',
          chart_type: 'stacked',
          duration: 3996,
          first_entry: 1568002947,
          last_entry: 1568006943,
          update_every: 1,
          dimensions: {
            avail: { name: 'avail' },
            used: { name: 'used' },
            reserved_for_root: { name: 'reserved for root' }
          },
          green: null,
          red: null,
          alarms: {
            out_of_disk_space_time: {
              id: 1555111288,
              status: 'CLEAR',
              units: 'hours',
              update_every: 10
            },
            disk_fill_rate: {
              id: 1555111287,
              status: 'UNDEFINED',
              units: 'GB/hour',
              update_every: 60
            },
            disk_space_usage: {
              id: 1555111286,
              status: 'CLEAR',
              units: '%',
              update_every: 60
            }
          }
        },
        'system.forks': 		{
          id: 'system.forks',
          name: 'system.forks',
          type: 'system',
          family: 'processes',
          context: 'system.forks',
          title: 'Started Processes (system.forks)',
          priority: 700,
          plugin: 'proc.plugin',
          module: '/proc/stat',
          enabled: true,
          units: 'processes/s',
          data_url: '/api/monitor/data?chart=system.forks',
          chart_type: 'line',
          duration: 3996,
          first_entry: 1568002947,
          last_entry: 1568006943,
          update_every: 1,
          dimensions: {
            started: { name: 'started' }
          },
          green: null,
          red: null,
          alarms: {

          }
        },
        'system.ctxt': 		{
          id: 'system.ctxt',
          name: 'system.ctxt',
          type: 'system',
          family: 'processes',
          context: 'system.ctxt',
          title: 'CPU Context Switches (system.ctxt)',
          priority: 800,
          plugin: 'proc.plugin',
          module: '/proc/stat',
          enabled: true,
          units: 'context switches/s',
          data_url: '/api/monitor/data?chart=system.ctxt',
          chart_type: 'line',
          duration: 3996,
          first_entry: 1568002947,
          last_entry: 1568006943,
          update_every: 1,
          dimensions: {
            switches: { name: 'switches' }
          },
          green: null,
          red: null,
          alarms: {

          }
        },
        'disk_inodes._var_cache_netdata': 		{
          id: 'disk_inodes._var_cache_netdata',
          name: 'disk_inodes._var_cache_netdata',
          type: 'disk_inodes',
          family: '/var/cache/netdata',
          context: 'disk.inodes',
          title: 'Disk Files (inodes) Usage for /var/cache/netdata [/dev/vda1] (disk_inodes._var_cache_netdata)',
          priority: 2024,
          plugin: 'diskspace.plugin',
          module: '',
          enabled: true,
          units: 'inodes',
          data_url: '/api/monitor/data?chart=disk_inodes._var_cache_netdata',
          chart_type: 'stacked',
          duration: 3996,
          first_entry: 1568002947,
          last_entry: 1568006943,
          update_every: 1,
          dimensions: {
            avail: { name: 'avail' },
            used: { name: 'used' },
            reserved_for_root: { name: 'reserved for root' }
          },
          green: null,
          red: null,
          alarms: {
            out_of_disk_inodes_time: {
              id: 1555111297,
              status: 'CLEAR',
              units: 'hours',
              update_every: 10
            },
            disk_inode_rate: {
              id: 1555111296,
              status: 'UNDEFINED',
              units: 'inodes/hour',
              update_every: 60
            },
            disk_inode_usage: {
              id: 1555111295,
              status: 'CLEAR',
              units: '%',
              update_every: 60
            }
          }
        },
        'system.intr': 		{
          id: 'system.intr',
          name: 'system.intr',
          type: 'system',
          family: 'interrupts',
          context: 'system.intr',
          title: 'CPU Interrupts (system.intr)',
          priority: 900,
          plugin: 'proc.plugin',
          module: '/proc/stat',
          enabled: true,
          units: 'interrupts/s',
          data_url: '/api/monitor/data?chart=system.intr',
          chart_type: 'line',
          duration: 3996,
          first_entry: 1568002947,
          last_entry: 1568006943,
          update_every: 1,
          dimensions: {
            interrupts: { name: 'interrupts' }
          },
          green: null,
          red: null,
          alarms: {

          }
        },
        'disk_space._var_cache_netdata': 		{
          id: 'disk_space._var_cache_netdata',
          name: 'disk_space._var_cache_netdata',
          type: 'disk_space',
          family: '/var/cache/netdata',
          context: 'disk.space',
          title: 'Disk Space Usage for /var/cache/netdata [/dev/vda1] (disk_space._var_cache_netdata)',
          priority: 2023,
          plugin: 'diskspace.plugin',
          module: '',
          enabled: true,
          units: 'GiB',
          data_url: '/api/monitor/data?chart=disk_space._var_cache_netdata',
          chart_type: 'stacked',
          duration: 3996,
          first_entry: 1568002947,
          last_entry: 1568006943,
          update_every: 1,
          dimensions: {
            avail: { name: 'avail' },
            used: { name: 'used' },
            reserved_for_root: { name: 'reserved for root' }
          },
          green: null,
          red: null,
          alarms: {
            out_of_disk_space_time: {
              id: 1555111294,
              status: 'CLEAR',
              units: 'hours',
              update_every: 10
            },
            disk_fill_rate: {
              id: 1555111293,
              status: 'UNDEFINED',
              units: 'GB/hour',
              update_every: 60
            },
            disk_space_usage: {
              id: 1555111292,
              status: 'CLEAR',
              units: '%',
              update_every: 60
            }
          }
        },
        'disk_inodes._dev_shm': 		{
          id: 'disk_inodes._dev_shm',
          name: 'disk_inodes._dev_shm',
          type: 'disk_inodes',
          family: '/dev/shm',
          context: 'disk.inodes',
          title: 'Disk Files (inodes) Usage for /dev/shm [shm] (disk_inodes._dev_shm)',
          priority: 2024,
          plugin: 'diskspace.plugin',
          module: '',
          enabled: true,
          units: 'inodes',
          data_url: '/api/monitor/data?chart=disk_inodes._dev_shm',
          chart_type: 'stacked',
          duration: 3996,
          first_entry: 1568002947,
          last_entry: 1568006943,
          update_every: 1,
          dimensions: {
            avail: { name: 'avail' },
            used: { name: 'used' },
            reserved_for_root: { name: 'reserved for root' }
          },
          green: null,
          red: null,
          alarms: {
            out_of_disk_inodes_time: {
              id: 1555111285,
              status: 'CLEAR',
              units: 'hours',
              update_every: 10
            },
            disk_inode_rate: {
              id: 1555111284,
              status: 'UNDEFINED',
              units: 'inodes/hour',
              update_every: 60
            },
            disk_inode_usage: {
              id: 1555111283,
              status: 'CLEAR',
              units: '%',
              update_every: 60
            }
          }
        },
        'cpu.cpu1': 		{
          id: 'cpu.cpu1',
          name: 'cpu.cpu1',
          type: 'cpu',
          family: 'utilization',
          context: 'cpu.cpu',
          title: 'Core utilization (cpu.cpu1)',
          priority: 1002,
          plugin: 'proc.plugin',
          module: '/proc/stat',
          enabled: true,
          units: 'percentage',
          data_url: '/api/monitor/data?chart=cpu.cpu1',
          chart_type: 'stacked',
          duration: 3996,
          first_entry: 1568002947,
          last_entry: 1568006943,
          update_every: 1,
          dimensions: {
            guest_nice: { name: 'guest_nice' },
            guest: { name: 'guest' },
            steal: { name: 'steal' },
            softirq: { name: 'softirq' },
            irq: { name: 'irq' },
            user: { name: 'user' },
            system: { name: 'system' },
            nice: { name: 'nice' },
            iowait: { name: 'iowait' }
          },
          green: null,
          red: null,
          alarms: {

          }
        },
        'disk_space._dev_shm': 		{
          id: 'disk_space._dev_shm',
          name: 'disk_space._dev_shm',
          type: 'disk_space',
          family: '/dev/shm',
          context: 'disk.space',
          title: 'Disk Space Usage for /dev/shm [shm] (disk_space._dev_shm)',
          priority: 2023,
          plugin: 'diskspace.plugin',
          module: '',
          enabled: true,
          units: 'GiB',
          data_url: '/api/monitor/data?chart=disk_space._dev_shm',
          chart_type: 'stacked',
          duration: 3996,
          first_entry: 1568002947,
          last_entry: 1568006943,
          update_every: 1,
          dimensions: {
            avail: { name: 'avail' },
            used: { name: 'used' },
            reserved_for_root: { name: 'reserved for root' }
          },
          green: null,
          red: null,
          alarms: {
            out_of_disk_space_time: {
              id: 1555111282,
              status: 'CLEAR',
              units: 'hours',
              update_every: 10
            },
            disk_fill_rate: {
              id: 1555111281,
              status: 'UNDEFINED',
              units: 'GB/hour',
              update_every: 60
            },
            disk_space_usage: {
              id: 1555111280,
              status: 'CLEAR',
              units: '%',
              update_every: 60
            }
          }
        },
        'disk_inodes._dev': 		{
          id: 'disk_inodes._dev',
          name: 'disk_inodes._dev',
          type: 'disk_inodes',
          family: '/dev',
          context: 'disk.inodes',
          title: 'Disk Files (inodes) Usage for /dev [tmpfs] (disk_inodes._dev)',
          priority: 2024,
          plugin: 'diskspace.plugin',
          module: '',
          enabled: true,
          units: 'inodes',
          data_url: '/api/monitor/data?chart=disk_inodes._dev',
          chart_type: 'stacked',
          duration: 3996,
          first_entry: 1568002947,
          last_entry: 1568006943,
          update_every: 1,
          dimensions: {
            avail: { name: 'avail' },
            used: { name: 'used' },
            reserved_for_root: { name: 'reserved for root' }
          },
          green: null,
          red: null,
          alarms: {
            out_of_disk_inodes_time: {
              id: 1555111279,
              status: 'CLEAR',
              units: 'hours',
              update_every: 10
            },
            disk_inode_rate: {
              id: 1555111278,
              status: 'UNDEFINED',
              units: 'inodes/hour',
              update_every: 60
            },
            disk_inode_usage: {
              id: 1555111277,
              status: 'CLEAR',
              units: '%',
              update_every: 60
            }
          }
        },
        'cpu.cpu0': 		{
          id: 'cpu.cpu0',
          name: 'cpu.cpu0',
          type: 'cpu',
          family: 'utilization',
          context: 'cpu.cpu',
          title: 'Core utilization (cpu.cpu0)',
          priority: 1001,
          plugin: 'proc.plugin',
          module: '/proc/stat',
          enabled: true,
          units: 'percentage',
          data_url: '/api/monitor/data?chart=cpu.cpu0',
          chart_type: 'stacked',
          duration: 3996,
          first_entry: 1568002947,
          last_entry: 1568006943,
          update_every: 1,
          dimensions: {
            guest_nice: { name: 'guest_nice' },
            guest: { name: 'guest' },
            steal: { name: 'steal' },
            softirq: { name: 'softirq' },
            irq: { name: 'irq' },
            user: { name: 'user' },
            system: { name: 'system' },
            nice: { name: 'nice' },
            iowait: { name: 'iowait' }
          },
          green: null,
          red: null,
          alarms: {

          }
        },
        'disk_space._dev': 		{
          id: 'disk_space._dev',
          name: 'disk_space._dev',
          type: 'disk_space',
          family: '/dev',
          context: 'disk.space',
          title: 'Disk Space Usage for /dev [tmpfs] (disk_space._dev)',
          priority: 2023,
          plugin: 'diskspace.plugin',
          module: '',
          enabled: true,
          units: 'GiB',
          data_url: '/api/monitor/data?chart=disk_space._dev',
          chart_type: 'stacked',
          duration: 3996,
          first_entry: 1568002947,
          last_entry: 1568006943,
          update_every: 1,
          dimensions: {
            avail: { name: 'avail' },
            used: { name: 'used' },
            reserved_for_root: { name: 'reserved for root' }
          },
          green: null,
          red: null,
          alarms: {
            out_of_disk_space_time: {
              id: 1555111276,
              status: 'CLEAR',
              units: 'hours',
              update_every: 10
            },
            disk_fill_rate: {
              id: 1555111275,
              status: 'UNDEFINED',
              units: 'GB/hour',
              update_every: 60
            },
            disk_space_usage: {
              id: 1555111274,
              status: 'CLEAR',
              units: '%',
              update_every: 60
            }
          }
        },
        'disk_inodes._': 		{
          id: 'disk_inodes._',
          name: 'disk_inodes._',
          type: 'disk_inodes',
          family: '/',
          context: 'disk.inodes',
          title: 'Disk Files (inodes) Usage for / [overlay] (disk_inodes._)',
          priority: 2024,
          plugin: 'diskspace.plugin',
          module: '',
          enabled: true,
          units: 'inodes',
          data_url: '/api/monitor/data?chart=disk_inodes._',
          chart_type: 'stacked',
          duration: 3996,
          first_entry: 1568002947,
          last_entry: 1568006943,
          update_every: 1,
          dimensions: {
            avail: { name: 'avail' },
            used: { name: 'used' },
            reserved_for_root: { name: 'reserved for root' }
          },
          green: null,
          red: null,
          alarms: {
            out_of_disk_inodes_time: {
              id: 1555111273,
              status: 'CLEAR',
              units: 'hours',
              update_every: 10
            },
            disk_inode_rate: {
              id: 1555111272,
              status: 'UNDEFINED',
              units: 'inodes/hour',
              update_every: 60
            },
            disk_inode_usage: {
              id: 1555111271,
              status: 'CLEAR',
              units: '%',
              update_every: 60
            }
          }
        },
        'system.cpu': 		{
          id: 'system.cpu',
          name: 'system.cpu',
          type: 'system',
          family: 'cpu',
          context: 'system.cpu',
          title: 'Total CPU utilization (system.cpu)',
          priority: 100,
          plugin: 'proc.plugin',
          module: '/proc/stat',
          enabled: true,
          units: 'percentage',
          data_url: '/api/monitor/data?chart=system.cpu',
          chart_type: 'stacked',
          duration: 3996,
          first_entry: 1568002947,
          last_entry: 1568006943,
          update_every: 1,
          dimensions: {
            guest_nice: { name: 'guest_nice' },
            guest: { name: 'guest' },
            steal: { name: 'steal' },
            softirq: { name: 'softirq' },
            irq: { name: 'irq' },
            user: { name: 'user' },
            system: { name: 'system' },
            nice: { name: 'nice' },
            iowait: { name: 'iowait' }
          },
          green: null,
          red: null,
          alarms: {
            '20min_steal_cpu': {
              id: 1555111267,
              status: 'CLEAR',
              units: '%',
              update_every: 300
            },
            '10min_cpu_iowait': {
              id: 1555111266,
              status: 'CLEAR',
              units: '%',
              update_every: 60
            },
            '10min_cpu_usage': {
              id: 1555111265,
              status: 'CLEAR',
              units: '%',
              update_every: 60
            }
          }
        },
        'disk_space._': 		{
          id: 'disk_space._',
          name: 'disk_space._',
          type: 'disk_space',
          family: '/',
          context: 'disk.space',
          title: 'Disk Space Usage for / [overlay] (disk_space._)',
          priority: 2023,
          plugin: 'diskspace.plugin',
          module: '',
          enabled: true,
          units: 'GiB',
          data_url: '/api/monitor/data?chart=disk_space._',
          chart_type: 'stacked',
          duration: 3996,
          first_entry: 1568002947,
          last_entry: 1568006943,
          update_every: 1,
          dimensions: {
            avail: { name: 'avail' },
            used: { name: 'used' },
            reserved_for_root: { name: 'reserved for root' }
          },
          green: null,
          red: null,
          alarms: {
            out_of_disk_space_time: {
              id: 1555111270,
              status: 'CLEAR',
              units: 'hours',
              update_every: 10
            },
            disk_fill_rate: {
              id: 1555111269,
              status: 'UNDEFINED',
              units: 'GB/hour',
              update_every: 60
            },
            disk_space_usage: {
              id: 1555111268,
              status: 'CLEAR',
              units: '%',
              update_every: 60
            }
          }
        },
        'netdata.plugin_statsd_collector1_cpu': 		{
          id: 'netdata.plugin_statsd_collector1_cpu',
          name: 'netdata.plugin_statsd_collector1_cpu',
          type: 'netdata',
          family: 'statsd',
          context: 'netdata.statsd_cpu',
          title: 'NetData statsd collector thread No 1 CPU usage (netdata.plugin_statsd_collector1_cpu)',
          priority: 132002,
          plugin: 'statsd.plugin',
          module: 'stats',
          enabled: true,
          units: 'milliseconds/s',
          data_url: '/api/monitor/data?chart=netdata.plugin_statsd_collector1_cpu',
          chart_type: 'stacked',
          duration: 3996,
          first_entry: 1568002947,
          last_entry: 1568006943,
          update_every: 1,
          dimensions: {
            user: { name: 'user' },
            system: { name: 'system' }
          },
          green: null,
          red: null,
          alarms: {

          }
        },
        'netdata.plugin_statsd_charting_cpu': 		{
          id: 'netdata.plugin_statsd_charting_cpu',
          name: 'netdata.plugin_statsd_charting_cpu',
          type: 'netdata',
          family: 'statsd',
          context: 'netdata.statsd_cpu',
          title: 'NetData statsd charting thread CPU usage (netdata.plugin_statsd_charting_cpu)',
          priority: 132001,
          plugin: 'statsd.plugin',
          module: 'stats',
          enabled: true,
          units: 'milliseconds/s',
          data_url: '/api/monitor/data?chart=netdata.plugin_statsd_charting_cpu',
          chart_type: 'stacked',
          duration: 3996,
          first_entry: 1568002947,
          last_entry: 1568006943,
          update_every: 1,
          dimensions: {
            user: { name: 'user' },
            system: { name: 'system' }
          },
          green: null,
          red: null,
          alarms: {

          }
        },
        'netdata.private_charts': 		{
          id: 'netdata.private_charts',
          name: 'netdata.private_charts',
          type: 'netdata',
          family: 'statsd',
          context: 'netdata.private_charts',
          title: 'Private metric charts created by the netdata statsd server (netdata.private_charts)',
          priority: 132020,
          plugin: 'statsd.plugin',
          module: 'stats',
          enabled: true,
          units: 'charts',
          data_url: '/api/monitor/data?chart=netdata.private_charts',
          chart_type: 'area',
          duration: 3996,
          first_entry: 1568002947,
          last_entry: 1568006943,
          update_every: 1,
          dimensions: {
            charts: { name: 'charts' }
          },
          green: null,
          red: null,
          alarms: {

          }
        },
        'netdata.tcp_connected': 		{
          id: 'netdata.tcp_connected',
          name: 'netdata.tcp_connected',
          type: 'netdata',
          family: 'statsd',
          context: 'netdata.tcp_connected',
          title: 'statsd server TCP connected sockets (netdata.tcp_connected)',
          priority: 132016,
          plugin: 'statsd.plugin',
          module: 'stats',
          enabled: true,
          units: 'sockets',
          data_url: '/api/monitor/data?chart=netdata.tcp_connected',
          chart_type: 'line',
          duration: 3996,
          first_entry: 1568002947,
          last_entry: 1568006943,
          update_every: 1,
          dimensions: {
            connected: { name: 'connected' }
          },
          green: null,
          red: null,
          alarms: {

          }
        },
        'netdata.tcp_connects': 		{
          id: 'netdata.tcp_connects',
          name: 'netdata.tcp_connects',
          type: 'netdata',
          family: 'statsd',
          context: 'netdata.tcp_connects',
          title: 'statsd server TCP connects and disconnects (netdata.tcp_connects)',
          priority: 132015,
          plugin: 'statsd.plugin',
          module: 'stats',
          enabled: true,
          units: 'events',
          data_url: '/api/monitor/data?chart=netdata.tcp_connects',
          chart_type: 'line',
          duration: 3996,
          first_entry: 1568002947,
          last_entry: 1568006943,
          update_every: 1,
          dimensions: {
            connects: { name: 'connects' },
            disconnects: { name: 'disconnects' }
          },
          green: null,
          red: null,
          alarms: {

          }
        },
        'netdata.statsd_packets': 		{
          id: 'netdata.statsd_packets',
          name: 'netdata.statsd_packets',
          type: 'netdata',
          family: 'statsd',
          context: 'netdata.statsd_packets',
          title: 'Network packets processed by the netdata statsd server (netdata.statsd_packets)',
          priority: 132014,
          plugin: 'statsd.plugin',
          module: 'stats',
          enabled: true,
          units: 'packets/s',
          data_url: '/api/monitor/data?chart=netdata.statsd_packets',
          chart_type: 'stacked',
          duration: 3996,
          first_entry: 1568002947,
          last_entry: 1568006943,
          update_every: 1,
          dimensions: {
            tcp: { name: 'tcp' },
            udp: { name: 'udp' }
          },
          green: null,
          red: null,
          alarms: {

          }
        },
        'netdata.statsd_bytes': 		{
          id: 'netdata.statsd_bytes',
          name: 'netdata.statsd_bytes',
          type: 'netdata',
          family: 'statsd',
          context: 'netdata.statsd_bytes',
          title: 'Bytes read by the netdata statsd server (netdata.statsd_bytes)',
          priority: 132013,
          plugin: 'statsd.plugin',
          module: 'stats',
          enabled: true,
          units: 'kilobits/s',
          data_url: '/api/monitor/data?chart=netdata.statsd_bytes',
          chart_type: 'stacked',
          duration: 3996,
          first_entry: 1568002947,
          last_entry: 1568006943,
          update_every: 1,
          dimensions: {
            tcp: { name: 'tcp' },
            udp: { name: 'udp' }
          },
          green: null,
          red: null,
          alarms: {

          }
        },
        'netdata.statsd_reads': 		{
          id: 'netdata.statsd_reads',
          name: 'netdata.statsd_reads',
          type: 'netdata',
          family: 'statsd',
          context: 'netdata.statsd_reads',
          title: 'Read operations made by the netdata statsd server (netdata.statsd_reads)',
          priority: 132012,
          plugin: 'statsd.plugin',
          module: 'stats',
          enabled: true,
          units: 'reads/s',
          data_url: '/api/monitor/data?chart=netdata.statsd_reads',
          chart_type: 'stacked',
          duration: 3996,
          first_entry: 1568002947,
          last_entry: 1568006943,
          update_every: 1,
          dimensions: {
            tcp: { name: 'tcp' },
            udp: { name: 'udp' }
          },
          green: null,
          red: null,
          alarms: {

          }
        },
        'netdata.statsd_events': 		{
          id: 'netdata.statsd_events',
          name: 'netdata.statsd_events',
          type: 'netdata',
          family: 'statsd',
          context: 'netdata.statsd_events',
          title: 'Events processed by the netdata statsd server (netdata.statsd_events)',
          priority: 132011,
          plugin: 'statsd.plugin',
          module: 'stats',
          enabled: true,
          units: 'events/s',
          data_url: '/api/monitor/data?chart=netdata.statsd_events',
          chart_type: 'stacked',
          duration: 3996,
          first_entry: 1568002947,
          last_entry: 1568006943,
          update_every: 1,
          dimensions: {
            gauges: { name: 'gauges' },
            counters: { name: 'counters' },
            timers: { name: 'timers' },
            meters: { name: 'meters' },
            histograms: { name: 'histograms' },
            sets: { name: 'sets' },
            unknown: { name: 'unknown' },
            errors: { name: 'errors' }
          },
          green: null,
          red: null,
          alarms: {

          }
        },
        'netdata.statsd_useful_metrics': 		{
          id: 'netdata.statsd_useful_metrics',
          name: 'netdata.statsd_useful_metrics',
          type: 'netdata',
          family: 'statsd',
          context: 'netdata.statsd_useful_metrics',
          title: 'Useful metrics in the netdata statsd database (netdata.statsd_useful_metrics)',
          priority: 132010,
          plugin: 'statsd.plugin',
          module: 'stats',
          enabled: true,
          units: 'metrics',
          data_url: '/api/monitor/data?chart=netdata.statsd_useful_metrics',
          chart_type: 'stacked',
          duration: 3996,
          first_entry: 1568002947,
          last_entry: 1568006943,
          update_every: 1,
          dimensions: {
            gauges: { name: 'gauges' },
            counters: { name: 'counters' },
            timers: { name: 'timers' },
            meters: { name: 'meters' },
            histograms: { name: 'histograms' },
            sets: { name: 'sets' }
          },
          green: null,
          red: null,
          alarms: {

          }
        },
        'netdata.statsd_metrics': 		{
          id: 'netdata.statsd_metrics',
          name: 'netdata.statsd_metrics',
          type: 'netdata',
          family: 'statsd',
          context: 'netdata.statsd_metrics',
          title: 'Metrics in the netdata statsd database (netdata.statsd_metrics)',
          priority: 132010,
          plugin: 'statsd.plugin',
          module: 'stats',
          enabled: true,
          units: 'metrics',
          data_url: '/api/monitor/data?chart=netdata.statsd_metrics',
          chart_type: 'stacked',
          duration: 3996,
          first_entry: 1568002947,
          last_entry: 1568006943,
          update_every: 1,
          dimensions: {
            gauges: { name: 'gauges' },
            counters: { name: 'counters' },
            timers: { name: 'timers' },
            meters: { name: 'meters' },
            histograms: { name: 'histograms' },
            sets: { name: 'sets' }
          },
          green: null,
          red: null,
          alarms: {

          }
        },
        'system.idlejitter': 		{
          id: 'system.idlejitter',
          name: 'system.idlejitter',
          type: 'system',
          family: 'idlejitter',
          context: 'system.idlejitter',
          title: 'CPU Idle Jitter (system.idlejitter)',
          priority: 800,
          plugin: 'idlejitter.plugin',
          module: '',
          enabled: true,
          units: 'microseconds lost/s',
          data_url: '/api/monitor/data?chart=system.idlejitter',
          chart_type: 'area',
          duration: 3996,
          first_entry: 1568002947,
          last_entry: 1568006943,
          update_every: 1,
          dimensions: {
            min: { name: 'min' },
            max: { name: 'max' },
            average: { name: 'average' }
          },
          green: null,
          red: null,
          alarms: {

          }
        }
      },
      charts_count: 181,
      dimensions_count: 526,
      alarms_count: 66,
      rrd_memory_bytes: 9515744,
      hosts_count: 3,
      hosts: [
        {
          hostname: 'netdata-master-0'
        },
        {
          hostname: 'k8s-main-1-yoe4'
        },
        {
          hostname: 'k8s-main-1-7isq'
        }
      ]
    });
});

/**
 * getChart
 */
router.get('/chart', (req: express.Request, res: express.Response) => {
  logger.info(`[API Monitor] -> getChart -> connectionUuid [], chart [${req.query.chart}]`);

  const apiGlobals = new ApiGlobalsModule(req, res);

  return apiGlobals.responseJsonData({
    "id": "system.cpu",
    "name": "system.cpu",
    "type": "system",
    "family": "cpu",
    "context": "system.cpu",
    "title": "Total CPU utilization (system.cpu)",
    "priority": 100,
    "plugin": "proc.plugin",
    "module": "/proc/stat",
    "enabled": true,
    "units": "percentage",
    "data_url": "/api/monitor/data?chart=system.cpu",
    "chart_type": "stacked",
    "duration": 3996,
    "first_entry": 1568054279,
    "last_entry": 1568058275,
    "update_every": 1,
    "dimensions": {
      "guest_nice": { "name": "guest_nice" },
      "guest": { "name": "guest" },
      "steal": { "name": "steal" },
      "softirq": { "name": "softirq" },
      "irq": { "name": "irq" },
      "user": { "name": "user" },
      "system": { "name": "system" },
      "nice": { "name": "nice" },
      "iowait": { "name": "iowait" }
    },
    "green": null,
    "red": null,
    "alarms": {
      "20min_steal_cpu": {
        "id": 1555111267,
        "status": "CLEAR",
        "units": "%",
        "update_every": 300
      },
      "10min_cpu_iowait": {
        "id": 1555111266,
        "status": "CLEAR",
        "units": "%",
        "update_every": 60
      },
      "10min_cpu_usage": {
        "id": 1555111265,
        "status": "CLEAR",
        "units": "%",
        "update_every": 60
      }
    }
  });
});

/**
 * getData
 */
router.get('/data', (req: express.Request, res: express.Response) => {
  logger.info(`[API Monitor] -> getData -> connectionUuid [], chart [${req.query.chart}]`);

  const apiGlobals = new ApiGlobalsModule(req, res);

  return apiGlobals.responseJsonData({
    "api": 1,
    "id": "system.cpu",
    "name": "system.cpu",
    "view_update_every": 32,
    "update_every": 1,
    "first_entry": 1568054432,
    "last_entry": 1568058428,
    "before": 1568058400,
    "after": 1568054433,
    "dimension_names": ["steal", "softirq", "user", "system", "nice", "iowait"],
    "dimension_ids": ["steal", "softirq", "user", "system", "nice", "iowait"],
    "latest_values": [0, 2.040816, 21.42857, 11.734694, 1.5306122, 0],
    "view_latest_values": [0.0466725, 0.6140824, 16.2838097, 8.8876348, 1.1336768, 0],
    "dimensions": 6,
    "points": 124,
    "format": "json",
    "result": {
      "labels": ["time", "steal", "softirq", "user", "system", "nice", "iowait"],
      "data":
        [
          [ 1568054464000, 0.0314078, 0.6519058, 16.4046879, 9.0562315, 1.2046802, 0],
          [ 1568054496000, 0.0318068, 0.6151147, 15.2681267, 9.1373065, 1.1844796, 0],
          [ 1568054528000, 0.0470291, 0.4913946, 16.424509, 9.5210472, 0.9994962, 0.207938],
          [ 1568054560000, 0.03125, 0.5069791, 15.9974493, 8.7096318, 1.375678, 0],
          [ 1568054592000, 0.0311738, 0.6479897, 15.9524108, 8.9476653, 1.1583843, 0.0159439],
          [ 1568054624000, 0.0310953, 0.4103746, 15.7925124, 9.0823019, 1.0580833, 0.031321],
          [ 1568054656000, 0.0476046, 0.5846406, 17.0885462, 9.5871719, 1.2402716, 0],
          [ 1568054688000, 0.0470328, 0.6799482, 16.8310817, 9.3647106, 1.042983, 0.0154918],
          [ 1568054720000, 0.0630751, 0.5235239, 17.6971637, 9.250119, 1.0284408, 0],
          [ 1568054752000, 0.0314326, 0.6516999, 16.3953446, 8.7588819, 1.1550285, 0.0307646],
          [ 1568054784000, 0.04727, 0.6970018, 16.6537481, 8.9613093, 1.0788197, 1.3584448],
          [ 1568054816000, 0.0316482, 0.5232655, 16.2081025, 9.1367166, 1.1296023, 1.5094792],
          [ 1568054848000, 0.0473509, 0.6525612, 17.2095098, 9.2463275, 0.9221868, 0],
          [ 1568054880000, 0.0318068, 0.5719075, 17.2851655, 8.8431517, 1.0178003, 0.0157828],
          [ 1568054912000, 0.0478296, 0.5557711, 16.2832038, 8.8917012, 1.1130678, 0.3341165],
          [ 1568054944000, 0.0318118, 0.5900083, 16.5718902, 8.8901059, 1.208486, 0.1126751],
          [ 1568054976000, 0.0629832, 0.6672877, 16.3932171, 9.1233695, 0.9993717, 0.0956633],
          [ 1568055008000, 0, 0.6013308, 15.2942192, 8.8950477, 1.1253654, 2.2481948],
          [ 1568055040000, 0.0159439, 0.5546481, 16.6985329, 8.616696, 1.0603915, 0.0313415],
          [ 1568055072000, 0.031642, 0.4587754, 15.9437608, 9.5205505, 1.1412742, 0],
          [ 1568055104000, 0.0472663, 0.6026309, 15.917845, 8.7439039, 1.0609578, 0.0158629],
          [ 1568055136000, 0.0318886, 0.7461576, 16.3944686, 8.7620387, 1.0323129, 0],
          [ 1568055168000, 0.0475896, 0.8532034, 16.762467, 9.1984513, 1.0433884, 0.015625],
          [ 1568055200000, 0.0477523, 0.6024419, 16.7520838, 9.5843017, 1.0801819, 0],
          [ 1568055232000, 0.0160256, 0.5421227, 15.4062529, 8.6865079, 1.1269791, 0.0160256],
          [ 1568055264000, 0.0474294, 0.5069949, 16.0149636, 8.8064926, 1.1608777, 0],
          [ 1568055296000, 0.0159439, 0.5871751, 15.2580167, 8.7783337, 0.9848011, 0.140625],
          [ 1568055328000, 0.0475913, 0.729256, 17.4227069, 9.7136988, 1.1291622, 2.849678],
          [ 1568055360000, 0.0323023, 0.6514617, 16.0715807, 9.0325095, 1.049441, 0.0158629],
          [ 1568055392000, 0.030356, 0.6451185, 14.9093543, 8.9925496, 1.1995721, 1.7574068],
          [ 1568055424000, 0.0316458, 0.5232369, 16.4195026, 9.0609578, 0.9378259, 0.0157828],
          [ 1568055456000, 0.0313285, 0.5531146, 16.3633764, 8.5147877, 1.1052572, 0],
          [ 1568055488000, 0.0470182, 0.633202, 16.912661, 8.8373027, 1.143743, 0.0473589],
          [ 1568055520000, 0.0158629, 0.6509036, 17.1863524, 9.1888676, 0.9216629, 0],
          [ 1568055552000, 0.0314991, 0.6021053, 15.1354752, 8.600696, 1.1930104, 0],
          [ 1568055584000, 0.0474302, 0.6454734, 16.0377578, 8.4944247, 1.2320563, 0],
          [ 1568055616000, 0.0790048, 0.6960922, 15.9130399, 9.0091073, 1.1087222, 0.0157828],
          [ 1568055648000, 0.0630287, 0.5996492, 16.3739135, 8.5555359, 1.256644, 0.0478316],
          [ 1568055680000, 0.0315665, 0.6625861, 16.9540077, 8.9302947, 0.9034895, 1.7946922],
          [ 1568055712000, 0.0318878, 0.6016132, 16.2978567, 9.0065811, 1.1261387, 0.3816916],
          [ 1568055744000, 0.046798, 0.6176791, 16.8481762, 9.0686306, 1.188986, 0],
          [ 1568055776000, 0.0315689, 0.5690995, 15.4635644, 8.3903669, 1.1423425, 0],
          [ 1568055808000, 0.0472947, 0.5201087, 16.241732, 9.3578907, 0.9795669, 0.0632948],
          [ 1568055840000, 0.0314863, 0.6816308, 16.8418665, 8.817043, 1.0003187, 0.015625],
          [ 1568055872000, 0.0310191, 0.5832577, 17.3481871, 9.3521514, 1.0869133, 0.0158629],
          [ 1568055904000, 0.0624765, 0.5523571, 16.5744518, 9.295612, 1.1499781, 0],
          [ 1568055936000, 0.0474468, 0.5977159, 16.5569065, 8.6629744, 1.088259, 0],
          [ 1568055968000, 0.0311564, 0.6346479, 16.294079, 9.2196648, 1.1455187, 0.0158629],
          [ 1568056000000, 0.0315657, 0.5989243, 15.4369455, 9.0214003, 1.0402843, 0.0159439],
          [ 1568056032000, 0.0313522, 0.6970809, 15.6690068, 8.9778561, 1.0299923, 0.4387755],
          [ 1568056064000, 0.0317259, 0.6628968, 16.2464437, 9.0346085, 0.9516997, 1.1635989],
          [ 1568056096000, 0.0317332, 0.6351831, 15.7665368, 8.4956689, 1.1618651, 0],
          [ 1568056128000, 0.0309414, 0.7101067, 15.2274521, 8.6283002, 1.1669632, 0.0157035],
          [ 1568056160000, 0.0157828, 0.6650668, 16.5082252, 9.0624774, 0.9694123, 0.0159439],
          [ 1568056192000, 0.0473695, 0.647902, 17.3154322, 8.9692631, 1.1045137, 0.0316458],
          [ 1568056224000, 0.0155473, 0.5054283, 17.1915399, 9.2260307, 1.1538943, 0],
          [ 1568056256000, 0.0475026, 0.6463931, 15.4009435, 8.9632781, 0.9618897, 0],
          [ 1568056288000, 0.0309414, 0.6926096, 17.1488657, 9.3875291, 0.9627956, 0.7940094],
          [ 1568056320000, 0.0317259, 0.648119, 15.797025, 9.1058872, 0.9479823, 0.0157828],
          [ 1568056352000, 0.0319695, 0.554445, 16.4672344, 8.847002, 1.0633468, 0.0947936],
          [ 1568056384000, 0.0159439, 0.5541183, 16.313992, 8.9784032, 1.0780086, 0.6532491],
          [ 1568056416000, 0.0317267, 0.7442854, 15.3272603, 9.1361101, 1.1690263, 0.0157035],
          [ 1568056448000, 0.0316458, 0.6952191, 16.9409619, 9.4329817, 1.0429499, 0],
          [ 1568056480000, 0.0630059, 0.6056087, 15.8279188, 9.198704, 1.0628221, 0.9444896],
          [ 1568056512000, 0.0476687, 0.6154916, 16.8664985, 9.2568958, 1.1230081, 0],
          [ 1568056544000, 0.0314284, 0.7281634, 16.3779874, 9.3043612, 1.0451582, 0.0157035],
          [ 1568056576000, 0.0314911, 0.5698858, 17.2480597, 9.4098297, 1.095445, 0.0157035],
          [ 1568056608000, 0.0316188, 0.567481, 16.8036987, 9.3487839, 1.0588655, 0.0157035],
          [ 1568056640000, 0.0796671, 0.6013626, 17.5095777, 9.1800944, 1.1410335, 0.0158629],
          [ 1568056672000, 0.0316474, 0.6328828, 15.8843893, 8.716983, 1.2019241, 0],
          [ 1568056704000, 0.0474281, 0.6966834, 16.0827221, 8.909362, 1.0762749, 0.0159439],
          [ 1568056736000, 0.0160256, 0.539584, 16.5649091, 8.9694011, 1.0298584, 0.1902854],
          [ 1568056768000, 0.0477132, 0.6371335, 17.5316642, 9.363995, 1.0165471, 1.1025015],
          [ 1568056800000, 0.0317332, 0.7256757, 16.5289169, 8.6299287, 1.0114204, 0.5721621],
          [ 1568056832000, 0.0321339, 0.6602872, 18.4127064, 8.7773019, 1.2480882, 0.0157035],
          [ 1568056864000, 0.031257, 0.630922, 16.4757793, 9.1593769, 0.9620303, 0.0155473],
          [ 1568056896000, 0.0315657, 0.6310101, 15.8017152, 8.4556522, 1.1198616, 0],
          [ 1568056928000, 0.031338, 0.5851235, 16.2216741, 8.8866122, 1.0279932, 0],
          [ 1568056960000, 0.0157035, 0.6148433, 15.3994167, 8.9032767, 1.1488172, 0.0160256],
          [ 1568056992000, 0.0470382, 0.5242269, 16.1312865, 9.0371622, 1.1407664, 0.0160256],
          [ 1568057024000, 0.0317332, 0.5698185, 17.1005721, 8.8232946, 0.9649953, 0.0160256],
          [ 1568057056000, 0.0481506, 0.763394, 16.6595568, 8.7594135, 1.1729352, 0.0943711],
          [ 1568057088000, 0.0317267, 0.5853424, 16.4054205, 8.5924187, 1.0620309, 0.0161082],
          [ 1568057120000, 0.0153941, 0.5859998, 15.8723883, 9.0723116, 1.0490198, 0.1579276],
          [ 1568057152000, 0.0157942, 0.6943104, 14.7719371, 9.076743, 1.0899729, 0.8150303],
          [ 1568057184000, 0.0631056, 0.7259571, 16.9805805, 9.6283743, 1.3389597, 0.408158],
          [ 1568057216000, 0.0319712, 0.6516659, 17.3686551, 9.0529096, 1.2073589, 0.2557744],
          [ 1568057248000, 0.0315657, 0.7127593, 17.829156, 9.3147252, 1.2555502, 0.0477976],
          [ 1568057280000, 0.0317292, 0.7298586, 16.1776136, 8.9689215, 1.1082877, 0],
          [ 1568057312000, 0.0478425, 0.7465047, 16.7059005, 9.1161658, 1.0940305, 0.0157573],
          [ 1568057344000, 0.0324695, 0.7120751, 17.4016863, 9.1010111, 1.1564731, 0],
          [ 1568057376000, 0.0160256, 0.5073295, 16.5879318, 9.4802369, 1.1563908, 0],
          [ 1568057408000, 0.0480063, 0.5419942, 17.7411849, 9.5242784, 1.1918131, 0.0623277],
          [ 1568057440000, 0.0313301, 0.6326415, 18.5539705, 8.9315979, 1.0783027, 0],
          [ 1568057472000, 0.0471168, 0.6325369, 16.2691067, 9.3017452, 1.0430421, 0.0157828],
          [ 1568057504000, 0.0466383, 0.6476349, 15.7575235, 8.5802568, 1.1819491, 0.015625],
          [ 1568057536000, 0.0474926, 0.5708793, 16.0501916, 8.9237548, 1.1932674, 0.0320513],
          [ 1568057568000, 0.0318911, 0.840256, 15.2936986, 8.7009484, 1.1081074, 1.5996331],
          [ 1568057600000, 0.0318886, 0.6023142, 16.6796656, 8.8232567, 1.130987, 0],
          [ 1568057632000, 0.031407, 0.5862198, 16.5205361, 8.8954124, 1.0940629, 0.1593652],
          [ 1568057664000, 0.0153941, 0.6920562, 16.3293233, 8.5264312, 1.2602049, 0.0149716],
          [ 1568057696000, 0.0316506, 0.6477981, 16.0417077, 9.0807067, 1.1060998, 0.0158629],
          [ 1568057728000, 0.0476628, 0.5331574, 16.4824678, 9.0507406, 1.0590119, 0],
          [ 1568057760000, 0.031407, 0.6318905, 15.8372948, 8.8370032, 1.0136192, 0],
          [ 1568057792000, 0.0475994, 0.6945671, 15.6372543, 8.3836423, 1.0399188, 2.9272945],
          [ 1568057824000, 0.0311987, 0.5528807, 15.5053101, 8.9171693, 0.9166922, 0],
          [ 1568057856000, 0.015781, 0.6173165, 14.5008874, 8.4764506, 1.0617637, 0],
          [ 1568057888000, 0.0473493, 0.7085317, 16.0330352, 9.3294944, 1.1352597, 0],
          [ 1568057920000, 0.0316458, 0.642599, 15.3139037, 8.5805478, 1.335029, 0.0157035],
          [ 1568057952000, 0.0317259, 0.5393219, 15.9618221, 8.8538685, 1.1083851, 0],
          [ 1568057984000, 0.0319712, 0.5682, 16.3022084, 8.8971246, 1.1541799, 0.0157828],
          [ 1568058016000, 0.0310191, 0.6791161, 16.3762238, 8.532249, 1.1208581, 0.1095977],
          [ 1568058048000, 0.0318085, 0.5708017, 15.0587715, 8.6579778, 1.0915025, 0],
          [ 1568058080000, 0.031365, 0.7600668, 16.0888547, 9.1079508, 1.1026028, 0.0158629],
          [ 1568058112000, 0.0314654, 0.6662491, 15.8356305, 8.9878698, 1.0936688, 0.5067502],
          [ 1568058144000, 0.0468004, 0.6325779, 16.1054217, 9.3310085, 1.0931941, 0.0158629],
          [ 1568058176000, 0.0483164, 0.6783181, 17.1540173, 9.063327, 1.0456419, 0.2548617],
          [ 1568058208000, 0.0157828, 0.5997546, 15.7825068, 8.9620426, 1.2782824, 0],
          [ 1568058240000, 0.0317259, 0.8264408, 17.633122, 9.611803, 1.4488007, 0.015625],
          [ 1568058272000, 0.0473493, 0.6343208, 16.9604019, 9.0110222, 1.3201441, 0.1121795],
          [ 1568058304000, 0.062576, 0.5224129, 16.5127966, 8.810768, 1.0471034, 0.0157828],
          [ 1568058336000, 0.0320648, 0.6487154, 16.7441665, 9.3869423, 0.9958432, 0.1127577],
          [ 1568058368000, 0.0317267, 0.6839667, 17.1567026, 9.4974297, 1.128411, 0.0158629],
          [ 1568058400000, 0.0466725, 0.6140824, 16.2838097, 8.8876348, 1.1336768, 0]
        ]
    },
    "min": 0,
    "max": 18.5539705
  });
});
export default router;
