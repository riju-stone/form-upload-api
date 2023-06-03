import { UserDataSchema } from "../schema/userData.schema";
import { Request, Response } from "express";
import { createUserData } from "../service/userData.service";

export async function handleUserDataUpload(
	req: Request<{}, {}, UserDataSchema>,
	res: Response
) {
	const body = req.body;

	try {
		const userData = createUserData(body);
		return res.send("User Data Successfully Uploaded to DB");
	} catch (err: any) {
		if (err.code === 11000) {
			return res.status(409).send("User Data already axists");
		}

		return res.status(500).send(err);
	}
}
