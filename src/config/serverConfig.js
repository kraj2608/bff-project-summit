class ServerConfig {
  constructor() {
    this.userServerConfig = {
      baseURL: "http://localhost:8001/users",
    };
    this.authServerConfig = {
      baseURL: "http://localhost:8001/auth",
    };
    this.productServerConfig = {
      baseURL: "http://localhost:8002/products",
    };
    this.cateogoryServerConfig = {
      baseURL: "http://localhost:8002/category",
    };
  }
}

export const serverConfig = new ServerConfig();
