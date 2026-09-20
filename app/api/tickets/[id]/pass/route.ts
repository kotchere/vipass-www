import { FunctionsHttpError } from "@supabase/supabase-js";
import type { NextRequest } from "next/server";

import { createClient } from "@/lib/supabase/server";
import { isUuid } from "@/lib/uuid";

/**
 * Apple Wallet pass download. Proxies `generate-wallet-pass` with the
 * signed-in user's session (the edge fn enforces ownership + `active` status),
 * decodes the base64 `.pkpass` and streams it with the Wallet MIME type so
 * Safari opens the "Add to Wallet" sheet. Linked as a plain `<a href>` from
 * the ticket page — it must be a real navigation, never a fetch.
 */
export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!isUuid(id)) {
    return Response.json({ error: "invalid_ticket_id" }, { status: 400 });
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return Response.json({ error: "unauthorized" }, { status: 401 });
  }

  const { data, error } = await supabase.functions.invoke<{ passData?: string }>(
    "generate-wallet-pass",
    { body: { ticket_id: id } },
  );

  if (error) {
    if (error instanceof FunctionsHttpError) {
      const status: number = error.context?.status ?? 502;
      let body: unknown = { error: "pass_generation_failed" };
      try {
        body = await error.context.json();
      } catch {
        // Non-JSON error body from the function; keep the generic code.
      }
      return Response.json(body, { status, headers: { "Cache-Control": "no-store" } });
    }
    console.error("[tickets/pass] generate-wallet-pass failed", error);
    return Response.json({ error: "pass_generation_failed" }, { status: 502 });
  }

  if (!data?.passData) {
    console.error("[tickets/pass] generate-wallet-pass returned no passData");
    return Response.json({ error: "pass_generation_failed" }, { status: 502 });
  }

  const bytes = Buffer.from(data.passData, "base64");

  return new Response(bytes, {
    status: 200,
    headers: {
      "Content-Type": "application/vnd.apple.pkpass",
      "Content-Disposition": 'attachment; filename="vipass-ticket.pkpass"',
      "Content-Length": String(bytes.byteLength),
      "Cache-Control": "no-store",
    },
  });
}
