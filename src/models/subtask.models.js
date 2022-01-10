const {Schema, model} = require('mongoose');

const subtaskSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: String,
    },
    // taskId: {
    //   type: Schema.Types.ObjectId,
    //   ref: 'Task',
    //   required: true,
    // },
    type: {
      type: String,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = model('Subtask', subtaskSchema);
