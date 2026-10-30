import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import SupportFlowApp from "../../src/features/supportflow/components/supportflow-app";

describe("SupportFlow app", () => {
  it("filters tickets and keeps the selected search in the URL", async () => {
    render(<SupportFlowApp />);
    expect(await screen.findByRole("heading", { name: "Good morning, Sara" })).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /Tickets/ }));
    const search = screen.getByPlaceholderText("Search tickets…");
    fireEvent.change(search, { target: { value: "SF-1048" } });

    expect(await screen.findByRole("button", { name: /Unable to export monthly report/ })).toBeInTheDocument();
    await waitFor(() => expect(window.location.search).toContain("q=SF-1048"));
    expect(screen.queryByRole("button", { name: /Invite link expired too soon/ })).not.toBeInTheDocument();
  });

  it("shows a real empty result state when no tickets match", async () => {
    render(<SupportFlowApp />);
    fireEvent.click(await screen.findByRole("button", { name: /Tickets/ }));
    fireEvent.change(screen.getByPlaceholderText("Search tickets…"), { target: { value: "not-a-ticket" } });

    expect(await screen.findByText("No tickets found")).toBeInTheDocument();
    expect(screen.getByText("Try adjusting your search or filters.")).toBeInTheDocument();
  });

  it("surfaces unreadable local data instead of reporting a false success", async () => {
    window.localStorage.setItem("supportflow-demo-data-v1", "{");
    render(<SupportFlowApp />);

    expect(await screen.findByRole("alert")).toHaveTextContent("Local demo storage unavailable.");
  });

  it("supports Escape and restores focus when closing the ticket form", async () => {
    render(<SupportFlowApp />);
    const newTicket = await screen.findByRole("button", { name: "New ticket" });
    newTicket.focus();
    fireEvent.click(newTicket);
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    fireEvent.keyDown(document, { key: "Escape" });

    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
    expect(newTicket).toHaveFocus();
  });
});
