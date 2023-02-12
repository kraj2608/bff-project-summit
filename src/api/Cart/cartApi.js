import { Router } from "express";

class CartApi {
  constructor() {
    this.router = new Router({ mergeParams: true });
    this.router.post("", this.createCart);
  }

  async createCart(req, res, next) {
    try {
      res.send("HEllo");
    } catch (error) {}
  }
}

export default CartApi;
