const { UserInputError } = require('apollo-server');
const { Model } = require('sequelize');
const bcrypt = require("bcryptjs")

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  const userSchema = {
    username: {
      type: DataTypes.STRING(30),
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          args: true,
          msg: 'Must be an valid email address!'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imageURL: {
      type: DataTypes.STRING
    }
  }

  User.init(userSchema, { sequelize, modelName: 'User', tableName: 'users'});

  /**
  * Checks for the valid credentials provides by the client via and database query and
  * handle error cases accordingly.
  *
  * @function findByCredentials
  * @param username An plain string
  * @param password An plain string (not required)
  * @param errors An errors object (not required)
  */
  User.findByCredentials = async (username, password='', errors={}) => {
    const user = await User.findOne({ raw: true, where: { username }})
                
    if (!user) {
      errors.username = "User not found!"
      throw new UserInputError('User not found! Try again.', { errors })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch && password) {
        errors.password = 'Password is incorrect! Try again.'
        throw new UserInputError('User not found! Try again.', { errors })
    }
    return user
  }

  return User;
};