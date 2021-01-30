const mongoose = require('mongoose')

const TopicSchema = new mongoose.Schema({
    name: {
        // type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question'}],
        type:String, 
        unique : true,
        required: [true, 'Topic must have a topic']
    },
})

const Topic = mongoose.model('Topic', TopicSchema);

module.exports = Topic;