import {
	Severity,
	modelOptions,
	prop,
	DocumentType,
	getModelForClass,
} from "@typegoose/typegoose";
import log from "../utils/logger";

@modelOptions({
	schemaOptions: { timestamps: true },
	options: { allowMixed: Severity.ALLOW },
})
export class UserData {
	@prop({ unique: true, required: true })
	email: string;

	@prop({ required: true })
	fname: string;

	@prop({ required: true })
	lname: string;

	@prop({})
	files: Array<string> | null;

	// validateFileUpload(this: DocumentType<UserData>, files: Array<string>) {
	// 	try {
	// 		return files.length <= 5;
	// 	} catch (err) {
	// 		log.error("Cannot upload more than 5 files");
	// 	}
	// }
}

const UserDataModel = getModelForClass(UserData);
export default UserDataModel;
