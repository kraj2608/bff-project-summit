import { Router } from "express";
import authClient from "../../connectors/authClient";

class AuthApi {
  constructor() {
    this.router = new Router({ mergeParams: true });
    this.router.post("", this.signInUser);
  }

  async signInUser(req, res, next) {
    try {
      const response = await authClient.post("", req.body);
      res.set("Authorization", response.headers.authorization);
      res.status(response.status).send(response.data);
    } catch (error) {
      res.status(error.response.status).send(error.response.data);
    }
  }
}

export default AuthApi;
