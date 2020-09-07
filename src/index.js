const { GraphQLServer } = require("graphql-yoga")

const typeDefs = `
  type Query {
    info: String!
  }
  type Mutation {
    createUser(username: String!, password: String!, firstName: String!, lastName: String!, email: String!): User

  }
  type User {
    id: ID!
    name: String!
  }
  
`
let users = [{
  id: "user-0",
  name: "Jim Boss",
  firstName: "Jim",
  lastName: "Boss",
  email: "jim.boss@gmail.com",
  password: "password"
}]


let idCount = users.length

const resolvers = {
  Query: {
    info: () => `This is the API of Adrian's new opera singer site`,
  },
  Mutation: {
    createUser: (parent, args) => {
      let newUser = {
        id: `user-${idCount++}`,
        name: args.firstName + " " + args.lastName,
        firstName: args.firstName,
        lastName: args.lastName,
        email: args.email,
        username: args.username,
        password: args.password
      }
      users.push(newUser)
      return newUser
    },

    
  }
  
}

const server = new GraphQLServer({
  typeDefs,
  resolvers,

})

server.start(() => console.log(`Server is running on localhost:4000`))