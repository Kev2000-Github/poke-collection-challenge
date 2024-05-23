import { render } from '@redwoodjs/testing/web'

import NavbarApp from './NavbarApp'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('NavbarApp', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<NavbarApp />)
    }).not.toThrow()
  })
})
