import multer from 'multer';
import path from 'path';

// Define storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images/'); // Store files in 'images/' directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  }
});

// File filter (optional)
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only images (JPEG, PNG, JPG) are allowed'), false);
  }
};

// Initialize multer
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // Limit file size to 5MB
});

export default upload; // ✅ Ensure we export a Multer instance
