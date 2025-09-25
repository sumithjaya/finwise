// src/app/api/tina/[...routes]/route.ts
import { TinaNodeBackend } from "@tinacms/datalayer";
import databaseClient from "../../../../../tina/__generated__/databaseClient";


// App Router: force Node.js runtime (Tina can't run on Edge)
export const runtime = "nodejs";
// ensure no caching for the API
export const revalidate = 0;
export const dynamic = "force-dynamic";

const backend = new TinaNodeBackend({
  databaseClient,
  // If you’re adding auth later, pass an authProvider here
  // authProvider: new LocalBackendAuthProvider(), // example
});

// Next.js App Router expects HTTP method exports:
export async function GET(req: Request, { params }: { params: { routes: string[] } }) {
  return backend.request(req);
}
export async function POST(req: Request, { params }: { params: { routes: string[] } }) {
  return backend.request(req);
}
export async function PUT(req: Request, { params }: { params: { routes: string[] } }) {
  return backend.request(req);
}
export async function DELETE(req: Request, { params }: { params: { routes: string[] } }) {
  return backend.request(req);
}
export async function PATCH(req: Request, { params }: { params: { routes: string[] } }) {
  return backend.request(req);
}
