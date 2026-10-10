import express from "express";
import authenticate from "./middleware/authenticate.js"
import axios from "axios"
import UserController from "./controllers/UserController.js";
import ParkirController from "./controllers/ParkirController.js";

const router = express.Router();

//USER
router.get("/user", UserController.get);
router.get("/user/me", authenticate, UserController.me);
router.get("/user/:id", UserController.detail);
router.post("/user", UserController.store);
router.post("/user/login", UserController.login);
router.post("/user/register", UserController.register);
router.put("/user/:id", UserController.update);
router.delete("/user/:id", UserController.delete);


router.get("/bitcoin-price-index", async (req, res) => {
    const response = await axios.get("https://api.diadata.org/v1/assetQuotation/BinanceSmartChain/0x0000000000000000000000000000000000000000")
    return res.json(response.data);
});

router.get("/parkir",authenticate, ParkirController.get);
router.post("/parkir",authenticate, ParkirController.order);
router.put("/parkir/:id",authenticate, ParkirController.update);
router.delete( "/parkir/:id", authenticate,ParkirController.cancel);
export default router;
