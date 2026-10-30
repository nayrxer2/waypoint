"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ticketSchema, type TicketInput } from "../domain/schemas";
import type { Customer, Ticket, TeamMember } from "../domain/types";

type TicketFormProps = {
  customers: Customer[];
  team: TeamMember[];
  ticket?: Ticket;
  pending?: boolean;
  onCancel: () => void;
  onSubmit: (input: TicketInput) => void | Promise<void>;
};

const fieldClass = "sf-input";

export function TicketForm({ customers, team, ticket, pending = false, onCancel, onSubmit }: TicketFormProps) {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<TicketInput>({
    resolver: zodResolver(ticketSchema),
    defaultValues: ticket
      ? {
          subject: ticket.subject,
          description: ticket.description,
          customerId: ticket.customerId,
          assigneeId: ticket.assigneeId,
          priority: ticket.priority,
          status: ticket.status,
        }
      : {
          subject: "",
          description: "",
          customerId: "",
          assigneeId: team[0]?.id ?? "",
          priority: "Normal",
          status: "Open",
        },
  });

  return (
    <form className="sf-form" onSubmit={handleSubmit(async (input) => { await onSubmit(input); })} noValidate>
      <label className="sf-field">
        <span>Subject</span>
        <input className={fieldClass} placeholder="What does the customer need help with?" {...register("subject")} aria-invalid={Boolean(errors.subject)} />
        {errors.subject && <span className="sf-field-error">{errors.subject.message}</span>}
      </label>
      <label className="sf-field">
        <span>Description</span>
        <textarea className={`${fieldClass} sf-textarea`} placeholder="Add enough context for the team to investigate." rows={4} {...register("description")} aria-invalid={Boolean(errors.description)} />
        {errors.description && <span className="sf-field-error">{errors.description.message}</span>}
      </label>
      <div className="sf-form-grid">
        <label className="sf-field">
          <span>Customer</span>
          <select className={fieldClass} {...register("customerId")} aria-invalid={Boolean(errors.customerId)}>
            <option value="">Select a customer</option>
            {customers.map((customer) => <option key={customer.id} value={customer.id}>{customer.name} · {customer.company}</option>)}
          </select>
          {errors.customerId && <span className="sf-field-error">{errors.customerId.message}</span>}
        </label>
        <label className="sf-field">
          <span>Assignee</span>
          <select className={fieldClass} {...register("assigneeId")}>
            {team.map((member) => <option key={member.id} value={member.id}>{member.name}</option>)}
          </select>
        </label>
        <label className="sf-field">
          <span>Priority</span>
          <select className={fieldClass} {...register("priority")}>
            {["Urgent", "High", "Normal", "Low"].map((priority) => <option key={priority}>{priority}</option>)}
          </select>
        </label>
        <label className="sf-field">
          <span>Status</span>
          <select className={fieldClass} {...register("status")}>
            {["Open", "In progress", "Waiting", "Resolved"].map((status) => <option key={status}>{status}</option>)}
          </select>
        </label>
      </div>
      <div className="sf-dialog-actions">
        <button className="sf-button sf-button-quiet" onClick={onCancel} type="button">Cancel</button>
        <button className="sf-button sf-button-primary" disabled={pending || isSubmitting} type="submit">{pending || isSubmitting ? "Saving…" : ticket ? "Save changes" : "Create ticket"}</button>
      </div>
    </form>
  );
}
