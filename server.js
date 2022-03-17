const { ApolloServer } = require('apollo-server');
const { sequelize } = require('./database/models')
const contextMiddleware = require('./middleware/contextMiddleware')
const elasticSearch = require('./elasticSearch')

// The GraphQL schema
const typeDefs = require('./graphql/typeDefs')

// A map of functions which return data for the schema.
const resolvers = require('./graphql/resolvers')

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: contextMiddleware
});

server.listen().then(async ({ url }) => {
  console.log(`🚀 Server ready at ${url}`);

  global.elasticClient = elasticSearch()

  

    // async function run () {
    //   let a = client.create({
        
    //     index: 'game-of-thrones',
    //     id: 7,
    //     body: {
    //       // id: '2',
    //       character: 'Daenerys',
    //       quote: 'I am the blood of th.'
    //     }
    //   }).then((resp) => {
    //     console.log(resp)
    //   }).catch((e) => {
    //     console.log(e.description)
    //   })
    // }
    
    // run()
  

  sequelize.authenticate().then(() => {
    console.log('Database connected successfully!')
  }).catch((err) => {
    console.log('Database connection error: ' + err.message)
  })
});