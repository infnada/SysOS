import {Controller, Param, Get, Authorized, Put, BodyParam, Req, Res, Delete, Patch} from 'routing-controllers';
import {SessionParam} from 'routing-controllers/decorator/SessionParam';
import {Request, Response} from 'express';
import {getLogger, Logger} from 'log4js';

import {AnyOpsOSApiGlobalsModule} from '@anyopsos/module-api-globals';
import {AnyOpsOSConfigFileModule, ConfigFile, ConfigFileData} from '@anyopsos/module-config-file';


const logger: Logger = getLogger('mainLog');

@Authorized()
@Controller('/api/config-file')
export class AnyOpsOSConfigFileApiController {

  @Get('/:workspaceUuid/:fileName/:configUuid?')
  async getConfigFile(@Req() request: Request,
                      @Res() response: Response,
                      @SessionParam('userUuid') userUuid: string,
                      @SessionParam('id') sessionUuid: string,
                      @Param('workspaceUuid') workspaceUuid: string,
                      @Param('fileName') fileName: string,
                      @Param('configUuid', { required: false }) configUuid?: string) {
    logger.info(`[API configFile] -> Get configFile -> workspaceUuid [${workspaceUuid}], fileName [${fileName}], configUuid [${configUuid}]`);

    const ConfigFileModule: AnyOpsOSConfigFileModule = new AnyOpsOSConfigFileModule(userUuid, sessionUuid, workspaceUuid);
    const ApiGlobalsModule: AnyOpsOSApiGlobalsModule = new AnyOpsOSApiGlobalsModule(request, response);

    const getResult: ConfigFile | ConfigFileData = await ConfigFileModule.get(fileName, configUuid);

    return ApiGlobalsModule.jsonDataResponse(getResult);
  }

  @Put('/:workspaceUuid/:fileName/:configUuid?')
  async putConfigFile(@Req() request: Request,
                      @Res() response: Response,
                      @SessionParam('userUuid') userUuid: string,
                      @SessionParam('id') sessionUuid: string,
                      @BodyParam('data') data: ConfigFileData,
                      @Param('workspaceUuid') workspaceUuid: string,
                      @Param('fileName') fileName: string,
                      @Param('configUuid', { required: false }) configUuid?: string) {
    logger.info(`[API configFile] -> Put configFile -> workspaceUuid [${workspaceUuid}], fileName [${fileName}], configUuid [${configUuid}]`);

    const ConfigFileModule: AnyOpsOSConfigFileModule = new AnyOpsOSConfigFileModule(userUuid, sessionUuid, workspaceUuid);
    const ApiGlobalsModule: AnyOpsOSApiGlobalsModule = new AnyOpsOSApiGlobalsModule(request, response);

    const putResult: ConfigFile | ConfigFileData = await ConfigFileModule.put(fileName, data, configUuid);

    return ApiGlobalsModule.jsonDataResponse(putResult);
  }

  @Patch('/:workspaceUuid/:fileName/:configUuid?')
  async patchConfigFile(@Req() request: Request,
                        @Res() response: Response,
                        @SessionParam('userUuid') userUuid: string,
                        @SessionParam('id') sessionUuid: string,
                        @BodyParam('data') data: ConfigFileData,
                        @Param('workspaceUuid') workspaceUuid: string,
                        @Param('fileName') fileName: string,
                        @Param('configUuid', { required: false }) configUuid?: string) {
    logger.info(`[API configFile] -> Patch configFile -> workspaceUuid [${workspaceUuid}], fileName [${fileName}], configUuid [${configUuid}]`);

    const ConfigFileModule: AnyOpsOSConfigFileModule = new AnyOpsOSConfigFileModule(userUuid, sessionUuid, workspaceUuid);
    const ApiGlobalsModule: AnyOpsOSApiGlobalsModule = new AnyOpsOSApiGlobalsModule(request, response);

    const patchResult: ConfigFile | { uuid: string; } = await ConfigFileModule.patch(fileName, data, configUuid);

    return ApiGlobalsModule.jsonDataResponse(patchResult);
  }

  @Delete('/:workspaceUuid/:fileName/:configUuid?')
  async deleteConfigFile(@Req() request: Request,
                         @Res() response: Response,
                         @SessionParam('userUuid') userUuid: string,
                         @SessionParam('id') sessionUuid: string,
                         @Param('workspaceUuid') workspaceUuid: string,
                         @Param('fileName') fileName: string,
                         @Param('configUuid', { required: false }) configUuid?: string) {
    logger.info(`[API configFile] -> Delete configFile -> workspaceUuid [${workspaceUuid}], fileName [${fileName}], configUuid [${configUuid}]`);

    const ConfigFileModule: AnyOpsOSConfigFileModule = new AnyOpsOSConfigFileModule(userUuid, sessionUuid, workspaceUuid);
    const ApiGlobalsModule: AnyOpsOSApiGlobalsModule = new AnyOpsOSApiGlobalsModule(request, response);

    await ConfigFileModule.delete(fileName, configUuid);

    return ApiGlobalsModule.validResponse();
  }

}
