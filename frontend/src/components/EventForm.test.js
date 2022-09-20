import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";

import { EventForm } from "./EventForm";

describe("EventForm", () => {
  const formData = [
    {
      name: "firstName",
      value: "Test",
    },
    {
      name: "lastName",
      value: "Test",
    },
    {
      name: "email",
      value: "test",
    },
    {
      name: "eventDate",
      value: "2022-09-20",
    },
  ];

  it("shoud render form with 4 fields", () => {
    render(<EventForm />);

    formData.forEach(({ name }) => {
      const formInput = screen.getByTestId(`${name}`);
      expect(formInput).toBeInTheDocument();
    });
  });

  it("should add error class while incorrect input is provided", () => {
    render(<EventForm />);

    formData.forEach(({ name }) => {
      const formInput = screen.getByTestId(`${name}`);
      act(() => {
        fireEvent.focus(formInput);
        fireEvent.blur(formInput);
      });

      expect(formInput.classList.contains("error"));
    });
  });

  it("should generate form with disabled submit button", () => {
    render(<EventForm />);

    const submitButton = screen.getByText(/Submit/i, { selector: "button" });

    expect(submitButton).toHaveAttribute("disabled");
  });

  it("should enable button when valid inputs are provided ", () => {
    render(<EventForm />);

    formData.forEach(({ name, value }) => {
      const formInput = screen.getByTestId(`${name}`);
      act(() => {
        fireEvent.change(formInput, { target: { value } });
      });
    });

    const submitButton = screen.getByText(/Submit/i, { selector: "button" });
    expect(submitButton).not.toHaveAttribute("disabled");
  });

  it("should change overall form state from valid to invalid", async () => {
    render(<EventForm />);
    formData.forEach(({ name, value }) => {
      const formInput = screen.getByTestId(`${name}`);
      act(() => {
        fireEvent.change(formInput, { target: { value: value } });
      });
    });

    const submitButton = screen.getByText(/Submit/i, { selector: "button" });
    expect(submitButton).not.toHaveAttribute("disabled");

    const formInput = await screen.findByTestId(/firstName/i, {
      selector: "input",
    });

    fireEvent.change(formInput, { target: { value: "" } });
    expect(submitButton).toHaveAttribute("disabled");
  });
});
