import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const ReportIssue = sequelize.define("ReportIssue", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  identity: {
    type: DataTypes.BOOLEAN,
    defaultValue: false, // false means anonymous
  },
  images: {
    type: DataTypes.JSON, // Store multiple image filenames as an array (e.g., ["img1.jpg", "img2.png"])
    allowNull: true,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "Pending", // Default status when a new issue is reported
  },
  votes: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  dislikes: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  urgency: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  reportingUser: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});
