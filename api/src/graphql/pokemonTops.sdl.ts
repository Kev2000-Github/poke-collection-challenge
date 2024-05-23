export const schema = gql`
  type PokemonTop {
    id: Int!
    userId: Int!
    pokemonId: Int!
    createdAt: DateTime!
    User: User!
    Pokemon: Pokemon!
  }

  type Query {
    myPokemonTops: [PokemonTop!]! @requireAuth
  }

  input CreatePokemonTopInput {
    userId: Int!
    pokemonId: Int!
  }

  input DeletePokemonTopInput {
    userId: Int!
    pokemonId: Int!
  }

  type Mutation {
    createPokemonTop(input: CreatePokemonTopInput!): PokemonTop! @requireAuth
    deletePokemonTop(input: DeletePokemonTopInput!): PokemonTop! @requireAuth
  }
`
