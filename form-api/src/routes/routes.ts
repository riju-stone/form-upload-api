import express from "express";
import log from "../utils/logger";
import userDataRoute from "./postUserData.routes";

const router = express.Router();

// Health Check Route
router.get("/status", (_, res) => {
	res.sendStatus(200);
	log.info("Server Status: Running");
});

// Route for Form Data Upload
router.use(userDataRoute);
