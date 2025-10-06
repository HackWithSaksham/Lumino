import mongoose, { mongo } from "mongoose";

const UserSchema = new mongoose.Schema({
  profileimage: { type: String },
  name: { type: String, required: true },
  passion: { type: String, required: true },
  password: { type: String, required: true },
  resetotp: { type: Number, default: null },
  rank: { type: Number, default: null },
  streak: { type: Number, default: 0 },
  resetotpexpiresat: { type: Number, default: 0 },
  country: { type: String, required: true },
  email: { type: String, required: true },
  badges: [{ type: mongoose.Schema.Types.ObjectId, ref: "badge" }],
  ideas: [{ type: mongoose.Schema.Types.ObjectId, ref: "idea" }],
  contribution: [{ type: mongoose.Schema.Types.ObjectId, ref: "idea" }],
});

export const usermodel =
  mongoose.models["user"] || mongoose.model("user", UserSchema);

const IdeaSchema = new mongoose.Schema(
  {
    title: { type: String },
    category: { type: String },
    current: { type: String, default: "In Progress" },
    description: { type: String },
    authorid: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    author: { type: String },
    authorimage: { type: String },
    contributors: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
  },
  { timestamps: true }
);

export const ideamodel =
  mongoose.models["idea"] || mongoose.model("idea", IdeaSchema);

const BadgeSchema = new mongoose.Schema(
  {
    title: { type: String },
    description: { type: String },
    popularity: { type: String },
    percentage: { type: String },
    icon: { type: String },
  },
  { timestamps: true }
);

export const badgemodel =
  mongoose.models["badge"] || mongoose.model("badge", BadgeSchema);
