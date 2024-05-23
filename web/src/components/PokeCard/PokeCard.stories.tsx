// Pass props to your component by passing an `args` object to your story
//
// ```tsx
// export const Primary: Story = {
//  args: {
//    propName: propValue
//  }
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { Meta, StoryObj } from '@storybook/react'

import PokeCard from './PokeCard'

const meta: Meta<typeof PokeCard> = {
  component: PokeCard,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof PokeCard>

export const Primary: Story = {
  args: {
    pokemon: {
      id: 1,
      name: 'Bulbasaur',
      image:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
      description:
        'A strange seed was planted on its back at birth. The plant sprouts and grows with this POKéMON.',
      types: ['grass', 'poison'],
      stats: [
        {
          stat: 'attack',
          val: 49,
        },
        {
          stat: 'defense',
          val: 49,
        },
        {
          stat: 'speed',
          val: 49,
        },
        {
          stat: 'special attack',
          val: 49,
        },
        {
          stat: 'special defense',
          val: 49,
        },
        {
          stat: 'hp',
          val: 49,
        },
      ],
      isTop: false,
      likes: 100,
      isLiked: false,
    },
  },
}
