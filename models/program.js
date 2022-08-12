const { default: mongoose } = require("mongoose");

const programSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
  exercises: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Exercise",
      required: true,
    },
  ],
  level: {
    type: Number,
    default: 0,
  },
  rating: {
    type: Number,
    default: 0,
  },
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
});

programSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

programSchema.set("toJSON", {
  virtuals: true,
});

exports.ProgramSchema = mongoose.model("Exercise", programSchema);
