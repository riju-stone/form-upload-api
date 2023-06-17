import express from "express";
import rateLimit from "express-rate-limit";
import log from "../utils/logger";
import userUpload from "../middleware/user.middleware";
import UserModel from "../models/user.model";
import { createUserData, getUserData } from "../controller/user.controller";

const router = express.Router();

const apiLimiter = rateLimit({
	windowMs: 30 * 60 * 1000, // 60 minutes
	max: 5, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	message:
		"Too many requests made from this IP, please try again after half an hour",
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// Health Check Route
router.get("/status", (_, res) => {
	res.sendStatus(200);
	log.info("Server Status: Running");
});

// Handle User Data Upload
router.post("/upload", apiLimiter, userUpload.array("files[]"), createUserData);

// Handle fetching User Data
router.get("/files/uploaded/", express.static("uploads"));

export default router;
