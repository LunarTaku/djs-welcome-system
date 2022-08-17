const { Schema, model } = require("mongoose");
const userLeaveSchema = new Schema({
  _id: Schema.Types.ObjectId,
  guildId: String,
  channelId: String,
  messageEnable: Boolean,
});

module.exports = model("leaveSchema", userLeaveSchema, "userLeaveSchema");
