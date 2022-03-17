const userResolvers = require('./users')
const messageResolvers = require('./messages')

module.exports = {
    Message: {
        createdAt: (parent) => parent.createdAt.toISOString(),
    },
    User: {
        // createdAt: (parent) => parent.createdAt.toISOString(),
        latestMessage: (parent) => {
            // console.log(parent)
            console.log('--------------------------------')
            return {
                content: 'e'
            }
        }
    },
    Query: {
        ...userResolvers.Query,
        ...messageResolvers.Query,
    },
    Mutation: {
        ...userResolvers.Mutation,
        ...messageResolvers.Mutation,
    },
    Subscription: {
        ...messageResolvers.Subscription
    }
}