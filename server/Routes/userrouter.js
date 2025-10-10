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
  addcontribution,
  acceptcont,
  rejectcont,
  revertcont,
  ideaslist,
  addSection,
  getsection,
  messaging,
  allusers,
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
userrouter.post("/addcontribution", userAuth, addcontribution);
userrouter.post("/addbadge", addbadge);
userrouter.get("/allbadge", allBadges);
userrouter.post("/acceptrequest", userAuth,acceptcont);
userrouter.post("/rejectrequest", userAuth,rejectcont);
userrouter.post("/revertrequest", userAuth,revertcont);
userrouter.post("/ideaslist", userAuth,ideaslist);
userrouter.post("/addsection", userAuth,addSection);
userrouter.post("/getsection",getsection);
userrouter.get('/:senderid/:receiverid',messaging);
userrouter.get('/users-info',allusers);

export default userrouter;
