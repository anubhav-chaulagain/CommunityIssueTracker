import { User } from "../models/User.js";
import { ReportIssue } from "../models/ReportIssue.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Op } from "sequelize";
dotenv.config();

const create = async (req, res) => {
  try {
    const body = req.body;
    console.log(req.body);
    //validation
    if (
      !body?.email ||
      !body?.username ||
      !body?.password ||
      !body?.address ||
      !body?.role
    )
      return res.status(500).send({ message: "Invalid paylod" });
    const hashedPassword = await bcrypt.hash(body.password, 10);
    const users = await User.create({
      name: body.username,
      email: body.email,
      password: hashedPassword,
      address: body.address,
      role: body.role,
    });

    res.status(201).send({ data: users, message: "successfully created user" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

const loginWithEmailAndPassword = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        errorType: "bothEmpty",
        message: "Email and password are required",
      });
    }

    // Ensure exact email match (case-sensitive)

    const user = await User.findOne({
      where: {
        email: {
          [Op.iLike]: email.trim(), // ✅ Case-insensitive email match
        },
      },
    });

    if (!user) {
      return res.status(401).json({
        errorType: "email",
        message: "Email not registered",
      });
    }

    // 🔴 Previously, even if email was incorrect, it tried comparing passwords!
    // 🛠️ Fix: Don't proceed if user is `null` (already checked above)
    const isMatch = user
      ? await bcrypt.compare(password, user.password)
      : false;

    if (!isMatch) {
      return res.status(401).json({
        errorType: "password",
        message: "Incorrect password",
      });
    }

    const userData = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    // Generate token
    const accessToken = jwt.sign(userData, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("token", accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 3600000,
    });

    console.log("Successfully logged in");

    return res.status(200).json({
      message: "Login successful",
      user: userData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const reportIssue = async (req, res) => {
  console.log("Files received:", req.files); // Debugging log
  console.log("Request body:", req.body); // Debugging log

  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ message: "No files uploaded!" });
  }

  try {
    const { title, category, description, location, identity, reportingUser, urgency } = req.body;
    const images = req.files.map((file) => file.filename); // Store filenames

    const votes = "";
    const dislikes = "";

    if (!title || !category || !description || !location) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    const newIssue = await ReportIssue.create({
      title,
      category,
      description,
      location,
      identity: identity === "on",
      images,
      reportingUser,
      votes,
      dislikes,
      urgency,
    });

    console.log("Issue reported:", newIssue);
    res
      .status(201)
      .json({ message: "Issue reported successfully!", issue: newIssue });
  } catch (error) {
    console.error("Error reporting issue:", error);
    res.status(500).json({ message: "Something went wrong!" });
  }
};

const getUserDataFromCookies = async (req, res) => {
  const token = req.cookies.token; // Get token from cookies

  if (!token) {
    return res.status(401).json({ message: "No token found" });
  }

  try {
    console.log("Cookies received:", req.cookies);
    console.log("Token received:", req.cookies.token);
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET); // Decode JWT
    res.json({ user: decoded }); // Send user data to frontend
  } catch (err) {
    return res.status(403).json({ message: "Invalid or Expired Token" });
  }
};

const getAllIssues = async (req, res) => {
  try {
    const issues = await ReportIssue.findAll();
    res.status(200).json({ data: issues });
  } catch (error) {
    console.error("Error fetching issues:", error);
    res.status(500).json({ message: "Failed to fetch issues" });
  }
}

const getMyIssues = async (req, res) => {
  try {
    // ✅ Get user email from token in cookies
    const userEmail = req.user?.email;

    if (!userEmail) {
      return res.status(401).json({ message: "Unauthorized: No email found in token" });
    }

    // ✅ Fetch only the issues where `reportingUser` matches the logged-in user's email
    const issues = await ReportIssue.findAll({
      where: { reportingUser: userEmail }
    });

    res.status(200).json({ data: issues });
  } catch (error) {
    console.error("Error fetching user-specific issues:", error);
    res.status(500).json({ message: "Failed to fetch issues" });
  }
};

const getResolvedIssues = async (req, res) => {
  try {
    // ✅ Get user email from token in cookies
    const userEmail = req.user?.email;

    if (!userEmail) {
      return res.status(401).json({ message: "Unauthorized: No email found in token" });
    }

    // ✅ Fetch only the issues where `reportingUser` matches the logged-in user's email
    const issues = await ReportIssue.findAll({
      where: { status: "Resolved" }
    });

    res.status(200).json({ data: issues });
  } catch (error) {
    console.error("Error fetching user-specific issues:", error);
    res.status(500).json({ message: "Failed to fetch issues" });
  }
};

const updateUser = async (req, res) => {
  try {
    const userEmail = req.user?.email; // ✅ Get user email from token

    if (!userEmail) {
      return res.status(401).json({ message: "Unauthorized: No email found in token" });
    }

    const { name, email, currentPassword, newPassword, confirmPassword } = req.body;

    // ✅ Check if user exists
    const user = await User.findOne({ where: { email: userEmail } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // ✅ If updating password, check `currentPassword`
    let updatedData = {};
    if (newPassword) {
      if (!currentPassword) {
        return res.status(400).json({ errorField: "currentPassword", message: "Current password is required to update password" });
      }

      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
        return res.status(401).json({errorField: "currentPassword", message: "Incorrect current password" });
      }
      if(newPassword !== confirmPassword){
        return res.status(400).json({errorField: "confirmPassword", message: "Passwords do not match"});
      }
      updatedData.password = await bcrypt.hash(newPassword, 10);
    }

    // ✅ Allow updating name or email
    if (name) updatedData.name = name;

    // ✅ Perform the update
    await User.update(updatedData, { where: { email: userEmail } });

    res.status(200).json({ message: "Profile updated successfully!" });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Failed to update profile" });
  }
};


export const userController = {
  create,
  loginWithEmailAndPassword,
  reportIssue,
  getUserDataFromCookies,
  getAllIssues,
  getMyIssues,
  getResolvedIssues,
  updateUser
};
