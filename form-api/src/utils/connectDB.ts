import mongoose, { mongo } from "mongoose";
import log from "../utils/logger";
import config from "config";

async function connectDB() {
	const dbUrl = config.get<string>("dbUrl");
	try {
		await mongoose.connect(dbUrl);
	} catch (err) {
		log.error("Error Connecting to Database: ", err);
	}
}

export default connectDB;
