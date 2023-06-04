import UserModel from "../models/user.model";
import log from "../utils/logger";

const createUserData = async (req, res, next) => {
	let userData = new UserModel({
		fname: req.body.fname,
		lname: req.body.lname,
		email: req.body.email,
	});

	if (req.files) {
		let path = "";
		req.files.forEach(function (file, index, arr) {
			path = path + file.path + ",";
		});
		path = path.substring(0, path.lastIndexOf(","));
		console.log("File Paths", path);
		userData.files = path;
	}

	let userExists = await UserModel.find({ email: userData.email });
	log.info(userExists);
	if (userExists) {
		log.error("User Already Exists");
		res.sendStatus(400);
	} else {
		userData
			.save()
			.then(() => {
				log.info("User Data Uploaded Successfully");
				res.sendStatus(200);
			})
			.catch((err) => {
				res.sendStatus(400);
				log.error(err, "Could not upload user data");
			});
	}
};

export default createUserData;
