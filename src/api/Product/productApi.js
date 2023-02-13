import { Router } from "express";
import productClient from "../../connectors/productClient";

class ProductApi {
  constructor() {
    this.router = new Router({ mergeParams: true });
    this.router.post("", this.addProduct);
  }

  async addProduct(req, res, next) {
    try {
      const response = await productClient.post("", req.body);
      res.status(response.status).send(response.data);
    } catch (error) {
      res.status(error.response.status).send(error.response.data);
    }
  }
}

export default ProductApi;
