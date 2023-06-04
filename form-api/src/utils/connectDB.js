import mongoose from "mongoose";
import log from "./logger.js";

async function connectDB() {
	try {
		await mongoose.connect("", {
			useUnifiedTopology: true,
			useNewUrlParser: true,
		});
		log.info("Successfully connected to DB");
	} catch (err) {
		log.error(err, "Error connecting to DB");
	}
}

export default connectDB;
