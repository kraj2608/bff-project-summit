import express from "express";
import Authorizer from "../middleware/authorize";

import AuthApi from "./Auth/authApi";
import CartApi from "./Cart/cartApi";
import UserApi from "./Users/userApi";

const router = express.Router();

const cartApi = new CartApi();
const userApi = new UserApi();
const authApi = new AuthApi();

router.use("/cart", Authorizer(), cartApi.router);
router.use("/user", userApi.router);
router.use("/auth", authApi.router);

export default router;
