import {Controller, Param, Get, Authorized, Put, BodyParam, Req, Res, Delete, Patch} from 'routing-controllers';
import {Request, Response} from 'express';
import {getLogger, Logger} from 'log4js';
import {join} from 'path';

import {AnyOpsOSApiGlobalsModule} from '@anyopsos/module-api-globals';
import {AnyOpsOSGetPathModule} from '@anyopsos/module-get-path';
import {AnyOpsOSConfigFileModule, ConfigFile, ConfigFileData} from '@anyopsos/module-config-file';

const logger: Logger = getLogger('mainlog');

@Authorized()
@Controller('/api/config-file')
export class AnyOpsOSConfigFileApiController {

  @Get('/:configUuid?/:fileName')
  async getConfigFile(@Req() request: Request,
                      @Res() response: Response,
                      @Param('fileName') fileName: string,
                      @Param('configUuid', { required: false }) configUuid?: string) {
    logger.info(`[API configFile] -> Get configFile -> fileName [${fileName}]`);

    const filePath: string = join(new AnyOpsOSGetPathModule().etc, fileName);
    const getResult: ConfigFile | ConfigFileData = await new AnyOpsOSConfigFileModule().get(filePath, configUuid);

    return new AnyOpsOSApiGlobalsModule(request, response).jsonDataResponse(getResult);
  }

  @Put('/:configUuid?/:fileName')
  async putConfigFile(@Req() request: Request,
                      @Res() response: Response,
                      @BodyParam('data') data: ConfigFileData,
                      @Param('fileName') fileName: string,
                      @Param('configUuid', { required: false }) configUuid?: string) {
    logger.info(`[API configFile] -> Put configFile -> fileName [${fileName}], configUuid [${configUuid}]`);

    const filePath: string = join(new AnyOpsOSGetPathModule().etc, fileName);

    const putResult: ConfigFile | ConfigFileData = await new AnyOpsOSConfigFileModule().put(filePath, data, configUuid);
    return new AnyOpsOSApiGlobalsModule(request, response).jsonDataResponse(putResult);
  }

  @Patch('/:configUuid?/:fileName')
  async patchConfigFile(@Req() request: Request,
                        @Res() response: Response,
                        @BodyParam('data') data: ConfigFileData,
                        @Param('fileName') fileName: string,
                        @Param('configUuid', { required: false }) configUuid?: string) {
    logger.info(`[API configFile] -> Patch configFile -> fileName [${fileName}], configUuid [${configUuid}]]`);

    const filePath: string = join(new AnyOpsOSGetPathModule().etc, fileName);

    const patchResult: ConfigFile | { uuid: string; } = await new AnyOpsOSConfigFileModule().patch(filePath, data, configUuid);
    return new AnyOpsOSApiGlobalsModule(request, response).jsonDataResponse(patchResult);
  }

  @Delete('/:configUuid?/:fileName')
  async deleteConfigFile(@Req() request: Request,
                         @Res() response: Response,
                         @Param('fileName') fileName: string,
                         @Param('configUuid', { required: false }) configUuid?: string) {
    logger.info(`[API configFile] -> Delete configFile -> configUuid [${configUuid}], fileName [${fileName}]`);

    const filePath: string = join(new AnyOpsOSGetPathModule().etc, fileName);

    await new AnyOpsOSConfigFileModule().delete(filePath, configUuid);
    return new AnyOpsOSApiGlobalsModule(request, response).validResponse();
  }

}
