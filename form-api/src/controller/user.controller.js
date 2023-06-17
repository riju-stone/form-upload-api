import express from "express";
import UserModel from "../models/user.model";
import log from "../utils/logger";

let userEmail = null;

export const createUserData = async (req, res, next) => {
	let userData = new UserModel({
		fname: req.body.fname,
		lname: req.body.lname,
		email: req.body.email,
	});

	userEmail = req.body.email;

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
	if (userExists[0] == {}) {
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

export const getUserData = () => async (_, res) => {
	let userData = await UserModel.find({ email: userEmail });
	let fileData = "";
	if (userData[0] != {}) {
		fileData = userData[0].files;
	} else {
		res.sendStatus(400);
		log.error("Could not locate user data in database");
	}

	fileData = fileData.split(",");
	log.info(JSON.stringify(fileData), " File Data");

	fileData.forEach((i) => res.send(`http://localhost:3010/${fileData[i]}`));
};
