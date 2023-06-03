import { object, string, array, TypeOf } from "zod";

export const createUserDataSchema = object({
	body: object({
		email: string({
			required_error: "Email is Required",
		}),
		fname: string({
			required_error: "First Name is Required",
		}),
		lname: string({
			required_error: "Last Name is Required",
		}),
		files: array(string({})).max(5, "Can upload maximum 5 files"),
	}),
});

export type UserDataSchema = TypeOf<typeof createUserDataSchema>["body"];
