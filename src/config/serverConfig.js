class ServerConfig {
  constructor() {
    this.userServerConfig = {
      baseURL: "http://localhost:8001/users",
    };
    this.authServerConfig = {
      baseURL: "http://localhost:8001/auth",
    };
  }
}

export const serverConfig = new ServerConfig();
