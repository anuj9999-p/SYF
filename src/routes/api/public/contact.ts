/**
 * Reference contact API handler — src/routes/api/public/contact.ts
 * ------------------------------------------------------------------
 * This project ships as a TanStack Router SPA with the contact form
 * submitting straight to Supabase from the browser (see
 * src/components/forms/contact-form.tsx and src/lib/supabase.ts),
 * using the public anon key under RLS restricted to INSERT-only.
 * That is enough security for a public contact form and needs no
 * server at all.
 *
 * This file is kept at the path the project spec calls for, as a
 * reference implementation of the same endpoint as a real serverless
 * function, for anyone who wants server-side validation, rate
 * limiting, or to keep Supabase credentials off the client entirely.
 * It is written against the Web-standard Request/Response objects
 * used by Vercel Edge Functions, Netlify Functions, and Cloudflare
 * Workers, and is excluded from the TanStack Router route tree via
 * `routeFileIgnorePattern: 'api/'` in vite.config.ts — it will not be
 * bundled into the client app as-is.
 *
 * To actually deploy it:
 *  - Vercel: copy to /api/contact.ts at the repo root (Vercel's own
 *    convention), or wire it up as a TanStack Start server route if
 *    you migrate this project to Start.
 *  - Netlify: copy to /netlify/functions/contact.ts.
 *  - Cloudflare: adapt into a Worker `fetch` handler.
 *
 * It needs SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY as server-only
 * environment variables — never prefixed with VITE_, never shipped to
 * the client. See DEPLOYMENT.md.
 */

/// <reference types="node" />
import { createClient } from "@supabase/supabase-js";
import { contactSchema } from "../../../lib/validation";

export async function POST(request: Request): Promise<Response> {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return jsonResponse(422, { error: "Request body must be valid JSON." });
  }

  const parsed = contactSchema.safeParse(payload);

  if (!parsed.success) {
    return jsonResponse(422, {
      error: "Validation failed.",
      issues: parsed.error.flatten().fieldErrors,
    });
  }

  const values = parsed.data;

  // Honeypot: silently accept without writing anything to the database.
  if (values.companyWebsite) {
    return jsonResponse(200, { ok: true });
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    return jsonResponse(500, { error: "Server is not configured." });
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey);

  const { error } = await supabase.from("contact_inquiries").insert({
    name: values.name,
    email: values.email,
    company: values.company || null,
    project_type: values.projectType,
    budget: values.budget || null,
    message: values.message,
  });

  if (error) {
    return jsonResponse(500, { error: "Could not save your message. Please try again." });
  }

  return jsonResponse(200, { ok: true });
}

function jsonResponse(status: number, body: Record<string, unknown>): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}
