import express from "express";
import rateLimit from "express-rate-limit";
import log from "../utils/logger";
import config from "config";
import multipleFieldsUpload from "../middleware/user.middleware";
import { createUserData } from "../controller/user.controller";

const router = express.Router();
const apiVersion = config.get("apiVersion");

const apiLimiter = rateLimit({
	windowMs: 30 * 60 * 1000, // 60 minutes
	max: 5, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	message:
		"Too many requests made from this IP, please try again after half an hour",
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// Health Check Route
router.get(`/${apiVersion}/status`, (_, res) => {
	res.status(200).send("Server Status: Running");
	log.info("Server Status: Running");
});

// Handle User Data Upload
router.post(
	`/${apiVersion}/upload`,
	apiLimiter,
	multipleFieldsUpload,
	createUserData
);

export default router;
