// @vitest-environment jsdom
import { render, screen, cleanup } from "@testing-library/react";
import { describe, it, expect, vi, afterEach } from "vitest";
import "@testing-library/jest-dom/vitest";
import userEvent from "@testing-library/user-event";
import Button from "./Button";

afterEach(() => {
  cleanup();
});

describe("Button", () => {
  it("renders a button with the provided text", () => {
    render(<Button>Start breathing</Button>);

    const button = screen.getByRole("button", { name: "Start breathing" });

    expect(button).toBeInTheDocument();
  });

  it("calls the onClick function when clicked", async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    render(<Button onClick={handleClick}>Start breathing</Button>);

    const button = screen.getByRole("button", { name: "Start breathing" });
    await user.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
