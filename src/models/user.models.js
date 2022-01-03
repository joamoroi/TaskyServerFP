const {Schema, model} = require('mongoose');

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      default: false,
    },
    code: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = model('User', userSchema);
