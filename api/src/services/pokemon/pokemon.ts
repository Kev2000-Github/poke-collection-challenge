import { db } from 'src/lib/db'

import { QueryResolvers } from '../../../types/graphql'

const LIMIT = 12
const getPaginationParams = (page: number) => {
  const offset = Math.max(0, page - 1) * LIMIT
  return { limit: LIMIT, offset }
}

export const getPokemons: QueryResolvers['getPokemons'] = async ({
  pagination: { page },
}) => {
  const Pokedex = (await import('pokedex-promise-v2')).default
  const P = new Pokedex()

  const paginationParams = getPaginationParams(page)
  const resp = await P.getPokemonsList(paginationParams)
  const pokemonSpecies = await Promise.all(
    resp.results.map((pokemon) => P.getPokemonSpeciesByName(pokemon.name))
  )
  const pokemons = await Promise.all(
    resp.results.map((pokemon) => P.getPokemonByName(pokemon.name))
  )

  const pokemonMetrics = await Promise.all(
    pokemons.map(async (pokemon) => {
      const count = await db.pokemonLike.count({
        where: { pokemonId: pokemon.id },
      })
      const isLiked = await db.pokemonLike.findUnique({
        where: {
          userId_pokemonId: {
            userId: context.currentUser.id,
            pokemonId: pokemon.id,
          },
        },
      })
      const isTop = await db.pokemonTop.findUnique({
        where: {
          userId_pokemonId: {
            userId: context.currentUser.id,
            pokemonId: pokemon.id,
          },
        },
      })
      return {
        id: pokemon.id,
        likes: count,
        isLiked,
        isTop,
      }
    })
  )

  const formattedPokemons = pokemons.map((pokemon) => {
    const species = pokemonSpecies.find(
      (species) => species.name === pokemon.name
    )
    const description = species.flavor_text_entries.findLast(
      (entry) => entry.language.name === 'en'
    ).flavor_text
    const pokemonData = pokemonMetrics.find(
      (pokemonLike) => pokemonLike.id === pokemon.id
    )

    return {
      id: pokemon.id,
      name: pokemon.name,
      image: pokemon.sprites.other['official-artwork'].front_default,
      types: pokemon.types.map((type) => type.type.name),
      stats: pokemon.stats.map((stat) => ({
        stat: stat.stat.name,
        val: stat.base_stat,
      })),
      description,
      isTop: pokemonData.isTop ? true : false,
      likes: pokemonData.likes,
      isLiked: pokemonData.isLiked ? true : false,
    }
  })

  return formattedPokemons
}
