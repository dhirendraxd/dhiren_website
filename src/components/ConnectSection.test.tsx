import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import ConnectSection from "./ConnectSection";

const { sendMock } = vi.hoisted(() => ({ sendMock: vi.fn() }));

vi.mock("@emailjs/browser", () => ({
  default: { send: sendMock },
}));

const fillForm = () => {
  fireEvent.change(screen.getByLabelText(/^name/i), { target: { value: "Ada Lovelace" } });
  fireEvent.change(screen.getByLabelText(/^email/i), { target: { value: "ada@example.com" } });
  fireEvent.change(screen.getByLabelText(/^subject/i), { target: { value: "Let's collaborate" } });
};

describe("ConnectSection", () => {
  beforeEach(() => {
    sendMock.mockReset();
    vi.stubEnv("VITE_EMAILJS_SERVICE_ID", "service_test");
    vi.stubEnv("VITE_EMAILJS_TEMPLATE_ID", "template_test");
    vi.stubEnv("VITE_EMAILJS_PUBLIC_KEY", "public_test");
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("shows validation errors and does not send when required fields are empty", () => {
    render(<ConnectSection />);
    fireEvent.click(screen.getByRole("button", { name: /send/i }));

    expect(screen.getByText("Name is required")).toBeInTheDocument();
    expect(screen.getByText("Email is required")).toBeInTheDocument();
    expect(screen.getByText("Subject is required")).toBeInTheDocument();
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("sends the form via EmailJS and shows the success state", async () => {
    sendMock.mockResolvedValueOnce({ status: 200, text: "OK" });
    render(<ConnectSection />);

    fillForm();
    fireEvent.click(screen.getByRole("button", { name: /send/i }));

    await waitFor(() => expect(sendMock).toHaveBeenCalledTimes(1));
    expect(sendMock).toHaveBeenCalledWith(
      "service_test",
      "template_test",
      { name: "Ada Lovelace", subject: "Let's collaborate", email: "ada@example.com" },
      { publicKey: "public_test" },
    );

    expect(await screen.findByText(/message sent/i)).toBeInTheDocument();
  });

  it("silently skips the real send and shows success when the honeypot is filled", async () => {
    render(<ConnectSection />);

    fillForm();
    fireEvent.change(screen.getByLabelText("Company"), { target: { value: "spambot inc" } });
    fireEvent.click(screen.getByRole("button", { name: /send/i }));

    expect(await screen.findByText(/message sent/i)).toBeInTheDocument();
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("shows an error message with a mailto fallback when EmailJS fails", async () => {
    sendMock.mockRejectedValueOnce(new Error("network error"));
    render(<ConnectSection />);

    fillForm();
    fireEvent.click(screen.getByRole("button", { name: /send/i }));

    expect(await screen.findByText(/something went wrong sending your message/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "dhirendraxd@gmail.com" })).toHaveAttribute(
      "href",
      "mailto:dhirendraxd@gmail.com",
    );
  });
});
