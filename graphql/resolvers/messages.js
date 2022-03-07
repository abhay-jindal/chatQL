const { User, Message } = require('../../database/models')
const { UserInputError, AuthenticationError, withFilter } = require("apollo-server")
const { Op } = require('sequelize')

module.exports = {
    
    Query: {
      getMessages: async (_, { from }, { user }) => {
        try {
          if (!user) throw new AuthenticationError('Unauthenticated user!')

          // TODO: USE ELASTICSEARCH HERE TO FIND THE USER
          // const sender = await User.findByCredentials(from)
          // const usernames = [user.username, sender.username]
          const usernames = [user.username, from]
  
          const messages = await Message.getAllMessages({
            from: { [Op.in]: usernames},
            to: { [Op.in]: usernames}
          })

          return messages
        } catch (err) {
          throw err
        }
      }
    },

    Mutation: {
      sendMessage: async (_, { to, content }, { user, pubsub }) => {
          try {
            if (!user) throw new AuthenticationError('Unauthenticated user!')
            
            // TODO: USE ELASTICSEARCH HERE TO FIND THE USER
            // const recipient = await User.findByCredentials(to)
            // if (recipient.username === user.username) {

            if (to === user.username) {
              throw new UserInputError('You can\'t message yourself!')
            }
    
            if (content.trim() === '') {
              throw new UserInputError('Cannot send empty message!')
            }
    
            const message = await Message.create({
              from: user.username,
              to,
              content,
            })

            pubsub.publish('NEW_MESSAGE', { newMessage: message })
    
            return message
          } catch (err) {
            throw err
          }
      }
    },

    Subscription: {
      newMessage: {
        subscribe: withFilter((_, __, { user, pubsub }) => {
          if (!user) throw new AuthenticationError('Unauthenticated user!')
          return pubsub.asyncIterator(['NEW_MESSAGE'])
        }, ({ newMessage }, _, { user }) => {
          if (newMessage.from === user.username || newMessage.to === user.username) {
            return true
          }
          return false
        }  
      )}
    }
}