import { render } from '@redwoodjs/testing/web'

import LikesModal from './LikesModal'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('LikesModal', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<LikesModal isOpen={true} onClose={() => {}} />)
    }).not.toThrow()
  })
})
