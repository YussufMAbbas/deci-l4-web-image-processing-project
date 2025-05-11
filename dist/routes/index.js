import { Router } from "express";
import resizeImage from "./api/resizeImage.js";
const router = Router();
router.use("/resizeImage", resizeImage);
router.get("/", (req, res) => {
    res.send("Connected to main router.");
});
export default router;
