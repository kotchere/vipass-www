import { TICKET_STATUS_LABEL, ticketStatusChipClass, type TicketStatus } from "@/lib/tickets";

export default function TicketStatusChip({ status }: { status: TicketStatus }) {
  return <span className={ticketStatusChipClass(status)}>{TICKET_STATUS_LABEL[status] ?? status}</span>;
}
