const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const prospectSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Prospect name is required'],
      minLength: [3, 'Name should be of 3 charachter'],
    },
    demography: {
      type: String,
      required: [true, 'Demography is required'],
      minLength: [3, 'Demography should be of 3 charachter'],
    },
    source: {
      type: String,
      required: [true, 'Source is required'],
      minLength: [3, 'Source should be of 3 charachter'],
    },
    addedBy: {
      type: String,
      required: [true, 'Added by is required'],
      minLength: [3, 'It should be of 3 charachter'],
    },
    setType: {
      type: String,
      required: [true, 'Type is required'],
    },
    teamMemberCount: {
      type: Number,
      required: [true, 'Team member count is required'],
    },
    details: {
      type: String,
    },
  },
  { timestamps: true }
);

const Prospect = mongoose.model('Prospect', prospectSchema);

module.exports = Prospect;
