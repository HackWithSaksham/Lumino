import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { badgemodel, ideamodel, usermodel } from "../Models/model.js";
import transporter from "../config/NodeMailer.js";

export const registeruser = async (req, res) => {
  const { name, country, passion, email, password } = req.body;
  const profileimage = req.file
    ? `/uploads/${req.file.filename}`
    : "/uploads/default.png";
  if (!name || !country || !email || !passion || !password) {
    return res.json({ success: false, message: "Input fields Required" });
  }
  try {
    const alreadyemail = await usermodel.findOne({ email });
    if (alreadyemail) {
      return res.json({ success: false, message: "Email already Registered" });
    }
    const hashedpassword = await bcrypt.hash(password, 10);
    const user = new usermodel({
      name,
      email,
      password: hashedpassword,
      country,
      passion,
      profileimage,
    });
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    const mailoption = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "Welcome To Lumino",
      text: `Email Registered,Your email is ${email}`,
    };
    await transporter.sendMail(mailoption);
    return res.json({ success: true, message: "Account Created" });
  } catch (e) {
    res.json({ success: false, message: e.message });
  }
};

export const isauth = async(req,res)=>{
  try {
    const user = req.user;
    if (user) {
      return res.json({
        success: true
      });
    } else {
      return res.json({ success: false});
    }
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
}

export const userdata = async (req, res) => {
  try {
    const user = req.user;
    if (user) {
      return res.json({
        success: true,
        message: "logged in",
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
          rank: user.rank,
          profileimage: user.profileimage,
          passion:user.passion,
          streak:user.streak,
          country:user.country,
          badges:user.badges,
          ideas:user.ideas,
          contribution: user.contribution
        },
      });
    } else {
      return res.json({ success: false, message: "not logged in" });
    }
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    });
    return res.json({
      success: true,
      message: "logged out",
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.json({ success: false, message: "Input fields Required" });
  }
  try {
    const user = await usermodel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "Enter Valid Email" });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.json({ success: false, message: "Incorrect Password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.json({ success: true, message: "Logged in" });
  } catch (e) {
    res.json({ success: false, message: e.message });
  }
};

export const changedp = async (req, res) => {
  try {
    const currimage = req.file
      ? `/uploads/${req.file.filename}`
      : "/uploads/default.png";
    const user = req.user;
    if (!user) {
      return res.json({ success: false, message: "Auth failed" });
    }
    user.profileimage = currimage;
    await user.save();
    return res.json({
      success: true,
      message: "Profile image updated successfully",
      profileimage: currimage,
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const insertidea = async (req, res) => {
  try {
    const user = req.user;
    const { title, description, category } = req.body;

    const idea = new ideamodel({
      title,
      category,
      description,
      author: user.name,
      authorimage: user.profileimage,
    });
    if (!user.ideas) {
      user.ideas = [];
    }
    user.ideas = [...user.ideas, idea._id];
    await idea.save();
    await user.save();
    return res.json({ success: true, message: "Idea created" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const removeidea = async (req, res) => {
  const {ideaid} = req.body;

  try {
    await ideamodel.findByIdAndDelete(ideaid);
    return res.json({ success: true, message: "Idea deleted" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const addcontributor = async(req,res)=>{
  const {ideaid} = req.body;
  const user = req.user;

  const idea = await ideamodel.findById(ideaid);
  try {
    if(!idea.contributors)idea.contributors=[];
  if (!idea.contributors.includes(user._id)) {
      idea.contributors.push(user._id);
    }
  await idea.save();
  return res.json({success:true,message:"Contribution Added"});
  } catch (error) {
    res.json({success:false,message:error.message});
  }
}

export const addbadge = async(req,res)=>{
  const {title,description,popularity,percentage,icon} = req.body;
  if(!title || !description || !popularity || !percentage || !icon){
    return res.json({success:false,message:"Input fields required"});
  }
  try {
    const badge = new badgemodel({
    title,description,popularity,percentage,icon
  })
  await badge.save();
  return res.json({success:true,message:"Badge added"});
  } catch (error) {
    res.json({success:false,message:error.message})
  }
}

export const allBadges = async(req,res)=>{
  try {
    const badges = await badgemodel.find();
    return res.json(badges);
  } catch (error) {
    res.json({success:false,message:error.message});
  }
}
