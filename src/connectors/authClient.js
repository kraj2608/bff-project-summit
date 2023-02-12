import { serverConfig } from "../config/serverConfig";
import RestClient from "./restClient";

class AuthClient extends RestClient {
  constructor() {
    super(serverConfig.authServerConfig);
    this.requestWithRetry = async (type, url, headers, data) => {
      try {
        return await this.makeRequest(type, url, headers, data);
      } catch (error) {
        throw error;
      }
    };

    ["get"].forEach((method) => {
      this[method] = async (url, token) => {
        try {
          const headers = {
            Accept: "application/json",
            Authorization: token,
          };
          return await this.requestWithRetry(method, url, headers, null);
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
          return await this.requestWithRetry(method, url, headers, data);
        } catch (error) {
          throw error;
        }
      };
    });
  }
}

export default new AuthClient();
