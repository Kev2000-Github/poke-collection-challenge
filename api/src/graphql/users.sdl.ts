export const schema = gql`
  type User {
    id: Int!
    username: String!
    fullName: String!
    avatar: String
    hashedPassword: String!
    salt: String!
    resetToken: String
    resetTokenExpiresAt: DateTime
    pokemonLike: [PokemonLike]!
    pokemonTop: [PokemonTop]!
  }

  type Query {
    users: [User!]! @requireAuth
    user(id: Int!): User @requireAuth
  }
`
