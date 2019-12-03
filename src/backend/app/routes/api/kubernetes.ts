import {Router} from 'express';
import {getLogger} from 'log4js';
import * as express from 'express';

import {Io} from '../../app';
import {ApiGlobalsModule} from './api-globals';
import {KubernetesModule} from '../modules/node/kubernetes';
import {KubernetesSocketModule} from '../../socket/modules/kubernetes/kubernetes';

const logger = getLogger('mainlog');
const router = Router();

/**
 * Get Resource
 */
router.get('/resource/:connectionUuid/:resourceLink(*)', (req: express.Request, res: express.Response) => {
  logger.info(`[API Kubernetes] -> Get Resource -> connectionUuid [${req.params.connectionUuid}] resource [${req.params.resourceLink}]`);

  const apiGlobals = new ApiGlobalsModule(req, res);
  const Kubernetes = new KubernetesModule(req);

  Kubernetes.getResource(req.params.connectionUuid, req.params.resourceLink).then((body) => {
    return apiGlobals.responseJsonData(JSON.parse(body));
  }).catch((e) => {
    if (e && e.code) return apiGlobals.serverError(e.code);
    if (e) return apiGlobals.serverError(e);
  });
});

router.get('/log/:connectionUuid/:terminalUuid/:namespace/:pod/:container/:showContainerName', (req: express.Request, res: express.Response) => {
  logger.info(`[API Kubernetes] -> Get Container Logs -> connectionUuid [${req.params.connectionUuid}] terminalUuid [${req.params.terminalUuid}]
 namespace [${req.params.namespace}] pod [${req.params.pod}] container [${req.params.container}] showContainerName [${req.params.showContainerName}]`);

  const apiGlobals = new ApiGlobalsModule(req, res);

  const socketId = req.session.socketId;
  const socket = Io.clients().sockets[socketId];
  const KubernetesSocket = new KubernetesSocketModule(socket);

  KubernetesSocket.getContainerLogs(req.params.connectionUuid, req.params.terminalUuid, req.params.namespace, req.params.pod, req.params.container, req.params.showContainerName === 'true').then((logUuid) => {
    return apiGlobals.responseJsonData({
      uuid: logUuid
    });
  }).catch((e) => {
    if (e && e.code) return apiGlobals.serverError(e.code);
    if (e) return apiGlobals.serverError(e);
  });
});

router.delete('/log/:logUuid', (req: express.Request, res: express.Response) => {
  logger.info(`[API Kubernetes] -> End Container Logs -> logUuid [${req.params.logUuid}]`);

  const apiGlobals = new ApiGlobalsModule(req, res);

  const socketId = req.session.socketId;
  const socket = Io.clients().sockets[socketId];
  const KubernetesSocket = new KubernetesSocketModule(socket);

  KubernetesSocket.finishContainerLogRequest(req.params.logUuid).then(() => {
    return apiGlobals.validResponse();
  }).catch((e) => {
    if (e && e.code) return apiGlobals.serverError(e.code);
    if (e) return apiGlobals.serverError(e);
  });
});

router.get('/exec/:connectionUuid/:terminalUuid/:namespace/:pod/:container/:command', (req: express.Request, res: express.Response) => {
  logger.info(`[API Kubernetes] -> Exec into Container connectionUuid [${req.params.connectionUuid}] terminalUuid [${req.params.terminalUuid}]
 namespace [${req.params.namespace}] pod [${req.params.pod}] container [${req.params.container}] command [${req.params.command}]`);

  const apiGlobals = new ApiGlobalsModule(req, res);

  const socketId = req.session.socketId;
  const socket = Io.clients().sockets[socketId];
  const KubernetesSocket = new KubernetesSocketModule(socket);

  KubernetesSocket.execToTerminal(req.params.connectionUuid, req.params.terminalUuid, req.params.namespace, req.params.pod, req.params.container, req.params.command).then(() => {
    return apiGlobals.validResponse();
  }).catch((e) => {
    if (e && e.code) return apiGlobals.serverError(e.code);
    if (e) return apiGlobals.serverError(e);
  });
});

router.get('/shell/:type/:connectionUuid/:terminalUuid/:namespace/:pod/:container/:command', (req: express.Request, res: express.Response) => {
  logger.info(`[API Kubernetes] -> Exec or Attach into Container type [${req.params.type}] connectionUuid [${req.params.connectionUuid}]
 terminalUuid [${req.params.terminalUuid}] namespace [${req.params.namespace}] pod [${req.params.pod}] container [${req.params.container}] command [${req.params.command}]`);

  const apiGlobals = new ApiGlobalsModule(req, res);

  const socketId = req.session.socketId;
  const socket = Io.clients().sockets[socketId];
  const KubernetesSocket = new KubernetesSocketModule(socket);

  Promise.resolve().then(() => {
    if (req.params.type === 'exec') return KubernetesSocket.execToTerminal(req.params.connectionUuid, req.params.terminalUuid, req.params.namespace, req.params.pod, req.params.container, req.params.command);
    if (req.params.type === 'attach') return KubernetesSocket.attachToTerminal(req.params.connectionUuid, req.params.terminalUuid, req.params.namespace, req.params.pod, req.params.container);
  }).then(() => {
    return apiGlobals.validResponse();
  }).catch((e) => {
    if (e && e.code) return apiGlobals.serverError(e.code);
    if (e) return apiGlobals.serverError(e);
  });
});

router.delete('/shell/:terminalUuid', (req: express.Request, res: express.Response) => {
  logger.info(`[API Kubernetes] -> End Container Shell -> terminalUuid [${req.params.terminalUuid}]`);

  const apiGlobals = new ApiGlobalsModule(req, res);

  const socketId = req.session.socketId;
  const socket = Io.clients().sockets[socketId];
  const KubernetesSocket = new KubernetesSocketModule(socket);

  KubernetesSocket.finishTerminalShellRequest(req.params.terminalUuid).then(() => {
    return apiGlobals.validResponse();
  }).catch((e) => {
    if (e && e.code) return apiGlobals.serverError(e.code);
    if (e) return apiGlobals.serverError(e);
  });
});

export default router;
