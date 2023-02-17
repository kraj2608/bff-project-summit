import { serverConfig } from "../config/serverConfig";
import RestClient from "./restClient";

class UserClient extends RestClient {
  constructor() {
    super(serverConfig.userServerConfig);
    this.requestWithRetry = async (type, url, headers, params, data) => {
      try {
        return await this.makeRequest(type, url, headers, params, data);
      } catch (error) {
        throw error;
      }
    };

    ["get"].forEach((method) => {
      this[method] = async (url, params = null) => {
        try {
          const headers = {
            Accept: "application/json",
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
      this[method] = async (url, data) => {
        try {
          const headers = {
            Accept: "application/json",
          };
          return await this.requestWithRetry(method, url, headers, null, data);
        } catch (error) {
          throw error;
        }
      };
    });
  }
}

export default new UserClient();
