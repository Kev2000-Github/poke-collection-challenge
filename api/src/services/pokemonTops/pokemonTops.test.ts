import type { PokemonTop } from '@prisma/client'

import {
  pokemonTops,
  pokemonTop,
  createPokemonTop,
  updatePokemonTop,
  deletePokemonTop,
} from './pokemonTops'
import type { StandardScenario } from './pokemonTops.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('pokemonTops', () => {
  scenario('returns all pokemonTops', async (scenario: StandardScenario) => {
    const result = await pokemonTops()

    expect(result.length).toEqual(Object.keys(scenario.pokemonTop).length)
  })

  scenario(
    'returns a single pokemonTop',
    async (scenario: StandardScenario) => {
      const result = await pokemonTop({ id: scenario.pokemonTop.one.id })

      expect(result).toEqual(scenario.pokemonTop.one)
    }
  )

  scenario('creates a pokemonTop', async (scenario: StandardScenario) => {
    const result = await createPokemonTop({
      input: { userId: scenario.pokemonTop.two.userId, pokemonId: 2186113 },
    })

    expect(result.userId).toEqual(scenario.pokemonTop.two.userId)
    expect(result.pokemonId).toEqual(2186113)
  })

  scenario('updates a pokemonTop', async (scenario: StandardScenario) => {
    const original = (await pokemonTop({
      id: scenario.pokemonTop.one.id,
    })) as PokemonTop
    const result = await updatePokemonTop({
      id: original.id,
      input: { pokemonId: 4524933 },
    })

    expect(result.pokemonId).toEqual(4524933)
  })

  scenario('deletes a pokemonTop', async (scenario: StandardScenario) => {
    const original = (await deletePokemonTop({
      id: scenario.pokemonTop.one.id,
    })) as PokemonTop
    const result = await pokemonTop({ id: original.id })

    expect(result).toEqual(null)
  })
})
