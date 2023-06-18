import multer from "multer";
import path from "path";
import log from "../utils/logger";

const storage = multer.diskStorage({
	destination: (req, file, callback) => {
		if (file.fieldname == "prescriptions")
			callback(null, "uploads/prescriptions/");
		else if (file.fieldname == "vaccinations")
			callback(null, "uploads/vaccinations/");
	},
	filename: (req, file, callback) => {
		let ext = path.extname(file.originalname);
		callback(
			null,
			file.originalname.replace(" ", "_").split(".")[0] + "_" + Date.now() + ext
		);
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
			res.status(400).send("Unsupported file extension")
			callback(null, false);
		}
	},
	limits: {
		fileSize: 1024 * 1024 * 2, // Max 2MB File Allowed
	},
});

let multipleFieldsUpload = userUpload.fields([
	{ name: "prescriptions", maxCount: 4 },
	{ name: "vaccinations", maxCount: 4 },
]);

export default multipleFieldsUpload;
