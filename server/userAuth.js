import jwt from "jsonwebtoken";
import { usermodel } from "./Models/model.js";

const userAuth = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res.json({ success: false, message: "Auth Failed" });
  }
  try {
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

    const user = await usermodel
      .findById(tokenDecode.id)
      .populate("ideas")
      .populate("badges")
      .populate({
        path: "contribution",
        populate: [{
          path:"ideaid",
          model:"idea",
          populate: [{
            path: "contributors",
            model: "user",
            select: "name profileimage country passion",
        },{
          path: "sections",
            model: "section"
        }],
        },
        {
          path:"history",
          model:"history"
        }
      ]
      })
      .populate({
        path: "requests",
        populate: [{
          path:"ideaid",
          model:"idea",
          populate: {
            path: "contributors",
            model: "user",
            select: "name profileimage country passion",
          },
        },
        {
          path:"history",
          model:"history"
        }
      ]
      });
    if (!user) {
      return res.json({ success: false, message: "User Not Found" });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export default userAuth;
