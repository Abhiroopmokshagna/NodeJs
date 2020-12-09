var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var paperSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: false
    },
    authors: {
        type: [{member: {type: mongoose.Schema.Types.ObjectId, ref: 'Member'}}],
        required: true
    },
    document: {
        type: String,
        required: true
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

var Papers = mongoose.model('Paper', paperSchema);

module.exports = Papers;