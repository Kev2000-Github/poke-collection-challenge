import type {
  QueryResolvers,
  MutationResolvers,
  PokemonTopRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const myPokemonTops: QueryResolvers['myPokemonTops'] = () => {
  return db.pokemonTop.findMany()
}

export const createPokemonTop: MutationResolvers['createPokemonTop'] = ({
  input,
}) => {
  return db.pokemonTop.create({
    data: input,
  })
}

export const deletePokemonTop: MutationResolvers['deletePokemonTop'] = ({
  input: { pokemonId, userId },
}) => {
  return db.pokemonTop.delete({
    where: { userId_pokemonId: { pokemonId, userId } },
  })
}

export const PokemonTop: PokemonTopRelationResolvers = {
  User: (_obj, { root }) => {
    return db.pokemonTop.findUnique({ where: { id: root?.id } }).User()
  },
}
