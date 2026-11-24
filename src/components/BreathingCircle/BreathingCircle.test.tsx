// @vitest-environment jsdom

import { render, screen, cleanup, act } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import "@testing-library/jest-dom/vitest";

import BreathingCircle from "./BreathingCircle";

afterEach(() => {
  cleanup();
  vi.useRealTimers();
});

describe("BreathingCircle", () => {
  it("displays the initial state when not running", () => {
    render(<BreathingCircle isRunning={false} />);

    expect(screen.getByText("Get ready…")).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();
  });

  it("increments the counter by one second", () => {
    vi.useFakeTimers();

    render(<BreathingCircle isRunning={true} />);

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(screen.getByText("2")).toBeInTheDocument();
  });

  it("transitions from ready to inhale after 4 seconds", () => {
    vi.useFakeTimers();

    render(<BreathingCircle isRunning={true} />);

    expect(screen.getByText("Get ready…")).toBeInTheDocument();

    for (let i = 0; i < 4; i++) {
      act(() => {
        vi.advanceTimersByTime(1000);
      });
    }

    expect(screen.getByText("Breathe in")).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();
  });

  it("transitions from inhale to hold after 4 seconds", () => {
    vi.useFakeTimers();

    render(<BreathingCircle isRunning={true} />);

    for (let i = 0; i < 8; i++) {
      act(() => {
        vi.advanceTimersByTime(1000);
      });
    }

    expect(screen.getByText("Hold")).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();
  });

  it("resets the exercise when stopped", () => {
    vi.useFakeTimers();

    const { rerender } = render(<BreathingCircle isRunning={true} />);

    for (let i = 0; i < 4; i++) {
      act(() => {
        vi.advanceTimersByTime(1000);
      });
    }

    rerender(<BreathingCircle isRunning={false} />);

    expect(screen.getByText("Get ready…")).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();
  });

  it("does not advance the timer when not running", () => {
    vi.useFakeTimers();

    render(<BreathingCircle isRunning={false} />);

    act(() => {
      vi.advanceTimersByTime(5000);
    });

    expect(screen.getByText("Get ready…")).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();
  });
});
