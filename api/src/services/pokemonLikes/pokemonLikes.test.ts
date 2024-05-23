import type { PokemonLike } from '@prisma/client'

import {
  pokemonLikes,
  pokemonLike,
  createPokemonLike,
  updatePokemonLike,
  deletePokemonLike,
} from './pokemonLikes'
import type { StandardScenario } from './pokemonLikes.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('pokemonLikes', () => {
  scenario('returns all pokemonLikes', async (scenario: StandardScenario) => {
    const result = await pokemonLikes()

    expect(result.length).toEqual(Object.keys(scenario.pokemonLike).length)
  })

  scenario(
    'returns a single pokemonLike',
    async (scenario: StandardScenario) => {
      const result = await pokemonLike({ id: scenario.pokemonLike.one.id })

      expect(result).toEqual(scenario.pokemonLike.one)
    }
  )

  scenario('creates a pokemonLike', async (scenario: StandardScenario) => {
    const result = await createPokemonLike({
      input: { userId: scenario.pokemonLike.two.userId, pokemonId: 9421581 },
    })

    expect(result.userId).toEqual(scenario.pokemonLike.two.userId)
    expect(result.pokemonId).toEqual(9421581)
  })

  scenario('updates a pokemonLike', async (scenario: StandardScenario) => {
    const original = (await pokemonLike({
      id: scenario.pokemonLike.one.id,
    })) as PokemonLike
    const result = await updatePokemonLike({
      id: original.id,
      input: { pokemonId: 1497043 },
    })

    expect(result.pokemonId).toEqual(1497043)
  })

  scenario('deletes a pokemonLike', async (scenario: StandardScenario) => {
    const original = (await deletePokemonLike({
      id: scenario.pokemonLike.one.id,
    })) as PokemonLike
    const result = await pokemonLike({ id: original.id })

    expect(result).toEqual(null)
  })
})
