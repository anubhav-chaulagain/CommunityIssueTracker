import cors from 'cors';
import express from 'express';
import database from './database/database.js';
import upload from './middleware/multerConfig.js';
import { verifyToken } from './middleware/validateToken.js';
import { userController } from './controllers/userController.js';
import cookieParser from 'cookie-parser';

const app = express();

// ✅ Allow frontend (http://localhost:5173) to access backend
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

app.use(express.static('images')); // Serve uploaded images

// ✅ Multer should come before express.json()
app.post('/reportIssues', upload.array("imagesUploader", 3), userController.reportIssue);

app.use(express.json()); // ⛔️ Must come AFTER Multer
app.use(cookieParser()); // Parse cookies
app.use(express.urlencoded({ extended: true })); // Needed for FormData

app.post('/users/signup', userController.create);
app.post('/users/login', userController.loginWithEmailAndPassword);
app.get('/users',verifyToken, userController.getUserDataFromCookies)
app.patch('/users',verifyToken, userController.updateUser);
app.get('/issues', userController.getAllIssues);
app.patch('/issues',verifyToken, userController.updateIssues);
app.get('/myIssues',verifyToken, userController.getMyIssues);
app.get('/resolvedIssues',verifyToken, userController.getResolvedIssues);

app.get('/auth/me', verifyToken, userController.getMe);
app.get('/auth/logout', userController.logout);


app.listen(3000, function () {
  database();
});
