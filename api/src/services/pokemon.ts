import { QueryResolvers } from './../../types/graphql.d'

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

  const formattedPokemons = pokemons.map((pokemon) => {
    const species = pokemonSpecies.find(
      (species) => species.name === pokemon.name
    )
    const description = species.flavor_text_entries.findLast(
      (entry) => entry.language.name === 'en'
    ).flavor_text

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
      isTop: true,
      likes: 100,
      isLiked: false,
    }
  })

  return formattedPokemons
}
