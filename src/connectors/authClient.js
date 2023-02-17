import { serverConfig } from "../config/serverConfig";
import RestClient from "./restClient";

class AuthClient extends RestClient {
  constructor() {
    super(serverConfig.authServerConfig);
    this.requestWithRetry = async (type, url, headers, params, data) => {
      try {
        return await this.makeRequest(type, url, headers, params, data);
      } catch (error) {
        throw error;
      }
    };

    ["get"].forEach((method) => {
      this[method] = async (
        url,
        token,
        customHeaders = null,
        params = null
      ) => {
        try {
          const headers = {
            Accept: "application/json",
            Authorization: token,
            ...customHeaders,
          };
          return await this.requestWithRetry(
            method,
            url,
            headers,
            params,
            null
          );
        } catch (error) {
          throw error;
        }
      };
    });

    ["post"].forEach((method) => {
      this[method] = async (url, data, params = null) => {
        try {
          const headers = {
            Accept: "application/json",
          };
          return await this.requestWithRetry(
            method,
            url,
            headers,
            params,
            data
          );
        } catch (error) {
          throw error;
        }
      };
    });
  }
}

export default new AuthClient();
