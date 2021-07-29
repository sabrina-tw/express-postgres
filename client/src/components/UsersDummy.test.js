import React from "react";
import { render, screen } from "@testing-library/react";
import UsersDummy from "./UsersDummy";

test("renders list of dummy names", () => {
  render(<UsersDummy />);
  const tom = screen.getByText(/tom/i);
  const jane = screen.getByText(/jane/i);
  expect(tom).toBeInTheDocument();
  expect(jane).toBeInTheDocument();
});
