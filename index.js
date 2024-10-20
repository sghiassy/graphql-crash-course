import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import { typeDefs } from './schema.js'

const PORT = 4000


// Server Setup
const server = new ApolloServer({
  // typeDefs
  typeDefs,

  // resolvers
});

const { url } = await startStandaloneServer(server, {
  listen: { port: PORT },
});

console.log(`Server ready at port: ${PORT}`);
