import type {
  QueryResolvers,
  MutationResolvers,
  PokemonTopRelationResolvers,
} from 'types/graphql'

import { RedwoodGraphQLError } from '@redwoodjs/graphql-server'

import { db } from 'src/lib/db'

import { pokemon } from '../pokemon/pokemon'

export const myPokemonTops: QueryResolvers['myPokemonTops'] = () => {
  return db.pokemonTop.findMany({ where: { userId: context.currentUser.id } })
}

export const createPokemonTop: MutationResolvers['createPokemonTop'] = async ({
  input,
}) => {
  const topPokemonCount = await db.pokemonTop.count({
    where: { userId: context.currentUser.id },
  })
  if (topPokemonCount >= 10) {
    throw new RedwoodGraphQLError('You can only have 10 top Pokemon')
  }
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
  Pokemon: (_obj, { root }) => {
    return pokemon({ id: root?.pokemonId })
  },
}
