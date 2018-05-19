/*jslint node: true */
"use strict";

module.exports = function (req, res) {

  return {
    /**
     * Response No Valid
     *
     * @param {String} input input that causes the error
     * @param {String} text information about the error
     */
    responseNoValid: function (input, text) {
      return res.json(
        {
          status: "error",
          data: {
            input: input,
            text: text
          }
        }
      );
    },
    serverError: function (err) {
      console.log(err);

      return res.json(
        {
          status: "error",
          data: (err ? err : "server_error")
        }
      );
    },
    validResponse: function () {
      return res.json(
        {
          status: "ok"
        }
      );
    },
    responseData: function (uuid, type, data) {
      return res.json(
        {
          status: "ok",
          data: {
            uuid: uuid,
            type: type,
            data: data
          }
        }
      );
    },
    responseJsonData: function (data) {
      return res.json(
        {
          status: "ok",
          data: {
            response: data
          }
        }
      );
    },
    /**
     * Invalid Cookies
     *
     * @description
     * ioEmits a message to the client if detects an invalid cookie value or if the cookie value
     * is not the same that session value
     */
    invalidCookies: function (req) {
      return req.io.sockets
        .in(req.session.sessionID)
        .emit("message", '["invalid-cookies"]');
    }
  };

};
