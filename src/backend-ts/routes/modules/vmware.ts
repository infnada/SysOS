import {fetch} from 'node-fetch';
import xml2js from 'xml2js';

const parseString = xml2js.parseString;

export class VMWareModule {

  constructor() {

  }

  getClientVersion(host, port): Promise<any> {
    const proto = (port === '80' ? 'http' : 'https');

    return fetch(proto + '://' + host + ':' + port + '/client/clients.xml', {
      method: 'GET',
      headers: {
        Accept: 'application/xml',
        'Content-Type': 'application/xml'
      }
    }).then(res => parseString(res));

  }

  connect(host, port, username, password): Promise<any> {
    const proto = (port === '80' ? 'http' : 'https');

    return fetch(proto + '://' + host + ':' + port + '/rest/com/vmware/cis/session', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + new Buffer(username + ':' + password).toString('base64')
      }
    }).then(res => res);

  }

  callApi(host, port, path, cookie): Promise<any> {
    const proto = (port === '80' ? 'http' : 'https');

    // https://code.vmware.com/apis/191/vsphere-automation

    return fetch(proto + '://' + host + ':' + port + '' + path, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Cookie: cookie
      }
    }).then(res => res);

  }

  connectSoap(host, port, username, password) {
    const proto = (port === '80' ? 'http' : 'https');
    const xml = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" ' +
      'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><soap:Body>' +
      '<Login xmlns="urn:vim25"><_this type="SessionManager">SessionManager</_this><userName>' + username + '</userName>' +
      '<password>' + password + '</password></Login></soap:Body></soap:Envelope>';

    // TODO: port?

    return fetch(host + '/sdk', {
      method: 'POST',
      body: xml,
      headers: {
        'Content-Type': 'text/xml',
        SOAPAction: 'urn:vim25/6.0',
        'Content-Length': Buffer.byteLength(xml),
        Expect: '100-continue'
      }
    }).then(res => parseString(res));

  }

  callApiSoap(host, port, action, xml, cookie) {
    const proto = (port === '80' ? 'http' : 'https');

    // api version GET https://mvcenter01.intranet.com/client/clients.xml

    return fetch(host + '/sdk', {
      method: 'POST',
      body: xml,
      headers: {
        'Content-Type': 'text/xml',
        SOAPAction: action,
        'Content-Length': Buffer.byteLength(xml),
        Expect: '100-continue',
        Cookie: cookie
      }
    }).then(res => parseString(res));

  }

}
