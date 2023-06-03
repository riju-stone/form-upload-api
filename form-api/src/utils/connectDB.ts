import mongoose, { mongo } from "mongoose";
import log from "../utils/logger";
import config from "config";

async function connectDB() {
	const dbUrl = config.get<string>("dbUrl");
	try {
		await mongoose.connect(dbUrl);
		log.info("Successfully connected to DB");
	} catch (err: any) {
		log.error(err, "Error connecting to DB");
	}
}

export default connectDB;
