import { describe, it, vi, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Button } from "..";
// import '@testing-library/jest-dom';

describe("Button Component", () => {
  it("it should be render", () => {
    render(<Button />);
    // expect(screen.getByRole('button')).toBeInTheDocument();
  });

  // it('click callback correctly', () => {
  // const mockFn = vi.fn();
  // const { container: container1 } = render(
  //   <Button onClick={mockFn}>Text</Button>
  // );
  // fireEvent.click(container1.querySelector('button'));
  // const mockFnCallLength = mockFn.mock.calls.length;
  // expect(mockFnCallLength).toBe(1);
  // const { container: container2 } = render(
  //   <Button onClick={mockFn} disabled={true}>
  //     tt
  //   </Button>
  // );
  // fireEvent.click(container2.querySelector('button'));
  // console.log(mockFnCallLength);
  // expect(mockFn.mock.calls.length).toBe(0);
  // });
});
