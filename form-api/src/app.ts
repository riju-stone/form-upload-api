import express from "express";
import config from "config";
import log from "./utils/logger";
import cors from "cors";
import connectDB from "./utils/connectDB";

const app = express();
const port = config.get("port");

app.use(cors());
app.use(express.json());
app.listen(port, async () => {
	log.info(`App Started at: http://localhost:${port}`);
	await connectDB();
});
