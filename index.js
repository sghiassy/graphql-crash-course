import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import { typeDefs } from './schema.js'
import db from './_db.js'

const PORT = 4000

const resolvers = {
  Query: {
    games() {
      return db.games;
    },
    game(parent, args, context) {
      return db.games.find((game) => {
        return game.id === args.id
      });
    },
    reviews() {
      return db.reviews;
    },
    review(parent, args, context) {
      return db.reviews.find((review) => {
        return review.id === args.id
      });
    },
    authors() {
      return db.authors;
    },
    author(parent, args, context) {
      return db.authors.find((author) => {
        return author.id === args.id
      });
    },
  },
  Game: {
    reviews(parent, args, context) {
      return db.reviews.filter((review) => {
        return review.game_id === parent.id
      });
    },
  },
  Author: {
    reviews(parent, args, context) {
      return db.reviews.filter((review) => {
        return review.author_id === parent.id
      });
    },
  },
  Review: {
    author(parent, args, context) {
      return db.authors.find((author) => {
        return author.id === parent.author_id
      });
    },
    game(parent, args, context) {
      return db.games.find((game)=>{
        return game.id === parent.game_id
      })
    },
  },
  Mutation: {
    addGame(parent, args, context) {
      let game = {
        ...args.game,
        id: Math.floor(Math.random()*10000).toString()
      }
      db.games.push(game)
      return game
    },
    deleteGame(parent, args, context) {
      return db.games.filter((game)=>{
        return !(game.id === args.id)
      })
    }
  }
};


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
