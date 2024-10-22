import multer from "multer";

const storage = multer.memoryStorage()

const fileFilter = (req, file, cb) => {
    if(!file) {
        console.log("File not found", file);
        return cb(new Error("File not found"));
    }
    if(file.mimetype !== "image/jpeg" && file.mimetype !== "image/png") {
        console.log("File type not supported");
        
        return cb(new Error("File type not supported"));
    }
    
    console.log(file);
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9); // to make sure the key is unique
    cb(null, file.fieldname + "-" + uniqueSuffix + "." + file.mimetype.split("/")[1]);
};

const upload = multer({ storage, fileFilter });

export default upload;