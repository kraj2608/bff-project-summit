import { serverConfig } from "../config/serverConfig";
import RestClient from "./restClient";

class CategoryClient extends RestClient {
  constructor() {
    super(serverConfig.cateogoryServerConfig);
    this.requestWithRetry = async (type, url, headers, data) => {
      try {
        return await this.makeRequest(type, url, headers, data);
      } catch (error) {
        throw error;
      }
    };

    ["get"].forEach((method) => {
      this[method] = async (url) => {
        try {
          const headers = {
            Accept: "application/json",
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

export default new CategoryClient();
