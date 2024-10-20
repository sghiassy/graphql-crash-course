import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import { typeDefs } from './schema.js'
import db from './_db.js'

const PORT = 4000

const resolvers = {
  Query: {
    games() {
      return db.games
    },
    game(parent, args, context) {
      return db.games.find((game) => {
        return game.id === args.id;
      });
    },
    reviews() {
      return db.reviews
    },
    review(parent, args, context) {
      return db.reviews.find((review) => {
        return review.id === args.id;
      });
    },
    authors() {
      return db.authors
    },
    author(parent, args, context) {
      return db.authors.find((author) => {
        return author.id === args.id;
      });
    }
  }
}


// Server Setup
const server = new ApolloServer({
  // typeDefs
  typeDefs,

  // resolvers
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: PORT },
});

console.log(`Server ready at port: ${PORT}`);
