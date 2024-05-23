import type { Prisma, PokemonLike } from '@prisma/client'

import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.PokemonLikeCreateArgs>({
  pokemonLike: {
    one: {
      data: {
        pokemonId: 6527649,
        User: {
          create: {
            username: 'String2492986',
            fullName: 'String',
            hashedPassword: 'String',
            salt: 'String',
          },
        },
      },
    },
    two: {
      data: {
        pokemonId: 593444,
        User: {
          create: {
            username: 'String2854152',
            fullName: 'String',
            hashedPassword: 'String',
            salt: 'String',
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<PokemonLike, 'pokemonLike'>
