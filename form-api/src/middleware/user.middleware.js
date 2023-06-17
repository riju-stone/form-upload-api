import multer from "multer";
import path from "path";
import log from "../utils/logger";

const storage = multer.diskStorage({
	destination: (req, file, callback) => {
		callback(null, "uploads/");
	},
	filename: (req, file, callback) => {
		let ext = path.extname(file.originalname);
		callback(null, file.originalname.split(".")[0] + "-" + Date.now() + ext);
	},
});

let userUpload = multer({
	storage: storage,
	fileFilter: (req, file, callback) => {
		if (
			file.mimetype == "image/png" ||
			file.mimetype == "image/jpg" ||
			file.mimetype == "image/jpeg" ||
			file.mimetype == "application/pdf"
		) {
			callback(null, true);
		} else {
			log.error("Incorrect File Extension: ", file);
			callback(null, false);
		}
	},
	limits: {
		fileSize: 1024 * 1024 * 5, // Max 5MB File Allowed
	},
});

export default userUpload;
