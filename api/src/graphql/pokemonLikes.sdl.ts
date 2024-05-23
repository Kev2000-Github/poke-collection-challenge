export const schema = gql`
  type PokemonLike {
    id: Int!
    userId: Int!
    pokemonId: Int!
    createdAt: DateTime!
    User: User!
  }

  type PokemonLikesData {
    totalLikes: Int!
    usersWhoLiked: [PokemonLike!]!
  }

  type Query {
    pokemonLikesByPokemonId(pokemonId: Int!): PokemonLikesData! @skipAuth
  }

  input CreatePokemonLikeInput {
    userId: Int!
    pokemonId: Int!
  }

  input DeletePokemonLikeInput {
    userId: Int!
    pokemonId: Int!
  }

  type Mutation {
    createPokemonLike(input: CreatePokemonLikeInput!): PokemonLike! @requireAuth
    deletePokemonLike(input: DeletePokemonLikeInput!): PokemonLike! @requireAuth
  }
`
