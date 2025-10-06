import express from "express";
import {
  userdata,
  registeruser,
  logout,
  login,
  changedp,
  insertidea,
  removeidea,
  addcontributor,
  isauth,
  addbadge,
  allBadges,
  updateidea,
  getidea,
} from "../Controller/DataController.js";
import multer from "multer";
import path from "path";
import userAuth from "../userAuth.js";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

const userrouter = express.Router();

userrouter.post("/register", upload.single("profileimage"), registeruser);
userrouter.get("/userdata", userAuth, userdata);
userrouter.get("/auth", userAuth, isauth);
userrouter.get("/logout", userAuth, logout);
userrouter.post("/login", login);
userrouter.post(
  "/changeprofile",
  upload.single("currimage"),
  userAuth,
  changedp
);
userrouter.post("/addidea", userAuth, insertidea);
userrouter.post("/updateidea", userAuth, updateidea);
userrouter.post("/removeidea", removeidea);
userrouter.post("/getidea", getidea);
userrouter.post("/addcontributor", userAuth, addcontributor);
userrouter.post("/addbadge", addbadge);
userrouter.get("/allbadge", allBadges);

export default userrouter;
