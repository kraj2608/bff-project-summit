import { Router } from "express";
import HttpStatus from "http-status-codes";
import authClient from "../../connectors/authClient";
import Authorizer from "../../middleware/authorize";

class AuthApi {
  constructor() {
    this.router = new Router({ mergeParams: true });
    this.router.post("", this.signInUser);
    this.router.get("/refresh", this.refreshToken);
    this.router.get("", this.checkAuth);
  }

  async checkAuth(req, res, next) {
    const token = req.headers.authorization;
    try {
      const result = await authClient.get("", token);
      if (result.status === 200 && result.data.status_code === 200) {
        res
          .status(HttpStatus.OK)
          .send({ message: "User authorized succesfully" });
        return;
      } else {
        res
          .status(HttpStatus.UNAUTHORIZED)
          .send({ message: "User authorization error" });
      }
    } catch (error) {
      res
        .status(HttpStatus.UNAUTHORIZED)
        .send({ message: "User authorization error" });
    }
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

  async refreshToken(req, res, next) {
    const refreshToken = req.headers.authorization;
    try {
      const response = await authClient.get("/refresh", refreshToken, {
        IsRefreshToken: true,
      });
 
      res.status(response.status).send(response.data);
    } catch (error) {
      res.status(error.response.status).send(error.response.data);
    }
  }
}

export default AuthApi;
