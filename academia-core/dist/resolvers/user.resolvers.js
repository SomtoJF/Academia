import User from "../models/user.model.js";
export async function getUser(userId) {
    return await User.findById(userId);
}
export async function createUser(edits) {
    try {
        const newUser = new User(edits);
        return await newUser.save();
    }
    catch (err) {
        throw err;
    }
}
var Role;
(function (Role) {
    Role[Role["EXAMINER"] = 0] = "EXAMINER";
    Role[Role["STUDENT"] = 1] = "STUDENT";
})(Role || (Role = {}));
