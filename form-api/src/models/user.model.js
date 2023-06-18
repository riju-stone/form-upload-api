import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
	{
		email: { type: String, required: true, unique: true },
		fname: { type: String, required: true },
		lname: { type: String, required: true },
		prescriptions: { type: String },
		vaccinations: { type: String },
	},
	{ timestamps: true }
);

const UserModel = mongoose.model("User", UserSchema);

export default UserModel;
