
const { User, Message } = require('../../database/models')
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')
const { Op } = require('sequelize')
const { UserInputError, AuthenticationError } = require("apollo-server")


module.exports = {
    Query: {
      getUsers: async (_, __, { user }) => {
        try {
            
            if (!user) throw new AuthenticationError('Unauthenticated user!')
    
            // TODO: USE ELASTICSEARCH HERE TO FIND THE USERS
            let users = await User.findAll({
                attributes: ['id', 'username', 'imageURL'],
                where: { username: { [Op.ne]: user.username } },
                raw: true
            })

            // const allUserMessages = await Message.getAllMessages({
            //     [Op.or]: [{ from: user.username }, { to: user.username }],
            // })

            // users = users.filter((otherUser) => {
            //     const latestMessage = allUserMessages.find(
            //       (m) => m.from === otherUser.username || m.to === otherUser.username
            //     )

            //     if (!latestMessage) return 
            //     otherUser.latestMessage = latestMessage
            //     return otherUser
            // })

            return users
        } catch (err) {
            throw err
          }
        },

        login: async (_, args) => {
            const { username, password, remember } = args
            let errors = {}
            try {
                // checking for required field errors
                if (username.trim() === '') errors.username = 'Username is required.'
                if (password.trim() === '') errors.password = 'Password is required.'

                if (Object.keys(errors).length > 0) {
                    throw new UserInputError('Bad input! Please try again with new values.', { errors })
                }

                const user = await User.findByCredentials(username, password, errors)
                const token = jwt.sign({ username,  imageURL: user.imageURL || 'https://www.gravatar.com/avatar?d=mp&f=y', email: user.email}, 
                                process.env.JWT_SECRET, 
                                { expiresIn: remember === 'off' ? `1h` : `2d` })
                return {
                    ...user,
                    token,
                  }
            } catch (err) {
                throw err
            }
        }
    },
    Mutation: {
        register: async (_, args) => {
            let { username, email, password, confirmPassword } = args // unpacking data sent via query in args params
            let errors = {}
            try {

                // checking for required field errors
                if (email.trim() === '') errors.email = 'Email address is required.'
                if (username.trim() === '') errors.username = 'Username is required.'
                if (confirmPassword.trim() === '' || confirmPassword !== password) {
                    errors.confirmPassword = 'The passwords you entered do not match.'
                    errors.password = 'The passwords you entered do not match.'
                }
                
                if (Object.keys(errors).length > 0) throw errors

                password = await bcrypt.hash(password, 8) //hash plain text password
                const user = await User.create({
                    username,
                    email,
                    password,
                }) // unique validation for username/email will be thrown automatically

                const userData = user.dataValues

                const indexPayload = {
                    index: process.env.ELASTIC_INDEX,
                    id: userData.id,
                    body: {
                        id: userData.id,
                        username: userData.username,
                        email: userData.email,
                        imageURL: userData.imageURL
                    }
                }

                return user
            } catch (err) {
                if (err.name === 'SequelizeUniqueConstraintError') {
                    err.errors.forEach(e => ( errors[e.path] = `${e.path} is already taken!` ))
                }

                if (err.name === 'SequelizeValidationError') {
                    err.errors.forEach(e => ( errors[e.path] = e.message ))
                }
                throw new UserInputError('Bad input! Please try again with new values.', { errors: errors })
            }
        },
    }
}