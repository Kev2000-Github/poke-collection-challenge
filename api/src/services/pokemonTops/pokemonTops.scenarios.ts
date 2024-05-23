import type { Prisma, PokemonTop } from '@prisma/client'

import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.PokemonTopCreateArgs>({
  pokemonTop: {
    one: {
      data: {
        pokemonId: 2860833,
        User: {
          create: {
            username: 'String4950635',
            fullName: 'String',
            hashedPassword: 'String',
            salt: 'String',
          },
        },
      },
    },
    two: {
      data: {
        pokemonId: 5550180,
        User: {
          create: {
            username: 'String6071462',
            fullName: 'String',
            hashedPassword: 'String',
            salt: 'String',
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<PokemonTop, 'pokemonTop'>
