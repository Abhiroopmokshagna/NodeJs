var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var projectSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
        required: false
    },
    members: {
        type: [{member: {type: mongoose.Schema.Types.ObjectId, ref: 'Member'}}],
        required: true
    },
    document: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
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

var Projects = mongoose.model('Project', projectSchema);

module.exports = Projects;