import {Controller, Authorized, Req, Res, Post, BodyParam, CookieParam} from 'routing-controllers';
import {SessionParam} from 'routing-controllers/decorator/SessionParam';
import {Request, Response} from 'express';
import {getLogger, Logger} from 'log4js';
import {Response as fetchResponse} from 'node-fetch';
import {parse} from 'url';
import {join} from 'path';
import {spawn} from 'child-process-promise';

import {AnyOpsOSApiGlobalsModule} from '@anyopsos/module-api-globals';
import {AnyOpsOSGetPathModule} from '@anyopsos/module-get-path';
import {AnyOpsOSCredentialModule, KdbxCredential} from '@anyopsos/module-credential';
import {AnyOpsOSVmwareModule} from '@anyopsos/module-vmware';

const logger: Logger = getLogger('mainlog');

@Authorized()
@Controller('/api/vmware')
export class AnyOpsOSVmwareApiController {

  @Post('/getClientVersion')
  async getVmwareClientVersion(@Req() request: Request,
                               @Res() response: Response,
                               @BodyParam('host') host: string,
                               @BodyParam('port') port: number) {
    logger.info(`[API VMWare] -> getClientVersion -> host [${host}], port [${port}]`);

    const version: any = await new AnyOpsOSVmwareModule().getClientVersion(host, port);
    return new AnyOpsOSApiGlobalsModule(request, response).jsonDataResponse(version);
  }

  @Post('/connect')
  async vmwareConnect(@Req() request: Request,
                      @Res() response: Response,
                      @SessionParam('userUuid') userUuid: string,
                      @SessionParam('id') sessionUuid: string,
                      @BodyParam('host') host: string,
                      @BodyParam('port') port: number,
                      @BodyParam('credentialUuid') credentialUuid: string) {
    logger.info(`[API VMWare] -> connect -> host [${host}], port [${port}]`);

    const credential: KdbxCredential = await new AnyOpsOSCredentialModule().getCredential(userUuid, sessionUuid, credentialUuid);
    const vmwareResponse: fetchResponse = await new AnyOpsOSVmwareModule().connect(host, port, credential.fields.UserName, credential.fields.Password.getText());

    if (!vmwareResponse.ok) return new AnyOpsOSApiGlobalsModule(request, response).invalidResponse(vmwareResponse.statusText);

    // Save the vmware-api-session and host to cookies on the client
    // TODO this will not work on multiple vmware sessions (FIX!! with some kind of storage)
    if (vmwareResponse.headers.raw()['set-cookie'] && vmwareResponse.headers.raw()['set-cookie'][0].startsWith('vmware-api-session')) {
      response.cookie('api-session', vmwareResponse.headers.raw()['set-cookie'][0], {maxAge: 900000, httpOnly: true});
    }

    return new AnyOpsOSApiGlobalsModule(request, response).validResponse();
  }

  @Post('/connectSoap')
  async vmwareConnectSoap(@Req() request: Request,
                          @Res() response: Response,
                          @SessionParam('userUuid') userUuid: string,
                          @SessionParam('id') sessionUuid: string,
                          @BodyParam('host') host: string,
                          @BodyParam('port') port: number,
                          @BodyParam('credentialUuid') credentialUuid: string) {
    logger.info(`[API VMWare] -> connectSoap -> host [${host}], port [${port}]`);

    const credential: KdbxCredential = await new AnyOpsOSCredentialModule().getCredential(userUuid, sessionUuid, credentialUuid);
    const vmwareResponse: fetchResponse = await new AnyOpsOSVmwareModule().connectSoap(host, port, credential.fields.UserName, credential.fields.Password.getText());

    if (!vmwareResponse.ok) return new AnyOpsOSApiGlobalsModule(request, response).invalidResponse(vmwareResponse.statusText);

    // Save the vmware-api-session and host to cookies on the client
    // TODO this will not work on multiple vmware sessions (FIX!! with some kind of storage)
    if (vmwareResponse.headers.raw()['set-cookie'] && vmwareResponse.headers.raw()['set-cookie'][0].startsWith('vmware-api-session')) {
      response.cookie('api-session-soap', vmwareResponse.headers.raw()['set-cookie'][0], {maxAge: 900000, httpOnly: true});
    }

    return new AnyOpsOSApiGlobalsModule(request, response).validResponse();
  }

  @Post('/call')
  async vmwareCall(@Req() request: Request,
                   @Res() response: Response,
                   @BodyParam('host') host: string,
                   @BodyParam('port') port: number,
                   @BodyParam('path') path: string,
                   @CookieParam('api-session') apiCookie: string) {
    logger.info(`[API VMWare] -> call -> host [${host}], port [${port}], path [${path}]`);

    if (!apiCookie) return new AnyOpsOSApiGlobalsModule(request, response).invalidResponse('no_vmware_login_cookie');

    const vmwareResponse: any = await new AnyOpsOSVmwareModule().callApi(host, port, path, apiCookie);
    return new AnyOpsOSApiGlobalsModule(request, response).jsonDataResponse(JSON.parse(vmwareResponse));
  }

  @Post('/callSoap')
  async vmwareCallSoap(@Req() request: Request,
                       @Res() response: Response,
                       @BodyParam('host') host: string,
                       @BodyParam('port') port: number,
                       @BodyParam('action') action: string,
                       @BodyParam('xml') xml: string,
                       @CookieParam('api-session') apiCookie: string) {
    logger.info(`[API VMWare] -> call -> host [${host}], port [${port}], action [${action}]`);

    if (!apiCookie) return new AnyOpsOSApiGlobalsModule(request, response).invalidResponse('no_vmware_login_cookie');

    const vmwareResponse: any = await new AnyOpsOSVmwareModule().callApiSoap(host, port, action, xml, apiCookie);
    return new AnyOpsOSApiGlobalsModule(request, response).jsonDataResponse(JSON.parse(vmwareResponse));
  }

  @Post('/upload_to_datastore')
  async uploadToDatastore(@Req() request: Request,
                          @Res() response: Response,
                          @SessionParam('userUuid') userUuid: string,
                          @SessionParam('id') sessionUuid: string,
                          @BodyParam('path') path: string,
                          @BodyParam('url') url: string,
                          @BodyParam('credentialUuid') credentialUuid?: string) {
    logger.info(`[API VMWare] -> uploadToDatastore -> Uploading file to datastore -> path [${path}], url [${url}]`);

    const fileUrl = parse(url).href;
    const uploadPath = join(new AnyOpsOSGetPathModule().filesystem, path);

    let curlData;

    if (credentialUuid) {
      const credential: KdbxCredential = await new AnyOpsOSCredentialModule().getCredential(userUuid, sessionUuid, credentialUuid);
      curlData = await spawn('curl', ['-k', '-X', 'PUT', '--user', credential.fields.UserName + ':' + credential.fields.Password.getText(), fileUrl, '-T', uploadPath], { capture: [ 'stdout', 'stderr' ]});
    } else {
      curlData = await spawn('curl', ['-k', '-X', 'PUT', fileUrl, '-T', uploadPath], { capture: [ 'stdout', 'stderr' ]});
    }

    return new AnyOpsOSApiGlobalsModule(request, response).jsonDataResponse(curlData);
  }

}
