import axios from "axios";

class RestClient {
  constructor(config) {
    this.axiosInstance = axios.create(config);
  }

  async makeRequest(type, url, headers, body) {
    return await this.axiosInstance({
      url: url,
      method: type,
      data: body,
      headers: headers,
    });
  }
}

export default RestClient;

export const restClient = new RestClient();
