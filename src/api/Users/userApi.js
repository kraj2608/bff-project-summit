import { Router } from "express";
import userClient from "../../connectors/userClient";

class UserApi {
  constructor() {
    this.router = new Router({ mergeParams: true });
    this.router.post("", this.signUpUser);
  }

  async signUpUser(req, res, next) {
    try {
      const response = await userClient.post("", req.body);
      res.status(response.status).send(response.data);
    } catch (error) {
      res.status(error.response.status).send(error.response.data);
    }
  }
}

export default UserApi;
