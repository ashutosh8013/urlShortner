const mongoose = require("mongoose");
const { Schema } = mongoose;

const UrlSchema = new mongoose.Schema({
  urlId: {
    type: String,
    required: true,
  },
  origUrl: {
    type: String,
    required: true,
  },
  shortUrl: {
    type: String,
    required: true,
  },
  clicks: {
    type: Number,
    required: true,
    default: 0,
  },
  createdDate: {
    type: Date,
    default: new Date(),
  },
  lastVisit: {
    type: Date,
    default: new Date(),
  },
  email: {
    type: String,
    required: true,
  },
  desktop:{
    type:Number,
    default:0
  },
  mobile:{
    type:Number,
    default:0
  },
  otherDevice:{
    type:Number,
    default:0
  }
});
const UserModel = mongoose.model("Url", UrlSchema);
module.exports = UserModel;
