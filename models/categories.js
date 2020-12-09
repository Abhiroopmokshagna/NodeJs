var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var categorySchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: false
    },
    members: {
        type: [{member: {type: mongoose.Schema.Types.ObjectId, ref: 'Member'}}],
        required: false
    },
    papers: {
        type: [{paper: {type: mongoose.Schema.Types.ObjectId, ref: 'Paper'}}],
        required: false
    },
    projects: {
        type: [{project: {type: mongoose.Schema.Types.ObjectId, ref: 'Project'}}],
        required: false
    },
    patents: {
        type: [{patent: {type: mongoose.Schema.Types.ObjectId, ref: 'Patent'}}],
        required: false
    },
    document: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false
    },
    link: {
        type: String,
        required: false
    },
    field: {
        type: String,
        required: true
    },
    featured: {
        type: Boolean,
        required: false
    }
}, {
    timestamps: true
});

var Categorys = mongoose.model('Category', categorySchema);

module.exports = Categorys;