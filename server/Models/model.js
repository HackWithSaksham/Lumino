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
  contribution: [{ type: mongoose.Schema.Types.ObjectId, ref: "contribution" }],
  requests:[{ type: mongoose.Schema.Types.ObjectId, ref: "contribution" }],
},{timestamps:true});
export const usermodel =
  mongoose.models["user"] || mongoose.model("user", UserSchema);


const SectionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String },
  parent: { type: mongoose.Schema.Types.ObjectId, ref: "section", default: null }, 
  children: [{ type: mongoose.Schema.Types.ObjectId, ref: "section" }],
},{timestamps:true});

export const sectionmodel =
  mongoose.models["section"] || mongoose.model("section", SectionSchema);


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
    sections: [{ type: mongoose.Schema.Types.ObjectId, ref: "section" }]
  },
  { timestamps: true }
);
export const ideamodel =
  mongoose.models["idea"] || mongoose.model("idea", IdeaSchema);

const HistorySchema = new mongoose.Schema({
  changeSummary: { type: String },
  previousContent: { type: String },
  newContent: { type: String },
  requeststatus:{type:String},
  requester:{type:String}
},{timestamps:true});
export const historymodel =
  mongoose.models["history"] || mongoose.model("history", HistorySchema);


  
const ContributionSchema = new mongoose.Schema(
  {
    ideaid: { type: mongoose.Schema.Types.ObjectId, ref: "idea" },
    history: [{ type: mongoose.Schema.Types.ObjectId, ref: "history" }],
  },
  { timestamps: true }
);
export const contributionmodel =
  mongoose.models["contribution"] ||
  mongoose.model("contribution", ContributionSchema);



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



  const ConversationSchema = new mongoose.Schema({
      participants : [{type : mongoose.Schema.Types.ObjectId , ref:"user"}]
  })
  
  export const Conversation = mongoose.model['Conversation'] || mongoose.model('Conversation',ConversationSchema)
  
  
  const MessageSchema = new mongoose.Schema({
      conversationId : {type:mongoose.Schema.Types.ObjectId , ref:'Conversation'},
      sender : {type : mongoose.Schema.Types.ObjectId , ref:'user'},
      receiver : {type : mongoose.Schema.Types.ObjectId , ref:'user'},
      text : String,
      createdAt : {type:Date , default:Date.now}
  },{timestamps:true})
  
  export const UserMessage = mongoose.model['UserMessage'] || mongoose.model('UserMessage',MessageSchema);