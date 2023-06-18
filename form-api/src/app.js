import express from "express";
import log from "./utils/logger.js";
import cors from "cors";
import connectDB from "./utils/connectDB";
import router from "./routes/routes";
import config from "config";

const app = express();
const port = config.get("port");
const apiVersion = config.get("apiVersion");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

// Render Prescriptions Uploaded
app.use(
	`${apiVersion}/uploaded/prescriptions`,
	express.static("uploads/prescriptions/")
);

// Render Prescriptions Uploaded
app.use(
	`${apiVersion}/uploaded/vaccinations`,
	express.static("uploads/vaccinations/")
);

app.listen(port, async () => {
	log.info(`App Started at: http://localhost:${port}/${apiVersion}/`);
	await connectDB();
});
