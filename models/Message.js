const mongoose = require('mongoose')
const MessageSchema = new mongoose.Schema({
    channelId: {
        type: Schema.Types.ObjectId,
        ref: 'Channel',
        required: true
    },        
    senderId: String,
    date: {
        type: Date,
        default: Date.now
    },
    messageBody: String
})

const Message = mongoose.model('Message', MessageSchema)

module.exports = Message