import multer from "multer";

// Configure Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");  // Specify upload directory (this is the 'uploads' folder you created)
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Give the file a unique name
  }
});

// Filter for valid file types (e.g., images)
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);  // Accept the file
  } else {
    cb(new Error("Invalid file type, only JPG, JPEG, and PNG are allowed."), false);
  }
};

// Create Multer instance with configuration
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 },  // Limit file size (e.g., 10MB)
  fileFilter: fileFilter,
});

export default upload;
