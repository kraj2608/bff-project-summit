import { Router } from "express";
import categoryClient from "../../connectors/categoryClient";
import productClient from "../../connectors/productClient";

class CategoryApi {
  constructor() {
    this.router = new Router({ mergeParams: true });
    this.router.get("", this.getAllCategories);
  }

  async getAllCategories(req, res, next) {
    try {
      const response = await categoryClient.get("");
      res.status(response.status).send(response.data);
    } catch (error) {
      res.status(error.response.status).send(error.response.data);
    }
  }
}

export default CategoryApi;
