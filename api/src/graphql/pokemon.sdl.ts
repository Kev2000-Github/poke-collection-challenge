export const schema = gql`
  type Pokemon {
    id: Int!
    name: String!
    stats: [PokemonStats!]!
    image: String!
    description: String!
    likes: Int!
    types: [String!]!
    isTop: Boolean
    isLiked: Boolean
  }

  type PokemonStats {
    stat: String!
    val: Int!
  }

  input PaginationInput {
    page: Int
  }

  type Query {
    getPokemons(pagination: PaginationInput!): [Pokemon!]! @skipAuth
    pokemon(id: Int!): Pokemon! @skipAuth
  }
`
