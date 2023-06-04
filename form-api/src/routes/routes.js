import express from "express";
import log from "../utils/logger";
import userUpload from "../middleware/user.middleware";
import createUserData from "../controller/user.controller";

const router = express.Router();

// Health Check Route
router.get("/status", (_, res) => {
	res.sendStatus(200);
	log.info("Server Status: Running");
});

// Handle User Data Upload
router.post("/upload", userUpload.array("files[]"), createUserData);

export default router;
