// Import neccessary modules
import multer from "multer";

// Configure storage with filename and location
const storage = multer.diskStorage({
	destination: (req, file, callback) => {
		callback(null, "./uploads/");
	},
	filename: (req, file, callback) => {
		callback(null, Date.now() + "_" + file.originalname);
	},
});

export const upload = multer({ storage: storage });
