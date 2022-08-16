const { Schema, model } = require("mongoose");
const userWelcomeSchema = new Schema({
  guildId: String,
  channelId: String,
  messageEnable: Boolean,  
});

module.exports = model("welcomeSchema", userWelcomeSchema, "userJoinSchema");
