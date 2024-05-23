import { render } from '@redwoodjs/testing/web'

import PokeCard from './PokeCard'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

const POKEMON = {
  id: 1,
  name: 'Bulbasaur',
  image:
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
  description:
    'A strange seed was planted on its back at birth. The plant sprouts and grows with this POKéMON.',
  evolutionChain: ['Bulbasaur', 'Ivysaur', 'Venusaur'],
  moveset: [
    { name: 'tackle', type: ['normal'] },
    { name: 'growl', type: ['normal'] },
    { name: 'leech seed', type: ['grass'] },
    { name: 'vine whip', type: ['grass'] },
  ],
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
}

describe('PokeCard', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<PokeCard pokemon={POKEMON} />)
    }).not.toThrow()
  })
})
