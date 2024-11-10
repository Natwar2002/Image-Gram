import dotenv from "dotenv";

dotenv.config();

export const DB_URL = process.env.DB_URL;
export const CLOUD_NAME = process.env.CLOUD_NAME;
export const API_KEY = process.env.API_KEY;
export const API_SECRET = process.env.API_SECRET;
export const JWT_SECRET = process.env.JWT_SECRET;