const { Schema, model } = require("mongoose");
const userWelcomeSchema = new Schema({
  _id: Schema.Types.ObjectId,
  guildId: String,
  channelId: String,
  messageEnable: Boolean,  
});

module.exports = model("welcomeSchema", userWelcomeSchema, "userJoinSchema");