'use strict';
const { Model, QueryTypes } = require('sequelize');
// const { QueryTypes } = require('sequelize/core');


module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  const messageSchema = {
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    from: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    to: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }


  /**
  * Fetches all the messages of an authenticated user via and database query object passed
  *
  * @function getAllMessages
  * @param query An sequelize query object
  * @param limit An integer value  (not required)
  */
  Message.getAllMessages = async (query, limit=null) => {

    // const q = `(SELECT "content", "uuid", "from", "to", "createdAt", row_number() OVER (PARTITION BY "from" , "to" ORDER BY "createdAt" DESC) AS "ranking" FROM "messages" WHERE "messages"."from" = "boss") AS "message"`
    // const q = `(SELECT "content", "from", "to", "id" ,row_number() OVER (PARTITION BY "from" , "to" ORDER BY "createdAt" DESC) AS "ranking" FROM "messages" WHERE "messages"."from" = 'drake' OR "messages"."to" = 'drake') AS "message"`

    // const t = `SELECT * FROM ${q} WHERE "message"."ranking"='1';`
    // const messages = await sequelize.query(t, {
    //   type: QueryTypes.SELECT
    // });
    const messages = await Message.findAll({
      attributes: ['content', 'uuid', 'from', 'to', 'createdAt'],
      where: query,
      limit,
      raw: true, // to get raw objects instead of sequelized formatted objects
      order: [['createdAt', 'DESC']]
    })

    // console.log(messages)

    return messages
  }

  Message.init(messageSchema, { sequelize, modelName: 'Message', tableName: 'messages'});
  return Message;
};