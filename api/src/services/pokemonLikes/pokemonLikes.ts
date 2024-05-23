import type {
  QueryResolvers,
  MutationResolvers,
  PokemonLikeRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const pokemonLikesByPokemonId: QueryResolvers['pokemonLikesByPokemonId'] =
  async ({ pokemonId }) => {
    const [pokemonLikes, totalCount] = await Promise.all([
      db.pokemonLike.findMany({ where: { pokemonId } }),
      db.pokemonLike.count({ where: { pokemonId } }),
    ])
    return {
      totalLikes: totalCount,
      usersWhoLiked: pokemonLikes,
    }
  }

export const createPokemonLike: MutationResolvers['createPokemonLike'] = ({
  input,
}) => {
  return db.pokemonLike.create({
    data: input,
  })
}

export const deletePokemonLike: MutationResolvers['deletePokemonLike'] = ({
  input: { pokemonId, userId },
}) => {
  return db.pokemonLike.delete({
    where: {
      userId_pokemonId: { pokemonId, userId },
    },
  })
}

export const PokemonLike: PokemonLikeRelationResolvers = {
  User: (_obj, { root }) => {
    return db.pokemonLike.findUnique({ where: { id: root?.id } }).User()
  },
}
