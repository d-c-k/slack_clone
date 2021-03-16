const mongoose = require('mongoose')
const ChannelSchema = new mongoose.Schema({
    channelName: {
        type: String,
        default: this.userIds.join('-')
    },
    userIds: Array,
    messageIds: Array
})

const Channel = mongoose.model('Channel', ChannelSchema)

module.exports = Channel