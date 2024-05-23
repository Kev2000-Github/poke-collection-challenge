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

import LikesModal from './LikesModal'

const meta: Meta<typeof LikesModal> = {
  component: LikesModal,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof LikesModal>

export const Primary: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    pokemonId: 1,
  },
}
