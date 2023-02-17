import express from "express";

import AuthApi from "./Auth/authApi";
import CartApi from "./Cart/cartApi";
import UserApi from "./Users/userApi";
import ProductApi from "./Product/productApi";
import CategoryApi from "./Category/categoryApi";

const router = express.Router();

const cartApi = new CartApi();
const userApi = new UserApi();
const authApi = new AuthApi();
const productApi = new ProductApi();
const categoryApi = new CategoryApi();

router.use("/cart", cartApi.router);
router.use("/user", userApi.router);
router.use("/auth", authApi.router);
router.use("/product", productApi.router);
router.use("/category", categoryApi.router);

export default router;
