import mongoose from "mongoose";

async function connectToDatabase() {
	try {
		console.log("connecting...");
		await mongoose.connect(process.env.DATABASE_URL);
		console.log("Connection established");
	} catch (err) {
		console.error(err);
	}
}

export default connectToDatabase;
