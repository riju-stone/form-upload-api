import express from "express";
import log from "./utils/logger.js";
import cors from "cors";
import connectDB from "./utils/connectDB";
import router from "./routes/routes";

const app = express();
const port = "3010";

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

app.listen(port, async () => {
	log.info(`App Started at: http://localhost:${port}`);
	await connectDB();
});
