import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders home page", () => {
  render(<App />);
  const linkElement = screen.getByText("This will be the home page");
  expect(linkElement).toBeInTheDocument();
});
