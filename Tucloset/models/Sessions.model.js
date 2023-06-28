const { Schema, model } = require("mongoose");

const sessionsSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  token: {
    type: String,
    required: true,
    unique: true
  },
  expiresAt: {
    type: Date,
    required: true
  }
});

const Sessions = model("Sessions", sessionsSchema);

module.exports = Sessions;
