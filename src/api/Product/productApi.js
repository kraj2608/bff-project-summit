import { Router } from "express";
import productClient from "../../connectors/productClient";

class ProductApi {
  constructor() {
    this.router = new Router({ mergeParams: true });
    this.router.post("", this.addProduct);
    this.router.get("", this.getAllProducts);
    this.router.get("/:productId", this.getProduct);
  }

  async getAllProducts(req, res, next) {
    try {
      const response = await productClient.get("");
      res.status(response.status).send(response.data);
    } catch (error) {
      res.status(error.response.status).send(error.response.data);
    }
  }

  async addProduct(req, res, next) {
    try {
      const response = await productClient.post("", req.body);
      res.status(response.status).send(response.data);
    } catch (error) {
      res.status(error.response.status).send(error.response.data);
    }
  }

  async getProduct(req, res, next) {
    const productId = req.params.productId;
    try {
      const url = "/" + productId;
      const response = await productClient.get(url);
      res.status(response.status).send(response.data);
    } catch (error) {
      res.status(error.response.status).send(error.response.data);
    }
  }
}

export default ProductApi;
