const {Schema, model} = require('mongoose');

const taskSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    subtask: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Subtask',
        required: true,
      },
    ],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = model('Task', taskSchema);
