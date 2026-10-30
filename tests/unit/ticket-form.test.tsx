import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { seedData } from "../../src/features/supportflow/domain/seed";
import { TicketForm } from "../../src/features/supportflow/components/ticket-form";

describe("TicketForm", () => {
  it("shows schema feedback and does not submit invalid input", async () => {
    const onSubmit = vi.fn();
    render(<TicketForm customers={seedData.customers} team={seedData.team} onCancel={() => {}} onSubmit={onSubmit} />);

    fireEvent.click(screen.getByRole("button", { name: "Create ticket" }));

    expect(await screen.findByText("Add a subject with at least 5 characters.")).toBeInTheDocument();
    expect(screen.getByText("Add a little more detail (at least 10 characters).")).toBeInTheDocument();
    expect(screen.getByText("Choose a customer.")).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("submits a valid ticket and disables repeat submission while pending", async () => {
    const onSubmit = vi.fn(() => new Promise<void>((resolve) => window.setTimeout(resolve, 20)));
    render(<TicketForm customers={seedData.customers} team={seedData.team} onCancel={() => {}} onSubmit={onSubmit} />);

    fireEvent.change(screen.getByLabelText("Subject"), { target: { value: "A request from a customer" } });
    fireEvent.change(screen.getByLabelText("Description"), { target: { value: "The customer needs help with their workspace." } });
    fireEvent.change(screen.getByLabelText("Customer"), { target: { value: "c-1" } });
    fireEvent.click(screen.getByRole("button", { name: "Create ticket" }));

    await waitFor(() => expect(onSubmit).toHaveBeenCalledOnce());
    expect(onSubmit).toHaveBeenCalledWith(expect.objectContaining({
      subject: "A request from a customer",
      customerId: "c-1",
      status: "Open",
      priority: "Normal",
    }));
    expect(screen.getByRole("button", { name: "Saving…" })).toBeDisabled();
  });
});
