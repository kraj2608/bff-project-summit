import { Router } from "express";
import StatusCode from "http-status-codes";
import cartClient from "../../connectors/cartClient";
import userClient from "../../connectors/userClient";

class CartApi {
  constructor() {
    this.router = new Router({ mergeParams: true });
    this.router.post("", this.createCart);
    this.router.delete("/:id", this.deleteCart);
    this.router.get("/user/:email", this.getCarts);
    this.router.post("/:id/products", this.addProductToCart);
    this.router.delete("/:id/products/:productId", this.removeProductFromCart);
  }

  async removeProductFromCart(req, res, next) {
    try {
      const response = await cartClient.delete(req.url);
      res.status(response.status).send(response.data);
    } catch (error) {
      res.status(error.response.status).send(error.response.data);
    }
  }

  async addProductToCart(req, res, next) {
    const id = req.params.id;
    try {
      const response = await cartClient.post("/" + id + "/products", req.body);
      res.status(response.status).send(response.data);
    } catch (error) {
      res.status(error.response.status).send(error.response.data);
    }
  }

  async getCarts(req, res, next) {
    try {
      const response = await cartClient.get("/user/" + req.params.email);
      res.status(response.status).send(response.data);
    } catch (error) {
      res.status(error.response.status).send(error.response.data);
    }
  }

  async deleteCart(req, res, next) {
    try {
      const response = await cartClient.delete("/" + req.params.id, null);
      res.status(response.status).send(response.data);
    } catch (error) {
      res.status(StatusCode.BAD_REQUEST).send();
    }
  }

  async createCart(req, res, next) {
    try {
      const userCheck = await userClient.get("/" + req.body.owner_email);

      if (userCheck.data.status_code === 200) {
        const response = await cartClient.post("", req.body);
        res.status(response.status).send(response.data);
      } else {
        res.status(StatusCode.UNAUTHORIZED).send();
      }
    } catch (error) {
      res.status(StatusCode.BAD_REQUEST).send();
    }
  }
}

export default CartApi;
