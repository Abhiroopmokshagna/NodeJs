var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var memberSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    staffId: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        required: true,
    },
    abbr: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    featured: {
      type: Boolean,
      required: false
    },
    field: {
        type: String,
        required: true
    },
    papers: {
        type: [{paper: {type: mongoose.Schema.Types.ObjectId, ref: 'Paper'}}],
        required: false
    },
    patents: {
        type: [{patent: {type: mongoose.Schema.Types.ObjectId, ref: 'Patent'}}],
        required: false
    },
    projects: {
        type: [{project: {type: mongoose.Schema.Types.ObjectId, ref: 'Project'}}],
        required: false
    }
}, {
    timestamps: true
});

var Members = mongoose.model('Member', memberSchema);

module.exports = Members;