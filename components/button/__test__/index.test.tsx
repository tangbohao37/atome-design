import { fireEvent, render } from '@testing-library/react'
import { Button } from '..'

describe('Button Component', () => {
  it('it should be render', () => {
    const mockFn = vi.fn()
    const component = render(<Button onClick={mockFn} />)
    const btn = component.container.querySelector('button')
    fireEvent.click(btn)
    const mockFnCallLength = mockFn.mock.calls.length
    expect(mockFnCallLength).toBe(1)

    component.rerender(<Button onClick={mockFn} disabled={true} />)
    fireEvent.click(btn)
    expect(mockFn.mock.calls.length).toBe(mockFnCallLength)
  })

  it('Snap shot', () => {
    const component = render(<Button>Button</Button>)
    expect(component).toMatchSnapshot()
  })
})
