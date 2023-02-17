import { Router } from "express";
import cartClient from "../../connectors/cartClient";

class CartApi {
  constructor() {
    this.router = new Router({ mergeParams: true });
    this.router.post("", this.createCart);
  }

  async createCart(req, res, next) {
    try {
      const response = await cartClient.post("", req.body);
      res.status(response.status).send(response.data);
    } catch (error) {
      res.status(error.response.status).send(error.response.data);
    }
  }
}

export default CartApi;
