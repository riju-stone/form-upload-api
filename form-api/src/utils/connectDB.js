import mongoose from "mongoose";
import log from "./logger.js";
import config from "config";

let dbUrl = config.get("dbUrl");

async function connectDB() {
	try {
		mongoose.connect(dbUrl, {
			useUnifiedTopology: true,
			useNewUrlParser: true,
		});
		log.info("Successfully connected to DB");
	} catch (err) {
		log.error(err, "Error connecting to DB");
	}
}

export default connectDB;
