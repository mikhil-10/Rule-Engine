const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  ruleString: {
    type: String,
    required: true
  },
  ast: {
    type: Object,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model("Rule", schema);
