import config from "config";
import express from "express";
import multer from "multer";
import rateLimit from "express-rate-limit";
import validateSchema from "../middleware/validateSchema";
import { createUserDataSchema } from "../schema/userData.schema";
import { handleUserDataUpload } from "../controller/userData.controller";

const apiVersion = config.get("apiVersion") as string;
const userDataRoute = express.Router();

const limiter = rateLimit({
	windowMs: 60 * 60 * 1000, // 60 Mins
	max: 5, // 5 successful api requests per 60 mins
	standardHeaders: true,
	legacyHeaders: false,
});

const uploads = multer({ dest: __dirname + "/uploads" });

userDataRoute.post(
	`/api/${apiVersion}/upload`,
	limiter,
	uploads.array("files"),
	validateSchema(createUserDataSchema),
	handleUserDataUpload
);

export default userDataRoute;
