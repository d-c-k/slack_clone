const mongoose = require('mongoose')
const ChannelSchema = new mongoose.Schema({
    channelName: {
        type: String,
        default: ''
    },
    userIds: Array,
    messageIds: Array
})

// ChannelSchema
//     .virtual('name')
//     .get(() => {
//         if(this.channelName === ''){
//             channelName = this.userIds.join('-')
//         }
//         return channelName
//     })

const Channel = mongoose.model('Channel', ChannelSchema)

module.exports = Channel