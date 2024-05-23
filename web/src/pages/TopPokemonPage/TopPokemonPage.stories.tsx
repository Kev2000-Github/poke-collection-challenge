import type { Meta, StoryObj } from '@storybook/react'

import TopPokemonPage from './TopPokemonPage'

const meta: Meta<typeof TopPokemonPage> = {
  component: TopPokemonPage,
}

export default meta

type Story = StoryObj<typeof TopPokemonPage>

export const Primary: Story = {}
