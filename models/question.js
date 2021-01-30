const mongoose = require('mongoose')
const Topic = require('./topics')

const QuestionSchema = new mongoose.Schema({
    topic: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Topic',
        required: [true, 'Question must have a topic']
    },
    name: {
        type: String,
        required: [true, 'Question must have a Title']
    },
    linkTo: {
        type: String,
        required: [true, 'Question must have a link to the source']
    },
    
})

const Question = mongoose.model('Question', QuestionSchema);

module.exports = Question;