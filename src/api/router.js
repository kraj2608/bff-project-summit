import express from "express";
import Authorizer from "../middleware/authorize";

import AuthApi from "./Auth/authApi";
import CartApi from "./Cart/cartApi";
import UserApi from "./Users/userApi";
import ProductApi from "./Product/productApi";

const router = express.Router();

const cartApi = new CartApi();
const userApi = new UserApi();
const authApi = new AuthApi();
const productApi = new ProductApi();

router.use("/cart", Authorizer([], []), cartApi.router);
router.use("/user", userApi.router);
router.use("/auth", authApi.router);
router.use("/product", Authorizer(["GET"], []), productApi.router);
// router.use("/product", productApi.router);

export default router;
