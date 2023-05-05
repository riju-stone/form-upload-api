import express from "express";
import config from "config";
import log from "./utils/logger";

const app = express();
const port = config.get("port");

app.listen(port, () => {
	log.info(`App Started at: http://localhost:${port}`);
});
