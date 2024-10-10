import { v2 as cloudinary} from ("cloudinary").v2;
import { API_KEY, API_SECRET, CLOUD_NAME } from "./serverConfig";

cloudinary.config({
    CLOUD_NAME: CLOUD_NAME,
    API_KEY: API_KEY,
    API_SECRET: API_SECRET,
});
