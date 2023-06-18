import UserModel from "../models/user.model";
import log from "../utils/logger";

const formatFileUploadPath = (files) => {
	let paths = "";

	files.forEach((file, index, arr) => {
		paths = paths + file.path + ",";
	});

	paths = paths.substring(0, paths.lastIndexOf(","));
	paths = paths.replaceAll("\\", "/");

	return paths;
};

export const createUserData = async (req, res, next) => {
	let userData = new UserModel({
		fname: req.body.fname,
		lname: req.body.lname,
		email: req.body.email,
	});

	log.info(req.files, "Files Uploaded");

	if (req.files) {
		// Handling Prescriptions Files
		userData.prescriptions = formatFileUploadPath(req.files.prescriptions);

		// Handling Vaccination Files
		userData.vaccinations = formatFileUploadPath(req.files.vaccinations);
	}

	let userExists = await UserModel.exists({ email: userData.email });
	log.info(userExists, "Existing User Data");
	if (userExists) {
		log.error("User Already Exists");
		res.status(400).send("User Already Exists");
	} else {
		userData
			.save()
			.then(() => {
				log.info("User Data Uploaded Successfully");
				res.status(200).send("User Data Uploaded Successfully");
			})
			.catch((err) => {
				res.status(400).send("Could not upload user data");
				log.error(err, "Could not upload user data");
			});
	}
};
