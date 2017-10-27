const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const storageSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  establishment: {
    type: Schema.Types.ObjectId,
    ref: 'Establishment'
  },
  categorys: [{ type: Schema.Types.ObjectId, ref: 'Category' }]
});

module.exports = mongoose.model("Storage", storageSchema);
