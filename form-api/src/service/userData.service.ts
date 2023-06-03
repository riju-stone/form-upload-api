import UserDataModel, { UserData } from "../model/userdata.model";

export function createUserData(input: Partial<UserData>) {
	return UserDataModel.create(input);
}
